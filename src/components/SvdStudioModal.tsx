import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Download, Copy, Check, Film, Cpu, Sliders, Sparkles, RefreshCw } from 'lucide-react';
import { SvdConfig } from '../types/automotive';

interface SvdStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  carImageSrc: string;
}

export const SvdStudioModal: React.FC<SvdStudioModalProps> = ({ isOpen, onClose, carImageSrc }) => {
  const [config, setConfig] = useState<SvdConfig>({
    model: 'svd_xt_1_1.safetensors',
    input_image: 'votre_image_lamborghini.png',
    video_frames: 25,
    motion_bucket_id: 45,
    fps: 6,
    augmentation_level: 0.02,
    cfg_scale: 2.5,
    seed: 12345,
    output_format: 'mp4',
  });

  const [activeTab, setActiveTab] = useState<'preview' | 'python' | 'comfyui' | 'prompt'>('preview');
  const [isPlaying, setIsPlaying] = useState(true);
  const [simulatedFrame, setSimulatedFrame] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const animRef = useRef<number | null>(null);

  // Simulated 25-frame dolly-in sequence with interpolation
  useEffect(() => {
    if (!isOpen || !isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    let lastTime = performance.now();
    const frameInterval = 1000 / (config.fps * 2); // Simulated interpolated preview

    const loop = (time: number) => {
      if (time - lastTime >= frameInterval) {
        setSimulatedFrame((prev) => (prev + 1) % config.video_frames);
        lastTime = time;
      }
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isOpen, isPlaying, config.fps, config.video_frames]);

  if (!isOpen) return null;

  const progress = simulatedFrame / (config.video_frames - 1 || 1);
  // Calculate subtle dolly-in camera zoom scale based on motion_bucket_id
  const maxDolly = 1.0 + (config.motion_bucket_id / 200) * 0.15;
  const currentScale = 1.0 + progress * (maxDolly - 1.0);

  const pythonCode = `# Configuration pour Stable Video Diffusion XT (Image-to-Video)
# À utiliser dans un environnement ComfyUI ou Forge WebUI

config = {
    "model": "${config.model}",  # Modèle optimisé pour 25 frames
    "input_image": "${config.input_image}",
    "video_frames": ${config.video_frames},                 # ~4 secondes à ${config.fps}fps (interpolable à 10s)
    "motion_bucket_id": ${config.motion_bucket_id},             # MOUVEMENT FAIBLE : Crucial pour ne pas déformer la voiture
    "fps": ${config.fps},                           # Base pour SVD, à interpoler ensuite
    "augmentation_level": ${config.augmentation_level},         # Très faible pour préserver les détails de l'image source
    "cfg_scale": ${config.cfg_scale},                   # Respect strict de l'image source
    "seed": ${config.seed},
    "output_format": "${config.output_format}"
}

# Note: Après génération, utilisez un outil comme RIFE ou Flowframes 
# pour interpoler de ${config.fps}fps à 24/30fps et étendre à 10 secondes.
`;

  const comfyUiWorkflow = JSON.stringify(
    {
      "last_node_id": 14,
      "nodes": [
        {
          "id": 1,
          "type": "ImageLoader",
          "inputs": { "image": config.input_image }
        },
        {
          "id": 2,
          "type": "SVD_CheckpointLoader",
          "inputs": { "ckpt_name": config.model }
        },
        {
          "id": 3,
          "type": "SVD_img2vid_Conditioning",
          "inputs": {
            "init_image": ["1", 0],
            "video_frames": config.video_frames,
            "motion_bucket_id": config.motion_bucket_id,
            "fps": config.fps,
            "augmentation_level": config.augmentation_level
          }
        },
        {
          "id": 4,
          "type": "KSampler",
          "inputs": {
            "seed": config.seed,
            "steps": 25,
            "cfg": config.cfg_scale,
            "sampler_name": "euler",
            "scheduler": "karras",
            "positive": ["3", 0],
            "negative": ["3", 1],
            "latent_image": ["3", 2]
          }
        },
        {
          "id": 5,
          "type": "VAEDecodeVideo",
          "inputs": { "samples": ["4", 0], "vae": ["2", 2] }
        },
        {
          "id": 6,
          "type": "VideoCombine",
          "inputs": {
            "images": ["5", 0],
            "frame_rate": config.fps,
            "format": config.output_format
          }
        }
      ]
    },
    null,
    2
  );

  const cinematicPrompt = `Cinematic photorealistic automotive commercial shot. Front-facing view of a glossy black luxury supercar centered perfectly on camera. The car remains completely stationary and symmetrical. Camera performs a very slow, smooth dolly-in movement towards the front grille over 10 seconds. Dark wet reflective asphalt floor with shimmering light reflections. Subtle volumetric fog drifting slowly. Two vertical white LED light bars on each side. Y-shaped LED headlights glowing naturally. High contrast lighting, deep blacks. No shaking, no morphing, no distortion. 8K, cinematic color grading. --ar 16:9`;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col luxury-glass rounded-2xl border border-white/15 text-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <Film className="w-5 h-5 text-white" />
            <div>
              <h2 className="text-base font-semibold tracking-wider uppercase text-white">
                Stable Video Diffusion XT // Studio Pipeline
              </h2>
              <p className="text-xs text-neutral-400">
                Image-to-Video parameters for ComfyUI, Forge WebUI & RIFE Interpolation
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

        {/* Tab Selector */}
        <div className="flex items-center gap-2 px-6 py-2 border-b border-white/10 bg-black/20 text-xs font-mono">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'preview'
                ? 'bg-white text-black font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Video Simulation (RIFE 24fps)
          </button>
          <button
            onClick={() => setActiveTab('python')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'python'
                ? 'bg-white text-black font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Python Config
          </button>
          <button
            onClick={() => setActiveTab('comfyui')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'comfyui'
                ? 'bg-white text-black font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            ComfyUI Workflow JSON
          </button>
          <button
            onClick={() => setActiveTab('prompt')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'prompt'
                ? 'bg-white text-black font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Cinematic Camera Prompt
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'preview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Video Player Simulation */}
              <div className="lg:col-span-7 flex flex-col gap-3">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10 shadow-inner group">
                  {/* Simulated dolly-in camera frame */}
                  <div
                    className="w-full h-full flex items-center justify-center transition-transform duration-100 ease-out overflow-hidden"
                    style={{
                      transform: `scale(${currentScale})`,
                      transformOrigin: '50% 55%',
                    }}
                  >
                    <img
                      src={carImageSrc}
                      alt="Supercar SVD frame"
                      className="w-full h-full object-cover select-none"
                    />
                  </div>

                  {/* Overlaid LED bar lighting effect */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Frame indicator & RIFE notice */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded bg-black/75 border border-white/10 text-[11px] font-mono tabular-nums text-neutral-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      FRAME {String(simulatedFrame + 1).padStart(2, '0')} / {config.video_frames}
                    </span>
                    <span className="text-neutral-500">|</span>
                    <span>{(progress * 4).toFixed(1)}s</span>
                  </div>

                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] font-mono text-neutral-300">
                    RIFE 4x Interpolated
                  </div>

                  {/* Playback Controls */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 rounded-lg bg-black/80 backdrop-blur border border-white/10 text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-1.5 hover:bg-white/10 rounded text-white transition-colors"
                        title={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setSimulatedFrame(0)}
                        className="p-1.5 hover:bg-white/10 rounded text-neutral-300 hover:text-white transition-colors"
                        title="Reset loop"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {config.fps} FPS BASE {'->'} 24 FPS SMOOTH
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-neutral-400">
                      MOTION_BUCKET: {config.motion_bucket_id}
                    </div>
                  </div>
                </div>

                {/* Scrubber slider */}
                <div className="px-1">
                  <input
                    type="range"
                    min="0"
                    max={config.video_frames - 1}
                    value={simulatedFrame}
                    onChange={(e) => {
                      setIsPlaying(false);
                      setSimulatedFrame(parseInt(e.target.value, 10));
                    }}
                    className="w-full accent-white h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                    <span>0s (Start Dolly)</span>
                    <span>Motion: Subtle Grille Zoom (No Warping)</span>
                    <span>4.1s (End Clip)</span>
                  </div>
                </div>
              </div>

              {/* Right: Parameter Controls */}
              <div className="lg:col-span-5 flex flex-col gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">
                      Diffusion Parameters
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setConfig({
                        model: 'svd_xt_1_1.safetensors',
                        input_image: 'votre_image_lamborghini.png',
                        video_frames: 25,
                        motion_bucket_id: 45,
                        fps: 6,
                        augmentation_level: 0.02,
                        cfg_scale: 2.5,
                        seed: 12345,
                        output_format: 'mp4',
                      })
                    }
                    className="text-[11px] text-neutral-400 hover:text-white transition-colors"
                  >
                    Reset Defaults
                  </button>
                </div>

                {/* Motion Bucket ID */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-300">Motion Bucket ID</span>
                    <span className="font-mono text-white tabular-nums">{config.motion_bucket_id}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="127"
                    value={config.motion_bucket_id}
                    onChange={(e) =>
                      setConfig({ ...config, motion_bucket_id: parseInt(e.target.value, 10) })
                    }
                    className="w-full accent-white h-1 bg-neutral-800 rounded cursor-pointer"
                  />
                  <p className="text-[10px] text-neutral-400">
                    45 = Low movement. Crucial to preserve sharp automotive body panels without morphing.
                  </p>
                </div>

                {/* CFG Scale */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-300">CFG Scale (Prompt Weight)</span>
                    <span className="font-mono text-white tabular-nums">{config.cfg_scale.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="5.0"
                    step="0.1"
                    value={config.cfg_scale}
                    onChange={(e) =>
                      setConfig({ ...config, cfg_scale: parseFloat(e.target.value) })
                    }
                    className="w-full accent-white h-1 bg-neutral-800 rounded cursor-pointer"
                  />
                  <p className="text-[10px] text-neutral-400">
                    2.5 = Strict adherence to source image proportions.
                  </p>
                </div>

                {/* Augmentation Level */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-300">Augmentation Noise Level</span>
                    <span className="font-mono text-white tabular-nums">
                      {config.augmentation_level.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="0.15"
                    step="0.01"
                    value={config.augmentation_level}
                    onChange={(e) =>
                      setConfig({ ...config, augmentation_level: parseFloat(e.target.value) })
                    }
                    className="w-full accent-white h-1 bg-neutral-800 rounded cursor-pointer"
                  />
                  <p className="text-[10px] text-neutral-400">
                    0.02 = Minimal noise injection to retain glossy carbon fiber reflection clarity.
                  </p>
                </div>

                {/* Video Frames & FPS */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                  <div>
                    <span className="block text-[11px] text-neutral-400 mb-1">Frames (Native)</span>
                    <span className="text-sm font-mono text-white font-semibold">
                      {config.video_frames} Frames
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-neutral-400 mb-1">Base Frame Rate</span>
                    <span className="text-sm font-mono text-white font-semibold">
                      {config.fps} FPS
                    </span>
                  </div>
                </div>

                {/* Quick Copy / Download Buttons */}
                <div className="flex gap-2 pt-3">
                  <button
                    onClick={() => handleCopy(pythonCode, 'py-quick')}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors"
                  >
                    {copied === 'py-quick' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied === 'py-quick' ? 'Copied' : 'Copy Python'}</span>
                  </button>

                  <button
                    onClick={() =>
                      handleDownload('config_svd_xt.py', pythonCode, 'text/x-python')
                    }
                    className="flex items-center justify-center p-2 rounded border border-white/20 hover:bg-white/10 transition-colors text-white"
                    title="Download Python Script"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'python' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-mono">
                  config_svd_xt.py (ComfyUI / Forge WebUI)
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(pythonCode, 'py-full')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-mono transition-colors"
                  >
                    {copied === 'py-full' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied === 'py-full' ? 'Copied' : 'Copy Code'}</span>
                  </button>
                  <button
                    onClick={() =>
                      handleDownload('config_svd_xt.py', pythonCode, 'text/x-python')
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white text-black text-xs font-mono font-medium hover:bg-neutral-200 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .py</span>
                  </button>
                </div>
              </div>
              <pre className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-neutral-200 overflow-x-auto leading-relaxed">
                <code>{pythonCode}</code>
              </pre>
            </div>
          )}

          {activeTab === 'comfyui' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-mono">
                  comfyui_svd_workflow.json (Drag & drop into ComfyUI canvas)
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(comfyUiWorkflow, 'comfy-full')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-mono transition-colors"
                  >
                    {copied === 'comfy-full' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied === 'comfy-full' ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                  <button
                    onClick={() =>
                      handleDownload(
                        'comfyui_svd_workflow.json',
                        comfyUiWorkflow,
                        'application/json'
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white text-black text-xs font-mono font-medium hover:bg-neutral-200 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .json</span>
                  </button>
                </div>
              </div>
              <pre className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-neutral-200 overflow-x-auto leading-relaxed max-h-96">
                <code>{comfyUiWorkflow}</code>
              </pre>
            </div>
          )}

          {activeTab === 'prompt' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white">
                    Automotive Commercial Camera Prompt (Runway Gen-3 / Kling / Luma / SVD)
                  </span>
                  <button
                    onClick={() => handleCopy(cinematicPrompt, 'prompt-full')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-mono transition-colors"
                  >
                    {copied === 'prompt-full' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied === 'prompt-full' ? 'Copied' : 'Copy Prompt'}</span>
                  </button>
                </div>
                <p className="text-xs font-mono text-neutral-300 leading-relaxed bg-black/50 p-4 rounded-lg border border-white/5">
                  {cinematicPrompt}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                    Recommended Generation Settings
                  </h4>
                  <ul className="text-xs text-neutral-300 space-y-1.5 font-light">
                    <li>• Motion Score: 2 - 4 (keep subtle for zero morphing)</li>
                    <li>• Camera Move: Zoom In / Dolly Forward</li>
                    <li>• Frame Rate: 24 FPS target after interpolation</li>
                    <li>• Aspect Ratio: 16:9 or 21:9 cinematic ultrawide</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                    Negative Prompt Protection
                  </h4>
                  <p className="text-xs font-mono text-neutral-400 leading-relaxed bg-black/40 p-2.5 rounded">
                    shaking, morphing, warping, vehicle deformation, extra wheels, people, text, blur, flickering, low quality
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
