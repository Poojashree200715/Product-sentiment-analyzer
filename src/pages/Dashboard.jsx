import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  AreaChart, Area, XAxis, YAxis, CartesianGrid
} from 'recharts';
import BackgroundShader from '../components/BackgroundShader';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Recharts Data
  const pieData = [
    { name: 'Positive', value: 68, color: '#006e4b' }, // Emerald
    { name: 'Neutral', value: 20, color: '#777587' },   // Outline/Gray
    { name: 'Negative', value: 12, color: '#ba1a1a' },  // Error/Red
  ];

  const growthData = [
    { name: 'Week 1', volume: 100 },
    { name: 'Week 2', volume: 180 },
    { name: 'Week 3', volume: 140 },
    { name: 'Week 4', volume: 290 },
    { name: 'Week 5', volume: 220 },
    { name: 'Week 6', volume: 420 },
  ];

  const products = [
    {
      id: 'aura-pro-max',
      name: 'Aura Pro Max',
      category: 'Audio',
      platform: 'Amazon Global',
      platformColor: 'bg-secondary-container',
      rating: 4.9,
      positive: 92,
      negative: 3,
      status: 'Growth Peak',
      statusClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5tPtIOv_d44L3LatNWu3gUA6Yaxg37NFWk_ThWlEpigRsnRsxmqTWX6gYFu6jUK6iQBR9B1dSIFqbsz1EUWGIcJRz_az088qKSEwZalf4J7rKq976aF5x7_FOlKPwmrNrFXaaWs9nmCFzEWx1zX_v2dByrDEq3mwPNjhREWT9mvRVFGWSkkPn0BYgZtBxxON-MyOdli1_g0FvDNScVHF4rtem6u6fv7128NNQiDJZTiP5rpptJbTPec56B9E8oCPQLZ1d8M47YlGH'
    },
    {
      id: 'ergovision-elite',
      name: 'ErgoVision Elite',
      category: 'Furniture',
      platform: 'Best Buy',
      platformColor: 'bg-primary',
      rating: 4.5,
      positive: 84,
      negative: 8,
      status: 'Steady',
      statusClass: 'bg-surface-container text-on-surface-variant',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmha91OAgremwH49jMH5T_VY0KROpgKO6DV503PotB0iaAHfyfDek2_lEw8LWxnnIgYawusSZO7Ck5CuEHXf-iG2ZxK9nnu9Vol3cu2Vgi__CcOxjPyJR2bUwEmQ2XqTaF4uyemvsvPFB0B0Xyd3kJ4tE9zxDOcCYU8vP_VXtXmz9pZgKliymaYQQCe7RCO9nXZcOop0o9jLg6w99Y-YctQZCqCyC5P4IQmus-9mPskbpL1MgKwMhcmRkvtt6fIENhynuy_RmI2MfI'
    },
    {
      id: 'zenith-watch-s3',
      name: 'Zenith Watch S3',
      category: 'Wearables',
      platform: 'Target Labs',
      platformColor: 'bg-tertiary-container',
      rating: 3.8,
      positive: 55,
      negative: 32,
      status: 'Critical Alert',
      statusClass: 'bg-error-container text-on-error-container',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBehG-G9L_eyvpnva_fJb8NLHWHhFL7LHnTPloTnzaBF1apUk5uHJsOo-pp69kDVwQCSX1DmPmBdcapO-Bm45u8stiVnbv3C6n2VKEpWSVMXMyaGI_Z6a-krufXftwSexaEU6oykTah7jFw1RwqnyXC3oNDfGPh6GY9YnP7dskEDqRGdGPAEXwd-H0rm1W-QxFGgYMXhSvHaqn8jsROhbDvFULOcHh1orXxYspiVDqtLye455rfymxHCMeP5qU1mswEDgNZd0unoZ1h'
    }
  ];

  const logEntries = [
    { title: 'Sentiment Audit: Aura Pro Max', sub: 'Amazon Scraper Engine - Batch #2847', time: 'Just Now', status: 'Success', color: 'text-tertiary-container' },
    { title: 'New Competitor Index Synced', sub: 'Competitor Feed Hook - Soundcore Q30', time: '14 min ago', status: 'Updated', color: 'text-secondary-container' },
    { title: 'API Webhook Ping', sub: 'Shopify Live Review Listener', time: '1 hr ago', status: 'Active', color: 'text-primary' },
  ];

  return (
    <div className="bg-background text-on-surface antialiased overflow-x-hidden min-h-screen relative">
      {/* Background Shader */}
      <BackgroundShader />

      {/* Sidebar Navigation */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Layout Area */}
      <main className="md:ml-64 p-margin-mobile md:p-margin-desktop min-h-screen">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pt-16 md:pt-0">
          <div>
            <div className="flex items-center gap-2 md:hidden mb-2">
              <button 
                onClick={() => setIsMobileOpen(true)}
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-on-surface"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <span className="font-extrabold text-primary text-xl">SentientAI</span>
            </div>
            <h2 className="font-display-lg text-display-lg text-on-background text-3xl md:text-4xl font-bold">Sentiment Dashboard</h2>
            <p className="text-on-surface-variant font-body-md text-body-md mt-1">Real-time emotional intelligence for your product ecosystem.</p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="glass-card px-4 py-2 rounded-full flex items-center gap-3 border border-outline-variant/30">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
              <span className="text-label-md font-label-md text-on-surface-variant text-xs font-semibold">Live Analysis: Active</span>
            </div>
            <button className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm">
              <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-gutter mb-10">
          {/* Total Products */}
          <div className="glass-card p-6 rounded-2xl shadow-sm transition-all hover:translate-y-[-4px] bg-white/70">
            <p className="text-xs font-semibold text-on-surface-variant mb-2">Total Products</p>
            <h3 className="text-3xl font-bold text-primary">1,284</h3>
            <div className="mt-4 flex items-center gap-1 text-[10px] text-green-700 font-bold">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              +12% vs LY
            </div>
          </div>
          {/* Reviews Collected */}
          <div className="glass-card p-6 rounded-2xl shadow-sm transition-all hover:translate-y-[-4px] bg-white/70">
            <p className="text-xs font-semibold text-on-surface-variant mb-2">Reviews</p>
            <h3 className="text-3xl font-bold text-on-background">42.5k</h3>
            <div className="mt-5 h-1 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-3/4"></div>
            </div>
          </div>
          {/* Positive Reviews */}
          <div className="glass-card p-6 rounded-2xl shadow-sm transition-all hover:translate-y-[-4px] bg-white/70">
            <p className="text-xs font-semibold text-on-surface-variant mb-2">Positive</p>
            <h3 className="text-3xl font-bold text-green-700">68%</h3>
            <div className="mt-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-green-700 text-lg">sentiment_satisfied</span>
              <span className="text-[10px] font-medium text-outline">Up 4.2%</span>
            </div>
          </div>
          {/* Negative Reviews */}
          <div className="glass-card p-6 rounded-2xl shadow-sm transition-all hover:translate-y-[-4px] bg-white/70">
            <p className="text-xs font-semibold text-on-surface-variant mb-2">Negative</p>
            <h3 className="text-3xl font-bold text-error">12%</h3>
            <div className="mt-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-error text-lg">sentiment_dissatisfied</span>
              <span className="text-[10px] font-medium text-outline">Down 2%</span>
            </div>
          </div>
          {/* Neutral Reviews */}
          <div className="glass-card p-6 rounded-2xl shadow-sm transition-all hover:translate-y-[-4px] bg-white/70">
            <p className="text-xs font-semibold text-on-surface-variant mb-2">Neutral</p>
            <h3 className="text-3xl font-bold text-outline">20%</h3>
            <div className="mt-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-outline text-lg">sentiment_neutral</span>
              <span className="text-[10px] font-medium text-outline">Stable</span>
            </div>
          </div>
          {/* Processing Status */}
          <div className="glass-card p-6 rounded-2xl shadow-sm bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold text-primary mb-2">Engine Status</p>
            <h3 className="text-lg font-extrabold text-primary leading-tight">Optimized</h3>
            <p className="text-[10px] text-primary/60 mt-2 font-mono uppercase font-bold">99.8% Latency</p>
          </div>
        </div>

        {/* Charts Grid (2x2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter mb-10">
          {/* Sentiment Distribution Pie Chart */}
          <div className="glass-card p-8 rounded-3xl min-h-[340px] flex flex-col justify-between bg-white/70">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-bold font-headline-md">Sentiment Distribution</h4>
                <p className="text-xs text-on-surface-variant">Cumulative across all channels</p>
              </div>
              <button className="material-symbols-outlined text-outline hover:text-primary transition-colors">more_vert</button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-around flex-1 gap-6">
              {/* Donut PieChart */}
              <div className="w-40 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
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
              <div className="space-y-4">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                    <span className="text-sm font-semibold text-on-surface-variant">
                      {entry.name} ({entry.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sentiment Trend Area Chart */}
          <div className="glass-card p-8 rounded-3xl min-h-[340px] flex flex-col bg-white/70">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-lg font-bold font-headline-md">Sentiment Trend</h4>
                <p className="text-xs text-on-surface-variant">Volume of processed data</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold">Week</span>
                <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-[10px]">Month</span>
              </div>
            </div>
            <div className="flex-1 w-full h-44">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3525cd" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3525cd" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#777587" fontSize={10} tickLine={false} />
                  <YAxis stroke="#777587" fontSize={10} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="volume" stroke="#3525cd" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Platform Rating Comparison */}
          <div className="glass-card p-8 rounded-3xl min-h-[340px] flex flex-col bg-white/70">
            <div className="mb-8">
              <h4 className="text-lg font-bold font-headline-md">Platform Comparison</h4>
              <p className="text-xs text-on-surface-variant font-medium">Ratings across main marketplaces</p>
            </div>
            <div className="flex-1 space-y-6">
              {[
                { name: 'Amazon FBA', rating: '4.8', width: 'w-[92%]', color: 'bg-secondary-container' },
                { name: 'Best Buy', rating: '4.2', width: 'w-[78%]', color: 'bg-primary' },
                { name: 'Walmart.com', rating: '3.9', width: 'w-[65%]', color: 'bg-outline' },
              ].map((p, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span>{p.name}</span>
                    <span className="font-bold">{p.rating} ★</span>
                  </div>
                  <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className={`h-full ${p.color} ${p.width} rounded-full`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Growing Columns (Animated Trend) */}
          <div className="glass-card p-8 rounded-3xl min-h-[340px] flex flex-col bg-white/70">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h4 className="text-lg font-bold font-headline-md">Interactive Sentiment Sparklines</h4>
                <p className="text-xs text-on-surface-variant font-medium">Hover to inspect daily load metrics</p>
              </div>
            </div>
            <div className="flex-1 w-full flex items-end gap-2 pb-2 h-44">
              <div className="flex-1 bg-primary/20 h-[30%] rounded-t-lg transition-all duration-300 hover:h-[50%] cursor-pointer"></div>
              <div className="flex-1 bg-primary/30 h-[45%] rounded-t-lg transition-all duration-300 hover:h-[70%] cursor-pointer"></div>
              <div className="flex-1 bg-primary/20 h-[35%] rounded-t-lg transition-all duration-300 hover:h-[60%] cursor-pointer"></div>
              <div className="flex-1 bg-primary/40 h-[60%] rounded-t-lg transition-all duration-300 hover:h-[80%] cursor-pointer"></div>
              <div className="flex-1 bg-primary/50 h-[80%] rounded-t-lg transition-all duration-300 hover:h-[95%] cursor-pointer"></div>
              <div className="flex-1 bg-primary/40 h-[70%] rounded-t-lg transition-all duration-300 hover:h-[90%] cursor-pointer"></div>
              <div className="flex-1 bg-primary/60 h-[90%] rounded-t-lg transition-all duration-300 hover:h-[100%] cursor-pointer shadow-[0_-5px_15px_rgba(53,37,205,0.2)]"></div>
            </div>
          </div>
        </div>

        {/* Top Performing Products Table (Bento Style) */}
        <div className="glass-card rounded-3xl overflow-hidden shadow-xl mb-10 bg-white/70">
          <div className="p-8 border-b border-white/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/30">
            <div>
              <h4 className="text-lg font-bold font-headline-md">Top Performing Products</h4>
              <p className="text-xs text-on-surface-variant">Sorted by highest positive sentiment index</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 glass-card rounded-lg text-xs font-bold hover:bg-white transition-all bg-white/40">
                Export CSV
              </button>
              <button 
                onClick={() => navigate('/search')}
                className="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-bold shadow-lg shadow-primary/20 hover:scale-98 transition-all"
              >
                Analyze New
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="bg-surface-container-low/50 text-on-surface-variant text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-4">Product</th>
                  <th className="px-8 py-4">Platform</th>
                  <th className="px-8 py-4">Rating</th>
                  <th className="px-8 py-4 text-center">Positive %</th>
                  <th className="px-8 py-4 text-center">Negative %</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20">
                {products.map((p) => (
                  <tr 
                    key={p.id} 
                    onClick={() => navigate(`/reviews?id=${p.id}`)}
                    className="hover:bg-white/40 transition-colors cursor-pointer group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-container overflow-hidden border border-white/40">
                          <img className="w-full h-full object-cover" alt={p.name} src={p.image} />
                        </div>
                        <div>
                          <span className="block font-bold text-on-background group-hover:text-primary transition-colors">{p.name}</span>
                          <span className="text-[10px] text-outline">Category: {p.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${p.platformColor}`}></span>
                        <span className="text-xs font-semibold text-on-surface">{p.platform}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-1 text-secondary font-bold text-sm">
                        <span>{p.rating}</span>
                        <span className="material-symbols-outlined text-xs fill-current">star</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-center font-bold text-green-700">{p.positive}%</div>
                    </td>
                    <td className="px-8 py-5 text-center text-outline font-semibold">{p.negative}%</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${p.statusClass}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity & Search (Asymmetric Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Recent Activity / Processing Log */}
          <div className="glass-card p-6 rounded-3xl lg:col-span-2 bg-white/70">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-bold font-headline-md">Processing Log</h4>
              <span className="text-xs font-bold text-primary cursor-pointer hover:underline">View All</span>
            </div>
            <div className="space-y-4">
              {logEntries.map((log, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/35 rounded-xl border border-white/40 gap-2">
                  <div>
                    <span className="block font-bold text-sm text-on-background">{log.title}</span>
                    <span className="text-[10px] text-outline font-medium">{log.sub}</span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className="text-[10px] text-outline font-bold">{log.time}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${log.color}`}>
                      ● {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Real-Time Analyzer Card */}
          <div className="glass-card p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 flex flex-col justify-between min-h-[250px]">
            <div>
              <h4 className="text-lg font-extrabold text-primary font-headline-md mb-2">Instant Review Test</h4>
              <p className="text-xs text-on-surface-variant font-medium">
                Want to quickly test a customer review? Paste it here to run it through our sentient NLP classifier.
              </p>
            </div>
            <button
              onClick={() => navigate('/analyzer')}
              className="w-full mt-6 py-3 bg-primary text-white rounded-xl font-bold hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-98 flex items-center justify-center gap-2"
            >
              Open Instant Analyzer
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
