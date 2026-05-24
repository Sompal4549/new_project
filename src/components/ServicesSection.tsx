/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Cpu, 
  ShieldAlert, 
  Send, 
  Users, 
  Activity, 
  BadgeAlert, 
  Lock, 
  ChevronRight, 
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import servicesJson from '../data/services.json';

interface GigItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  rate: string;
  level: string;
  description: string;
  skills: string[];
  location: string;
}

export default function ServicesSection() {
  const [activeTab, setActiveTab ] = useState<'hire' | 'apply'>('hire');
  
  // Interactive client config states
  const [selectedSector, setSelectedSector] = useState<string>('firmware');
  const [duration, setDuration] = useState<number>(6); // months
  const [securityRequired, setSecurityRequired] = useState<boolean>(true);
  
  // Inquiry submission states
  const [clientInquiry, setClientInquiry] = useState({
    companyName: '',
    workEmail: '',
    scopeDetails: ''
  });
  const [isInquirySubmitted, setIsInquirySubmitted] = useState(false);
  
  // Freelancer application states
  const [freelancerData, setFreelancerData] = useState({
    fullName: '',
    specialty: 'cryptography',
    pgpKey: '',
    yearsExp: '5-10',
    resumeLink: '',
    briefPitch: ''
  });
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);

  const specialties = servicesJson.specialties;

  const liveGigs: GigItem[] = servicesJson.liveGigs as GigItem[];

  const getSpecialtyIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-cyan-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-rose-500" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-cyan-500" />;
      case 'Users':
        return <Users className="w-5 h-5 text-rose-500" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-cyan-500" />;
    }
  };

  // Calculated variables representing instant feedback engine
  const getSimulatedStaffCount = () => {
    let base = 12;
    if (selectedSector === 'cryptography') base = 8;
    if (selectedSector === 'optics') base = 5;
    if (selectedSector === 'robotics') base = 9;
    if (securityRequired) base = Math.max(2, Math.floor(base * 0.6));
    return base;
  };

  const getSimulatedHourlyRate = () => {
    let rate = 180;
    if (selectedSector === 'cryptography') rate = 220;
    if (selectedSector === 'optics') rate = 245;
    if (selectedSector === 'robotics') rate = 210;
    if (securityRequired) rate += 35;
    return rate;
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientInquiry.companyName || !clientInquiry.workEmail) return;
    setIsInquirySubmitted(true);
    setTimeout(() => {
      setIsInquirySubmitted(false);
      setClientInquiry({ companyName: '', workEmail: '', scopeDetails: '' });
    }, 5000);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!freelancerData.fullName || !freelancerData.resumeLink) return;
    setIsApplicationSubmitted(true);
    setTimeout(() => {
      setIsApplicationSubmitted(false);
      setFreelancerData({
        fullName: '',
        specialty: 'cryptography',
        pgpKey: '',
        yearsExp: '5-10',
        resumeLink: '',
        briefPitch: ''
      });
    }, 5000);
  };

  return (
    <div id="services-section-wrapper" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      
      {/* 1. HERO DESCRIPTION & CORE EXEGESIS */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-8">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-805 rounded-full">
          <Briefcase className="w-3.5 h-3.5 text-cyan-500 dark:text-rose-500" />
          <span className="font-mono text-[9px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400">
            SOVEREIGN TALENT DISPATCH MATCH
          </span>
        </div>
        
        <h1 className="font-sans text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight leading-none">
          ELITE FREELANCE ENGINES FOR <br />
          <span className="text-cyan-500 dark:text-rose-500 font-black">CRITICAL DEEP SYSTEMS</span>
        </h1>
        
        <p className="font-sans text-sm sm:text-base text-zinc-650 dark:text-zinc-300 leading-relaxed max-w-3xl mx-auto">
          We operate are a high-fidelity venture studio and closed network that pairs exceptional, credentialed freelance software mechanics, quantum systems design specialists, and physical aerospace engineers with high-stakes sovereign ventures and deep tech enterprises. No standard generic templates. Absolute custom engineering mastery.
        </p>
      </section>

      {/* 2. THE CHILL CORE CAPABILITIES SHOWCASE */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {specialties.map((spec) => (
          <div
            id={`spec-${spec.id}`}
            key={spec.id}
            className="p-6 bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 rounded-sm hover:-translate-y-1 hover:border-zinc-350 dark:hover:border-zinc-700 transition-all duration-300"
          >
            <div className="mb-4 p-2 w-10 h-10 bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 rounded-sm flex items-center justify-center shadow-xs">
              {getSpecialtyIcon(spec.icon)}
            </div>
            <h3 className="font-sans text-sm font-black text-zinc-900 dark:text-white mb-2 uppercase tracking-tight">
              {spec.title}
            </h3>
            <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
              {spec.desc}
            </p>
          </div>
        ))}
      </section>

      {/* 3. INTERACTIVE MATCH INTEGRITY ESTIMATOR ENGINE */}
      <section className="bg-zinc-50 dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800 rounded-sm p-6 sm:p-10 relative overflow-hidden">
        {/* Decorative Grid Panel */}
        <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] dark:bg-[radial-gradient(#18181b_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />
        
        <div className="relative z-10 grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Config Controls, 7 Columns */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-[9px] font-bold text-cyan-600 dark:text-rose-500 tracking-widest block">
                [ NETWORK MATCH ALGORITHM v1.4 ]
              </span>
              <h2 className="font-sans text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                ESTIMATE SPECIALIST DEPLOYMENT
              </h2>
              <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 max-w-xl">
                Fine-tune your technical parameters below to see the availability index and rates from our active freelance cleanroom nodes.
              </p>
            </div>

            <div className="space-y-5 pt-2">
              {/* Sector Selection */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                  1. TARGET STRUCTURAL DISCIPLINE:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { key: 'cryptography', label: 'CYBER/CRYPT' },
                    { key: 'firmware', label: 'HARDWARE FW' },
                    { key: 'optics', label: 'LEO SATCOM' },
                    { key: 'robotics', label: 'ROBOT SLAM' }
                  ].map((btn) => (
                    <button
                      key={btn.key}
                      onClick={() => setSelectedSector(btn.key)}
                      className={`px-3 py-2 font-mono text-[9px] font-black tracking-widest border rounded-sm transition-all cursor-pointer ${
                        selectedSector === btn.key
                          ? 'border-cyan-500 dark:border-rose-500 bg-cyan-500/10 dark:bg-rose-500/10 text-cyan-600 dark:text-rose-450 shadow-xs'
                          : 'border-zinc-250 dark:border-zinc-850 hover:border-zinc-350 dark:hover:border-zinc-750 text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for Duration */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-mono text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    2. DEPLOYMENT TIMELINE CYCLES:
                  </label>
                  <span className="font-mono text-xs text-zinc-900 dark:text-white font-extrabold">
                    {duration} MONTHS
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="24"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-cyan-500 dark:accent-rose-500"
                />
                <div className="flex justify-between text-[8px] font-mono text-zinc-405 dark:text-zinc-505">
                  <span>2 MONTHS BRIEF AUDIT</span>
                  <span>12 MONTHS PHASE</span>
                  <span>24 MONTHS LONG SYSTEM</span>
                </div>
              </div>

              {/* Security switch */}
              <div className="p-4 bg-zinc-150/40 dark:bg-zinc-950/45 border border-zinc-200 dark:border-zinc-850 rounded-sm flex items-center justify-between">
                <div className="flex items-start space-x-3 pr-2">
                  <div className="p-1 px-1.5 mt-0.5 bg-rose-500/10 text-rose-500 rounded-sm">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-zinc-900 dark:text-white">
                      ITAR & SOVEREIGN SECURITY CLEARANCE
                    </h4>
                    <p className="font-sans text-[10px] text-zinc-455 dark:text-zinc-500">
                      Restrict dispatch search results entirely to contractors with background-screens or validated clearance tokens.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSecurityRequired(!securityRequired)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    securityRequired ? 'bg-cyan-500 dark:bg-rose-500' : 'bg-zinc-300 dark:bg-zinc-800'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                      securityRequired ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Match Outputs Panel, 5 Columns */}
          <div className="lg:col-span-5 bg-zinc-900 text-white rounded-sm border border-zinc-800 p-6 space-y-6">
            <h3 className="font-mono text-xs font-black tracking-widest text-zinc-400 border-b border-zinc-800 pb-3 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-500" />
              ESTIMATION_ENGINE.output
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-zinc-500 block uppercase">Matched Nodes</span>
                <span className="font-sans text-3xl font-black text-white">
                  {getSimulatedStaffCount()} Specialists
                </span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-zinc-500 block uppercase">Est. Hourly Range</span>
                <span className="font-sans text-3xl font-black text-cyan-405 dark:text-rose-455">
                  ${getSimulatedHourlyRate()}
                </span>
              </div>
            </div>

            <div className="space-y-3.5 border-t border-zinc-800 pt-5 text-xs font-sans text-zinc-300 leading-normal font-normal">
              <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-400">
                <BadgeAlert className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>MEETS NATIONAL SECURITY REQUIREMENTS</span>
              </div>
              <p>
                Our match represents active contractors holding proven software competencies in Swiss micro-optics and German cyber encryption. Ready for zero-delay boarding within <span className="text-white font-bold">14 days</span>.
              </p>
            </div>

            <button
              onClick={() => {
                setActiveTab('hire');
                const formEl = document.getElementById('match-form-portal');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 bg-white text-zinc-950 font-mono text-[10px] font-bold tracking-widest rounded-sm text-center cursor-pointer hover:bg-zinc-200 transition-colors uppercase"
            >
              Request Matched Profiles
            </button>
          </div>
        </div>
      </section>

      {/* 4. CURRENT PORTFOLIO CONTRACT GIGS - PROOF OF PORTAL */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="font-mono text-[10px] font-black text-cyan-650 dark:text-rose-500 tracking-widest">
            [ SECURE_BOARDS.cfg ]
          </span>
          <h2 className="font-sans text-3xl font-black text-zinc-900 dark:text-white tracking-tight uppercase">
            Live High-Tier Contract Gigs
          </h2>
          <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400">
            Current live freelancing opportunities distributed across CYBER/PRECISION portfolio entities and global hardware alliances.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {liveGigs.map((gig) => (
            <div
              id={gig.id}
              key={gig.id}
              className="bg-white dark:bg-zinc-955 p-6 border border-zinc-200/80 dark:border-zinc-850 rounded-sm relative hover:border-zinc-350 dark:hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="px-2 py-0.5 bg-zinc-105 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 text-[9px] font-mono font-bold tracking-widest text-cyan-600 dark:text-rose-400 rounded">
                      {gig.category.toUpperCase()}
                    </span>
                    <h3 className="font-sans text-md font-black text-zinc-900 dark:text-white mt-2 uppercase leading-snug">
                      {gig.title}
                    </h3>
                  </div>
                  <span className="text-right font-mono text-[10px] font-black text-rose-505 dark:text-emerald-400 block shrink-0">
                    {gig.rate}
                  </span>
                </div>

                <p className="font-sans text-xs text-zinc-550 dark:text-zinc-400 leading-normal font-normal">
                  {gig.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {gig.skills.map((skill, si) => (
                    <span
                      key={si}
                      className="px-2 py-0.5 bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-450 border border-zinc-200 dark:border-zinc-850 rounded-sm font-mono text-[9px]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-100 dark:border-zinc-900 mt-6 pt-4 flex items-center justify-between text-xs font-mono text-zinc-405 dark:text-zinc-505">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-450" />
                  <span>{gig.duration}</span>
                </div>
                <span>{gig.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE CONTRACT SUBMISSION AND INTAKE PORTAL */}
      <section id="match-form-portal" className="max-w-3xl mx-auto space-y-10 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-zinc-50/50 dark:bg-zinc-900/10 p-6 sm:p-10">
        
        {/* Toggle between Clients and Freelancers */}
        <div className="flex justify-center border-b border-zinc-200 dark:border-zinc-800 pb-1">
          <div className="inline-flex space-x-1 p-1 bg-zinc-100 dark:bg-zinc-900/80 rounded border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setActiveTab('hire')}
              className={`px-6 py-2 rounded-sm font-mono text-xs font-black tracking-widest cursor-pointer transition-all ${
                activeTab === 'hire'
                  ? 'bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              REQUEST HIRING INTENT
            </button>
            <button
              onClick={() => setActiveTab('apply')}
              className={`px-6 py-2 rounded-sm font-mono text-xs font-black tracking-widest cursor-pointer transition-all ${
                activeTab === 'apply'
                  ? 'bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              APPLY AS INDEPENDENT SPECIALIST
            </button>
          </div>
        </div>

        {/* Option A: Client Intake Profile */}
        <AnimatePresence mode="wait">
          {activeTab === 'hire' ? (
            <motion.div
              key="hire-form"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={handleInquirySubmit} className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="font-sans text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                    Submit Hiring Dossier Specifications
                  </h3>
                  <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
                    Provide raw details around your venture requirements and system constraints. Our compliance team will review and match profiles immediately.
                  </p>
                </div>

                {isInquirySubmitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-400 text-center rounded space-y-3"
                  >
                    <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
                    <h4 className="font-sans font-black text-sm uppercase">Dossier Logged Successfully</h4>
                    <p className="font-sans text-xs max-w-md mx-auto leading-normal">
                      Venture matching algorithm initiated. Our specialized lead managing partner is compiling relevant candidate profiles. Watch your PGP-secured inbox for a match summary report within 12 hours.
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] font-black text-zinc-500 dark:text-zinc-400 tracking-wider block">
                          COMPANY NAME:
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. ARGON FLUIDICS"
                          value={clientInquiry.companyName}
                          onChange={(e) => setClientInquiry({ ...clientInquiry, companyName: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white rounded-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 font-sans"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] font-black text-zinc-500 dark:text-zinc-400 tracking-wider block">
                          SECURE WORK EMAIL:
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="dossier@corporate.email"
                          value={clientInquiry.workEmail}
                          onChange={(e) => setClientInquiry({ ...clientInquiry, workEmail: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white rounded-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 font-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] font-black text-zinc-500 dark:text-zinc-400 tracking-wider block">
                        SYSTEM ARCHITECTURE & CONSULTING REQUIREMENTS:
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Describe system environment, required tech skills, cleanroom access requirement, security protocols needed..."
                        value={clientInquiry.scopeDetails}
                        onChange={(e) => setClientInquiry({ ...clientInquiry, scopeDetails: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white rounded-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 font-sans leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-mono text-xs font-black tracking-widest rounded-sm border border-zinc-700 dark:border-zinc-300 flex items-center justify-center space-x-2 cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-100"
                    >
                      <span>TRANSMIT REQUISITION INTENT</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </form>
            </motion.div>
          ) : (
            // Option B: Freelancer Dossier Submission
            <motion.div
              key="apply-form"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={handleApplySubmit} className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="font-sans text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                    Enlist as an Independent Advisor Node
                  </h3>
                  <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
                    Enter the master network loop. We partner with the most qualified sub-nanometer developers and quantum systems analysts on earth.
                  </p>
                </div>

                {isApplicationSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-400 text-center rounded space-y-3"
                  >
                    <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
                    <h4 className="font-sans font-black text-sm uppercase">Adviser Dossier Indexed</h4>
                    <p className="font-sans text-xs max-w-md mx-auto leading-normal">
                      Candidacy received and added safely to the encrypted pool. A diligence partner (Helena or Sven) will execute structural code verification, and contact you from a verified GPG key signature.
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] font-black text-zinc-500 dark:text-zinc-400 tracking-wider block">
                          FULL NAME / ALIAS:
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Dr. Jordan Mercer"
                          value={freelancerData.fullName}
                          onChange={(e) => setFreelancerData({ ...freelancerData, fullName: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white rounded-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 font-sans"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] font-black text-zinc-500 dark:text-zinc-400 tracking-wider block">
                          DOSSIER PROFILE LINK (RESUME/GITHUB/GITLAB):
                        </label>
                        <input
                          type="url"
                          required
                          placeholder="https://github.com/my-deep-systems-handle"
                          value={freelancerData.resumeLink}
                          onChange={(e) => setFreelancerData({ ...freelancerData, resumeLink: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white rounded-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] font-black text-zinc-500 dark:text-zinc-400 tracking-wider block">
                          CORE SYSTEM DOMAIN SPECIALIZATION:
                        </label>
                        <select
                          value={freelancerData.specialty}
                          onChange={(e) => setFreelancerData({ ...freelancerData, specialty: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white rounded-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 font-sans"
                        >
                          <option value="cryptography">Post-Quantum Keys & Security Certification</option>
                          <option value="firmware">Sub-Nanometer Lithography / Hardware-on-Metal</option>
                          <option value="optics">Satellite Laser Backhaul / Telco Protocol Routing</option>
                          <option value="robotics">GPS-Denied SLAM / Subsea Actuating Hydraulics</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] font-black text-zinc-500 dark:text-zinc-400 tracking-wider block">
                          AUTHORIZED SIGNATURE PUBLIC PGP KEY FINGERPRINT (OPTIONAL):
                        </label>
                        <input
                          type="text"
                          placeholder="B4DF CAFE 881D 99F0 ..."
                          value={freelancerData.pgpKey}
                          onChange={(e) => setFreelancerData({ ...freelancerData, pgpKey: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white rounded-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono tracking-widest uppercase"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] font-black text-zinc-500 dark:text-zinc-400 tracking-wider block">
                        BRIEF COGNITIVE PROFILE SPEECH (PITCH):
                      </label>
                      <textarea
                        rows={3}
                        placeholder="State your specialized experience, relevant cleanroom achievements, or complex systems security protocols audited..."
                        value={freelancerData.briefPitch}
                        onChange={(e) => setFreelancerData({ ...freelancerData, briefPitch: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white rounded-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 font-sans leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-mono text-xs font-black tracking-widest rounded-sm border border-zinc-700 dark:border-zinc-300 flex items-center justify-center space-x-2 cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-100"
                    >
                      <span>TRANSMIT CANDIDACY APPLICATION</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
