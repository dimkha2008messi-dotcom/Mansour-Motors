import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CameraAngle, CarFinish } from '../types/automotive';
import { MansourShowroomSection } from './MansourShowroomSection';
import { Phone, MapPin, Gauge, Zap, Shield, ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollytellingCanvasProps {
  currentAngle: CameraAngle;
  selectedFinish: CarFinish;
  onOpenInquiryModal: (vehicleName?: string) => void;
  onActiveSectionChange: (sectionIndex: number) => void;
}

export const ScrollytellingCanvas: React.FC<ScrollytellingCanvasProps> = ({
  currentAngle,
  selectedFinish,
  onOpenInquiryModal,
  onActiveSectionChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const hpCounterRef = useRef<HTMLSpanElement>(null);
  const secCounterRef = useRef<HTMLSpanElement>(null);
  const nmCounterRef = useRef<HTMLSpanElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  // GSAP ScrollTrigger timeline: Smooth, rock-solid, zero blur or darkening
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const video = videoRef.current;
      const heroTitle = heroTitleRef.current;
      const heroSubtitle = heroSubtitleRef.current;

      if (!video) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            if (p < 0.25) onActiveSectionChange(0);
            else if (p < 0.55) onActiveSectionChange(1);
            else if (p < 0.85) onActiveSectionChange(2);
            else onActiveSectionChange(3);
          },
        },
      });

      // SCENE 1 -> SCENE 2 : Hero text fades smoothly; Vehicle remains 100% rock-solid and stable
      tl.to(
        [heroTitle, heroSubtitle],
        {
          y: -30,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        'start'
      );

      // Numerical Counters: Crisp and precise
      const hpObj = { val: 0 };
      tl.to(
        hpObj,
        {
          val: 650,
          duration: 1.0,
          ease: 'power2.out',
          onUpdate: () => {
            if (hpCounterRef.current) {
              hpCounterRef.current.innerText = Math.round(hpObj.val).toString();
            }
          },
        },
        'stats'
      );

      const secObj = { val: 0 };
      tl.to(
        secObj,
        {
          val: 3.2,
          duration: 1.0,
          ease: 'power2.out',
          onUpdate: () => {
            if (secCounterRef.current) {
              secCounterRef.current.innerText = secObj.val.toFixed(1);
            }
          },
        },
        'stats'
      );

      const nmObj = { val: 0 };
      tl.to(
        nmObj,
        {
          val: 850,
          duration: 1.0,
          ease: 'power2.out',
          onUpdate: () => {
            if (nmCounterRef.current) {
              nmCounterRef.current.innerText = Math.round(nmObj.val).toString();
            }
          },
        },
        'stats'
      );

      // SECTION 3: When scrolling into the showroom grid, smoothly fade the fixed car background
      if (carWrapperRef.current) {
        tl.to(
          carWrapperRef.current,
          {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          'showroom'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [onActiveSectionChange]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505] selection:bg-white selection:text-black">
      {/* Subtle Studio Lighting without muddy filters */}
      <div className="ambient-light top-light opacity-15" />
      <div className="grid-floor opacity-60" />

      {/* Fixed Central Optical Vehicle Stage with Continuous 1080p Video Loop (Rock-Solid & Crisp) */}
      <div
        ref={carWrapperRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[1200px] z-20 flex justify-center items-center pointer-events-none hardware-accelerated"
      >
        <div className="relative w-full aspect-[16/9] flex items-center justify-center overflow-hidden">
          {/* Continuous Motion Design Video: 100% Clear & Sharp */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/car.png"
            className="w-full h-full object-contain select-none hardware-accelerated drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* SCROLLED CONTENT SECTIONS */}
      <main className="relative z-30 w-full">
        {/* SECTION 1: HERO MANSOUR MOTORS */}
        <section
          id="section-hero"
          className="min-h-screen w-full flex items-center justify-center relative pointer-events-none px-4 sm:px-6 py-20"
        >
          <div className="text-center pointer-events-auto max-w-4xl pt-16 sm:pt-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/60 sm:bg-white/[0.08] backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-neutral-300 mb-4 sm:mb-6">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
              <span>Route des Almadies · Dakar, Sénégal</span>
            </div>

            <h1
              ref={heroTitleRef}
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[0.12em] sm:tracking-[0.16em] uppercase text-white mb-3 sm:mb-4 text-balance drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] leading-tight"
            >
              L'EXCELLENCE
              <br />
              AUTOMOBILE
            </h1>
            <p
              ref={heroSubtitleRef}
              className="text-[11px] sm:text-sm md:text-base font-light tracking-[0.25em] sm:tracking-[0.35em] uppercase text-neutral-300 text-balance max-w-2xl mx-auto mb-6 sm:mb-8 px-2"
            >
              CONCESSIONNAIRE AUTOMOBILE DE PRESTIGE & SERVICES SAV À DAKAR
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto">
              <button
                onClick={() => onOpenInquiryModal('Visite Showroom Almadies')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-lg bg-white text-black hover:bg-neutral-200 transition-all text-xs font-mono tracking-wider sm:tracking-widest uppercase shadow-xl font-semibold active:scale-95 text-center"
              >
                Prendre Rendez-vous Showroom
              </button>

              <a
                href="tel:+221338600555"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-lg bg-black/60 sm:bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all text-xs font-mono tracking-wider sm:tracking-widest uppercase text-center"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+221 33 860 05 55</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 2: PERFORMANCE CLAIRE & NETTE */}
        <section
          id="section-performance"
          className="min-h-screen w-full flex items-center justify-center relative pointer-events-none px-4 sm:px-8 py-16 sm:py-20"
        >
          <div className="w-full max-w-5xl pointer-events-auto">
            {/* Header clair */}
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-amber-400 mb-2">
                <Gauge className="w-3.5 h-3.5" />
                <span>Télémétrie & Ingénierie Certifiée</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-semibold uppercase text-white tracking-wide">
                Performances Sans Compromis
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1 px-4">
                Données techniques validées sur banc d'essai et adaptées aux conditions du Sénégal.
              </p>
            </div>

            {/* Dashboard de métriques responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 mb-5 sm:mb-6">
              {/* Stat 1: Puissance */}
              <div className="p-4 sm:p-6 rounded-xl luxury-glass border border-white/15 flex flex-col justify-between">
                <div className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2 sm:mb-3 flex items-center justify-between">
                  <span>Puissance Moteur</span>
                  <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                </div>
                <div className="my-1 sm:my-2">
                  <div className="flex items-baseline gap-2">
                    <span ref={hpCounterRef} className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tabular-nums">
                      650
                    </span>
                    <span className="text-lg sm:text-xl font-semibold text-neutral-300">CH</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-neutral-400 font-mono mt-1">
                    V8 Biturbo Hybride Haute Pression
                  </div>
                </div>
                <div className="text-[10px] sm:text-[11px] text-neutral-500 pt-2 sm:pt-3 border-t border-white/10">
                  Régime maximal à 8 500 tr/min
                </div>
              </div>

              {/* Stat 2: Accélération */}
              <div className="p-4 sm:p-6 rounded-xl luxury-glass border border-white/15 flex flex-col justify-between">
                <div className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2 sm:mb-3 flex items-center justify-between">
                  <span>Accélération 0-100</span>
                  <Gauge className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                </div>
                <div className="my-1 sm:my-2">
                  <div className="flex items-baseline gap-2">
                    <span ref={secCounterRef} className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tabular-nums">
                      3.2
                    </span>
                    <span className="text-lg sm:text-xl font-semibold text-neutral-300">SEC</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-neutral-400 font-mono mt-1">
                    Départ arrêté avec Launch Control
                  </div>
                </div>
                <div className="text-[10px] sm:text-[11px] text-neutral-500 pt-2 sm:pt-3 border-t border-white/10">
                  Vitesse maximale : 345 km/h
                </div>
              </div>

              {/* Stat 3: Couple & Motricité */}
              <div className="p-4 sm:p-6 rounded-xl luxury-glass border border-white/15 flex flex-col justify-between sm:col-span-2 lg:col-span-1">
                <div className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2 sm:mb-3 flex items-center justify-between">
                  <span>Couple & Traction</span>
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                </div>
                <div className="my-1 sm:my-2">
                  <div className="flex items-baseline gap-2">
                    <span ref={nmCounterRef} className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tabular-nums">
                      850
                    </span>
                    <span className="text-lg sm:text-xl font-semibold text-neutral-300">NM</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-neutral-400 font-mono mt-1">
                    Transmission Intégrale AWD 4x4
                  </div>
                </div>
                <div className="text-[10px] sm:text-[11px] text-neutral-500 pt-2 sm:pt-3 border-t border-white/10">
                  Boîte sport à double embrayage
                </div>
              </div>
            </div>

            {/* Garanties Mansour Motors claires responsive */}
            <div className="p-4 rounded-xl luxury-glass-subtle border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-around gap-2 sm:gap-4 text-xs font-mono text-neutral-300">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Contrôle certifié en 150 points</span>
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Garantie SAV Route des Almadies</span>
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dédouanement et carte grise Sénégal</span>
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 3: SHOWROOM DAKAR & VÉHICULES EXACTS */}
        <section id="section-design" className="min-h-screen w-full relative pointer-events-auto py-20 bg-black/80 backdrop-blur-md border-t border-white/10">
          <MansourShowroomSection
            onSelectVehicle={(v) => onOpenInquiryModal(v.name)}
            onOpenInquiry={(vName) => onOpenInquiryModal(vName)}
          />
        </section>

        {/* SECTION 4: CONTACT & CONCIERGERIE PRIVÉE */}
        <section
          id="section-final"
          className="min-h-screen w-full flex items-center justify-center relative pointer-events-none px-6 py-20"
        >
          <div className="text-center pointer-events-auto max-w-3xl p-8 rounded-2xl luxury-glass border border-white/15">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400 uppercase mb-3">
              <span>Showroom Mansour Motors</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-wide uppercase text-white mb-4">
              Votre Véhicule d'Exception à Dakar
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light mb-8 max-w-xl mx-auto leading-relaxed">
              Venez essayer nos modèles d'exception au Showroom de la Route des Almadies ou réservez votre location de luxe avec chauffeur privé.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenInquiryModal('Réservation Prioritaire Showroom')}
                className="px-8 py-3.5 rounded-lg text-xs font-semibold tracking-[0.2em] uppercase text-black bg-white hover:bg-neutral-200 transition-all shadow-xl"
              >
                Prendre Rendez-vous
              </button>

              <a
                href="tel:+221338600555"
                className="flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-mono tracking-wider uppercase text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+221 33 860 05 55</span>
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-xs font-mono text-neutral-400">
              Route des Almadies (Près Vogue Lounge & Bio 24), Dakar · info@mansourmotors.sn
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
