import React from 'react';
import { CameraAngle } from '../types/automotive';

interface MotionDesignOverlayProps {
  isActive: boolean;
  currentAngle: CameraAngle;
}

export const MotionDesignOverlay: React.FC<MotionDesignOverlayProps> = ({
  isActive,
  currentAngle,
}) => {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden select-none">
      {/* Laser Telemetry Scan Line */}
      <div className="laser-scan-line" />

      {/* Optical Reticles in 4 Corners */}
      <div className="reticle-corner top-4 left-4 border-t-2 border-l-2" />
      <div className="reticle-corner top-4 right-4 border-t-2 border-r-2" />
      <div className="reticle-corner bottom-4 left-4 border-b-2 border-l-2" />
      <div className="reticle-corner bottom-4 right-4 border-b-2 border-r-2" />

      {/* Center Symmetrical Crosshair with Technical Coordinates */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40">
        <div className="w-20 h-20 border border-white/20 rounded-full flex items-center justify-center">
          <div className="w-8 h-[1px] bg-white/40" />
          <div className="h-8 w-[1px] bg-white/40 absolute" />
        </div>
      </div>

      {/* Technical HUD Floating Telemetry Markers */}
      <div className="absolute top-6 right-6 text-right font-mono text-[10px] text-neutral-400 space-y-1">
        <div className="flex items-center justify-end gap-1.5 text-white">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="tracking-wider">MANSOUR MOTORS // DAKAR</span>
        </div>
        <div className="tracking-widest">ALMADIES CAD-SURFACE V2.4</div>
        <div className="tabular-nums text-neutral-500">AXIS: LOCKED [0.00, 0.00]</div>
        <div className="tabular-nums text-neutral-500">OPTICAL: 50MM TELEPHOTO</div>
      </div>

      <div className="absolute bottom-6 left-6 font-mono text-[10px] text-neutral-400 space-y-1">
        <div className="tracking-widest text-white">AERODYNAMIC TELEMETRY</div>
        <div className="tabular-nums text-neutral-400">DOWNFORCE: 480 KG @ 250 KM/H</div>
        <div className="tabular-nums text-neutral-500">DRAG COEFF: 0.31 Cd ACTIVE</div>
      </div>

      {/* Motion Design SVG Flow Lines over Hood & Flanks */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        viewBox="0 0 1000 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Aerodynamic Airflow Streamlines */}
        <path
          d="M 150 320 C 300 290, 420 270, 500 270 C 580 270, 700 290, 850 320"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1.2"
          strokeDasharray="6 6"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>

        <path
          d="M 220 370 C 350 340, 440 320, 500 320 C 560 320, 650 340, 780 370"
          stroke="rgba(59, 130, 246, 0.5)"
          strokeWidth="1.5"
          strokeDasharray="8 8"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="120"
            to="0"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </path>

        <path
          d="M 310 420 C 400 390, 470 375, 500 375 C 530 375, 600 390, 690 420"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1"
          strokeDasharray="4 4"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="80"
            to="0"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};
