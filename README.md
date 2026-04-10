# Eventify

Eventify is a full-stack event discovery and ticket booking platform for local and college events. It supports two user roles:

- `attendee`: browse events, book tickets, and access QR-based entry passes
- `organizer`: create and manage events, track bookings, view attendee analytics, and verify tickets at the venue

The project is split into:

- `frontend/`: React + Vite single-page app
- `backend/`: Express + MongoDB API

## Features

- User registration and login with JWT authentication
- Role-based access for attendees and organizers
- Explore events with filters for city, category, type, date, and upcoming/past status
- Event creation and editing with:
  - poster upload or poster URL
  - map-based location selection
  - open or college-only access
  - seat limits and live availability
- One-ticket-per-user booking flow
- QR code generation for tickets
- Ticket confirmation emails
- Organizer dashboard with booking and check-in analytics
- QR scanner for venue check-in
- Password reset flow using email verification code

## Tech Stack

### Frontend

- React 19
- React Router 7
- Vite 8
- Tailwind CSS 4
- Axios
- Leaflet + React Leaflet
- html5-qrcode
- Lucide React

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- Multer
- ImageKit
- Nodemailer
- QRCode

## Project Structure

```text
Eventify/
|-- backend/
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- utils/
|   |-- package.json
|   `-- server.js
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- context/
|   |   |-- pages/
|   |   `-- services/
|   |-- package.json
|   |-- vite.config.js
|   `-- vercel.json
|-- README.md
`-- .gitattributes
```

## Architecture Overview

### Backend responsibilities

- authentication and current-user lookup
- event CRUD operations
- booking and seat allocation
- QR code verification
- organizer analytics
- email sending
- image upload to ImageKit

### Frontend responsibilities

- authentication state and protected routes
- attendee flows:
  - explore events
  - view event details
  - book a ticket
  - access the ticket wallet
- organizer flows:
  - dashboard
  - create/edit events
  - view attendee analytics
  - scan tickets

## User Flows

### Attendee flow

1. Register or log in as an `attendee`
2. Explore events and apply filters
3. Open an event details page
4. Book the event if seats are available and eligibility rules are met
5. Receive a QR ticket in the app and by email
6. Show the QR code at the venue for entry

### Organizer flow

1. Register or log in as an `organizer`
2. Create an event with seats, date, poster, and location
3. Share the event with attendees
4. Monitor tickets sold and attendee list
5. Scan attendee QR codes at the venue
6. Track checked-in users in analytics

## Prerequisites

Before running the project locally, make sure you have:

- Node.js and npm installed
- a MongoDB database connection string
- an ImageKit account for poster and QR image hosting
- a Gmail account plus App Password for sending emails

## Environment Variables

### Backend

Copy `backend/.env.example` to `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

EMAIL=your_gmail_address
EMAIL_PASSWORD=your_gmail_app_password

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

FRONTEND_URL=http://localhost:5173
```

### Frontend

Copy `frontend/.env.example` to `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Important:

- If `VITE_API_BASE_URL` is not set, the frontend falls back to `/api`.
- In dev mode, `frontend/vite.config.js` currently proxies `/api` to a deployed Render backend.
- If you want the frontend to talk to your local backend, set `VITE_API_BASE_URL=http://localhost:5000/api`.

## Local Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Eventify
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Add environment files

Copy the sample files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

On Windows PowerShell:

```powershell
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
```

Then replace the placeholder values with your real credentials and URLs.

### 5. Start the backend

From `backend/`:

```bash
npm run dev
```

The API runs on:

```text
http://localhost:5000
```

### 6. Start the frontend

From `frontend/`:

```bash
npm run dev
```

The app usually runs on:

```text
http://localhost:5173
```

## Available Scripts

### Backend

From `backend/`:

```bash
npm run dev
npm start
```

### Frontend

From `frontend/`:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## API Overview

Base URL:

```text
/api
```

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`

### Events

- `GET /events`
- `GET /events/:id`
- `POST /events/create`
- `PUT /events/:id`
- `DELETE /events/:id`
- `GET /events/:id/analytics`

### Bookings

- `POST /bookings/book`
- `GET /bookings/my`

### QR

- `POST /qr/verify`

## Event Rules and Business Logic

- Attendees can book only one ticket per event.
- College-only events inherit the organizer's college and can only be booked by attendees from the same college.
- Seat deduction is handled server-side during booking.
- QR verification changes booking status from `confirmed` to `checked-in`.
- Organizers can only edit, delete, or view analytics for their own events.

## Deployment Notes

### Frontend

- `frontend/vercel.json` is configured for SPA routing on Vercel.
- The frontend reads the backend base URL from `VITE_API_BASE_URL`.

### Backend

- The backend is suitable for deployment on Render or any Node.js hosting platform.
- `PORT` is read from the environment.
- Image uploads and QR images are sent to ImageKit.

## Troubleshooting

### MongoDB connection issues

If the backend starts but database-backed features fail:

- verify `MONGO_URI`
- make sure your MongoDB Atlas IP whitelist allows your current network
- check whether your internet connection changed

The backend is written to start the HTTP server first and connect to MongoDB in the background.

### Frontend is calling the deployed API instead of local backend

Set:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

in `frontend/.env`, then restart the Vite dev server.

### Email is not being sent

- confirm `EMAIL` and `EMAIL_PASSWORD`
- if using Gmail, use an App Password instead of your normal password
- verify less-secure login assumptions are not being used

### Image upload is failing

- verify all ImageKit keys are present
- confirm the `IMAGEKIT_URL_ENDPOINT` is correct

## Known Limitations

- There are currently no automated tests in the repository.
- Frontend linting is not fully clean yet.
- The current setup is built around free events only.
- Some development defaults still point to deployed services unless overridden with local env configuration.

## Suggested Improvements

- add automated tests for backend routes and critical frontend flows
- improve error handling and validation coverage
- add paid ticket support
- add organizer profile management and richer analytics charts
- add CI checks for lint and build

## Notes for Contributors

- Read the root `README.md` first; the frontend README is only a pointer.
- Keep environment-specific values out of source code and in `.env` files.
- If you change API shapes, update both backend controllers and frontend service consumers.

## License

This project currently has no explicit license file in the repository. Add one before public distribution if needed.
