import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundShader from '../components/BackgroundShader';

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <div className="bg-surface text-on-background min-h-screen relative overflow-x-hidden">
      {/* Background shader */}
      <BackgroundShader />

      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop h-20 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-8">
          <span className="font-display-lg text-headline-md font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-container cursor-pointer" onClick={() => navigate('/')}>
            SentientAI
          </span>
          <div className="hidden md:flex gap-6 font-semibold">
            <a className="text-primary font-bold border-b-2 border-primary font-label-md text-label-md py-1" href="#platform">Platform</a>
            <a className="text-on-surface-variant font-medium font-label-md text-label-md hover:text-primary transition-colors duration-300 py-1" href="#features">Features</a>
            <a className="text-on-surface-variant font-medium font-label-md text-label-md hover:text-primary transition-colors duration-300 py-1" href="#dashboard-preview">Preview</a>
            <a className="text-on-surface-variant font-medium font-label-md text-label-md hover:text-primary transition-colors duration-300 py-1" href="#pricing">Pricing</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-primary text-white px-6 py-2 rounded-full font-label-md text-label-md hover:scale-95 active:opacity-80 transition-all shadow-md shadow-primary/20"
          >
            Launch Dashboard
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[85vh] flex flex-col items-center justify-center pt-24 px-4 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
            AI-Powered Sentiment Analyzer
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none text-on-background">
            Extract <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-container">Sentient-Level</span> Insights From Customer Reviews
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-body-md">
            Search product names or URLs to analyze emotions, summarize feedback, and identify critical product trends instantly across global platforms.
          </p>

          {/* Search form */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input
                type="text"
                placeholder="Paste Amazon/Flipkart product URL or enter a product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl glass-card border border-outline-variant/30 text-on-surface placeholder:text-outline/70 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white font-bold px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 hover:scale-[0.98] active:opacity-90"
            >
              Analyze Now
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          {/* Trust badges */}
          <div className="pt-6 flex flex-wrap justify-center gap-6 text-sm text-outline font-medium">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-green-600">check_circle</span> Real-time Scraping</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-green-600">check_circle</span> Multi-platform Audit</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-green- green-600">check_circle</span> 98.2% Analysis Accuracy</span>
          </div>
        </div>
      </header>

      {/* Stepper / Features Section */}
      <section id="features" className="py-24 px-margin-desktop bg-surface-container-low/30 backdrop-blur-md border-t border-b border-outline-variant/30">
        <div className="max-w-container-max mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline-lg">How SentiPulse Works</h2>
            <p className="font-body-md text-on-surface-variant max-w-xl mx-auto">
              Seamless automation from raw review text to actionable intelligence in four simple steps.
            </p>
          </div>
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center max-w-[220px] z-10">
              <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center mb-6 border-primary/30 bg-white shadow-md">
                <span className="material-symbols-outlined text-primary text-3xl">search</span>
              </div>
              <h4 className="font-label-md text-label-md font-bold mb-2">1. Search Product</h4>
              <p className="text-xs text-on-surface-variant font-caption">Enter URL or name of the product you want to audit.</p>
            </div>
            <div className="hidden lg:block h-[2px] flex-1 bg-gradient-to-r from-primary/30 to-primary-container/50 relative">
              <div className="absolute top-[-3px] left-0 w-2 h-2 rounded-full bg-primary"></div>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center max-w-[220px] z-10">
              <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center mb-6 border-primary/30 bg-white shadow-md">
                <span className="material-symbols-outlined text-primary text-3xl">cloud_download</span>
              </div>
              <h4 className="font-label-md text-label-md font-bold mb-2">2. Collect Reviews</h4>
              <p className="text-xs text-on-surface-variant font-caption">Our scrapers gather reviews across all global platforms instantly.</p>
            </div>
            <div className="hidden lg:block h-[2px] flex-1 bg-gradient-to-r from-primary-container/50 to-primary/30"></div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center max-w-[220px] z-10">
              <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center mb-6 border-primary/30 bg-primary/10 shadow-md">
                <span className="material-symbols-outlined text-primary text-3xl animate-pulse">auto_awesome</span>
              </div>
              <h4 className="font-label-md text-label-md font-bold mb-2">3. AI Analysis</h4>
              <p className="text-xs text-on-surface-variant font-caption">Neural networks classify sentiments and extract key thematic trends.</p>
            </div>
            <div className="hidden lg:block h-[2px] flex-1 bg-gradient-to-r from-primary/30 to-primary-container/50"></div>
            {/* Step 4 */}
            <div className="flex flex-col items-center text-center max-w-[220px] z-10">
              <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center mb-6 border-primary/30 bg-white shadow-md">
                <span className="material-symbols-outlined text-primary text-3xl">analytics</span>
              </div>
              <h4 className="font-label-md text-label-md font-bold mb-2">4. Dashboard Insights</h4>
              <p className="text-xs text-on-surface-variant font-caption">Access visual analytics in your personalized research dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview / Asymmetric Layout */}
      <section id="dashboard-preview" className="py-24 px-margin-desktop max-w-container-max mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="glass-card p-2 overflow-hidden relative group rounded-3xl shadow-xl bg-white/40 border-white/40">
              <img 
                className="w-full rounded-2xl object-cover h-[400px] hover:scale-105 transition-transform duration-700" 
                alt="AI sentiment dashboard preview" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0ihWh7qJlNV6HVzxX6Q_tdNDI1XT_IEmVE5n7_bHHLY_XXK4We-FfCB1e1ju2vH1OnY2L8KUI91OB4uI3jvSkN9Ro0R0SzvEAZsNqmvfVrjdULt2cdGl5dD7AXH884fVHJCCyDrW-izZRd7Rp-qbQxmU__sStGnR4SGvwdQJ_t2xARCy9b7DEwogOQeAEcQsyIfyLig2-36hiVp0SVn1AabXlvzBv1kYzbtVTsl7n_w4pPeOINhbOBGRmVAnlKqOrysyIYWuZSpTH"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex items-end p-8">
                <div>
                  <div className="text-display-lg font-black text-primary text-4xl">98.2%</div>
                  <div className="text-label-md font-bold text-on-surface opacity-80 mt-1">Sentiment Classification Accuracy</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline-lg leading-tight">
              Ready to understand what your customers <span className="italic text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">really</span> think?
            </h2>
            <p className="font-body-md text-on-surface-variant">
              Join over 500+ global brands and enterprises using SentientAI to monitor product reputation, identify software bugs, and track client complaints in real-time.
            </p>
            <div className="pt-4 flex gap-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-98"
              >
                Start Free Trial
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 rounded-xl border border-outline text-on-surface font-semibold hover:bg-surface-container-high/60 transition-all"
              >
                Book Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-margin-desktop bg-surface-container-lowest border-t border-outline-variant/30">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-headline-md text-headline-md font-extrabold text-primary">SentientAI</span>
            <p className="font-caption text-on-surface-variant max-w-[260px] text-center md:text-left text-xs">
              Revolutionizing product feedback analysis with sentient-level intelligence engines.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#privacy">Privacy Policy</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#terms">Terms of Service</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#docs">API Docs</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#status">System Status</a>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer">public</span>
              <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer">mail</span>
            </div>
            <p className="text-xs text-on-surface-variant">© 2026 SentientAI Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
