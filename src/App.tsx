/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import PortfolioSection from './components/PortfolioSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { ActiveTab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Default to sleek ultra tech dark mode

  const testimonialsRef = useRef<HTMLDivElement | null>(null);
  const faqRef = useRef<HTMLDivElement | null>(null);

  // Synchronize HTML element class tag for Tailwind v4 dark mode toggle
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [isDarkMode]);

  // Handle smooth scroll targets
  const handleScrollToSection = (sectionId: string) => {
    // If we're not on Home page, switch first
    if (activeTab !== 'home') {
      setActiveTab('home');
      setTimeout(() => {
        executeScroll(sectionId);
      }, 300);
    } else {
      executeScroll(sectionId);
    }
  };

  const executeScroll = (sectionId: string) => {
    const targetRef = sectionId === 'testimonials' ? testimonialsRef : faqRef;
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Render the appropriate section matching the active tab index
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeSection 
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            testimonialsRef={testimonialsRef}
            faqRef={faqRef}
          />
        );
      case 'about':
        return <AboutSection />;
      case 'portfolio':
        return <PortfolioSection />;
      case 'services':
        return <ServicesSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-150 transition-colors duration-300 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-900">
      <div className="flex-grow">
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onScrollToSection={handleScrollToSection}
        />

        {/* Outer screen content with Framer Motion entry spacing offset */}
        <main className="pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer bar */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
