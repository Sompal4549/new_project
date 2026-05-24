/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  MapPin, 
  Mail, 
  Terminal, 
  CheckCircle,
  Phone,
  Compass,
  ArrowRight
} from 'lucide-react';
import officesJson from '../data/contact.json';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [simulatedLedgerBlock, setSimulatedLedgerBlock] = useState<number>(844092);

  const offices = officesJson;

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name field is required.';
    
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Valid secure email is required.';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number field is required.';
    } else if (!/^[+]?[0-9\s\-()]{7,20}$/.test(formData.phone.trim())) {
      errors.phone = 'Please provide a valid phone layout.';
    }
    
    if (!formData.message.trim() || formData.message.length < 10) {
      errors.message = 'Please provide query details (minimum 10 characters).';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate high-security cryptographic ledger transaction commit
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSimulatedLedgerBlock(prev => prev + Math.floor(Math.random() * 8) + 1);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setFormErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-12">
      {/* 1. SECTOR HEADER */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-8">
        <span className="font-mono text-[10px] font-black text-cyan-600 dark:text-rose-500 tracking-widest block">
          [ TRANSMIT_INTENT_STREAM.cfg ]
        </span>
        <h1 className="font-sans text-4xl font-black text-zinc-900 dark:text-white tracking-tight leading-none">
          SECURE CHANNEL TRANSMISSION
        </h1>
        <p className="font-sans text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Our freelance match and investment gateways are monitored. Submissions undergo pre-qualification and verified team routing.
        </p>
      </section>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* 2. SIMPLIFIED CONTACT FORM */}
        <div className="lg:col-span-7 bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 rounded-sm relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
                noValidate
              >
                {/* Visual form grid headers */}
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-850 pb-3 font-mono text-[9px] text-zinc-500 font-bold">
                  <span>SSL ENCRYPTED TRANSMISSION PORT // ACTIVE</span>
                  <span>CIPHER: AES-GCM-256</span>
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <label id="lbl-name" htmlFor="form-name" className="block font-mono text-[10px] font-black text-zinc-600 dark:text-zinc-400">
                    FULL NAME *
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full bg-white dark:bg-zinc-950 border p-2.5 rounded-sm font-sans text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-700 ${
                      formErrors.name ? 'border-rose-500' : 'border-zinc-200 dark:border-zinc-805'
                    }`}
                    placeholder="e.g. Dr. Ada Lovelace"
                  />
                  {formErrors.name && (
                    <span className="font-mono text-[9.5px] text-rose-500 block">{formErrors.name}</span>
                  )}
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label id="lbl-email" htmlFor="form-email" className="block font-mono text-[10px] font-black text-zinc-600 dark:text-zinc-400">
                      SECURE EMAIL *
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-white dark:bg-zinc-950 border p-2.5 rounded-sm font-sans text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-700 ${
                        formErrors.email ? 'border-rose-500' : 'border-zinc-200 dark:border-zinc-805'
                      }`}
                      placeholder="e.g. ada@analytical-engine.io"
                    />
                    {formErrors.email && (
                      <span className="font-mono text-[9.5px] text-rose-500 block">{formErrors.email}</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label id="lbl-phone" htmlFor="form-phone" className="block font-mono text-[10px] font-black text-zinc-600 dark:text-zinc-400">
                      PHONE NUMBER *
                    </label>
                    <input
                      id="form-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full bg-white dark:bg-zinc-950 border p-2.5 rounded-sm font-sans text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-700 ${
                        formErrors.phone ? 'border-rose-500' : 'border-zinc-200 dark:border-zinc-805'
                      }`}
                      placeholder="e.g. +49 89 2019401"
                    />
                    {formErrors.phone && (
                      <span className="font-mono text-[9.5px] text-rose-500 block">{formErrors.phone}</span>
                    )}
                  </div>
                </div>

                {/* Query or Comment message field */}
                <div className="space-y-1">
                  <label id="lbl-message" htmlFor="form-message" className="block font-mono text-[10px] font-black text-zinc-600 dark:text-zinc-400">
                    QUERY OR SYSTEM COMMENT * (Min 10 chars)
                  </label>
                  <textarea
                    id="form-message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full bg-white dark:bg-zinc-950 border p-2.5 rounded-sm font-sans text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-705 ${
                      formErrors.message ? 'border-rose-500' : 'border-zinc-200 dark:border-zinc-805'
                    }`}
                    placeholder="Describe your system parameters, required freelancers competence profile, or core venture details here..."
                  />
                  {formErrors.message && (
                    <span className="font-mono text-[9.5px] text-rose-500 block">{formErrors.message}</span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  id="form-submit-button"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 px-5 py-3.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs font-black tracking-widest rounded-sm border border-zinc-700 dark:border-zinc-300 shadow-md cursor-pointer disabled:opacity-50 transition-all active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-zinc-500 dark:border-zinc-900 border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
                      <span>COMMITTING SECURE TRANSACTION STREAM...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 mr-1" />
                      <span>TRANSMIT SYSTEM CHANNEL</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              /* Success transition block: Committing to ledger */
              <motion.div
                key="form-success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-500">
                  <CheckCircle className="w-8 h-8 animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-sans text-2xl font-black text-zinc-900 dark:text-white">
                    TRANSMISSION RECONCILED
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Message logged and committed successfully to CYBER/PRECISION secure channels. A copy has been sealed on our encryption ledger, ready for dispatch to evaluation teams.
                  </p>
                </div>

                {/* Secure payload ledger report output */}
                <div className="bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-5 rounded-sm max-w-sm mx-auto text-left font-mono text-[9px] text-zinc-500 dark:text-zinc-400 space-y-2.5">
                  <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-900 pb-1.5 font-black text-zinc-700 dark:text-zinc-300">
                    <span>LEDGER COMMIT RECORD</span>
                    <span>SUCCESS_0x00</span>
                  </div>
                  <div>
                    <span className="block font-black text-zinc-600 dark:text-zinc-500">TRANSMISSION_ID:</span>
                    <span className="text-zinc-800 dark:text-zinc-200 font-bold">SHA256_{Math.random().toString(16).substring(2,12).toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="block font-black text-zinc-600 dark:text-zinc-500">LEDGER BLOCK HEIGHT:</span>
                    <span className="text-zinc-800 dark:text-zinc-200 font-bold">{simulatedLedgerBlock} // SEC-LEDGER</span>
                  </div>
                  <div>
                    <span className="block font-black text-zinc-600 dark:text-zinc-500">AUTHENTICATION INDEX:</span>
                    <span className="text-zinc-800 dark:text-zinc-200 font-bold">GPG_RSA_SIGNED_MD5_COMPLIANT</span>
                  </div>
                </div>

                <button
                  id="success-back-button"
                  onClick={resetForm}
                  className="px-5 py-2.5 bg-zinc-950 dark:bg-white text-zinc-50 dark:text-zinc-950 font-mono text-[10px] font-black tracking-widest rounded-sm border border-zinc-700 dark:border-zinc-300 cursor-pointer"
                >
                  TRANSMIT ANOTHER COMMAND
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. COORDINATES & MAP PLATFORM INFO - 5 columns */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-1">
            <span className="font-mono text-[9px] font-bold text-cyan-600 dark:text-rose-500 tracking-widest block">
              [ SECURE_COORDINATES.cfg ]
            </span>
            <h2 className="font-sans text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              SOCIETY BASE PLATFORMS
            </h2>
            <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400">
              Technical centers with cleanrooms, spectrum gear, and orbital optics test suites. By invitation only.
            </p>
          </div>

          <div className="space-y-6">
            {offices.map((office, idx) => (
              <div
                id={`office-info-${idx}`}
                key={idx}
                className="p-5 bg-zinc-50 dark:bg-zinc-900/35 border border-zinc-200 dark:border-zinc-800 rounded-sm relative group overflow-hidden"
              >
                {/* Visual coordinate locator lines */}
                <div className="absolute top-0 right-0 p-4 font-mono text-[8.5px] text-zinc-400 dark:text-zinc-650 select-none">
                  0{idx + 1}_LOC
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-sans text-sm font-black text-zinc-900 dark:text-white flex items-center gap-1.5 group-hover:text-cyan-500 dark:group-hover:text-rose-500 transition-colors">
                    <MapPin className="w-4 h-4" />
                    {office.city}
                  </h3>
                  <div className="font-mono text-[9px] text-cyan-600 dark:text-rose-450 block font-bold">
                    GPS: {office.coords}
                  </div>
                  <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300 font-bold">
                    {office.address}
                  </p>
                  <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 pt-1 border-t border-zinc-200 dark:border-zinc-800 mt-1 style italic leading-relaxed">
                    {office.type}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Secure Technical Mailing list coordinates */}
          <div className="p-5 bg-zinc-950 text-zinc-300 rounded-sm border border-zinc-800 space-y-3">
            <div className="flex items-center space-x-2 text-cyan-400">
              <Terminal className="w-4 h-4" />
              <span className="font-mono text-[9px] font-black tracking-wider">TECTONIC EMAIL CHANNELS</span>
            </div>
            
            <p className="font-sans text-xs text-zinc-400 leading-relaxed font-normal">
              For security advisories or non-pitch research disclosures, please transmit to our symmetric key mailing list channels.
            </p>
            
            <div className="space-y-1.5 pt-2">
              <span className="block font-mono text-[9.5px] text-zinc-500 font-bold">GENERAL INQUIRY COMM:</span>
              <a 
                id="contact-general-comm"
                href="mailto:general@cyber.precision.example" 
                className="font-mono text-xs text-white hover:text-cyan-450 flex items-center gap-1 font-bold underline"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                general@cyber.precision.example
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
