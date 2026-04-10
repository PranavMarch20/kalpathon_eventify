import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Rocket, Mic } from 'lucide-react';
import PasswordInput from '../components/PasswordInput';
import CustomSelect from '../components/CustomSelect';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'attendee',
    college: '',
    city: '',
    organizerType: 'independent',
    organization: '',
    bio: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const data = await register(form);
      if (data.user.role === 'organizer') {
        navigate('/dashboard');
      } else {
        navigate('/explore');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Registration failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start px-4 py-10 md:pb-30 md:pt-5">
      <div className="absolute top-1/3 right-1/4 w-80 h-80 z-[-5] rounded-full opacity-10 blur-3xl" style={{ background: 'var(--accent)' }} />

      <div className="w-full max-w-2xl animate-slideUp">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
              <Rocket className="text-[var(--primary)]" size={28} />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-1.5">Create your account</h1>
          <p className="text-sm text-[var(--text-secondary)]">Join Eventify and start exploring events</p>
        </div>

        <div className="card p-6 md:p-8 z-90">
          {error && (
            <div className="mb-6 p-3 rounded-lg text-sm text-[var(--error)]" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Password</label>
                <PasswordInput
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Confirm Password</label>
                <PasswordInput
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">College / Institution</label>
                <input
                  type="text"
                  name="college"
                  value={form.college}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Your college name"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">City <span className="text-[var(--text-muted)] opacity-60">(optional)</span></label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Your city"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--border)] mt-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-3 ml-1">Choose your account type</label>
              <CustomSelect
                name="role"
                value={form.role}
                onChange={handleChange}
                options={[
                  { value: 'attendee', label: 'Attendee — I want to discover & book events' },
                  { value: 'organizer', label: 'Organizer — I want to create & manage events' },
                ]}
              />
            </div>

            {/* Organizer-specific fields */}
            {form.role === 'organizer' && (
              <div className="p-6 rounded-2xl animate-fadeIn flex flex-col gap-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 pb-2" style={{ borderBottom: '1px solid var(--border)' }}>
                  <Mic size={16} className="text-[var(--primary)]" />
                  <p className="text-[10px] text-[var(--primary)] uppercase tracking-widest font-black">Organizer Details</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Organizing as</label>
                    <CustomSelect
                      name="organizerType"
                      value={form.organizerType}
                      onChange={handleChange}
                      options={[
                        { value: 'independent', label: 'Independent' },
                        { value: 'organization', label: 'Organization' },
                      ]}
                    />
                  </div>

                  {form.organizerType === 'organization' && (
                    <div className="animate-fadeIn">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Organization Name</label>
                      <input
                        type="text"
                        name="organization"
                        value={form.organization}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="e.g., Google Developer Club"
                        required
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">
                    Short Bio <span className="opacity-60">(Describe yourself or group)</span>
                  </label>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    className="input-field !py-3"
                    rows="2"
                    placeholder="Tell attendees a bit about yourself..."
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full !py-4 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Account</>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
            Already have an account?{' '}
            <Link to="/login" className="text-[var(--primary-light)] hover:underline no-underline uppercase tracking-widest font-black text-[10px]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
