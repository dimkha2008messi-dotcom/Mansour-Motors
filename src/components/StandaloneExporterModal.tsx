import React, { useState } from 'react';
import { X, Copy, Download, Check, FileCode, ExternalLink } from 'lucide-react';

interface StandaloneExporterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StandaloneExporterModal: React.FC<StandaloneExporterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AURA GT - Premium Automotive Experience</title>
    <link rel="stylesheet" href="style.css">
    
    <!-- Polices Google Fonts pour un look premium -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;600&display=swap" rel="stylesheet">
</head>
<body>

    <!-- Éléments d'ambiance (Parallaxe) -->
    <div class="ambient-light top-light"></div>
    <div class="ambient-light bottom-light"></div>
    <div class="vertical-led-bar led-bar-left"></div>
    <div class="vertical-led-bar led-bar-right"></div>
    <div class="grid-floor"></div>

    <!-- Conteneur principal fixe pour l'effet "Scrollytelling" -->
    <main class="viewport">
        
        <!-- La Voiture (Fixe au centre, animée par GSAP) -->
        <div class="car-wrapper">
            <img src="assets/car.png" alt="AURA GT Supercar Noire Premium" class="car-image" id="hero-car">
            <div class="car-reflection"></div>
        </div>

        <!-- SECTION 1: HERO -->
        <section class="section hero-section" data-index="0">
            <div class="content-box">
                <span style="font-size: 0.75rem; letter-spacing: 0.3em; opacity: 0.8; text-transform: uppercase; display: block; margin-bottom: 0.5rem;">Mansour Motors · Route des Almadies, Dakar</span>
                <h1 class="hero-title">L'EXCELLENCE AUTOMOBILE</h1>
                <p class="hero-subtitle">PRESTIGE, PERFORMANCE ET INGÉNIERIE SANS COMPROMIS</p>
            </div>
        </section>

        <!-- SECTION 2: PERFORMANCE -->
        <section class="section performance-section" data-index="1">
            <div class="stats-container">
                <div class="stat-item">
                    <span class="stat-value" data-target="650">0</span>
                    <span class="stat-unit">HP</span>
                    <span class="stat-desc">PUISSANCE PURE</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value" data-target="3.2">0</span>
                    <span class="stat-unit">SEC</span>
                    <span class="stat-desc">0 À 100 KM/H</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value text-only">AWD</span>
                    <span class="stat-unit">SYSTEM</span>
                    <span class="stat-desc">TRACTION INTEGRALE</span>
                </div>
            </div>
        </section>

        <!-- SECTION 3: DESIGN -->
        <section class="section design-section" data-index="2">
            <div class="content-box design-text">
                <h2 class="design-title">DESIGNED WITHOUT<br>COMPROMISE</h2>
            </div>
        </section>

        <!-- SECTION 4: FINAL -->
        <section class="section final-section" data-index="3">
            <div class="content-box">
                <h2 class="final-title">DISCOVER THE FUTURE</h2>
                <button class="cta-button" onclick="alert('Allocation Concierge Ready')">EXPLORE</button>
            </div>
        </section>

    </main>

    <!-- Scripts GSAP (Moteur d'animation) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="script.js"></script>
</body>
</html>`;

  const cssContent = `/* --- RESET & BASE --- */
:root {
    --bg-color: #050505;
    --text-color: #ffffff;
    --accent-color: #ffffff;
    --font-main: 'Montserrat', sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: var(--font-main);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
}

/* --- AMBIANCE & BACKGROUND --- */
.ambient-light {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    width: 80vw;
    height: 40vh;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.15;
    z-index: -2;
    pointer-events: none;
}

.top-light {
    top: -20vh;
    background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
}

.bottom-light {
    bottom: -20vh;
    background: radial-gradient(circle, rgba(100,100,100,0.5) 0%, transparent 70%);
}

.vertical-led-bar {
    position: fixed;
    top: 15%;
    height: 70vh;
    width: 2px;
    background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.7) 60%, transparent 100%);
    filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.6));
    z-index: -1;
    pointer-events: none;
    opacity: 0.35;
}
.led-bar-left { left: 5%; }
.led-bar-right { right: 5%; }

.grid-floor {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40vh;
    background: linear-gradient(to top, rgba(255,255,255,0.03) 0%, transparent 100%);
    z-index: -1;
    pointer-events: none;
}

/* --- VIEWPORT & CAR WRAPPER --- */
.viewport {
    position: relative;
    width: 100%;
}

.car-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 1200px;
    height: auto;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
}

.car-image {
    width: 100%;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 20px 50px rgba(0,0,0,0.8));
    will-change: transform, opacity, filter;
}

/* --- SECTIONS (ESPACE DE SCROLL) --- */
.section {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 20;
    pointer-events: none;
}

.content-box {
    text-align: center;
    pointer-events: auto;
    padding: 2rem;
}

/* --- TYPOGRAPHY & ELEMENTS --- */
.hero-title {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 600;
    letter-spacing: 0.2em;
    margin-bottom: 1rem;
    text-transform: uppercase;
    opacity: 1;
}

.hero-subtitle {
    font-size: clamp(0.8rem, 1.5vw, 1.2rem);
    font-weight: 300;
    letter-spacing: 0.5em;
    opacity: 0.7;
    text-transform: uppercase;
}

/* Performance Stats */
.stats-container {
    display: flex;
    gap: 4rem;
    justify-content: center;
    flex-wrap: wrap;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    transform: translateY(30px);
}

.stat-value {
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 200;
    line-height: 1;
}

