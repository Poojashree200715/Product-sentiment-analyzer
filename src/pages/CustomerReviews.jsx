import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BackgroundShader from '../components/BackgroundShader';
import Sidebar from '../components/Sidebar';

const CustomerReviews = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // States
  const [productId, setProductId] = useState(searchParams.get('id') || 'aura-pro-max');
  const [filterSentiment, setFilterSentiment] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setProductId(id);
    }
  }, [searchParams]);

  // Products directory to show current product info
  const productInfo = {
    'aura-pro-max': { name: 'Aura Pro Max Headphones', category: 'Audio', positiveCount: 842, negativeCount: 156, neutralCount: 250, total: 1248 },
    'sonicpro-x10': { name: 'SonicPro X10 Wireless', category: 'Audio', positiveCount: 420, negativeCount: 40, neutralCount: 80, total: 540 },
    'zenith-series-7': { name: 'Zenith Series 7 Watch', category: 'Wearables', positiveCount: 380, negativeCount: 90, neutralCount: 110, total: 580 },
    'aeroblade-g15': { name: 'AeroBlade G15 Laptop', category: 'Computers', positiveCount: 610, negativeCount: 110, neutralCount: 180, total: 900 },
    'ergovision-elite': { name: 'ErgoVision Elite Chair', category: 'Furniture', positiveCount: 190, negativeCount: 25, neutralCount: 45, total: 260 },
    'zenith-watch-s3': { name: 'Zenith Watch S3', category: 'Wearables', positiveCount: 110, negativeCount: 95, neutralCount: 85, total: 290 },
  };

  const currentProduct = productInfo[productId] || productInfo['aura-pro-max'];

  // Detailed mock review records
  const reviewsData = {
    'aura-pro-max': [
      {
        id: 1,
        author: 'Alexandra Vance',
        rating: 5,
        sentiment: 'Positive',
        date: 'June 28, 2026',
        text: 'The soundstage is extremely wide, and the active noise canceling is pristine. Best audio purchase I have made in years. Battery easily lasts 30+ hours on a single charge.',
        tags: ['Audio Quality', 'Active Noise Canceling', 'Battery Life'],
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: 2,
        author: 'David Chen',
        rating: 5,
        sentiment: 'Positive',
        date: 'June 25, 2026',
        text: 'Super ergonomic fit. The leather cushions feel high premium. Noise cancellation works wonders during flights. Recharges fully in under an hour.',
        tags: ['Ergonomics', 'ANC', 'Fast Charging'],
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: 3,
        author: 'Sarah Jenkins',
        rating: 2,
        sentiment: 'Negative',
        date: 'June 20, 2026',
        text: 'Sound quality is pretty decent, but the headband feels way too tight. After using it for an hour, I get a headache. Had to return them for comfort reasons.',
        tags: ['Fit & Comfort', 'Headband'],
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: 4,
        author: 'Marcus Aurelius',
        rating: 3,
        sentiment: 'Neutral',
        date: 'June 18, 2026',
        text: 'The aluminum structure is gorgeous, but it makes the headphones feel heavy after a full workday. Audio profile is slightly bass-heavy but otherwise fine.',
        tags: ['Weight', 'Bass Profile', 'Build Quality'],
        verified: false,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: 5,
        author: 'Emily Watson',
        rating: 4,
        sentiment: 'Positive',
        date: 'June 15, 2026',
        text: 'Excellent clarity in high frequencies. The case is a bit bulky, but the folding mechanism of the headphones is smart. Recommended for audiophiles.',
        tags: ['Audio Clarity', 'Case Design', 'Audiophile'],
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: 6,
        author: 'Liam O\'Connor',
        rating: 1,
        sentiment: 'Negative',
        date: 'June 10, 2026',
        text: 'Very disappointed. The left earcup started crackling after two weeks of normal use. The customer support was slow to respond. Defective unit.',
        tags: ['Defect', 'Customer Service'],
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
      }
    ],
    'sonicpro-x10': [
      {
        id: 1,
        author: 'Brian Miller',
        rating: 4,
        sentiment: 'Positive',
        date: 'June 27, 2026',
        text: 'Very light and great for running. They stay put in ears and have great water resistance.',
        tags: ['Sports', 'Fit', 'Waterproof'],
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: 2,
        author: 'Jessica Taylor',
        rating: 2,
        sentiment: 'Negative',
        date: 'June 22, 2026',
        text: 'Connection drops constantly when walking outdoors. Very annoying bluetooth pairing issues.',
        tags: ['Connectivity', 'Bluetooth'],
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
      }
    ]
  };

  const currentReviewsList = reviewsData[productId] || reviewsData['aura-pro-max'] || [];

  // Filter reviews
  const filteredReviews = currentReviewsList.filter((rev) => {
    const matchesSentiment = filterSentiment === 'All' || rev.sentiment === filterSentiment;
    const matchesSearch = rev.author.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          rev.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          rev.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSentiment && matchesSearch;
  });

  return (
    <div className="bg-background text-on-surface antialiased overflow-x-hidden min-h-screen relative">
      {/* Background Shader */}
      <BackgroundShader />

      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto">
        
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

        {/* Header Breadcrumbs */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <nav className="flex items-center gap-2 text-outline mb-2 text-xs">
              <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/dashboard')}>Dashboard</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary font-bold">Customer Reviews</span>
            </nav>
            <div className="flex items-center gap-3 flex-wrap">
  <h2 className="text-2xl md:text-3xl font-extrabold text-on-background font-display-lg leading-tight">
    Sentiment Analysis Feed
  </h2>
  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-[10px] font-extrabold uppercase tracking-wide border border-amber-300">Demo Data</span>
</div>
            <p className="text-xs text-on-surface-variant font-medium mt-1">
              Showing reviews for: <span className="text-primary font-bold">{currentProduct.name}</span>
            </p>
          </div>
          <div className="relative w-full md:w-96 group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-md border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline/60 text-sm shadow-sm"
              placeholder="Search reviewer name or feedback text..."
              type="text"
            />
          </div>
        </header>

        {/* Sentiment Filter Tabs */}
        <section className="mb-8">
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-surface-container-low/50 backdrop-blur-sm rounded-2xl w-fit border border-white/20">
            <button 
              onClick={() => setFilterSentiment('All')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                filterSentiment === 'All'
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-on-surface-variant hover:bg-white/50'
              }`}
            >
              All Reviews <span className="ml-1 opacity-70">{currentProduct.total}</span>
            </button>
            <button 
              onClick={() => setFilterSentiment('Positive')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                filterSentiment === 'Positive'
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-on-surface-variant hover:bg-white/50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
              Positive <span className="text-[10px] text-outline font-medium">{currentProduct.positiveCount}</span>
            </button>
            <button 
              onClick={() => setFilterSentiment('Negative')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                filterSentiment === 'Negative'
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-on-surface-variant hover:bg-white/50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-error"></span>
              Negative <span className="text-[10px] text-outline font-medium">{currentProduct.negativeCount}</span>
            </button>
            <button 
              onClick={() => setFilterSentiment('Neutral')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                filterSentiment === 'Neutral'
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-on-surface-variant hover:bg-white/50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
              Neutral <span className="text-[10px] text-outline font-medium">{currentProduct.neutralCount}</span>
            </button>
          </div>
        </section>

        {/* Reviews List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((rev) => (
              <div 
                key={rev.id} 
                className="glass-card rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start transition-all duration-300 hover:shadow-md bg-white/70"
              >
                {/* Author Avatar Column */}
                <div className="flex-shrink-0 relative">
                  <div className="w-14 h-14 rounded-full border-2 border-primary/20 overflow-hidden bg-surface-container">
                    <img className="w-full h-full object-cover" alt={rev.author} src={rev.avatar} />
                  </div>
                  {rev.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center border border-white">
                      <span className="material-symbols-outlined text-[10px] font-bold">verified</span>
                    </div>
                  )}
                </div>

                {/* Review Body */}
                <div className="flex-grow w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                    <div>
                      <h3 className="text-base text-on-surface font-extrabold">{rev.author}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex text-secondary-container">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span 
                              key={i} 
                              className={`material-symbols-outlined text-[16px] ${
                                i < rev.rating ? 'fill-current text-secondary-container' : 'text-outline-variant'
                              }`}
                            >
                              star
                            </span>
                          ))}
                        </div>
                        <span className="text-[10px] text-outline font-semibold">{rev.date}</span>
                      </div>
                    </div>
                    
                    {/* Sentiment Badge */}
                    <span className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                      rev.sentiment === 'Positive' 
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed' 
                        : rev.sentiment === 'Negative' 
                          ? 'bg-error-container text-on-error-container' 
                          : 'bg-surface-container text-on-surface-variant'
                    }`}>
                      {rev.sentiment}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed my-3">
                    "{rev.text}"
                  </p>

                  {/* Extract Keywords Badges */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {rev.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-2.5 py-1 bg-white/40 border border-outline-variant/30 rounded-lg text-[10px] font-bold text-on-surface-variant flex items-center gap-1 hover:border-primary/30 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 flex flex-col items-center justify-center text-center glass-card rounded-2xl bg-white/50">
              <span className="material-symbols-outlined text-4xl text-outline mb-3">chat_bubble_outline</span>
              <h3 className="text-lg font-bold text-on-surface">No Reviews Found</h3>
              <p className="text-xs text-on-surface-variant max-w-sm mt-1">
                No customer feedback matched "{searchQuery}" under the sentiment filter.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CustomerReviews;
