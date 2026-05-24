/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Terminal, 
  Fingerprint, 
  Copy, 
  Check, 
  ShieldCheck, 
  Compass, 
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { TEAM_MEMBERS } from '../data';
import { TeamMember } from '../types';
import aboutJson from '../data/about.json';

export default function AboutSection() {
  const [selectedPartner, setSelectedPartner] = useState<string | null>('team-1');
  const [copiedFingerprint, setCopiedFingerprint] = useState<string | null>(null);

  const activePartnerData = TEAM_MEMBERS.find(member => member.id === selectedPartner) || TEAM_MEMBERS[0];

  const handleCopyFingerprint = (fingerprint: string, id: string) => {
    navigator.clipboard.writeText(fingerprint).then(() => {
      setCopiedFingerprint(id);
      setTimeout(() => setCopiedFingerprint(null), 2500);
    });
  };

  const cronology = aboutJson;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-12">
      {/* 1. BRAND MISSION HEADER */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full"
        >
          <Compass className="w-3.5 h-3.5 text-cyan-500 dark:text-rose-500" />
          <span className="font-mono text-[9px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400">
            STRATEGIC COMPASS & REASONING
          </span>
        </motion.div>
        
        <h1 className="font-sans text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight leading-none">
          DEFENDING COGNITIVE & <br />
          <span className="text-cyan-650 dark:text-rose-450 font-black">PHYSICAL SOVEREIGNTY</span>
        </h1>
        
        <p className="font-sans text-md sm:text-lg text-zinc-650 dark:text-zinc-350 leading-relaxed max-w-3xl mx-auto font-normal">
          We believe democracy requires hard assets. If essential services rely on unverified microcontrollers or outsourced cryptographic layers, total digital autonomy is impossible. We fund the hard physical layers, specialized mechanics, and high-security computing systems that protect free societies.
        </p>
      </section>

      {/* 2. ADVANCED DOSSIERS: TEAM SELECTOR */}
      <section className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left selector, 5 columns */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-1">
            <span className="font-mono text-[9px] font-bold text-cyan-600 dark:text-rose-500 tracking-widest block">
              [ COMPILING DOSSIER RECORD ]
            </span>
            <h2 className="font-sans text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              TECHNICAL STEERING DIRECTORS
            </h2>
            <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400">
              Select an executive managing partner to compile their strategic records and authorized PGP/GPG identifiers.
            </p>
          </div>

          <div className="space-y-3">
            {TEAM_MEMBERS.map((member) => (
              <button
                id={`about-member-tab-${member.id}`}
                key={member.id}
                onClick={() => setSelectedPartner(member.id)}
                className={`w-full text-left p-4 rounded-sm border transition-all duration-300 flex items-center justify-between cursor-pointer focus:outline-none ${
                  selectedPartner === member.id
                    ? 'border-cyan-500 dark:border-rose-500 bg-zinc-100/50 dark:bg-zinc-900/40 shadow-sm'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-transparent hover:border-zinc-350 dark:hover:border-zinc-750'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="font-sans text-sm font-black text-zinc-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="font-mono text-[10px] text-zinc-455 dark:text-zinc-500">
                      {member.role.split('(')[0].trim()}
                    </p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 text-zinc-400 transition-transform ${
                  selectedPartner === member.id ? 'translate-x-1 text-cyan-500 dark:text-rose-500' : ''
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Details, 7 columns */}
        <div className="lg:col-span-7 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-850 rounded-sm p-6 sm:p-8 min-h-[380px] flex flex-col justify-between relative overflow-hidden">
          {/* Subtle design grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] dark:bg-[radial-gradient(#18181b_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activePartnerData.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="space-y-6 relative z-10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div>
                  <h3 className="font-sans text-2xl font-black text-zinc-900 dark:text-white">
                    {activePartnerData.name}
                  </h3>
                  <p className="font-mono text-xs text-cyan-600 dark:text-rose-450 font-bold mt-1">
                    {activePartnerData.role}
                  </p>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1 rounded bg-zinc-150/70 dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800 self-start sm:self-center font-mono text-[9px] text-zinc-600 dark:text-zinc-450 font-bold">
                  <UserCheck className="w-3.5 h-3.5 text-cyan-550 dark:text-rose-550" />
                  <span>DILIGENCE LEAD</span>
                </div>
              </div>

              {/* Bio block */}
              <div className="space-y-3 font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                <p>{activePartnerData.bio}</p>
                <div className="pt-2">
                  <span className="block font-mono text-[10px] font-black text-zinc-900 dark:text-zinc-300">
                    SPECIALTY DIRECTIVE:
                  </span>
                  <span className="text-zinc-700 dark:text-zinc-350 font-sans font-bold flex items-center space-x-1.5 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>{activePartnerData.specialty}</span>
                  </span>
                </div>
              </div>

              {/* GPG Cryptographic Copy widget */}
              {activePartnerData.publicKeyFingerprint && (
                <div className="bg-zinc-150/50 dark:bg-zinc-950/60 border border-zinc-250 dark:border-zinc-800/80 p-4 rounded-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] font-black tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                      <Fingerprint className="w-3.5 h-3.5 text-cyan-500 dark:text-rose-500" />
                      AUTHORIZED GPG_PUB_KEY FINGERPRINT
                    </span>
                    <button
                      id="about-copy-fingerprint"
                      onClick={() => handleCopyFingerprint(activePartnerData.publicKeyFingerprint || '', activePartnerData.id)}
                      className="p-1 rounded bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-350 transition-colors cursor-pointer flex items-center justify-center focus:outline-none"
                      title="Copy fingerprint to clipboard"
                    >
                      {copiedFingerprint === activePartnerData.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <code className="block font-mono text-[11px] sm:text-xs text-zinc-800 dark:text-zinc-200 bg-white/50 dark:bg-black/30 p-2 border border-zinc-200 dark:border-zinc-900 rounded-sm tracking-widest break-all select-all text-center">
                    {activePartnerData.publicKeyFingerprint}
                  </code>
                  <div className="flex items-center justify-between text-[8px] font-mono text-zinc-400 dark:text-zinc-500 pt-1">
                    <span>KEY TYPE: RSA/4096</span>
                    <span>MD5 STATUS: VERIFIED_0x8C</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 3. FIRM CHRONICLED TIMELINE */}
      <section className="space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="font-mono text-[10px] font-black text-cyan-600 dark:text-rose-500 tracking-widest">
            [ HISTORIC_RECORDS.log ]
          </span>
          <h2 className="font-sans text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            FIRM HISTORIC MILESTONES
          </h2>
          <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400">
            Our historical route maps tracing core engineering pivots, fund closings, and critical infrastructure rollouts.
          </p>
        </div>

        {/* Timeline representation */}
        <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-4 md:ml-32 space-y-12">
          {cronology.map((record, idx) => (
            <motion.div
              id={`timeline-event-${idx}`}
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Year badge absolute to timeline block */}
              <div className="absolute top-0 left-0 -translate-x-1/2 -ml-0.5 w-4 h-4 bg-white dark:bg-zinc-950 border-2 border-cyan-500 dark:border-rose-500 rounded-full flex items-center justify-center z-10" />
              
              <div className="hidden md:block absolute top-0 left-0 -translate-x-full -ml-8 pr-8 font-mono text-sm font-black text-cyan-650 dark:text-rose-500">
                FY {record.year}
              </div>

              <div className="space-y-2 p-5 bg-zinc-50/70 dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800 rounded-sm hover:border-zinc-350 dark:hover:border-zinc-750 transition-colors duration-300">
                <div className="md:hidden font-mono text-xs font-black text-cyan-650 dark:text-rose-500">
                  [{record.year}]
                </div>
                <h3 className="font-sans text-sm font-black text-zinc-900 dark:text-white tracking-tight">
                  {record.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                  {record.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
