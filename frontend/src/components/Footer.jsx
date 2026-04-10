import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

const BrandTwitter = ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l11.733 16h4.267l-11.733-16z" /><path d="M4 20l6.768-6.768m2.46-2.46L20 4" /></svg>;
const BrandInstagram = ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const BrandFacebook = ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const BrandYoutube = ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;

const Footer = () => {
  return (
    <footer className="bg-[#4F46E5] text-white pt-20 pb-0 overflow-hidden flex-shrink-0 mt-[100px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Left Col - Brand & Socials */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-3.5 mb-6 group cursor-default">
              {/* Geometric Brand Icon (Matching Navbar) */}
              <div className="relative flex items-center justify-center w-11 h-11 shrink-0">
                 <div className="absolute inset-0 bg-indigo-200/20 rounded-xl transform -rotate-6 transition-transform duration-500 opacity-60 mix-blend-overlay"></div>
                 <div className="absolute inset-0 bg-white rounded-xl transform rotate-3 transition-all duration-500 shadow-md flex items-center justify-center overflow-hidden">
                   {/* Abstract internal slash */}
                   <div className="w-[150%] h-1 bg-indigo-500/10 transform -rotate-45 absolute"></div>
                 </div>
                 <div className="absolute inset-1 bg-[#4F47E5] rounded-lg flex items-center justify-center shadow-inner transform transition-all duration-500">
                    <span className="text-white font-black italic tracking-tighter text-lg">E</span>
                 </div>
              </div>

              {/* Structured Typography */}
              <div className="flex flex-col justify-center translate-y-[-1px]">
                <span className="text-2xl font-black tracking-[-0.05em] text-white leading-none">
                  Eventify
                </span>
                <span className="font-black tracking-[0.25em] text-indigo-200 uppercase leading-none ml-[2px] text-[8px] mt-0.5">
                  Platform
                </span>
              </div>
            </div>
            
            <div>
              <p className="text-indigo-200 text-sm font-bold mb-4 uppercase tracking-wider">Social Connect</p>
              <div className="flex items-center gap-4 text-white">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"><BrandTwitter size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"><BrandInstagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"><BrandFacebook size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"><BrandYoutube size={18} /></a>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h4 className="text-[#a5b4fc] text-sm font-bold mb-5 tracking-wide">Product</h4>
              <ul className="space-y-4">
                <li><Link to="/explore" className="text-white hover:underline font-medium text-sm">Explore Events</Link></li>
                <li><Link to="/register" className="text-white hover:underline font-medium text-sm">Create Event</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Pricing</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">App Directory</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#a5b4fc] text-sm font-bold mb-5 tracking-wide">Company</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">About</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Jobs</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Brand</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Newsroom</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#a5b4fc] text-sm font-bold mb-5 tracking-wide">Resources</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Support</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Safety</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Blog</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Feedback</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Developers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#a5b4fc] text-sm font-bold mb-5 tracking-wide">Policies</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Terms</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Privacy</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Cookie Settings</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Guidelines</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Licences</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Massive Background Typography - Separated to avoid overlap! */}
      <div className="w-full flex justify-center mt-8 pointer-events-none relative z-0 select-none overflow-hidden pb-4">
        <span className="text-[70px] xs:text-[90px] sm:text-[180px] md:text-[240px] lg:text-[280px] font-black tracking-tighter leading-[0.8] text-[#e0e7ff] opacity-90 mx-auto w-full text-center whitespace-nowrap px-4">
          Eventify
        </span>
      </div>
    </footer>
  );
};

export default Footer;
