const Event = require('../models/Event');
const Booking = require('../models/Booking');
const User = require('../models/User');
const generateQR = require('../utils/generateQR');
const { sendEmail, buildTicketEmail } = require('../utils/sendEmail');
const imagekit = require('../config/imagekit');

// @desc    Book tickets for an event
// @route   POST /api/bookings/book
const bookTicket = async (req, res) => {
  try {
    const { eventId } = req.body;
    const ticketCount = 1; // Strictly enforce 1 ticket per user per event

    // Get event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Get user for eligibility check
    const user = await User.findById(req.user.id);

    // College eligibility check
    if (event.eventType === 'collegeOnlyEvent') {
      if (user.college !== event.allowedCollege) {
        return res.status(403).json({
          message: `This event is restricted to students of ${event.allowedCollege}`,
        });
      }
    }

    // Check for existing booking
    const existingBooking = await Booking.findOne({
      userId: req.user.id,
      eventId,
    });
    if (existingBooking) {
      return res.status(400).json({ message: 'You have already booked this event' });
    }

    // Atomic seat deduction (FCFS)
    const updatedEvent = await Event.findOneAndUpdate(
      {
        _id: eventId,
        availableSeats: { $gte: ticketCount },
      },
      {
        $inc: { availableSeats: -ticketCount },
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(400).json({
        message: 'Not enough seats available. Please try with fewer tickets.',
      });
    }

    // Generate QR code base64
    const { qrCodeData, qrCodeImage: qrBase64 } = await generateQR(req.user.id, eventId);

    // Upload QR code to ImageKit
    let qrCodeUrl = qrBase64;
    try {
      const qrUploadResponse = await imagekit.upload({
        file: qrBase64.split('base64,')[1],
        fileName: `qr-${bookingId = Date.now()}-${req.user.id}.png`,
        folder: '/eventify_qrcodes',
      });
      qrCodeUrl = qrUploadResponse.url;
    } catch (uploadError) {
      console.error('QR ImageKit upload failed, falling back to base64:', uploadError.message);
      // Fallback to storing base64 if ImageKit fails (rare but safe)
    }

    // Create booking
    const booking = await Booking.create({
      userId: req.user.id,
      eventId,
      ticketCount,
      qrCodeData,
      qrCodeImage: qrCodeUrl,
      status: 'confirmed',
    });

    const normalizeImageUrl = (url) => {
      if (!url) return null;
      const trimmedUrl = url.trim();
      if (trimmedUrl.startsWith('http')) return trimmedUrl;
      if (trimmedUrl.startsWith('//')) return `https:${trimmedUrl}`;
      
      // If it's a relative path from the app, use FRONTEND_URL or just serve it
      const baseUrl = process.env.IMAGEKIT_URL_ENDPOINT || process.env.FRONTEND_URL || '';
      const separator = (baseUrl.endsWith('/') || trimmedUrl.startsWith('/')) ? '' : '/';
      return `${baseUrl}${separator}${trimmedUrl}`;
    };

    let mapLink = '';
    if (event.latitude && event.longitude) {
      mapLink = `https://www.google.com/maps/search/?api=1&query=${event.latitude},${event.longitude}`;
    } else if (event.location) {
      mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;
    }

    // Send confirmation email
    const emailHtml = buildTicketEmail({
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      eventLocation: event.location,
      eventDescription: event.description,
      mapLink: mapLink,
      ticketCount,
      qrCodeCid: 'cid:qrcode@eventify',
      posterUrl: normalizeImageUrl(event.poster),
      userName: user.name,
      bookingId: booking._id,
    });

    // Send confirmation email with a safety timeout to prevent Vercel request timeouts
    const emailPromise = sendEmail({
      to: user.email,
      subject: `${event.title} Ticket Confirmation`,
      html: emailHtml,
      attachments: [{
        filename: 'qrcode.png',
        content: qrBase64.split("base64,")[1],
        encoding: 'base64',
        cid: 'qrcode@eventify'
      }]
    });

    // Race the email sending against a 7s timeout
    const timeoutPromise = new Promise((resolve) => setTimeout(() => {
      console.warn('Booking email timed out or is taking too long. Proceeding with response.');
      resolve();
    }, 7000));

    await Promise.race([emailPromise, timeoutPromise]);

    res.status(201).json({
      message: 'Booking confirmed!',
      booking: {
        id: booking._id,
        eventId: booking.eventId,
        ticketCount: booking.ticketCount,
        qrCodeData: booking.qrCodeData,
        qrCodeImage: booking.qrCodeImage,
        status: booking.status,
      },
    });
  } catch (error) {
    console.error('Booking error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get current user's bookings
// @route   GET /api/bookings/my
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate({
        path: 'eventId',
        select: 'title date time location poster status latitude longitude',
      })
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { bookTicket, getMyBookings };
