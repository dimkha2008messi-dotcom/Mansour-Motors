import React, { useState } from 'react';
import { CameraAngle, Hotspot } from '../types/automotive';
import { X, ChevronRight, Zap } from 'lucide-react';

interface InteractiveHotspotsProps {
  currentAngle: CameraAngle;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'aero-splitter',
    title: 'Front Carbon Venturi Splitter',
    category: 'Aerodynamics',
    description: 'Autonomous front splitter flaps adjust continuously at speeds above 120 km/h, generating up to 210 kg of front axle downforce with minimal drag penalty.',
    specs: [
      { label: 'Downforce', value: '210 kg @ 250 km/h' },
      { label: 'Material', value: 'Forged Pre-preg Carbon' },
      { label: 'Actuation', value: 'Active Electric 12V' },
    ],
    x: 48,
    y: 72,
    angle: 'front',
  },
  {
    id: 'matrix-lights',
    title: 'Y-Blade Matrix Laser Headlights',
    category: 'Lighting System',
    description: 'Signature Y-shaped LED light blades housing micro-mirror digital laser modules with 600m adaptive high-beam reach and dark studio illumination.',
    specs: [
      { label: 'Luminous Flux', value: '18,000 Lumens' },
      { label: 'Technology', value: 'Adaptive Laser Matrix' },
      { label: 'Optics', value: 'Anti-Glare Selective Beam' },
    ],
    x: 35,
    y: 44,
    angle: 'front',
  },
  {
    id: 'ceramic-brakes',
    title: 'Carbon Ceramic Brembo CCM-R',
    category: 'Chassis & Dynamics',
    description: '420mm drilled carbon ceramic discs paired with 10-piston forged monobloc calipers. Zero fade endurance under brutal track stress.',
    specs: [
      { label: 'Front Discs', value: '420 x 40 mm CCM-R' },
      { label: 'Calipers', value: '10-Piston Monobloc' },
      { label: '100-0 km/h', value: '29.5 meters' },
    ],
    x: 72,
    y: 65,
    angle: 'profile',
  },
  {
    id: 'carbon-tub',
    title: 'Full Monocoque Carbon Monofuselage',
    category: 'Structure',
    description: 'Aerospace-grade autoclave carbon monocoque with forged composite crash structures, delivering 46,000 Nm/degree torsional stiffness.',
    specs: [
      { label: 'Torsional Rigidity', value: '46,000 Nm/deg' },
      { label: 'Tub Weight', value: '82.5 kg' },
      { label: 'Crash Structure', value: 'Forged Carbon Cone' },
    ],
    x: 52,
    y: 48,
    angle: 'cockpit',
  },
  {
    id: 'titanium-exhaust',
    title: 'Inconel & Titanium Exhaust System',
    category: 'Powertrain Acoustics',
    description: 'Central dual-pipe high-mounted exhaust crafted from 0.8mm aerospace Inconel alloy with variable backpressure valving for acoustic resonance.',
    specs: [
      { label: 'Weight Saving', value: '-14.8 kg vs Steel' },
      { label: 'Backpressure', value: 'Acoustic Valved' },
      { label: 'Coating', value: 'Ceramic Thermal Barrier' },
    ],
    x: 50,
    y: 62,
    angle: 'rear',
  },
];

export const InteractiveHotspots: React.FC<InteractiveHotspotsProps> = ({ currentAngle }) => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const visibleHotspots = HOTSPOTS.filter((h) => h.angle === currentAngle);

  return (
    <>
      {/* Hotspot Markers */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {visibleHotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <button
              onClick={() => setActiveHotspot(hotspot)}
              className="relative group p-2 focus:outline-none"
              title={hotspot.title}
              aria-label={`Inspect ${hotspot.title}`}
            >
              <span className="absolute inset-0 rounded-full bg-white/20 animate-ping group-hover:bg-white/40" />
              <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-black/80 border border-white/60 text-white text-[10px] font-mono group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                +
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Hotspot Drawer/Modal Info */}
      {activeHotspot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg p-6 lg:p-8 luxury-glass rounded-xl border border-white/15 text-white shadow-2xl">
            <button
              onClick={() => setActiveHotspot(null)}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Close hotspot information"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-2">
              <Zap className="w-3.5 h-3.5 text-white" />
              <span>{activeHotspot.category}</span>
            </div>

            <h3 className="text-xl lg:text-2xl font-semibold tracking-wide text-white mb-3">
              {activeHotspot.title}
            </h3>

            <p className="text-sm text-neutral-300 leading-relaxed font-light mb-6">
              {activeHotspot.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
              {activeHotspot.specs.map((spec, idx) => (
                <div key={idx} className="p-3 rounded bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
                    {spec.label}
                  </div>
                  <div className="text-sm font-semibold text-white mt-1 tabular-nums">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveHotspot(null)}
                className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-white/90 hover:text-white"
              >
                Close Technical Inspector
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
