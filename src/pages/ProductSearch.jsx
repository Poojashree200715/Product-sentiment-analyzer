import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BackgroundShader from '../components/BackgroundShader';
import Sidebar from '../components/Sidebar';

const ProductSearch = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // States for search and filter logic
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [platform, setPlatform] = useState('Both');
  const [sortBy, setSortBy] = useState('Most Relevant');
  const [minRating, setMinRating] = useState(3.5);
  const [reviewsVolume, setReviewsVolume] = useState(5000);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setQuery(q);
    }
  }, [searchParams]);

  // Predefined Mock Products
  const mockProducts = [
    {
      id: 'aura-pro-max',
      name: 'Aura Pro Max Headphones',
      category: 'Audio',
      platform: 'Amazon',
      rating: 4.9,
      reviews: 15400,
      positive: 92,
      price: '$549.00',
      badge: '92% Positive',
      badgeType: 'positive',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5tPtIOv_d44L3LatNWu3gUA6Yaxg37NFWk_ThWlEpigRsnRsxmqTWX6gYFu6jUK6iQBR9B1dSIFqbsz1EUWGIcJRz_az088qKSEwZalf4J7rKq976aF5x7_FOlKPwmrNrFXaaWs9nmCFzEWx1zX_v2dByrDEq3mwPNjhREWT9mvRVFGWSkkPn0BYgZtBxxON-MyOdli1_g0FvDNScVHF4rtem6u6fv7128NNQiDJZTiP5rpptJbTPec56B9E8oCPQLZ1d8M47YlGH'
    },
    {
      id: 'sonicpro-x10',
      name: 'SonicPro X10 Wireless',
      category: 'Audio',
      platform: 'Amazon',
      rating: 4.0,
      reviews: 12400,
      positive: 94,
      price: '$249.00',
      badge: '94% Positive',
      badgeType: 'positive',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa3smV-_RVg0-YrYOTntN2aGzbJJZrTWzeX0wCMXxUf7V7tBI4ab74I0cncJ9CsOfKQc6dtJ_zNNThzUXvhWQjgdtg14J2k-8BUqnokF75PIy_Rzzuu59peg8GSw4C8e5Rbe7GRCB7ldC2Bmje4kERZcyVl5SRosRamtl13ORotW44AFVFAq00UXU73Typ2JUINCE40udcvYXsQjolcUUmNAaNHu508WDV00tMSYza8q-BdTwzQm3azgW23TirhbOeMv7aIcbKTKDa'
    },
    {
      id: 'zenith-series-7',
      name: 'Zenith Series 7 Watch',
      category: 'Wearables',
      platform: 'Flipkart',
      rating: 4.5,
      reviews: 8200,
      positive: 82,
      price: '$399.00',
      badge: '82% Positive',
      badgeType: 'positive',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCXm_Or6ezGnP8uxgft-50DunxadcIJNT2Z102J7G_g7aNYENshTV2BLrfenM3FDonjXjos-0FvAZuW_GVdamvZ26thyY-DBOAyXnJpWknPCBeq8fK0vOaWcEkCONgvOndxtZHu3A2hhD1rdkQYvOM70hJxJvtA2v255ek_g157833RitVOoJiXGy5-9wIGVuuez06_WKZintVgpEuWWwqfQICqnzQAFGWttxm2-xGejjdECf9o3xV-GyGBkpyTGY6OwJIW3MdkPw5'
    },
    {
      id: 'aeroblade-g15',
      name: 'AeroBlade G15 Laptop',
      category: 'Computers',
      platform: 'Flipkart',
      rating: 5.0,
      reviews: 2100,
      positive: 78,
      price: '$1499.00',
      badge: 'Trending Analysis',
      badgeType: 'trending',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8uOrQ2c2dRA0PPGP6uMoxHm6QqIHULlwxvOwYgalpoAjtRUkMz0NXTaZvbZJx-7cOcuj4-_Qu2FXg28VIdFJY0pqnDe1hv6WHQGq4rmp3UvI2KHwrzeQAIYiuN6ZE9RmtpsncAs2KSbYF0KBj08mAVL7yz8ziB5rcJC1InGAAciuNcroXf58oy3PCn7ALYzPaqOJxm_znjzNF0OT2-cyk_yoB6nu6JdD3h6HnooYVurxs98AAX5EiiUtN3MIPWbhUCH7R_gLvChXG'
    },
    {
      id: 'ergovision-elite',
      name: 'ErgoVision Elite Chair',
      category: 'Furniture',
      platform: 'Amazon',
      rating: 4.5,
      reviews: 1200,
      positive: 84,
      price: '$450.00',
      badge: '84% Positive',
      badgeType: 'positive',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmha91OAgremwH49jMH5T_VY0KROpgKO6DV503PotB0iaAHfyfDek2_lEw8LWxnnIgYawusSZO7Ck5CuEHXf-iG2ZxK9nnu9Vol3cu2Vgi__CcOxjPyJR2bUwEmQ2XqTaF4uyemvsvPFB0B0Xyd3kJ4tE9zxDOcCYU8vP_VXtXmz9pZgKliymaYQQCe7RCO9nXZcOop0o9jLg6w99Y-YctQZCqCyC5P4IQmus-9mPskbpL1MgKwMhcmRkvtt6fIENhynuy_RmI2MfI'
    },
    {
      id: 'zenith-watch-s3',
      name: 'Zenith Watch S3',
      category: 'Wearables',
      platform: 'Amazon',
      rating: 3.8,
      reviews: 9500,
      positive: 55,
      price: '$189.00',
      badge: 'Critical Alert',
      badgeType: 'alert',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBehG-G9L_eyvpnva_fJb8NLHWHhFL7LHnTPloTnzaBF1apUk5uHJsOo-pp69kDVwQCSX1DmPmBdcapO-Bm45u8stiVnbv3C6n2VKEpWSVMXMyaGI_Z6a-krufXftwSexaEU6oykTah7jFw1RwqnyXC3oNDfGPh6GY9YnP7dskEDqRGdGPAEXwd-H0rm1W-QxFGgYMXhSvHaqn8jsROhbDvFULOcHh1orXxYspiVDqtLye455rfymxHCMeP5qU1mswEDgNZd0unoZ1h'
    }
  ];

  // Perform filtering
  const filteredProducts = mockProducts.filter((product) => {
    // Search query check
    const matchesSearch = product.name.toLowerCase().includes(query.toLowerCase()) || 
                          product.category.toLowerCase().includes(query.toLowerCase());
    
    // Platform check
    const matchesPlatform = platform === 'Both' || product.platform === platform;

    // Rating check
    const matchesRating = product.rating >= minRating;

    // Reviews volume check
    const matchesReviews = product.reviews >= reviewsVolume;

    return matchesSearch && matchesPlatform && matchesRating && matchesReviews;
  });

  // Perform sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Highest Sentiment') {
      return b.positive - a.positive;
    }
    if (sortBy === 'Review Volume') {
      return b.reviews - a.reviews;
    }
    if (sortBy === 'Popularity') {
      return b.rating - a.rating;
    }
    return 0; // Most Relevant (default layout order)
  });

  const handleSearchClick = (e) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  return (
    <div className="bg-background text-on-surface antialiased overflow-x-hidden min-h-screen relative">
      {/* Background shader */}
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

        {/* Hero Search Section */}
        <section className="flex flex-col items-center justify-center text-center mb-12 mt-4">
          <h1 className="text-3xl md:text-5xl font-black mb-4 text-on-surface">Analyze Sentiment. Discover Truth.</h1>
          <p className="text-sm md:text-md text-on-surface-variant max-w-2xl mb-8">
            Advanced AI sentiment processing for Amazon and Flipkart products. Turn millions of customer reviews into actionable emotional insights.
          </p>

          <form onSubmit={handleSearchClick} className="w-full max-w-3xl glass-card rounded-2xl p-2 flex items-center shadow-lg bg-white/60">
            <div className="flex-grow flex items-center px-4">
              <span className="material-symbols-outlined text-primary text-2xl mr-3">psychology</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder:text-outline py-3 outline-none"
                placeholder="Search products by name or paste marketplace link..."
                type="text"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-md shadow-primary/20 hover:scale-98 transition-all group"
            >
              <span>Search Analyzer</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </form>
        </section>

        {/* Filters Section */}
        <section className="mb-10">
          <div className="flex flex-wrap items-center justify-between gap-6 glass-card p-6 rounded-2xl bg-white/70">
            <div className="flex flex-wrap gap-6 items-center">
              {/* Platform Selector */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-outline">Platform</span>
                <div className="flex bg-surface-container rounded-lg p-1 text-xs">
                  {['Both', 'Amazon', 'Flipkart'].map((plat) => (
                    <button
                      key={plat}
                      onClick={() => setPlatform(plat)}
                      className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                        platform === plat 
                          ? 'bg-white shadow-sm text-primary' 
                          : 'text-on-surface-variant hover:text-primary'
                      }`}
                    >
                      {plat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort selector */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-outline">Sort By</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-surface-container border-none rounded-lg text-xs font-semibold text-on-surface py-2 pl-3 pr-8 outline-none focus:ring-1 focus:ring-primary/20"
                >
                  <option>Most Relevant</option>
                  <option>Highest Sentiment</option>
                  <option>Popularity</option>
                  <option>Review Volume</option>
                </select>
              </div>

              {/* Rating Slider */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-outline">Min Rating</span>
                <div className="flex items-center gap-2 text-xs">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.5"
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                    className="accent-primary w-24 cursor-pointer"
                  />
                  <span className="font-bold text-on-surface">{minRating} ★+</span>
                </div>
              </div>

              {/* Reviews Slider */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-outline font-semibold">Min Reviews</span>
                <div className="flex items-center gap-2 text-xs">
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="500"
                    value={reviewsVolume}
                    onChange={(e) => setReviewsVolume(parseInt(e.target.value))}
                    className="accent-primary w-24 cursor-pointer"
                  />
                  <span className="font-bold text-on-surface">{(reviewsVolume / 1000).toFixed(1)}k+</span>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 text-primary font-bold text-xs hover:bg-primary/5 px-4 py-2 rounded-lg transition-all">
              <span className="material-symbols-outlined text-sm">tune</span>
              <span>Advanced Filters</span>
            </button>
          </div>
        </section>

        {/* Results Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((p) => (
              <div 
                key={p.id} 
                className="glass-card rounded-3xl overflow-hidden hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300 flex flex-col group bg-white/70"
              >
                <div className="h-56 relative overflow-hidden bg-surface-container">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={p.name} 
                    src={p.image} 
                  />
                  <div className={`absolute top-4 left-4 text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-lg ${
                    p.badgeType === 'alert' ? 'bg-error' : p.badgeType === 'trending' ? 'bg-secondary' : 'bg-primary'
                  }`}>
                    {p.badge}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md cursor-pointer hover:bg-white transition-colors">
                    <span className="material-symbols-outlined text-secondary text-sm fill-current">favorite</span>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="font-bold text-lg text-on-surface leading-snug group-hover:text-primary transition-colors">{p.name}</h3>
                      <span className="font-bold text-[9px] uppercase tracking-wider text-secondary bg-secondary/10 px-2 py-0.5 rounded-full shrink-0">
                        {p.platform}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span 
                          key={i} 
                          className={`material-symbols-outlined text-sm ${
                            i < Math.floor(p.rating) ? 'text-secondary-container fill-current' : 'text-outline-variant'
                          }`}
                        >
                          star
                        </span>
                      ))}
                      <span className="ml-2 text-[10px] font-semibold text-outline">({(p.reviews / 1000).toFixed(1)}k reviews)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/20">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-outline font-semibold">Mock Price</span>
                      <span className="font-extrabold text-lg text-on-surface">{p.price}</span>
                    </div>
                    <button 
                      onClick={() => navigate(`/reviews?id=${p.id}`)}
                      className="bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary p-3 rounded-xl transition-all shadow-sm hover:scale-95"
                    >
                      <span className="material-symbols-outlined">analytics</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-5xl text-outline mb-4">search_off</span>
              <h3 className="text-xl font-bold text-on-surface mb-2">No Products Found</h3>
              <p className="text-sm text-on-surface-variant max-w-md">
                We couldn't find any products matching "{query}". Try adjusting your filters or search keywords.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ProductSearch;
