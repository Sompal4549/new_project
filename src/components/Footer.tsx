/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Mail, ShieldAlert, Key } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8">
          {/* Logo Column */}
          <div className="md:col-span-5 space-y-4">
            <button
              id="footer-logo"
              onClick={() => handleTabClick('home')}
              className="flex items-center space-x-3 text-left focus:outline-none focus:ring-1 focus:ring-cyan-550 rounded p-1 cursor-pointer"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black rounded-sm border border-zinc-700 dark:border-zinc-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400 dark:text-rose-500" />
              </div>
              <div>
                <span className="block font-mono font-black tracking-widest text-[15px] text-zinc-900 dark:text-white">
                  CYBER<span className="text-cyan-550 dark:text-rose-500">/</span>PRECISION
                </span>
                <span className="block font-mono text-[8px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase">
                  Sovereign Infrastructure Fund
                </span>
              </div>
            </button>
            <p className="font-sans text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed font-normal max-w-sm">
              We lead seed and Series A allocations across cyber threat mitigations, sub-nanometer optoelectronic lithography, aerospace optical meshes, and GPS-denied hydraulic automation.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-[9px] font-black text-zinc-400 dark:text-zinc-500 tracking-wider">
              [ SECURE_PLATFORM_VENTS ]
            </h4>
            <ul className="space-y-2 font-mono text-xs font-bold">
              <li>
                <button
                  id="foot-nav-home"
                  onClick={() => handleTabClick('home')}
                  className="text-zinc-600 hover:text-cyan-550 dark:text-zinc-400 dark:hover:text-rose-400 cursor-pointer"
                >
                  SYSTEM_HOME
                </button>
              </li>
              <li>
                <button
                  id="foot-nav-about"
                  onClick={() => handleTabClick('about')}
                  className="text-zinc-600 hover:text-cyan-550 dark:text-zinc-400 dark:hover:text-rose-400 cursor-pointer"
                >
                  ENGINEERING_PARTNERS
                </button>
              </li>
              <li>
                <button
                  id="foot-nav-portfolio"
                  onClick={() => handleTabClick('portfolio')}
                  className="text-zinc-600 hover:text-cyan-550 dark:text-zinc-400 dark:hover:text-rose-400 cursor-pointer"
                >
                  PORTFOLIO_ASSETS
                </button>
              </li>
              <li>
                <button
                  id="foot-nav-contact"
                  onClick={() => handleTabClick('contact')}
                  className="text-zinc-600 hover:text-cyan-550 dark:text-zinc-400 dark:hover:text-rose-400 cursor-pointer"
                >
                  SECURE_COMM_GATEWAY
                </button>
              </li>
            </ul>
          </div>

          {/* Secure Audit Columns */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-[9px] font-black text-zinc-400 dark:text-zinc-500 tracking-wider">
              [ REGULATORY_ACC_SEAL ]
            </h4>
            <div className="p-3.5 bg-zinc-150/40 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm text-[10px] font-mono text-zinc-500 dark:text-zinc-450 leading-relaxed font-normal space-y-2">
              <div className="flex items-center space-x-1.5 text-cyan-555 dark:text-rose-455 font-bold">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>ITAR & BAFA EXPORT REGISTERED</span>
              </div>
              <p className="text-[9px]">
                Under national directives §3A46, all portfolio telemetry, hardware diagrams, and spatial intelligence specifications are audited by in-house counsel before global export licensing.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright line, symmetric cryptology lines */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] text-zinc-500 dark:text-zinc-455 font-bold">
          <div>
            &copy; {currentYear} CYBER/PRECISION SOVEREIGN VENTURES. ALL WORLD RIGHTS PROTECTED.
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1">
              <Key className="w-3 h-3 text-cyan-500 dark:text-rose-500" />
              SHA-256 SIGNED SEALS
            </span>
            <span>VER: 4.2.1-RELEASE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
