import type { Testimonial } from '@/types';

/**
 * Hand-entered reviews.
 *
 * HOW TO ADD ONE — just paste the review into chat in any shape, e.g.
 *
 *   "5 stars, Google, Jane D. — Paul was on time and explained everything."
 *
 * and it gets added here as a block like the ones below. Fields:
 *   name    reviewer as they'd like to be shown ("Jane D." is fine)
 *   role    'Client' | 'Real estate agent' | 'Seller' | a town — whatever fits
 *   quote   the review text, verbatim (light typo fixes only)
 *   rating  1–5
 *   source  'google' | 'spectora'
 *
 * Live Google reviews are ALSO pulled automatically (see services/reviews.ts);
 * if a review appears in both places it is shown once. Google only returns a
 * business's 5 "most relevant" reviews, so older Google reviews belong here.
 *
 * Newest first — the first entry leads the carousel.
 */
export const reviews: Testimonial[] = [
  {
    name: 'Larry B.',
    role: 'Client',
    quote:
      'Great, thorough job! Explained everything well and was very courteous. We will gladly recommend your service to anyone needing or wanting a home inspection.',
    rating: 5,
    source: 'spectora',
  },
  {
    name: 'Melissa J.',
    role: 'Real estate agent',
    quote:
      'Love working with Paul! He answers his phone and communicates well with the buyers and the agents!',
    rating: 5,
    source: 'spectora',
  },
  {
    name: 'Cody H.',
    role: 'Client',
    quote:
      'Extremely thorough! Answered all of our questions and explained everything to us. Highly recommend PC Pro to anybody looking for their new home!',
    rating: 5,
    source: 'spectora',
  },
  {
    name: 'Missy W.',
    role: 'Client',
    quote: 'Paul was great and very thorough and explained everything to us.',
    rating: 5,
    source: 'spectora',
  },
  {
    name: 'Jakob & Bailey S.',
    role: 'Client',
    quote: 'Very detailed and well put together.',
    rating: 5,
    source: 'spectora',
  },
  {
    name: 'Sandy S.',
    role: 'Client',
    quote: 'Clearly explained what he observed and the condition of the property.',
    rating: 5,
    source: 'spectora',
  },
];
