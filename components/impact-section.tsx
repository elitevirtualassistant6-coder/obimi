'use client';

import { Tv } from 'lucide-react';
import { type ReactNode, useEffect, useRef } from 'react';

type Stat = {
  value: ReactNode;
  label: string;
};

const stats: Stat[] = [
  { value: '200+', label: 'Members' },
  { value: '60', label: 'Parents supported' },
  { value: '4', label: 'Events supported' },
  { value: '1', label: 'Presentation at the SEND Show' },
  {
    value: <Tv className='w-14 h-14 md:w-16 md:h-16' strokeWidth={1.25} />,
    label: 'Spoke on national TV',
  },
  { value: '1', label: 'Autism outreach in Nigeria' },
  { value: '5,000+', label: 'Followers on social media' },
];

// Auto-slide speed in px per second, and how long to wait after the user
// scrolls before auto-sliding resumes.
const SPEED = 40;
const RESUME_DELAY = 3000;

function StatList({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className='flex shrink-0 gap-10 md:gap-24 pr-10 md:pr-24'
    >
      {stats.map((stat) => (
        <li
          key={stat.label}
          className='group flex flex-col items-center text-center min-w-[160px] max-w-[220px] gap-4'
        >
          <span className='h-20 flex items-center text-6xl md:text-7xl font-heading font-light text-white transition-transform duration-300 group-hover:scale-125'>
            {stat.value}
          </span>
          <span className='text-lg font-sans font-bold text-secondary leading-snug'>
            {stat.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ImpactSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // The track holds the list three times. Keeping the scroll position inside
    // the middle copy makes the loop seamless in both directions.
    const listWidth = () =>
      (el.querySelector('ul') as HTMLElement | null)?.offsetWidth ?? 0;
    const wrap = (x: number) => {
      const w = listWidth();
      return w ? w + ((((x - w) % w) + w) % w) : 0;
    };

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Unwrapped position; only the value written to scrollLeft is wrapped.
    let pos = listWidth();
    let lastSet = -1;
    let hovering = false;
    let dragging = false;
    let pausedUntil = 0;
    let last = performance.now();
    let frame = 0;

    const apply = () => {
      el.scrollLeft = wrap(pos);
      lastSet = el.scrollLeft;
    };
    apply();

    const pause = () => {
      pausedUntil = performance.now() + RESUME_DELAY;
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;

      const stopped =
        reducedMotion.matches ||
        document.documentElement.classList.contains('acc-disable-animations');
      if (!stopped && !hovering && !dragging && now > pausedUntil) {
        pos += SPEED * dt;
        apply();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    // Native scrolling (touch, trackpad, keyboard) moves scrollLeft directly.
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - lastSet) < 2) return;
      pos = el.scrollLeft;
      pause();
      if (Math.abs(wrap(pos) - pos) > 1) apply();
      else lastSet = el.scrollLeft;
    };

    // Mouse drag; touch uses native scrolling instead.
    let dragStartX = 0;
    let dragStartPos = 0;
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragging = true;
      dragStartX = e.clientX;
      dragStartPos = pos;
      el.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      pos = dragStartPos - (e.clientX - dragStartX);
      apply();
    };
    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      pause();
    };
    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };


    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('focusin', onEnter);
    el.addEventListener('focusout', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('focusin', onEnter);
      el.removeEventListener('focusout', onLeave);
    };
  }, []);

  return (
    <section className='py-24 bg-gradient-to-b from-primary to-brand-deep overflow-hidden'>
      <div data-aos='fade-up' className='text-center mb-16 px-6'>
        <p className='text-2xl md:text-3xl uppercase tracking-[0.3em] text-white/80 font-sans'>
          1 year of
        </p>
        <h2 className='text-4xl md:text-5xl font-heading font-bold text-white'>
          Impact
        </h2>
      </div>

      <div
        ref={scrollerRef}
        role='region'
        aria-label='Our impact in numbers'
        tabIndex={0}
        className='overflow-x-auto py-4 cursor-grab active:cursor-grabbing select-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
      >
        <div className='flex w-max'>
          <StatList />
          <StatList duplicate />
          <StatList duplicate />
        </div>
      </div>
    </section>
  );
}
