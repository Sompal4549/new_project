/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
  onScrollToSection,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', value: 'home' as ActiveTab },
    { label: 'SERVICES', value: 'services' as ActiveTab },
    { label: 'ABOUT', value: 'about' as ActiveTab },
    { label: 'PORTFOLIO', value: 'portfolio' as ActiveTab },
    { label: 'CONTACT', value: 'contact' as ActiveTab },
  ];

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shadow-md py-2'
          : 'bg-transparent border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          id="nav-logo"
          onClick={() => handleTabClick('home')}
          className="flex items-center space-x-3 group text-left cursor-pointer focus:outline-none rounded-md p-1"
          aria-label="CYBER/PRECISION Home"
        >
          <div className="relative">
            <div className="w-10 h-10 flex items-center justify-center bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black rounded-sm border border-zinc-700 dark:border-zinc-300 transform group-hover:rotate-3 transition-transform duration-300">
              <Shield className="w-5 h-5 text-cyan-500 dark:text-rose-500" />
            </div>
          </div>
          <div>
            <div className="font-mono font-black tracking-widest text-lg text-zinc-900 dark:text-white flex items-center gap-1 leading-none">
              CYBER<span className="text-cyan-500 dark:text-rose-500">/</span>PRECISION
            </div>
            <span className="font-mono text-[9px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider">
              ELITE SPECIALIST NETWORK
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1" aria-label="Desktop Main Navigation">
          {navItems.map((item) => (
            <button
              id={`nav-tab-${item.value}`}
              key={item.value}
              onClick={() => handleTabClick(item.value)}
              className={`relative px-4 py-2 font-mono text-xs font-bold tracking-widest cursor-pointer group focus:outline-none transition-colors duration-200 ${
                activeTab === item.value
                  ? 'text-zinc-950 dark:text-white'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              {activeTab === item.value && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-cyan-500 dark:bg-rose-500"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right side status, theme & CTA controls */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Online status indicator */}
          <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 rounded-full text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[9px] tracking-widest font-black leading-none">DIRECT SECURE NODE // ONLINE</span>
          </div>

          <button
            id="theme-toggler"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 cursor-pointer transition-colors duration-200 focus:outline-none"
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-500" />
            )}
          </button>

          <button
            id="nav-cta"
            onClick={() => handleTabClick('contact')}
            className="flex items-center space-x-1 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-mono text-xs font-black tracking-widest rounded-sm border border-zinc-700 dark:border-zinc-300 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>HIRE SPECIALISTS</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tablet and Mobile menu trigger Area */}
        <div className="flex items-center space-x-4 lg:hidden">
          {/* Online dot */}
          <div className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-500/10 rounded-full text-emerald-600 dark:text-emerald-400 text-[10px]">
            <span className="relative flex h-1.5 w-1.5 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="font-mono tracking-wider font-extrabold text-[8px] leading-none">SECURE</span>
          </div>

          <button
            id="theme-toggler-mobile"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center w-9 h-9 cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-500" />}
          </button>

          <button
            id="mobile-menu-trigger"
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 flex items-center justify-center w-9 h-9 cursor-pointer"
            aria-expanded={isMobileMenuOpen}
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slide-In Off-Canvas Drawer (Mobile & Tablet) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              id="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />

            {/* Drawer Body - 50% screen width, sliding right to left */}
            <motion.div
              id="mobile-nav"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[50%] min-w-[280px] max-w-sm z-50 bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between p-6 pointer-events-auto"
            >
              <div>
                {/* Header inside drawer */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="font-mono text-xs font-black text-zinc-400">MENU_SYSTEM //</span>
                  <button
                    id="mobile-menu-close"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Secure network indicator */}
                <div className="mb-6 p-3 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-sm border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-[9px] tracking-widest font-black">SECURE_NODE_ONLINE</span>
                  </div>
                </div>

                {/* Menu items */}
                <div className="space-y-3">
                  {navItems.map((item) => (
                    <button
                      id={`mobile-nav-tab-${item.value}`}
                      key={item.value}
                      onClick={() => handleTabClick(item.value)}
                      className={`w-full text-left px-4 py-3 font-mono text-xs font-black tracking-widest rounded-sm transition-colors duration-150 ${
                        activeTab === item.value
                          ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-white border-l-4 border-cyan-500 dark:border-rose-500'
                          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Drawer CTA */}
              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
                <button
                  id="mobile-cta"
                  onClick={() => handleTabClick('contact')}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3.5 bg-zinc-950 dark:bg-white text-zinc-50 dark:text-zinc-950 font-mono text-xs font-black tracking-widest rounded-sm border border-zinc-800 dark:border-zinc-200"
                >
                  <span>HIRE SPECIALISTS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <div className="text-center">
                  <span className="font-mono text-[8px] text-zinc-400 dark:text-zinc-600 tracking-widest">
                    CYBER/PRECISION 2026 // v1.0.4
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
