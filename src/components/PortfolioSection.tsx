/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  Cpu, 
  Orbit, 
  Wrench, 
  Building, 
  Calendar, 
  ExternalLink,
  ShieldAlert,
  Server,
  Zap,
  Tag,
  Search,
  X,
  Database
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data';
import { PortfolioItem } from '../types';

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'cyber' | 'precision' | 'space' | 'robotics'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<PortfolioItem | null>(null);
  const [isSecureConnected, setIsSecureConnected] = useState(false);

  const categories = [
    { label: 'ALL CRITICAL ASSETS', value: 'all' as const, icon: <Database className="w-3.5 h-3.5" /> },
    { label: 'CYBER SECURITY', value: 'cyber' as const, icon: <Lock className="w-3.5 h-3.5" /> },
    { label: 'PRECISION HARDWARE', value: 'precision' as const, icon: <Cpu className="w-3.5 h-3.5" /> },
    { label: 'SPACE INTERCONNECTS', value: 'space' as const, icon: <Orbit className="w-3.5 h-3.5" /> },
    { label: 'ROBOTICS & CONTROL', value: 'robotics' as const, icon: <Wrench className="w-3.5 h-3.5" /> },
  ];

  const filteredItems = PORTFOLIO_DATA.filter((item) => {
    const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cyber': return <Lock className="w-4 h-4 text-cyan-500" />;
      case 'precision': return <Cpu className="w-4 h-4 text-rose-500" />;
      case 'space': return <Orbit className="w-4 h-4 text-violet-500" />;
      case 'robotics': return <Wrench className="w-4 h-4 text-emerald-500" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const handleOpenReport = (company: PortfolioItem) => {
    setSelectedCompany(company);
    setIsSecureConnected(false);
    // Simulate secure hand-shaking animation
    setTimeout(() => {
      setIsSecureConnected(true);
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-12">
      {/* 1. SECTOR HEADER */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-8">
        <span className="font-mono text-[10px] font-black text-cyan-600 dark:text-rose-500 tracking-widest block">
          [ DEEP_ACCUMULATION_LOG.db ]
        </span>
        <h1 className="font-sans text-4xl font-black text-zinc-900 dark:text-white tracking-tight leading-none">
          CYBER/PRECISION CRITICAL ARTIFACTS
        </h1>
        <p className="font-sans text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          We maintain absolute control over selective seed and Series-A pipelines backing the tactical security and hardware supply chains of allied networks.
        </p>
      </section>

      {/* 2. DYNAMIC FILTERS & LIVE SEARCH */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 p-4 rounded-sm">
          {/* Active filter toggles */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                id={`filter-tab-${cat.value}`}
                key={cat.value}
                onClick={() => {
                  setActiveFilter(cat.value);
                  setSearchQuery('');
                }}
                className={`flex items-center space-x-1.5 px-3.5 py-2 font-mono text-[10px] font-black tracking-widest rounded-sm border cursor-pointer transition-all ${
                  activeFilter === cat.value
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 border-zinc-950 dark:border-white shadow-sm'
                    : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-350 dark:hover:border-zinc-700'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search box input */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              id="portfolio-search-field"
              type="text"
              placeholder="Query tags or names..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-2 pl-9 rounded-sm font-mono text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
            />
          </div>
        </div>

        {/* Counter of matching results */}
        <div className="font-mono text-[9px] text-zinc-500 flex items-center space-x-2">
          <span>COMPILED RESULTS: {filteredItems.length} OF {PORTFOLIO_DATA.length} REGISTERED SYSTEMS</span>
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
        </div>
      </section>

      {/* 3. STAGGERED BENTO PORTFOLIO GRID */}
      <section>
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((company, index) => (
              <motion.div
                id={`portfolio-company-card-${company.id}`}
                key={company.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                 className="group flex flex-col justify-between p-6 bg-white dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 rounded-sm hover:border-zinc-350 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-300 relative overflow-hidden"
              >
                {/* Visual hover background lines */}
                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none transform translate-x-4 -translate-y-4 bg-zinc-100 dark:bg-zinc-850 rounded-full group-hover:scale-[6] transition-transform duration-500 ease-out -z-1 opacity-25" />

                <div className="space-y-4 relative z-10">
                  {/* Category Indicator Logo Row */}
                  <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                    <span className="font-mono text-[10px] font-black text-cyan-600 dark:text-rose-500 tracking-widest flex items-center gap-1.5 animate-pulse">
                      {getCategoryIcon(company.category)}
                      {company.category.toUpperCase()}
                    </span>
                    <span className="px-2 py-0.5 font-mono text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-sm">
                      {company.fundingStage}
                    </span>
                  </div>

                  {/* Company Titles with Image Logo */}
                  <div className="flex items-center space-x-3.5 pt-1">
                    <div className="w-12 h-12 flex-shrink-0 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-805 rounded p-1 flex items-center justify-center">
                      <img 
                        src={company.logoUrl} 
                        alt={`${company.name} logo thumbnail`}
                        className="w-full h-full object-cover rounded-xs"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-sans text-lg font-black text-zinc-900 dark:text-white tracking-tight leading-none group-hover:text-cyan-600 dark:group-hover:text-rose-400 transition-colors">
                        {company.name}
                      </h3>
                      <p className="font-sans text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 leading-tight">
                        {company.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Descriptions */}
                  <p className="font-sans text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                    {company.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {company.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="font-mono text-[8.5px] font-bold px-1.5 py-0.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-sm hover:border-cyan-500 dark:hover:border-rose-500 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 relative z-10">
                  <div className="flex flex-col space-y-1">
                    {/* HQ, founded info */}
                    <div className="flex items-center gap-1 font-mono text-[9px] text-zinc-500">
                      <Building className="w-3 text-emerald-500" />
                      <span>{company.headquarters}</span>
                    </div>
                  </div>

                  {/* Direct details modal expand trigger */}
                  <button
                    id={`open-report-${company.id}`}
                    onClick={() => handleOpenReport(company)}
                    className="flex items-center space-x-1 font-mono text-[10px] font-black text-cyan-600 dark:text-rose-400 hover:text-cyan-500 dark:hover:text-rose-350 cursor-pointer focus:outline-none"
                    aria-label={`Open comprehensive report for ${company.name}`}
                  >
                    <span>ANALYZE_ASSET</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* EMPTY STATE */}
      {filteredItems.length === 0 && (
        <div className="py-20 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-sm space-y-3">
          <ShieldAlert className="w-10 h-10 text-rose-500 mx-auto animate-bounce" />
          <h3 className="font-sans text-md font-black text-zinc-900 dark:text-white">NO SYSTEM MATCHES FOUND</h3>
          <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
            Your telemetry queried parameters that did not exist in the cyber or precision indices. Adjust your input parameters.
          </p>
          <button
            id="clear-filter"
            onClick={() => {
              setActiveFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-1.5 font-mono text-[10px] bg-zinc-900 dark:bg-white text-zinc-50 dark:text-zinc-950 rounded-sm"
          >
            RESET_QUERY
          </button>
        </div>
      )}

      {/* 4. HIGH FIDELITY SECURE OVERLAY REPORT MODAL */}
      <AnimatePresence>
        {selectedCompany && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCompany(null)}
              className="absolute inset-0 bg-zinc-950"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-350 dark:border-zinc-800 shadow-2xl rounded-sm p-6 sm:p-8 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-zinc-850 to-rose-500" />
              
              {/* Close button */}
              <button
                id="close-report-modal"
                onClick={() => setSelectedCompany(null)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer focus:outline-none"
                aria-label="Close asset deep dive modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[9px] font-black text-cyan-600 dark:text-rose-500 tracking-wider block">
                    [ SECURED COMPLIANCE RAPPORT // SEC-INDEX-904 ]
                  </span>
                  <h2 className="font-sans text-3xl font-black text-zinc-900 dark:text-white tracking-tight mt-1">
                    {selectedCompany.name}
                  </h2>
                  <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    Sovereign status record for global deployment models.
                  </p>
                </div>

                {/* Secure Handshake Loader State */}
                <AnimatePresence mode="wait">
                  {!isSecureConnected ? (
                    <motion.div
                      key="handshake-loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-12 flex flex-col items-center justify-center space-y-4 bg-zinc-50 dark:bg-zinc-900/20 border border-dashed border-zinc-250 dark:border-zinc-800/80 rounded-sm"
                    >
                      <LaserNetworkAnimation />
                      <div className="space-y-1.5 text-center">
                        <span className="block font-mono text-[10px] font-black text-zinc-900 dark:text-white tracking-widest animate-pulse">
                          ESTABLISHING SECURE_RSA HANDSHAKE...
                        </span>
                        <span className="block font-mono text-[9px] text-zinc-500 dark:text-zinc-400">
                          VERIFYING PGP CERTIFICATION INDEX // 0xDE77
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="telemetry-connected"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-5"
                    >
                      {/* Connected state status */}
                      <div className="flex items-center space-x-2 text-emerald-500 p-2.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-sm font-mono text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                        <span>SECURE_CONNECTION_ESTABLISHED // ALL_SIGNATURES_CORRECT</span>
                      </div>

                      {/* Technical breakdown list */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/85">
                          <span className="block font-mono text-[9px] font-black text-zinc-400 dark:text-zinc-500">FUNDING METRICS</span>
                          <span className="block font-sans text-md font-black text-zinc-900 dark:text-white mt-1">
                            {selectedCompany.fundingStage} // CAP_SEED
                          </span>
                        </div>
                        <div className="p-4 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/85">
                          <span className="block font-mono text-[9px] font-black text-zinc-400 dark:text-zinc-500">HEADQUARTERS</span>
                          <span className="block font-sans text-xs font-bold text-zinc-800 dark:text-zinc-350 mt-1">
                            {selectedCompany.headquarters}
                          </span>
                        </div>
                        <div className="p-4 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/85">
                          <span className="block font-mono text-[9px] font-black text-zinc-400 dark:text-zinc-500">COMPLIANCE CODE</span>
                          <span className="block font-mono text-xs font-black text-zinc-800 dark:text-zinc-350 mt-1 uppercase text-emerald-600">
                            ITAR_ACCREDITED://PASS
                          </span>
                        </div>
                        <div className="p-4 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/85">
                          <span className="block font-mono text-[9px] font-black text-zinc-400 dark:text-zinc-500">DILIGENCE LEAD</span>
                          <span className="block font-sans text-xs font-bold text-zinc-800 dark:text-zinc-350 mt-1">
                            Dr. Vance // Marcus Kross
                          </span>
                        </div>
                      </div>

                      {/* Technical brief */}
                      <div className="space-y-1 pb-2">
                        <span className="block font-mono text-[9px] font-black text-zinc-450 dark:text-zinc-500">SITUATIONAL DILIGENCE REPORT BRIEF</span>
                        <p className="font-sans text-xs sm:text-sm text-zinc-650 dark:text-zinc-350 leading-relaxed font-normal">
                          This company operates at high tech readiness and is certified for sovereign national critical resource supply. Intellectual property is safely registered across democratic trade councils. Scalability potential is backed by robust hardware margins and secure optical routing interfaces.
                        </p>
                      </div>

                      {/* Anchor website */}
                      <div className="flex justify-end gap-3 border-t border-zinc-200 dark:border-zinc-800 pt-4">
                        <button
                          id="modal-close"
                          onClick={() => setSelectedCompany(null)}
                          className="px-4 py-2 font-mono text-xs font-bold bg-transparent text-zinc-500 hover:text-zinc-700 cursor-pointer"
                        >
                          CLOSE_WINDOW
                        </button>
                        <a
                          id="modal-comp-website"
                          href={selectedCompany.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1.5 px-4 py-2 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-mono text-xs font-black tracking-widest rounded-sm shadow-sm"
                        >
                          <span>VISIT NETWORK</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Micro loader graphic for visual handshaking
function LaserNetworkAnimation() {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        className="w-12 h-12 border-2 border-dashed border-cyan-500 dark:border-rose-500 rounded-full"
      />
      <motion.div
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute w-6 h-6 bg-cyan-500/10 dark:bg-rose-500/10 border border-cyan-500 dark:border-rose-500 rounded"
      />
      <div className="absolute w-1.5 h-1.5 bg-rose-500 dark:bg-cyan-500 rounded-full animate-ping" />
    </div>
  );
}
