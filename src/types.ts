/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PortfolioItem {
  id: string;
  name: string;
  category: 'cyber' | 'precision' | 'space' | 'robotics';
  tagline: string;
  description: string;
  fundingStage: string;
  founded: string;
  logoUrl: string;
  tags: string[];
  website: string;
  headquarters: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  quote: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  specialty: string;
  publicKeyFingerprint?: string;
}

export type ActiveTab = 'home' | 'services' | 'about' | 'portfolio' | 'contact';
