import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Heart,
  Info,
  Package,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from 'lucide-react';
import { getProduct, PRODUCT_NOTES, PRODUCTS } from '@/constants/products';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).id);
  if (!product) return {};
  return {
    title: `${product.name} | Shop | Obimi`,
    description: product.description,
  };
}

export default async function Page({ params }: Props) {
  const product = getProduct((await params).id);
  if (!product) notFound();

  return (
    <div className='bg-white min-h-screen pt-32 pb-24'>
      {/* Breadcrumbs & Back Button */}
      <section className='max-w-[1440px] mx-auto px-6 md:px-12 mb-12'>
        <Link
          href='/shop'
          className='inline-flex items-center gap-2 text-gray-500 hover:text-brand-deep font-bold mb-8 transition-colors group'
        >
          <ArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform' />
          <span>Back to Shop</span>
        </Link>
      </section>

      {/* Product Section */}
      <section className='max-w-[1440px] mx-auto px-6 md:px-12 mb-32'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-16'>
          {/* Product Image */}
          <div data-aos='zoom-in' className='lg:col-span-6'>
            <div className='relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm group'>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className='object-cover group-hover:scale-105 transition-transform duration-700'
              />
              <div data-aos='fade-down' data-aos-delay='300' className='absolute top-8 left-8 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-brand-deep shadow-sm'>
                Mission-Driven Product
              </div>
            </div>
          </div>

          {/* Product Content */}
          <div className='lg:col-span-6 flex flex-col justify-center'>
            <div data-aos='fade-down' className='inline-flex items-center gap-2 px-4 py-2 text-brand-deep text-sm font-bold mb-6'>
              <Sparkles className='w-4 h-4' />
              <span>{product.tag}</span>
            </div>
            <h1 data-aos='fade-right' className='text-4xl md:text-6xl font-bold font-heading text-brand-deep mb-6 leading-tight'>
              {product.name}
            </h1>
            {product.price && (
              <p data-aos='fade-up' data-aos-delay='200' className='text-3xl font-bold text-brand-deep mb-8'>
                {product.price}
              </p>
            )}

            <div data-aos='fade-up' data-aos-delay='300' className='prose prose-lg max-w-none text-gray-600 leading-relaxed mb-10'>
              <p className='text-xl font-medium text-brand-deep mb-4'>
                {product.description}
              </p>
              {product.longDescription && <p>{product.longDescription}</p>}
            </div>

            {/* What's Inside */}
            {product.inside && (
              <div data-aos='fade-up' data-aos-delay='400' className='mb-12'>
                <h3 className='text-xl font-bold font-heading text-brand-deep mb-6 flex items-center gap-2'>
                  <Package className='w-5 h-5 text-brand-deep' />
                  What’s Inside:
                </h3>
                <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {product.inside.map((item, i) => (
                    <li
                      key={i}
                      data-aos='fade-up'
                      data-aos-delay={500 + i * 100}
                      className='flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100'
                    >
                      <CheckCircle2 className='w-5 h-5 text-brand-deep flex-shrink-0' />
                      <span className='font-medium text-gray-700'>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Important Notes */}
            {PRODUCT_NOTES.length > 0 && (
              <div data-aos='zoom-in' data-aos-delay='600' className='mb-12 p-6 bg-brand-yellow/10 rounded-[2rem] border border-brand-yellow/20'>
                <h3 className='text-lg font-bold font-heading text-brand-deep mb-4 flex items-center gap-2'>
                  <Info className='w-5 h-5 text-brand-yellow-dark' />
                  Important Notes:
                </h3>
                <ul className='space-y-2'>
                  {PRODUCT_NOTES.map((note, i) => (
                    <li
                      key={i}
                      className='flex items-center gap-2 text-sm text-brand-deep/70 font-medium'
                    >
                      <div className='w-1.5 h-1.5 rounded-full bg-brand-yellow-dark' />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div data-aos='fade-up' data-aos-delay='700' className='flex flex-col gap-4'>
              <Link
                href={product.paymentUrl ?? '/contact'}
                {...(product.paymentUrl && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
                className='w-full py-6 bg-brand-deep text-white font-bold rounded-full hover:bg-brand-deep transition-all flex items-center justify-center gap-3 group shadow-xl shadow-brand-deep/10'
              >
                <ShoppingBag className='w-6 h-6' />
                <span>{product.cta ?? 'Order Now'}</span>
                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </Link>

              {/* Donation Option */}
              <div data-aos='fade-up' data-aos-delay='800' className='p-8 bg-brand-deep/5 rounded-[2.5rem] border border-brand-deep/10 mt-4'>
                <div className='flex items-center gap-3 mb-4'>
                  <Heart className='w-6 h-6 text-brand-deep' />
                  <h4 className='text-xl font-bold text-brand-deep'>
                    Support Our Work
                  </h4>
                </div>
                <p className='text-gray-600 mb-6'>
                  If you'd like to support our work, you can add a donation to
                  your order. Every contribution helps us reach more families in
                  need.
                </p>
                <button className='w-full py-4 bg-white border-2 border-brand-deep text-brand-deep font-bold rounded-full hover:bg-brand-deep hover:text-white transition-all'>
                  Add Donation to Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Impact Section */}
      <section className='max-w-[1440px] mx-auto px-6 md:px-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div data-aos='fade-up' className='p-10 bg-gray-50 rounded-[3rem] border border-gray-100 text-center'>
            <div className='w-16 h-16 rounded-full bg-white flex items-center justify-center text-brand-deep shadow-sm mx-auto mb-6'>
              <Truck className='w-8 h-8' />
            </div>
            <h4 className='text-xl font-bold text-brand-deep mb-3'>
              Safe Delivery
            </h4>
            <p className='text-gray-500'>
              We ensure your order reaches you safely and securely.
            </p>
          </div>
          <div data-aos='fade-up' data-aos-delay='100' className='p-10 bg-gray-50 rounded-[3rem] border border-gray-100 text-center'>
            <div className='w-16 h-16 rounded-full bg-white flex items-center justify-center text-brand-deep shadow-sm mx-auto mb-6'>
              <ShieldCheck className='w-8 h-8' />
            </div>
            <h4 className='text-xl font-bold text-brand-deep mb-3'>
              Verified Content
            </h4>
            <p className='text-gray-500'>
              All information is reviewed by experts and parents.
            </p>
          </div>
          <div data-aos='fade-up' data-aos-delay='200' className='p-10 bg-gray-50 rounded-[3rem] border border-gray-100 text-center'>
            <div className='w-16 h-16 rounded-full bg-white flex items-center justify-center text-brand-deep shadow-sm mx-auto mb-6'>
              <Heart className='w-8 h-8' />
            </div>
            <h4 className='text-xl font-bold text-brand-deep mb-3'>
              100% Impact
            </h4>
            <p className='text-gray-500'>
              Every penny goes directly back into supporting SEND families.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
