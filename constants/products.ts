import type { StaticImageData } from 'next/image';
import { IMAGES } from './image';

export type Product = {
  id: string;
  name: string;
  tag: string;
  image: StaticImageData;
  // Short line for the shop card.
  summary: string;
  // Detail page content; optional sections are hidden when left out.
  description: string;
  longDescription?: string;
  price?: string;
  inside?: string[];
  cta?: string;
  // PayPal checkout link. Products without one send people to the contact page.
  paymentUrl?: string;
};

// Shown on every product page.
export const PRODUCT_NOTES = [
  'Limited copies available',
  'Delivery may take 1–2 weeks',
  'One per order (to reach more families)',
];

const PAYMENT_LINKS = {
  RESOURCES: 'https://www.paypal.com/ncp/payment/R8Q7R2VMN9GCL',
  TOTE_BAG: 'https://www.paypal.com/ncp/payment/CA3BB4PW2XBZ2',
  TSHIRT: 'https://www.paypal.com/ncp/payment/KFBVUJH285M3N',
};

const TSHIRT = {
  tag: 'Community',
  summary: 'Wear the Obimi message with pride.',
  description:
    'Wear the Obimi message with pride. Our comfortable Obimi T-shirt is designed for parents, carers, supporters and members of the SEND community. Perfect for events, community activities or everyday wear, it’s a simple way to show your support for stronger SEND families.',
  // longDescription: '£20 — Order yours today.',
  price: '£20 (Delivery fee applies)',
  cta: 'Order Now',
  paymentUrl: PAYMENT_LINKS.TSHIRT,
};

export const PRODUCTS: Product[] = [
  {
    id: 'pip-checklist',
    name: 'PIP - Personal Independent Payment Checklist',
    tag: 'Essential',
    image: IMAGES.PIP_CHECKLIST,
    summary:
      'A simple, practical way to organise your information and prepare for your PIP application step by step.',
    description:
      'Preparing for a Personal Independence Payment (PIP) application can feel overwhelming. Our PIP Checklist provides a simple, practical way to organise your information and work through your preparation step by step.',
    longDescription:
      'A helpful resource to keep you organised and prepared throughout your PIP journey.',
    price: '£10 (Delivery fee applies)',
    cta: 'Get Your PIP Checklist',
    paymentUrl: PAYMENT_LINKS.RESOURCES,
  },
  {
    ...TSHIRT,
    id: 'tshirt-yellow',
    name: 'Obimi T-Shirt Yellow',
    image: IMAGES.TSHIRT_YELLOW,
  },
  {
    ...TSHIRT,
    id: 'tshirt-purple',
    name: 'Obimi T-Shirt Purple',
    image: IMAGES.TSHIRT_PURPLE,
  },
  {
    ...TSHIRT,
    id: 'tshirt-black',
    name: 'Obimi T-Shirt Black',
    image: IMAGES.TSHIRT_BLACK,
  },
  {
    id: 'tote-bag',
    name: 'Obimi Tote Bag',
    tag: 'Eco-friendly',
    image: IMAGES.BAG,
    summary: 'Take the Obimi message wherever you go.',
    description:
      'Take the Obimi message wherever you go. Our practical and reusable tote bag is perfect for carrying your everyday essentials, whether you’re heading to an event, school, work or simply out and about.',
    // longDescription:
    //   '£10 — Practical, reusable and made to carry the essentials.',
    price: '£10 (Delivery fee applies)',
    cta: 'Order Now',
    paymentUrl: PAYMENT_LINKS.TOTE_BAG,
  },
  {
    id: 'digital-pack',
    name: 'SEND Support Resource Pack',
    tag: 'Digital',
    image: IMAGES.DIGITAL_PACK,
    summary: 'Three useful resources in one pack for just £10.',
    description:
      'Get practical resources designed to help you navigate your SEND journey with greater organisation and confidence. This resource pack includes EHCP Checklist, DLA Checklist and SEND Templates, giving you helpful tools to prepare, organise information and communicate more effectively.',
    // longDescription: 'Three useful resources in one pack for just £10.',
    price: '£10 (Delivery fee applies)',
    inside: ['EHCP Checklist', 'DLA Checklist', 'SEND Templates'],
    cta: 'Get Your Resource Pack',
    paymentUrl: PAYMENT_LINKS.RESOURCES,
  },
  {
    id: 'sensory-tent',
    name: 'Sensory tent for events',
    tag: 'Events',
    image: IMAGES.SENSORY_TENT,
    summary: 'A safe, calming space for sensory breaks at events.',
    description: 'A safe, calming space for sensory breaks at events.',
    cta: 'Enquire Now',
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
