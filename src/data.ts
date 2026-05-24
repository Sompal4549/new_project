/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioItem, Testimonial, FAQItem, TeamMember } from './types';
import imagesJson from './data/images.json';
import portfolioJson from './data/portfolio.json';
import teamJson from './data/team.json';
import testimonialsJson from './data/testimonials.json';
import faqJson from './data/faq.json';

// Exporting datasets loaded dynamically from JSON sources
export const IMAGES = imagesJson;
export const PORTFOLIO_DATA: PortfolioItem[] = portfolioJson as PortfolioItem[];
export const TEAM_MEMBERS: TeamMember[] = teamJson as TeamMember[];
export const TESTIMONIALS: Testimonial[] = testimonialsJson as Testimonial[];
export const FAQ_DATA: FAQItem[] = faqJson as FAQItem[];
