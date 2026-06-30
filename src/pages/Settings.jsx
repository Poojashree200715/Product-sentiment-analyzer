import React, { useState } from 'react';
import BackgroundShader from '../components/BackgroundShader';
import Sidebar from '../components/Sidebar';

const Settings = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [profile, setProfile] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@sentientai.io',
    bio: 'Senior Product Manager overseeing the Sentiment Intelligence pipeline. Passionate about LLM interpretability and emotional AI.'
  });

  const [darkMode, setDarkMode] = useState(false);
  const [scrapersActive, setScrapersActive] = useState(true);
  const [apiKey, setApiKey] = useState('sk_live_sentipulse_5528a490bc11e3b');

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="bg-background text-on-surface antialiased overflow-x-hidden min-h-screen relative">
      {/* Background Shader */}
      <BackgroundShader />

      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <main className="md:ml-64 p-margin-mobile md:p-margin-desktop min-h-screen">
        
        {/* Mobile Header */}
        <div className="flex items-center gap-2 md:hidden mb-6 pt-16">
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-on-surface"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <span className="font-extrabold text-primary text-xl">SentientAI</span>
        </div>

        {/* Header */}
        <header className="mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface font-display-lg leading-tight">Settings</h2>
          <p className="text-xs text-on-surface-variant font-medium mt-1">
            Manage your AI Product Sentiment Analyzer preferences and account security.
          </p>
        </header>

        {/* Save success toast */}
        {saveSuccess && (
          <div className="fixed bottom-6 right-6 z-50 glass-card bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg animate-bounce">
            <span className="material-symbols-outlined">check_circle</span>
            <span className="text-xs font-bold">Preferences saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-10">
          
          {/* Left Column: Profile settings */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Profile Panel */}
            <div className="glass-card p-6 md:p-8 rounded-3xl bg-white/70 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20 bg-surface-container shadow-inner">
                      <img 
                        className="w-full h-full object-cover" 
                        alt="User Profile" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi9fsZoeZjg00P5aoXo7FBt6G6tCAqEyQIEvsiaytHN2BZJt2Gn2NtAsIuwOH8YZreD6xzLsVrlYxMIouo86QUeJhY9yhKrzh-l_zxmrc5HsHybUbhoaJNsQ0yKZMeunqhkvlfVGTZXENbQJOfYmGxz30dlQGKTPhMeIi5RSWmFBD77hCooj1Aa9PlAImGnSxBxeWfIsEgkpyZkoHkgo5NfeKLTFlOgtdTQivYlupy34eMhyFru3KjvokHUVwPmyZ3uSo4-H5WmTvS" 
                      />
                    </div>
                    <button type="button" className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-md hover:scale-105 transition-all">
                      <span className="material-symbols-outlined text-xs">edit</span>
                    </button>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-on-surface font-headline-md">Personal Profile</h3>
                    <p className="text-xs text-on-surface-variant font-medium">Public identity and contact information</p>
                  </div>
                </div>
                <button 
                  type="submit"
                  className="bg-primary text-white px-6 py-2.5 rounded-full text-xs font-bold hover:scale-98 transition-all shadow-md shadow-primary/20"
                >
                  Save Changes
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-2">
                  <label className="font-bold text-on-surface-variant block ml-1">Display Name</label>
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full rounded-xl border border-outline-variant/30 bg-white/50 px-4 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary/25"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-on-surface-variant block ml-1">Email Address</label>
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full rounded-xl border border-outline-variant/30 bg-white/50 px-4 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary/25"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="font-bold text-on-surface-variant block ml-1">Professional Bio</label>
                  <textarea 
                    rows="3"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full rounded-xl border border-outline-variant/30 bg-white/50 px-4 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary/25 resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Scrapers & API Configuration */}
            <div className="glass-card p-6 md:p-8 rounded-3xl bg-white/70 shadow-sm">
              <h3 className="text-base font-bold text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">database</span>
                Data Scraper Settings
              </h3>
              <p className="text-xs text-on-surface-variant mb-6 font-medium">
                Set active marketplace bridges and authorization keys for automatic audits.
              </p>

              <div className="space-y-6 text-xs font-semibold">
                <div className="flex items-center justify-between p-4 bg-white/40 border border-white/40 rounded-2xl">
                  <div>
                    <span className="block text-sm font-extrabold">Auto-Sync Marketplaces</span>
                    <span className="text-[10px] text-outline font-medium">Scrapes Amazon/Flipkart review indexes every 24 hours.</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setScrapersActive(!scrapersActive)}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${scrapersActive ? 'bg-primary' : 'bg-outline-variant'}`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${scrapersActive ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-on-surface-variant block ml-1">SentientAI API Key</label>
                  <input 
                    type="text" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant/30 bg-white/50 px-4 py-3 font-mono text-on-surface focus:ring-2 focus:ring-primary/25"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Theme & customization */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Appearance settings */}
            <div className="glass-card p-6 md:p-8 rounded-3xl bg-white/70 shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary">palette</span>
                  <h3 className="font-bold text-base">Appearance</h3>
                </div>

                <div className="space-y-6 text-xs font-semibold">
                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant">dark_mode</span>
                      <span className="font-bold text-on-surface">Dark Mode</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setDarkMode(!darkMode)}
                      className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${darkMode ? 'bg-primary' : 'bg-outline-variant'}`}
                    >
                      <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <span className="block font-bold text-on-surface-variant ml-1">Accent Theme Color</span>
                    <div className="flex gap-3">
                      <button type="button" className="w-8 h-8 rounded-full bg-primary border-2 border-white shadow-sm ring-2 ring-primary"></button>
                      <button type="button" className="w-8 h-8 rounded-full bg-secondary-container border-2 border-white shadow-sm"></button>
                      <button type="button" className="w-8 h-8 rounded-full bg-tertiary-container border-2 border-white shadow-sm"></button>
                      <button type="button" className="w-8 h-8 rounded-full bg-error border-2 border-white shadow-sm"></button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <span className="block text-[10px] uppercase font-bold text-outline mb-1">PRO LICENSING</span>
                <p className="text-[10px] text-on-surface-variant leading-relaxed mb-4">
                  Account is currently subscribed to the **Enterprise plan** renewal on December 2026.
                </p>
                <button type="button" className="w-full bg-primary text-white py-2.5 rounded-xl text-xs font-bold hover:opacity-90 active:scale-98 transition-all">
                  Manage Subscription
                </button>
              </div>
            </div>

          </div>

        </form>
      </main>
    </div>
  );
};

export default Settings;
