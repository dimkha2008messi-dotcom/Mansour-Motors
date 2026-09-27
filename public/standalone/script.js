// Attendre que le DOM soit chargé
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
        }, `stats+=${i * 0.2}`);
        
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
            }, `stats+=${i * 0.2}`);
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
});
