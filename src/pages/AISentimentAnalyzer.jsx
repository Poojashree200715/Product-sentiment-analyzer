import React, { useState } from 'react';
import BackgroundShader from '../components/BackgroundShader';
import Sidebar from '../components/Sidebar';

const AISentimentAnalyzer = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [inputText, setInputText] = useState(
    "This device is incredible! The battery life is amazing and it feels very fast. However, the screen brightness could be better in direct sunlight, and the shipping was slightly delayed."
  );
  
  // Results states
  const [analyzed, setAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  // Simple mock NLP processing logic
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setAnalyzed(false);

    setTimeout(() => {
      const text = inputText.toLowerCase();
      
      // Keywords definition
      const positiveWords = ['incredible', 'amazing', 'fast', 'good', 'excellent', 'great', 'love', 'perfect', 'best'];
      const negativeWords = ['delayed', 'worse', 'bad', 'slow', 'brightness', 'bulky', 'heavy', 'tight', 'headache', 'disappointed', 'defect', 'delayed', 'limited'];
      
      let posCount = 0;
      let negCount = 0;
      
      const words = inputText.split(/\s+/);
      
      // Basic count
      words.forEach(w => {
        const cleaned = w.toLowerCase().replace(/[^a-z]/g, '');
        if (positiveWords.includes(cleaned)) posCount++;
        if (negativeWords.includes(cleaned)) negCount++;
      });

      // Calculate ratios
      const totalKeywords = posCount + negCount;
      let positivePercent = 50;
      let negativePercent = 20;
      let neutralPercent = 30;

      if (totalKeywords > 0) {
        positivePercent = Math.round((posCount / totalKeywords) * 85);
        negativePercent = Math.round((negCount / totalKeywords) * 85);
        if (positivePercent + negativePercent > 100) {
          const diff = (positivePercent + negativePercent) - 100;
          positivePercent -= diff;
        }
        neutralPercent = 100 - positivePercent - negativePercent;
      } else {
        // default based on text length
        positivePercent = 60;
        negativePercent = 15;
        neutralPercent = 25;
      }

      // Detect sentiment type
      let sentiment = 'Neutral';
      if (positivePercent > negativePercent && positivePercent > neutralPercent) {
        sentiment = 'Positive';
      } else if (negativePercent > positivePercent && negativePercent > neutralPercent) {
        sentiment = 'Negative';
      }

      // Highlights construction
      const highlightedWords = words.map((w, i) => {
        const cleaned = w.toLowerCase().replace(/[^a-z]/g, '');
        let type = 'none';
        if (positiveWords.includes(cleaned)) type = 'positive';
        else if (negativeWords.includes(cleaned)) type = 'negative';
        
        return { text: w, type, key: i };
      });

      // Determine topics
      const topics = [];
      if (text.includes('battery') || text.includes('charge') || text.includes('power')) topics.push('Battery Life');
      if (text.includes('screen') || text.includes('display') || text.includes('brightness')) topics.push('Display Quality');
      if (text.includes('fast') || text.includes('speed') || text.includes('performance')) topics.push('Performance');
      if (text.includes('ship') || text.includes('delivery') || text.includes('delayed')) topics.push('Logistics');
      if (text.includes('comfortable') || text.includes('heavy') || text.includes('fit')) topics.push('Ergonomics');
      if (topics.length === 0) topics.push('General Sentiment');

      setResults({
        sentiment,
        positivePercent,
        negativePercent,
        neutralPercent,
        confidence: Math.round(75 + Math.random() * 20),
        topics,
        highlightedWords
      });

      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 1200); // simulation delay
  };

  return (
    <div className="bg-background text-on-surface antialiased overflow-x-hidden min-h-screen relative">
      {/* Background Shader */}
      <BackgroundShader />

      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen p-margin-mobile md:p-margin-desktop">
        {/* Mobile header */}
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
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <nav className="flex gap-2 text-on-surface-variant mb-2 text-xs">
              <span className="font-semibold text-outline">Product</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-bold text-primary">Sentiment Analyzer</span>
            </nav>
            <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface font-display-lg leading-tight">
              AI Sentiment Analyzer
            </h1>
            <p className="text-xs text-on-surface-variant font-medium mt-1">
              Test and trace real-time emotional highlights inside product reviews.
            </p>
          </div>
        </header>

        {/* Confidence Meter & Stats Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-8">
          
          {/* Circular Confidence Meter */}
          <div className="md:col-span-4 glass-card rounded-[2rem] p-8 flex flex-col justify-between bg-white/70 shadow-sm">
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-on-surface-variant font-extrabold mb-6">NLP Model State</h3>
              <div className="relative w-40 h-40 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle className="text-surface-container-highest" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                  <circle 
                    className="transition-all duration-1000 text-primary" 
                    cx="50" 
                    cy="50" 
                    fill="transparent" 
                    r="40" 
                    stroke="currentColor" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 - (251.2 * (analyzed ? results.confidence : 88)) / 100} 
                    strokeLinecap="round" 
                    strokeWidth="8"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-primary">{analyzed ? `${results.confidence}%` : '88%'}</span>
                  <span className="text-[9px] text-on-surface-variant uppercase tracking-wider font-bold">Confidence</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant text-center mt-6 font-medium">
              Based on LLaMA-3 fine-tuned sentiment models with high context awareness.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-gutter">
            <div className="glass-card rounded-[2rem] p-8 bg-white/70 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary mb-4">
                <span className="material-symbols-outlined">reviews</span>
              </div>
              <p className="text-on-surface-variant text-[10px] font-extrabold uppercase tracking-widest mb-1">Total API Audits</p>
              <h2 className="text-3xl font-extrabold text-on-surface">12,482</h2>
              <div className="flex items-center gap-1 text-green-700 font-bold mt-2 text-xs">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>+12% this week</span>
              </div>
            </div>
            <div className="glass-card rounded-[2rem] p-8 bg-white/70 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined">star_rate</span>
              </div>
              <p className="text-on-surface-variant text-[10px] font-extrabold uppercase tracking-widest mb-1">Avg Score</p>
              <h2 className="text-3xl font-extrabold text-on-surface">4.7</h2>
              <div className="flex gap-0.5 text-secondary-container mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[16px] fill-current">star</span>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-[2rem] p-8 bg-white/70 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-150 flex items-center justify-center text-green-700 mb-4 bg-green-100">
                <span className="material-symbols-outlined">memory</span>
              </div>
              <p className="text-on-surface-variant text-[10px] font-extrabold uppercase tracking-widest mb-1">Processing Latency</p>
              <h2 className="text-3xl font-extrabold text-on-surface">45ms</h2>
              <div className="text-[10px] text-outline font-bold mt-2 uppercase tracking-wide">
                100% Server Uptime
              </div>
            </div>
          </div>
        </section>

        {/* Analyzer Tool Work Area */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-10">
          
          {/* Input Panel */}
          <div className="lg:col-span-7 glass-card p-6 rounded-3xl bg-white/70 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-base font-bold text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">description</span>
                Review Text Editor
              </h3>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-56 p-4 rounded-xl border border-outline-variant/30 bg-white/50 text-xs md:text-sm text-on-surface placeholder:text-outline/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none shadow-inner leading-relaxed"
                placeholder="Paste customer review here..."
              />
            </div>
            <div className="flex justify-between items-center mt-6">
              <button 
                onClick={() => setInputText('')}
                className="text-xs font-bold text-outline hover:text-primary transition-colors"
              >
                Clear text
              </button>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !inputText.trim()}
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-md shadow-primary/20 hover:scale-98 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <span className="animate-spin material-symbols-outlined text-sm">sync</span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    Run Sentiment Analysis
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-5 glass-card p-6 rounded-3xl bg-white/70 shadow-sm flex flex-col">
            <h3 className="text-base font-bold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">query_stats</span>
              Analysis Predictions
            </h3>

            {analyzed ? (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Top sentiment prediction */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs text-outline font-semibold">Predicted Sentiment:</span>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                      results.sentiment === 'Positive' 
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed' 
                        : results.sentiment === 'Negative' 
                          ? 'bg-error-container text-on-error-container' 
                          : 'bg-surface-container text-on-surface-variant'
                    }`}>
                      {results.sentiment}
                    </span>
                  </div>

                  {/* Percentage bars */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>Positive Sentiment Ratio</span>
                        <span className="font-bold text-green-700">{results.positivePercent}%</span>
                      </div>
                      <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: `${results.positivePercent}%` }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>Negative Sentiment Ratio</span>
                        <span className="font-bold text-error">{results.negativePercent}%</span>
                      </div>
                      <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-error rounded-full" style={{ width: `${results.negativePercent}%` }}></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>Neutral Ratio</span>
                        <span className="font-bold text-outline">{results.neutralPercent}%</span>
                      </div>
                      <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-outline rounded-full" style={{ width: `${results.neutralPercent}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Topics Extracted */}
                <div className="mt-6 pt-6 border-t border-white/20">
                  <span className="block text-[10px] uppercase font-bold text-outline mb-2">Thematic Categories</span>
                  <div className="flex flex-wrap gap-2">
                    {results.topics.map((top, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                        {top}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center py-10">
                <span className="material-symbols-outlined text-4xl text-outline mb-3">neurology</span>
                <p className="text-xs text-on-surface-variant font-medium max-w-[200px]">
                  Write review text and run the analyzer to trace emotional results.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Text Tracing Highlights (Word Level Highlighter) */}
        {analyzed && (
          <section className="glass-card p-6 rounded-3xl bg-white/70 shadow-sm mb-10">
            <h3 className="text-base font-bold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">palette</span>
              Sentiment Highlight Tracing
            </h3>
            <p className="text-xs text-on-surface-variant mb-6 font-medium">
              Hover over colored words to trace the classified triggers inside the context. Green words trigger positive weights, red words trigger negative weights.
            </p>
            <div className="p-6 bg-white/40 border border-white/40 rounded-2xl text-xs md:text-sm text-on-surface leading-loose font-medium">
              {results.highlightedWords.map((word) => {
                if (word.type === 'positive') {
                  return (
                    <span 
                      key={word.key} 
                      className="mx-1 px-1.5 py-0.5 rounded bg-green-100 text-green-800 border border-green-200 font-extrabold cursor-pointer hover:bg-green-200 transition-colors"
                      title="Positive Trigger word"
                    >
                      {word.text}
                    </span>
                  );
                }
                if (word.type === 'negative') {
                  return (
                    <span 
                      key={word.key} 
                      className="mx-1 px-1.5 py-0.5 rounded bg-red-100 text-red-800 border border-red-200 font-extrabold cursor-pointer hover:bg-red-200 transition-colors"
                      title="Negative Trigger word"
                    >
                      {word.text}
                    </span>
                  );
                }
                return <span key={word.key} className="mx-0.5">{word.text}</span>;
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AISentimentAnalyzer;
