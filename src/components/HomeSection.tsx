/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Quote, 
  ChevronDown, 
  ChevronUp,
  Cpu, 
  Globe, 
  Terminal, 
  ArrowRight,
  Star,
  Zap,
  Activity
} from 'lucide-react';
import { TESTIMONIALS, FAQ_DATA } from '../data';
import homeJson from '../data/home.json';

interface HomeSectionProps {
  onNavigate: (tab: 'about' | 'portfolio' | 'contact') => void;
  testimonialsRef: React.RefObject<HTMLDivElement | null>;
  faqRef: React.RefObject<HTMLDivElement | null>;
}

export default function HomeSection({ onNavigate, testimonialsRef, faqRef }: HomeSectionProps) {
  // Testimonials active carousel index
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // FAQ accordion open states
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');
  const [faqFilter, setFaqFilter] = useState<string>('All');

  const faqCategories = homeJson.faqCategories;

  const filteredFaqs = faqFilter === 'All' 
    ? FAQ_DATA 
    : FAQ_DATA.filter(faq => faq.category === faqFilter);

  const stats = homeJson.stats;

  const pillars = homeJson.pillars;

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-cyan-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-rose-500" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-emerald-500" />;
      default:
        return <Terminal className="w-5 h-5 text-cyan-500" />;
    }
  };

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="space-y-16 pb-12">
      {/* 1. HERO BANNER */}
      <section 
        id="hero-banner" 
        className="relative min-h-[80vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 mt-6 overflow-hidden"
      >
        {/* Futuristic glowing grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] dark:bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:24px_24px] opacity-15 dark:opacity-10 pointer-events-none" />
        
        {/* Glow rings in the background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-400/20 dark:bg-rose-500/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400/10 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-full"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-500 dark:text-rose-500" />
            <span className="font-mono text-[10px] font-bold tracking-widest text-zinc-600 dark:text-zinc-300">
              SECURE GLOBAL DEFENSE & HARDWARE SYNDICATE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight text-zinc-900 dark:text-white leading-[1.05]"
          >
            WE FUND FOUNDERS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-zinc-900 to-rose-600 dark:from-cyan-400 dark:via-zinc-100 dark:to-rose-400">
              BUILDING SOVEREIGN TECH
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="max-w-2xl mx-auto font-sans text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed"
          >
            CYBER/PRECISION is a highly tailored venture capital studio backing deep tech, sub-nanometer mechanics, heavy robotics, and post-quantum encryption. We operate cleanrooms, labs, and write check sizes up to $12M.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              id="hero-cta-portfolio"
              onClick={() => onNavigate('portfolio')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs font-black tracking-widest rounded-sm border border-zinc-700 dark:border-zinc-300 shadow-md transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>EXPLORE PORTFOLIO</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 dark:text-rose-500" />
            </button>
            <button
              id="hero-cta-contact"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 bg-transparent hover:bg-zinc-200/40 dark:hover:bg-zinc-900 text-zinc-805 dark:text-zinc-300 font-mono text-xs font-black tracking-widest rounded-sm border border-zinc-300 dark:border-zinc-800 transition-colors duration-200 cursor-pointer"
            >
              <span>CONNECT WITH A PARTNER</span>
            </button>
          </motion.div>
        </div>

        {/* Live Status indicator in the layout margin safely, representing real-time status */}
        <div className="absolute bottom-4 left-6 hidden xl:flex items-center space-x-2 font-mono text-[9px] text-zinc-500 dark:text-zinc-400 tracking-wider">
          <Activity className="w-3.5 h-3.5 text-cyan-500 dark:text-rose-500 animate-pulse" />
          <span>CYBER_SYS_ONLINE // SECURE_PORT_3000</span>
        </div>
        <div className="absolute bottom-4 right-6 hidden xl:flex items-center space-x-2 font-mono text-[9px] text-zinc-500 dark:text-zinc-400 tracking-wider">
          <span>UTC {new Date().toISOString().substring(11,19)} // LAT: 48.1351° N</span>
        </div>
      </section>

      {/* 2. NUMBERS & METRICS BAR */}
      <section id="metrics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              id={`stat-card-${i}`}
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/65 dark:border-zinc-800/80 rounded-sm relative overflow-hidden group"
            >
              {/* Corner accent decorations */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-400 dark:border-zinc-600" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-400 dark:border-zinc-600" />
              
              <span className="block font-mono text-[9px] font-bold text-zinc-400 dark:text-zinc-500 tracking-widest">{stat.label}</span>
              <span className="block text-3xl sm:text-4xl font-sans font-black tracking-tight text-zinc-900 dark:text-white mt-2 group-hover:text-cyan-500 dark:group-hover:text-rose-500 transition-colors duration-200">
                {stat.value}
              </span>
              <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-1">{stat.sub}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. THESIS PILLARS */}
      <section id="thesis-pillars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-sans text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            CORE INVESTMENT DISCIPLINE
          </h2>
          <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400">
            We operate strictly within three critical core avenues where physical engineering parameters and digital cyber defenses converge.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, i) => (
            <div
              id={`pillar-card-${i}`}
              key={i}
              className="p-8 bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-zinc-800/50 rounded-sm space-y-4 hover:border-zinc-350 dark:hover:border-zinc-700 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                {getPillarIcon(pillar.icon)}
              </div>
              <h3 className="font-sans text-lg font-black tracking-tight text-zinc-900 dark:text-white">
                {pillar.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE TESTIMONIALS SECTION */}
      <section 
        id="testimonials" 
        ref={testimonialsRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div className="space-y-2">
            <span className="font-mono text-[10px] font-bold text-cyan-600 dark:text-rose-500 tracking-widest">
              [ DIRECTIVES & FEEDBACK ]
            </span>
            <h2 className="font-sans text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              COMMITTED FOUNDER DIRECT_LOGS
            </h2>
          </div>
          
          {/* Testimonial slider controllers */}
          <div className="flex items-center space-x-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                id={`test-dot-${i}`}
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`py-1 flex items-center justify-center transition-all ${
                  activeTestimonial === i 
                    ? 'font-mono text-xs font-black text-zinc-900 dark:text-white border-b-2 border-cyan-500 dark:border-rose-500' 
                    : 'font-mono text-[10px] text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400'
                }`}
              >
                0{i + 1}_LN
              </button>
            ))}
          </div>
        </div>

        {/* Carousel slide card with AnimatePresence */}
        <div className="relative min-h-[340px] md:min-h-[260px] bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-850 rounded-sm p-6 sm:p-10 flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Quote className="w-48 h-48 text-zinc-900 dark:text-white" />
          </div>

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <p className="font-sans text-md sm:text-lg italic text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                  "{TESTIMONIALS[activeTestimonial].quote}"
                </p>

                {/* Profile row */}
                <div className="flex items-center space-x-4 pt-2">
                  <img
                    src={TESTIMONIALS[activeTestimonial].avatarUrl}
                    alt={TESTIMONIALS[activeTestimonial].name}
                    className="w-12 h-12 rounded-full border border-zinc-300 dark:border-zinc-700 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-sans text-sm font-black text-zinc-900 dark:text-white">
                      {TESTIMONIALS[activeTestimonial].name}
                    </h4>
                    <p className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                      {TESTIMONIALS[activeTestimonial].role} @ <span className="font-black text-zinc-800 dark:text-zinc-300">{TESTIMONIALS[activeTestimonial].company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Swipe helper or tactile slider controls */}
          <div className="flex justify-end space-x-4 mt-6 border-t border-zinc-200 dark:border-zinc-800/80 pt-4">
            <button
              id="test-prev"
              onClick={() => setActiveTestimonial((activeTestimonial - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="font-mono text-[10px] font-bold text-zinc-500 hover:text-cyan-500 dark:hover:text-rose-400 cursor-pointer focus:outline-none"
            >
              &larr; PREV_LOG
            </button>
            <button
              id="test-next"
              onClick={() => setActiveTestimonial((activeTestimonial + 1) % TESTIMONIALS.length)}
              className="font-mono text-[10px] font-bold text-zinc-500 hover:text-cyan-500 dark:hover:text-rose-400 cursor-pointer focus:outline-none"
            >
              NEXT_LOG &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FAQs ACCORDION SECTION */}
      <section 
        id="faq" 
        ref={faqRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24"
      >
        <div className="text-center space-y-3">
          <span className="font-mono text-[10px] font-bold text-cyan-550 dark:text-rose-500 tracking-widest">
            [ COMMON_INQUIRIES.cfg ]
          </span>
          <h2 className="font-sans text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            FREQUENTLY ASKED ALGORITHMS
          </h2>
          <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
            Review detailed criteria regarding strategic positioning, physical evaluation standards, IP clearances, and check sizes.
          </p>
        </div>

        {/* Category toggles */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-zinc-200 dark:border-zinc-900 pb-4">
          {faqCategories.map(cat => (
            <button
              id={`faq-cat-toggle-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              key={cat}
              onClick={() => setFaqFilter(cat)}
              className={`px-3 py-1.5 font-mono text-[10px] font-bold tracking-wider rounded-full transition-all cursor-pointer ${
                faqFilter === cat 
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-sm' 
                  : 'bg-zinc-100 dark:bg-zinc-900/60 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Accordion container */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq, i) => {
              const isOpen = openFaq === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  layout="position"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`border rounded-sm transition-all duration-300 ${
                    isOpen 
                      ? 'border-cyan-500/80 dark:border-rose-500/80 bg-zinc-50/50 dark:bg-zinc-900/20 shadow-sm' 
                      : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-transparent'
                  }`}
                >
                  <button
                    id={`faq-button-${faq.id}`}
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full text-left px-5 py-4 flex items-center justify-between font-sans text-md font-bold tracking-tight text-zinc-900 dark:text-white cursor-pointer focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <span className="p-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
                      {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-500 dark:text-rose-500" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 border-t border-zinc-100/50 dark:border-zinc-800/50 leading-relaxed font-normal space-y-2">
                          <p>{faq.answer}</p>
                          <div className="flex items-center space-x-2 pt-2">
                            <span className="font-mono text-[9px] text-cyan-500 dark:text-rose-500 uppercase bg-cyan-50 dark:bg-rose-500/10 px-2 py-0.5 rounded-sm">
                              TAG: {faq.category}
                            </span>
                            <span className="font-mono text-[9px] text-zinc-450 dark:text-zinc-500">
                              REF: {faq.id.toUpperCase()}_LOG
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
