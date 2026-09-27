import React from 'react';

interface MansourLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MansourLogo: React.FC<MansourLogoProps> = ({ className = '', size = 'md' }) => {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Stylized Mansour Motors Winged Crest Emblem */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="chromeGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="goldAccent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Outer Hexagonal Shield / Automotive Crest */}
        <polygon
          points="50,6 92,26 92,74 50,94 8,74 8,26"
          stroke="url(#chromeGradient)"
          strokeWidth="3.5"
          fill="rgba(5, 5, 8, 0.85)"
        />

        {/* Inner Aerodynamic Wing Blades */}
        <path
          d="M 20 40 L 45 40 L 50 48 L 55 40 L 80 40"
          stroke="url(#chromeGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 26 50 L 46 50 L 50 56 L 54 50 L 74 50"
          stroke="url(#chromeGradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Iconic Central Sculpted 'M' Monogram */}
        <path
          d="M 32 68 L 32 32 L 50 54 L 68 32 L 68 68"
          stroke="url(#chromeGradient)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Subtle Gold / Red Sport Accent Dot */}
        <circle cx="50" cy="20" r="3" fill="url(#goldAccent)" />
      </svg>

      {/* Brand Typography Wordmark */}
      <div className="flex flex-col justify-center text-left">
        <div className="flex items-center gap-1.5">
          <span className="font-bold tracking-[0.24em] text-white text-sm sm:text-base leading-none uppercase font-['Montserrat']">
            MANSOUR
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        </div>
        <span className="font-light tracking-[0.42em] text-neutral-400 text-[9px] sm:text-[10px] leading-tight uppercase font-['Montserrat'] mt-0.5">
          MOTORS DAKAR
        </span>
      </div>
    </div>
  );
};
