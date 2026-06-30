import React, { useState } from 'react';
import BackgroundShader from '../components/BackgroundShader';
import Sidebar from '../components/Sidebar';

const Reports = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiReport, setAiReport] = useState(null);

  // Mock list of generated reports
  const [reportsList, setReportsList] = useState([
    { id: 1, name: 'Aura Pro Max Q2 Sentiment Audit', date: 'June 28, 2026', type: 'PDF Report', size: '2.4 MB', status: 'Completed' },
    { id: 2, name: 'SonicPro X10 Performance Summary', date: 'June 24, 2026', type: 'CSV Sheet', size: '420 KB', status: 'Completed' },
    { id: 3, name: 'Flipkart Competitor Analysis Matrix', date: 'June 15, 2026', type: 'Excel Sheet', size: '1.2 MB', status: 'Completed' },
    { id: 4, name: 'Wearables Segment Quarterly Report', date: 'June 01, 2026', type: 'PDF Report', size: '8.7 MB', status: 'Archive' },
  ]);

  const handleGenerateSummary = () => {
    setIsGenerating(true);
    setAiReport(null);
    
    setTimeout(() => {
      setAiReport({
        title: 'SentientAI Executive Brief - Aura Pro Max',
        date: 'June 30, 2026',
        summary: 'We conducted an AI-driven audit of 12,482 customer reviews across Amazon and Flipkart for the Aura Pro Max headphones. Overall sentiment is overwhelmingly positive (92%), establishing a robust market positioning. Audio reproduction clarity and active noise cancellation (ANC) remain the primary brand drivers.',
        bullets: [
          'Sound quality and wide frequency response are praised in 84% of reviews.',
          'Active noise cancelling effectiveness is classified as pristine, blocking 95% of background noise.',
          'Clamp force fit and heavy aluminum weight (280g) were identified as the primary usability complaints (affecting 8% of users).'
        ],
        conclusion: 'Recommendation: We advise product engineering to lower the headband tension by 10-15% in the next revision, and explore lighter magnesium alloy parts. These updates will address the major comfort complaints while retaining the premium sound quality.'
      });
      setIsGenerating(false);
      
      // Append a new report record to the table list
      setReportsList(prev => [
        {
          id: prev.length + 1,
          name: 'Aura Pro Max AI Summary Brief',
          date: 'June 30, 2026',
          type: 'AI Brief',
          size: '12 KB',
          status: 'Completed'
        },
        ...prev
      ]);
    }, 1500); // simulation delay
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

        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <nav className="flex items-center gap-2 text-outline-variant mb-2 text-xs">
              <span className="font-semibold text-outline">Dashboard</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-bold text-primary">Reports</span>
            </nav>
            <h2 className="text-2xl md:text-3xl font-extrabold text-on-background font-display-lg leading-tight">
              Sentiment Reports Hub
            </h2>
            <p className="text-xs text-on-surface-variant font-medium mt-1">
              Aggregate, extract, and print executive summaries from customer review databases.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-3 rounded-xl glass-card flex items-center gap-2 text-primary font-bold hover:bg-white text-xs transition-all active:scale-98 bg-white/40">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              <span>Filters</span>
            </button>
            <button 
              onClick={handleGenerateSummary}
              className="px-5 py-3 rounded-xl bg-primary text-white flex items-center gap-2 font-bold text-xs shadow-lg shadow-primary/20 hover:scale-98 transition-all"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>New AI Report</span>
            </button>
          </div>
        </header>

        {/* Quick Export Cards (Bento Style Layout) */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-10">
          
          {/* AI Generator Card */}
          <div 
            onClick={handleGenerateSummary}
            className="md:col-span-2 glass-card p-6 rounded-3xl relative overflow-hidden group cursor-pointer border-primary/20 bg-gradient-to-br from-white/90 to-primary/5 shadow-sm"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 shadow-md shadow-primary/25">
                  <span className="material-symbols-outlined text-2xl animate-pulse">auto_awesome</span>
                </div>
                <h3 className="text-lg font-bold font-headline-md mb-2 text-on-surface group-hover:text-primary transition-colors">
                  Generate AI Summary
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-6 font-medium">
                  Automatically distill thousands of user sentiments into a 3-paragraph executive brief using GPT-4o integration.
                </p>
              </div>
              <div className="flex items-center gap-2 text-primary font-extrabold group-hover:gap-4 transition-all text-xs">
                <span>Process Intelligence</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[180px]">neurology</span>
            </div>
          </div>

          {/* PDF Export Card */}
          <div className="glass-card p-6 rounded-3xl group cursor-pointer hover:border-primary/40 transition-all flex flex-col justify-between bg-white/70 shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-xl bg-error/10 text-error flex items-center justify-center mb-4 font-bold">
                <span className="material-symbols-outlined">picture_as_pdf</span>
              </div>
              <h4 className="font-bold text-sm mb-1">Export PDF Booklet</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed font-medium">Ready-to-present slides containing layout charts, positive ratios, and fit analysis.</p>
            </div>
            <div className="mt-6 flex justify-end">
              <div className="p-2 rounded-full border border-outline-variant/30 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-sm">download</span>
              </div>
            </div>
          </div>

          {/* Tabular export column */}
          <div className="flex flex-col justify-between gap-4">
            <div className="glass-card p-4 rounded-2xl flex items-center gap-4 group cursor-pointer hover:bg-white/80 transition-all border-l-4 border-l-secondary-container bg-white/70 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-secondary-container/20 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined">csv</span>
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-xs">Export CSV Sheet</h4>
                <p className="text-[10px] text-on-surface-variant font-medium">Raw reviews data</p>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors text-sm">download</span>
            </div>

            <div className="glass-card p-4 rounded-2xl flex items-center gap-4 group cursor-pointer hover:bg-white/80 transition-all border-l-4 border-l-tertiary-container bg-white/70 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-tertiary-container/10 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-green-700">grid_on</span>
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-xs">Export Excel File</h4>
                <p className="text-[10px] text-on-surface-variant font-medium">Sentiment metrics</p>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors text-sm">download</span>
            </div>
          </div>
        </section>

        {/* Simulated AI Report Modal / Panel */}
        {isGenerating && (
          <div className="glass-card p-8 rounded-3xl bg-white/70 shadow-sm mb-10 text-center py-16">
            <span className="animate-spin material-symbols-outlined text-5xl text-primary mb-4">sync</span>
            <h4 className="text-lg font-bold text-on-surface">Summarizing Review Databases...</h4>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto mt-2 font-medium">
              We are parsing 12,482 user reviews for keywords, active noise cancelling references, and headband fitting topics.
            </p>
          </div>
        )}

        {aiReport && (
          <section className="glass-card p-8 rounded-3xl bg-gradient-to-br from-white/95 to-primary/5 border border-primary/20 shadow-lg mb-10 animate-float">
            <div className="flex justify-between items-start mb-6 border-b border-outline-variant/30 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined">auto_awesome</span>
                  {aiReport.title}
                </h3>
                <span className="text-[10px] text-outline font-bold mt-1 block">GENERATED: {aiReport.date}</span>
              </div>
              <button 
                onClick={() => setAiReport(null)}
                className="material-symbols-outlined text-outline hover:text-error transition-colors"
              >
                close
              </button>
            </div>
            
            <div className="space-y-6 text-xs md:text-sm text-on-surface-variant leading-relaxed font-medium">
              <p>{aiReport.summary}</p>
              
              <div className="bg-white/40 p-5 rounded-2xl border border-white/40">
                <h4 className="font-bold text-on-surface mb-3 uppercase tracking-wider text-[10px]">Key Sentiment Drivers:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {aiReport.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
              
              <p className="font-bold text-primary">{aiReport.conclusion}</p>
            </div>
          </section>
        )}

        {/* Generated Reports List Table */}
        <section className="glass-card rounded-3xl overflow-hidden bg-white/70 shadow-sm border border-white/30">
          <div className="p-6 border-b border-white/20 bg-white/35">
            <h4 className="text-base font-bold text-on-surface">Export Log</h4>
            <p className="text-xs text-on-surface-variant font-medium">Historical trace of all documents printed from this workspace</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead className="bg-surface-container-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                <tr>
                  <th className="px-6 py-4">Report Name</th>
                  <th className="px-6 py-4">Created Date</th>
                  <th className="px-6 py-4">File Type</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/25">
                {reportsList.map((rep) => (
                  <tr key={rep.id} className="hover:bg-white/40 transition-colors text-xs font-semibold">
                    <td className="px-6 py-4">
                      <span className="font-bold text-on-background">{rep.name}</span>
                    </td>
                    <td className="px-6 py-4 text-outline">{rep.date}</td>
                    <td className="px-6 py-4">{rep.type}</td>
                    <td className="px-6 py-4 text-outline">{rep.size}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide ${
                        rep.status === 'Completed' ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-surface-container text-on-surface-variant'
                      }`}>
                        {rep.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-primary hover:text-secondary-container transition-colors material-symbols-outlined text-sm">
                        download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Reports;