.stat-unit {
    font-size: 1rem;
    letter-spacing: 0.2em;
    margin-top: 0.5rem;
    opacity: 0.6;
}

.stat-desc {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    margin-top: 0.5rem;
    opacity: 0.4;
    text-transform: uppercase;
}

/* Design Section */
.design-title {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 300;
    line-height: 1.4;
    letter-spacing: 0.1em;
    opacity: 0;
    transform: scale(0.9);
}

/* Final Section */
.final-title {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 400;
    letter-spacing: 0.15em;
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(20px);
}

.cta-button {
    background: transparent;
    color: white;
    border: 1px solid rgba(255,255,255,0.3);
    padding: 1.2rem 3rem;
    font-size: 0.9rem;
    letter-spacing: 0.3em;
    font-family: var(--font-main);
    cursor: pointer;
    transition: all 0.4s ease;
    text-transform: uppercase;
    opacity: 0;
    transform: translateY(20px);
}

.cta-button:hover {
    background: white;
    color: black;
    border-color: white;
    box-shadow: 0 0 30px rgba(255,255,255,0.2);
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
    .stats-container {
        gap: 2rem;
    }
    .car-wrapper {
        width: 100vw;
    }
}

/* --- ACCESSIBILITÉ (Reduced Motion) --- */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
    .section {
        height: auto;
        min-height: 100vh;
        padding: 4rem 0;
    }
    .car-wrapper {
        position: relative;
        top: auto;
        left: auto;
        transform: none;
        margin: 2rem 0;
    }
    .hero-title, .hero-subtitle, .stat-item, .design-title, .final-title, .cta-button {
        opacity: 1 !important;
        transform: none !important;
    }
}`;

  const jsContent = `// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", () => {
    
    // Enregistrement du plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Vérification préférence mouvement réduit
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // --- TIMELINE GLOBALE ---
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1, 
        }
    });

    // ÉLÉMENTS DOM
    const car = document.getElementById("hero-car");
    const heroTitle = document.querySelector(".hero-title");
    const heroSubtitle = document.querySelector(".hero-subtitle");
    const stats = document.querySelectorAll(".stat-item");
    const designTitle = document.querySelector(".design-title");
    const finalTitle = document.querySelector(".final-title");
    const ctaBtn = document.querySelector(".cta-button");
    const topLight = document.querySelector(".top-light");

    // --- ANIMATION 1 : HERO -> PERFORMANCE ---
    tl.to([heroTitle, heroSubtitle], {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    }, "start")

    .to(car, {
        scale: 1.1,
        y: 20,
        duration: 1.5,
        ease: "power2.out"
    }, "start")

    .to(topLight, {
        opacity: 0.05,
        duration: 1
    }, "start");


    // --- ANIMATION 2 : APPARITION DES STATS ---
    stats.forEach((stat, i) => {
        tl.to(stat, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, \`stats+=\${i * 0.2}\`);
        
        const valueSpan = stat.querySelector(".stat-value:not(.text-only)");
        if(valueSpan) {
            const targetVal = parseFloat(valueSpan.getAttribute("data-target"));
            const isDecimal = targetVal % 1 !== 0;
            
            let counter = { val: 0 };
            tl.to(counter, {
                val: targetVal,
                duration: 1,
                ease: "power2.out",
                onUpdate: function() {
                    valueSpan.innerText = isDecimal ? counter.val.toFixed(1) : Math.round(counter.val);
                }
            }, \`stats+=\${i * 0.2}\`);
        }
    });


    // --- ANIMATION 3 : TRANSITION DESIGN ---
    tl.to(car, {
        scale: 1.25,
        filter: "brightness(0.8)",
        duration: 1.5,
        ease: "power3.inOut"
    }, "design")

    .to(designTitle, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "expo.out"
    }, "design");


    // --- ANIMATION 4 : FINAL REVEAL ---
    tl.to(car, {
        scale: 1,
        y: 0,
        filter: "brightness(1)",
        duration: 1.5,
        ease: "power3.out"
    }, "final")

    .to([finalTitle, ctaBtn], {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    }, "final-=0.5");
});`;

  const activeContent =
    activeTab === 'html' ? htmlContent : activeTab === 'css' ? cssContent : jsContent;
  const filename =
    activeTab === 'html' ? 'index.html' : activeTab === 'css' ? 'style.css' : 'script.js';
  const mimeType =
    activeTab === 'html'
      ? 'text/html'
      : activeTab === 'css'
      ? 'text/css'
      : 'application/javascript';

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(activeTab);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col luxury-glass rounded-2xl border border-white/15 text-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-white" />
            <div>
              <h2 className="text-base font-semibold tracking-wider uppercase text-white">
                Standalone Local Package (Vanilla HTML / CSS / JS)
              </h2>
              <p className="text-xs text-neutral-400">
                Direct browser opening, zero build-step requirement, GSAP CDN powered.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector & Actions */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-black/20">
          <div className="flex items-center gap-2">
            {(['html', 'css', 'js'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab === 'html' ? 'index.html' : tab === 'css' ? 'style.css' : 'script.js'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(activeContent)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-mono transition-colors"
            >
              {copied === activeTab ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied === activeTab ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white text-black text-xs font-mono font-medium hover:bg-neutral-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {filename}</span>
            </button>
          </div>
        </div>

        {/* Code Content Viewer */}
        <div className="flex-1 overflow-y-auto p-6 bg-black/50">
          <pre className="font-mono text-xs text-neutral-200 leading-relaxed overflow-x-auto select-all">
            <code>{activeContent}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
