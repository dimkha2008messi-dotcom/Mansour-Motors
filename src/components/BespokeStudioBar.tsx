import React from 'react';
import { CameraAngle, CarFinish } from '../types/automotive';
import { Camera, Gauge, SlidersHorizontal, Download, Eye, Sparkles } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface BespokeStudioBarProps {
  currentAngle: CameraAngle;
  onSelectAngle: (angle: CameraAngle) => void;
  finishes: CarFinish[];
  selectedFinish: CarFinish;
  onSelectFinish: (finish: CarFinish) => void;
  onOpenSvdModal: () => void;
  onOpenExportModal: () => void;
}

export const BespokeStudioBar: React.FC<BespokeStudioBarProps> = ({
  currentAngle,
  onSelectAngle,
  finishes,
  selectedFinish,
  onSelectFinish,
  onOpenSvdModal,
  onOpenExportModal,
}) => {
  const handleRev = () => {
    audioEngine.rev(2.6, 1.4);
  };

  const angleOptions: { id: CameraAngle; label: string }[] = [
    { id: 'front', label: 'Front 3/4' },
    { id: 'profile', label: 'Profile' },
    { id: 'cockpit', label: 'Cockpit' },
    { id: 'rear', label: 'Rear' },
  ];

  return (
    <aside aria-label="Bespoke Studio Dock" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] lg:max-w-4xl luxury-glass rounded-full px-4 lg:px-6 py-2.5 flex items-center justify-between gap-3 lg:gap-6 shadow-2xl border border-white/10">
      {/* Angle Selector */}
      <div className="flex items-center gap-1">
        <Camera className="w-3.5 h-3.5 text-neutral-400 mr-1 hidden sm:inline" />
        <div className="flex items-center bg-black/40 rounded-full p-0.5 border border-white/10">
          {angleOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSelectAngle(opt.id)}
              className={`px-2.5 py-1 text-[11px] font-medium tracking-wider uppercase rounded-full transition-all whitespace-nowrap ${
                currentAngle === opt.id
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Finish Swatches */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-full border border-white/10">
          {finishes.map((finish) => (
            <button
              key={finish.id}
              onClick={() => onSelectFinish(finish)}
              title={`${finish.name} - ${finish.subname}`}
              className={`w-5 h-5 rounded-full transition-transform relative ${
                selectedFinish.id === finish.id
                  ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-black'
                  : 'hover:scale-110 opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: finish.hex }}
            >
              <span className="sr-only">{finish.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Throttle Rev Pedal Button */}
      <button
        onClick={handleRev}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-white text-xs font-mono transition-all group active:scale-95 whitespace-nowrap"
        title="Rev Twin-Turbo V8 Engine"
      >
        <Gauge className="w-3.5 h-3.5 text-red-500 group-hover:rotate-45 transition-transform" />
        <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Rev V8</span>
      </button>

      {/* Action Tools */}
      <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
        <button
          onClick={onOpenSvdModal}
          className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
          title="Stable Video Diffusion Pipeline"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenExportModal}
          className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
          title="Export Standalone HTML/CSS/JS Bundle"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
