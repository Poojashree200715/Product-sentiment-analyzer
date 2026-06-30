import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: 'dashboard' },
    { name: 'Insights (AI)', path: '/analyzer', icon: 'psychology' },
    { name: 'Product Feed', path: '/search', icon: 'inventory_2' },
    { name: 'Reviews', path: '/reviews', icon: 'rate_review' },
    { name: 'Reports', path: '/reports', icon: 'analytics' },
    { name: 'Settings', path: '/settings', icon: 'settings' },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 h-full z-40 flex flex-col py-8 bg-surface/70 backdrop-blur-xl border-r border-white/10 shadow-lg w-64 transition-transform duration-300 md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="px-6 mb-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-2xl font-bold">psychology</span>
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-extrabold text-primary leading-none">SentientAI</h1>
            <p className="text-[10px] uppercase tracking-widest text-outline mt-1 font-bold">Enterprise Analytics</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
              className={({ isActive }) =>
                `p-3 flex items-center gap-4 transition-all rounded-r-full border-l-4 ${
                  isActive
                    ? 'bg-primary-container/20 text-primary font-bold border-primary translate-x-1'
                    : 'text-on-surface-variant border-transparent hover:bg-surface-container-high/50 hover:text-primary'
                }`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-md text-label-md">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* CTA Section */}
        <div className="px-4 py-6">
          <div className="glass-card p-4 rounded-2xl bg-primary/5 border-primary/10">
            <p className="text-xs font-semibold text-primary mb-2">Ready for more?</p>
            <button className="w-full py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md shadow-md shadow-primary/20 hover:scale-98 transition-all">
              Upgrade to Pro
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-auto px-3 space-y-1">
          <button
            onClick={() => {
              navigate('/settings');
              setIsMobileOpen && setIsMobileOpen(false);
            }}
            className="w-full text-left text-on-surface-variant p-3 flex items-center gap-4 hover:bg-surface-container-high/50 hover:text-primary transition-all rounded-xl"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="font-label-md text-label-md">Help Center</span>
          </button>
          <button
            onClick={() => {
              navigate('/');
              setIsMobileOpen && setIsMobileOpen(false);
            }}
            className="w-full text-left text-on-surface-variant p-3 flex items-center gap-4 hover:bg-surface-container-high/50 hover:text-primary transition-all rounded-xl"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-md text-label-md">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
