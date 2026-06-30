import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BackgroundShader from '../components/BackgroundShader';
import Sidebar from '../components/Sidebar';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const ProductDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Sentiment');

  const productId = searchParams.get('id') || 'aura-pro-max';

  // Mock database of products
  const productsDb = {
    'aura-pro-max': {
      name: 'Aura Pro Max Headphones',
      brand: 'SentiPulse Audio',
      rating: 4.9,
      reviewsCount: 2458,
      price: '$549.00',
      tag: 'Enterprise Platform',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5tPtIOv_d44L3LatNWu3gUA6Yaxg37NFWk_ThWlEpigRsnRsxmqTWX6gYFu6jUK6iQBR9B1dSIFqbsz1EUWGIcJRz_az088qKSEwZalf4J7rKq976aF5x7_FOlKPwmrNrFXaaWs9nmCFzEWx1zX_v2dByrDEq3mwPNjhREWT9mvRVFGWSkkPn0BYgZtBxxON-MyOdli1_g0FvDNScVHF4rtem6u6fv7128NNQiDJZTiP5rpptJbTPec56B9E8oCPQLZ1d8M47YlGH',
      posRatio: 92,
      negRatio: 3,
      neuRatio: 5,
      posPoints: [
        'Active Noise Cancellation is described as pristine and room-quieting.',
        'Extremely wide soundstage with clear highs and rich details.',
        'Ergonomic ear cushions made from premium memory foam.'
      ],
      negPoints: [
        'Headband clamp force is slightly tight for users with larger hat sizes.',
        'Aluminum metal structure makes the headset feel heavy during 6+ hour sessions.'
      ],
      monthlySentiment: [
        { name: 'Jan', positive: 88, negative: 4 },
        { name: 'Feb', positive: 89, negative: 3 },
        { name: 'Mar', positive: 92, negative: 3 },
        { name: 'Apr', positive: 91, negative: 4 },
        { name: 'May', positive: 93, negative: 2 },
        { name: 'Jun', positive: 92, negative: 3 }
      ]
    },
    'sonicpro-x10': {
      name: 'SonicPro X10 Wireless',
      brand: 'Sonic Labs',
      rating: 4.0,
      reviewsCount: 12400,
      price: '$249.00',
      tag: 'Sports Segment',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa3smV-_RVg0-YrYOTntN2aGzbJJZrTWzeX0wCMXxUf7V7tBI4ab74I0cncJ9CsOfKQc6dtJ_zNNThzUXvhWQjgdtg14J2k-8BUqnokF75PIy_Rzzuu59peg8GSw4C8e5Rbe7GRCB7ldC2Bmje4kERZcyVl5SRosRamtl13ORotW44AFVFAq00UXU73Typ2JUINCE40udcvYXsQjolcUUmNAaNHu508WDV00tMSYza8q-BdTwzQm3azgW23TirhbOeMv7aIcbKTKDa',
      posRatio: 94,
      negRatio: 4,
      neuRatio: 2,
      posPoints: [
        'Waterproof casing holds up perfectly in heavy rain.',
        'Ear-hook design ensures they do not fall out when running.'
      ],
      negPoints: [
        'Frequent bluetooth connection drops in crowded urban areas.'
      ],
      monthlySentiment: [
        { name: 'Jan', positive: 90, negative: 6 },
        { name: 'Feb', positive: 92, negative: 5 },
        { name: 'Mar', positive: 94, negative: 4 },
        { name: 'Apr', positive: 93, negative: 5 },
        { name: 'May', positive: 95, negative: 3 },
        { name: 'Jun', positive: 94, negative: 4 }
      ]
    }
  };

  const product = productsDb[productId] || productsDb['aura-pro-max'];

  const pieData = [
    { name: 'Positive', value: product.posRatio, color: '#006e4b' },
    { name: 'Neutral', value: product.neuRatio, color: '#777587' },
    { name: 'Negative', value: product.negRatio, color: '#ba1a1a' }
  ];

  return (
    <div className="bg-background text-on-surface antialiased overflow-x-hidden min-h-screen relative">
      {/* Background Shader */}
      <BackgroundShader />

      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Canvas */}
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

        {/* TopBar Replacement Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface font-display-lg">Product Intelligence</h2>
            <p className="text-xs text-on-surface-variant font-medium mt-1">Real-time sentiment mapping for Enterprise SaaS</p>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-on-surface-variant">home</span>
            </button>
          </div>
        </header>

        {/* Hero Section: Glass Product Card */}
        <section className="mb-12">
          <div className="glass-card rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row gap-12 relative overflow-hidden bg-white/70 shadow-sm border border-white/40">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            
            {/* Product Image */}
            <div className="w-full md:w-1/3 shrink-0">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white/50 bg-white">
                <img className="w-full h-full object-cover" alt={product.name} src={product.image} />
              </div>
            </div>

            {/* Info details */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-semibold">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider">
                  {product.tag}
                </span>
                <div className="flex items-center text-secondary gap-1">
                  <span className="material-symbols-outlined text-sm fill-current text-secondary-container">star</span>
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-on-surface-variant font-normal">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h3 className="text-2xl md:text-4xl font-extrabold text-on-surface mb-2 font-display-lg leading-tight">
                {product.name}
              </h3>
              <p className="text-sm font-semibold text-primary mb-6 uppercase tracking-wider">{product.brand}</p>
              
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-3xl font-black text-on-surface">{product.price}</span>
                <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">/ Marketplace Value</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate(`/reviews?id=${productId}`)}
                  className="px-6 py-3.5 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-2xl shadow-lg hover:shadow-primary/30 hover:scale-98 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">analytics</span>
                  Analyze Reviews
                </button>
                <button 
                  onClick={() => navigate('/search')}
                  className="px-6 py-3.5 bg-white/80 border border-primary/20 text-primary font-bold rounded-2xl shadow-sm hover:bg-primary/5 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">compare</span>
                  Marketplace Search
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <section className="mb-8">
          <div className="flex border-b border-outline-variant/30 gap-8 text-sm font-bold">
            {['Overview', 'Reviews', 'Sentiment', 'Statistics'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  if (tab === 'Reviews') {
                    navigate(`/reviews?id=${productId}`);
                  } else {
                    setActiveTab(tab);
                  }
                }}
                className={`pb-4 transition-all relative ${
                  activeTab === tab 
                    ? 'text-primary' 
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-full"></span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Tab Contents: Sentiment Tab */}
        {activeTab === 'Sentiment' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-10">
            {/* Donut Chart details */}
            <div className="lg:col-span-5 glass-card p-6 rounded-3xl bg-white/70 shadow-sm flex flex-col justify-between min-h-[300px]">
              <div>
                <h4 className="text-sm uppercase tracking-widest text-on-surface-variant font-extrabold mb-4">Sentiment Breakdown</h4>
                <div className="w-full h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs mt-4 pt-4 border-t border-white/20">
                <div>
                  <span className="block font-bold text-green-700">{product.posRatio}%</span>
                  <span className="text-[10px] text-outline font-semibold">Positive</span>
                </div>
                <div>
                  <span className="block font-bold text-outline">{product.neuRatio}%</span>
                  <span className="text-[10px] text-outline font-semibold">Neutral</span>
                </div>
                <div>
                  <span className="block font-bold text-error">{product.negRatio}%</span>
                  <span className="text-[10px] text-outline font-semibold">Negative</span>
                </div>
              </div>
            </div>

            {/* Bullet Highlights */}
            <div className="lg:col-span-7 space-y-6">
              {/* Positive Triggers */}
              <div className="glass-card p-6 rounded-3xl bg-white/70 shadow-sm">
                <h4 className="text-sm font-bold text-green-700 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg fill-current">sentiment_satisfied</span>
                  Key Customer Praises
                </h4>
                <ul className="space-y-3 text-xs md:text-sm text-on-surface-variant font-medium list-disc pl-5">
                  {product.posPoints.map((pt, idx) => (
                    <li key={idx} className="leading-relaxed">{pt}</li>
                  ))}
                </ul>
              </div>

              {/* Negative Triggers */}
              <div className="glass-card p-6 rounded-3xl bg-white/70 shadow-sm">
                <h4 className="text-sm font-bold text-error mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg fill-current">sentiment_dissatisfied</span>
                  Key Customer Complaints
                </h4>
                <ul className="space-y-3 text-xs md:text-sm text-on-surface-variant font-medium list-disc pl-5">
                  {product.negPoints.map((pt, idx) => (
                    <li key={idx} className="leading-relaxed">{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab Contents: Overview Tab */}
        {activeTab === 'Overview' && (
          <div className="glass-card p-8 rounded-3xl bg-white/70 shadow-sm mb-10 space-y-6">
            <h4 className="text-lg font-bold font-headline-md">Product Summary</h4>
            <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed font-medium">
              This product is classified as a top-tier asset under the **{product.category}** vertical. With an outstanding rating of **{product.rating} ★**, the customer satisfaction rate is highly stable. The primary driver of satisfaction is the engineering build and audio clarity, with slight friction regarding fitting adjustments.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs font-semibold">
              <div className="p-4 bg-white/40 border border-white/40 rounded-xl">
                <span className="block text-outline text-[10px] mb-1">AUDIT RATING</span>
                <span className="text-lg font-bold text-primary">{product.rating} ★</span>
              </div>
              <div className="p-4 bg-white/40 border border-white/40 rounded-xl">
                <span className="block text-outline text-[10px] mb-1">TOTAL AUDITED</span>
                <span className="text-lg font-bold text-primary">{product.reviewsCount}</span>
              </div>
              <div className="p-4 bg-white/40 border border-white/40 rounded-xl">
                <span className="block text-outline text-[10px] mb-1">SATISFACTION INDEX</span>
                <span className="text-lg font-bold text-green-700">Excellent</span>
              </div>
              <div className="p-4 bg-white/40 border border-white/40 rounded-xl">
                <span className="block text-outline text-[10px] mb-1">MARKET SENTIMENT</span>
                <span className="text-lg font-bold text-primary">Bullish</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Contents: Statistics Tab */}
        {activeTab === 'Statistics' && (
          <div className="glass-card p-6 rounded-3xl bg-white/70 shadow-sm mb-10">
            <h4 className="text-sm uppercase tracking-widest text-on-surface-variant font-extrabold mb-6">Historical Sentiment Index (6 Months)</h4>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={product.monthlySentiment} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5eeff" />
                  <XAxis dataKey="name" fontSize={10} tickLine={false} />
                  <YAxis fontSize={10} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="positive" fill="#006e4b" radius={[4, 4, 0, 0]} name="Positive %" />
                  <Bar dataKey="negative" fill="#ba1a1a" radius={[4, 4, 0, 0]} name="Negative %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductDetails;
