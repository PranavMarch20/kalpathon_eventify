import { useState, useEffect } from 'react';
import { getEvents } from '../services/api';
import EventCard from '../components/EventCard';
import CustomSelect from '../components/CustomSelect';
import { Search, MapPin, Globe, GraduationCap, PartyPopper } from 'lucide-react';

const ExploreEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    category: '',
    eventType: '',
    date: '',
    timeStatus: 'upcoming',
  });

  const categories = [
    'Technology', 'Music', 'Sports', 'Art', 'Education',
    'Business', 'Health', 'Food', 'Gaming', 'Social',
  ];

  const fetchEvents = async (params = {}) => {
    setLoading(true);
    try {
      const queryParams = {};
      Object.entries(params).forEach(([key, val]) => {
        if (val) queryParams[key] = val;
      });
      console.log('Sending query params to API:', queryParams);
      const { data } = await getEvents(queryParams);
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(filters);
  }, [filters.timeStatus, filters.category, filters.eventType]);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchEvents(filters);
  };

  const clearFilters = () => {
    const defaultFilters = { search: '', city: '', category: '', eventType: '', date: '', timeStatus: 'upcoming' };
    setFilters(defaultFilters);
    fetchEvents(defaultFilters);
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row-reverse gap-8">
          
          {/* Sidebar (Right Side) */}
          <div className="w-full lg:w-[28%] xl:w-[22%] space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-3xl md:text-plus font-black mb-2 leading-tight">
                Explore <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Events</span>
              </h1>
              <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">Find amazing events happening near you</p>
            </div>

            <form onSubmit={handleFilter} className="card p-5 bg-white shadow-sm border border-[var(--border)] sticky top-32 space-y-5">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] border-b border-[var(--border)] pb-2.5">Filters</h3>
              
              <div className="space-y-3.5">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-[var(--text-muted)]" size={16} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="input-field !pl-9 !py-2.5 !text-sm"
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-[var(--text-muted)]" size={16} />
                  <input
                    type="text"
                    placeholder="Location"
                    value={filters.city}
                    onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                    className="input-field !pl-9 !py-2.5 !text-sm"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-[var(--text-muted)] leading-none ml-1">Category</label>
                  <CustomSelect
                    name="category"
                    placeholder="All Categories"
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    options={[
                      { value: '', label: 'All Categories' },
                      ...categories.map(cat => ({ value: cat, label: cat }))
                    ]}
                  />
                </div>
                
                <div className="space-y-1">
                   <label className="text-[9px] font-black uppercase text-[var(--text-muted)] leading-none ml-1">Event Type</label>
                  <CustomSelect
                    name="eventType"
                    placeholder="All Types"
                    value={filters.eventType}
                    onChange={(e) => setFilters({ ...filters, eventType: e.target.value })}
                    options={[
                      { value: '', label: 'All Types' },
                      { value: 'openEvent', label: 'Open Events' },
                      { value: 'collegeOnlyEvent', label: 'College Only' }
                    ]}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-[var(--text-muted)] leading-none ml-1">Date</label>
                  <input
                    type="date"
                    value={filters.date}
                    onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                    className="input-field cursor-pointer !py-2.5 !text-sm"
                  />
                </div>
              </div>

              <div className="pt-1 flex flex-col gap-2">
                <button type="submit" className="btn-primary w-full !py-3 text-sm font-bold flex items-center justify-center gap-2">
                   Apply Search
                </button>
                <button type="button" onClick={clearFilters} className="btn-secondary w-full !py-2.5 !bg-slate-50 hover:!bg-slate-100 !text-slate-600 !border-slate-200 text-xs font-bold">
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Main Content (Left Side) */}
          <div className="flex-1 lg:pr-2">
            
            {/* Status Tabs (Smaller) */}
            <div className="flex gap-1.5 mb-6 p-1 bg-slate-100 rounded-xl w-fit">
              <button
                onClick={() => setFilters({ ...filters, timeStatus: 'upcoming' })}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${filters.timeStatus === 'upcoming' ? 'bg-white text-[var(--primary)] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setFilters({ ...filters, timeStatus: 'past' })}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${filters.timeStatus === 'past' ? 'bg-white text-[var(--primary)] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Past Events
              </button>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-sm" />
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Fetching Events...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-24 animate-fadeIn bg-white rounded-3xl border border-[var(--border)] shadow-md">
                <div className="flex justify-center mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center text-[var(--primary)]">
                    <PartyPopper size={40} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)]">No {filters.timeStatus} events</h3>
                <p className="text-lg text-[var(--text-secondary)]">Try adjusting your filters or switching tabs.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 md:gap-10">
                {events.map((event) => (
                  <div key={event._id} className="animate-fadeIn h-full">
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExploreEvents;
