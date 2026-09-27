import React, { useState } from 'react';
import { Phone, Menu, X, MapPin } from 'lucide-react';
import { MansourLogo } from './MansourLogo';

interface NavigationProps {
  onOpenInquiryModal: (vehicleName?: string) => void;
  onSelectSection: (sectionIndex: number) => void;
  activeSection: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenInquiryModal,
  onSelectSection,
  activeSection,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionIndex: number) => {
    onSelectSection(sectionIndex);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-6 lg:px-12 py-3 luxury-glass-subtle border-b border-white/[0.08] transition-all">
        {/* Zone 1: Official Mansour Motors Dealership Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick(0);
          }}
          className="hover:opacity-90 transition-opacity"
        >
          <MansourLogo size="sm" className="sm:hidden" />
          <MansourLogo size="md" className="hidden sm:flex" />
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-[0.2em] uppercase text-neutral-400">
          <button
            onClick={() => handleNavClick(0)}
            className={`hover:text-white transition-colors relative py-1 ${
              activeSection === 0 ? 'text-white font-semibold' : ''
            }`}
          >
            Accueil
            {activeSection === 0 && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
            )}
          </button>

          <button
            onClick={() => handleNavClick(1)}
            className={`hover:text-white transition-colors relative py-1 ${
              activeSection === 1 ? 'text-white font-semibold' : ''
            }`}
          >
            Performance
            {activeSection === 1 && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
            )}
          </button>

          <button
            onClick={() => handleNavClick(2)}
            className={`hover:text-white transition-colors relative py-1 ${
              activeSection === 2 ? 'text-white font-semibold' : ''
            }`}
          >
            Showroom & SAV
            {activeSection === 2 && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
            )}
          </button>

          <button
            onClick={() => handleNavClick(3)}
            className={`hover:text-white transition-colors relative py-1 ${
              activeSection === 3 ? 'text-white font-semibold' : ''
            }`}
          >
            Contact Dakar
            {activeSection === 3 && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
            )}
          </button>
        </nav>

        {/* Zone 3: Direct Phone & Showroom Visit Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Telephone direct Dakar (Desktop / Tablet) */}
          <a
            href="tel:+221338600555"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-neutral-300 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
            title="Appeler Mansour Motors Dakar (+221 33 860 05 55)"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">+221 33 860 05 55</span>
          </a>

          {/* Quick Call Icon button for small mobile */}
          <a
            href="tel:+221338600555"
            className="sm:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-emerald-400"
            aria-label="Appeler Mansour Motors Dakar"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Reservation CTA */}
          <button
            onClick={() => onOpenInquiryModal('Visite Showroom Almadies')}
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-black bg-white hover:bg-neutral-200 transition-all rounded shadow-md whitespace-nowrap active:scale-95"
          >
            Showroom
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white transition-colors"
            aria-label="Ouvrir le menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden pt-20 px-6 pb-8 flex flex-col justify-between animate-in fade-in duration-200">
          <nav className="flex flex-col gap-6 pt-4 text-sm font-mono tracking-widest uppercase">
            <button
              onClick={() => handleNavClick(0)}
              className={`text-left py-2 border-b border-white/10 flex items-center justify-between ${
                activeSection === 0 ? 'text-white font-semibold' : 'text-neutral-400'
              }`}
            >
              <span>01. Accueil</span>
              {activeSection === 0 && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
            </button>

            <button
              onClick={() => handleNavClick(1)}
              className={`text-left py-2 border-b border-white/10 flex items-center justify-between ${
                activeSection === 1 ? 'text-white font-semibold' : 'text-neutral-400'
              }`}
            >
              <span>02. Performance</span>
              {activeSection === 1 && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
            </button>

            <button
              onClick={() => handleNavClick(2)}
              className={`text-left py-2 border-b border-white/10 flex items-center justify-between ${
                activeSection === 2 ? 'text-white font-semibold' : 'text-neutral-400'
              }`}
            >
              <span>03. Showroom & SAV</span>
              {activeSection === 2 && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
            </button>

            <button
              onClick={() => handleNavClick(3)}
              className={`text-left py-2 border-b border-white/10 flex items-center justify-between ${
                activeSection === 3 ? 'text-white font-semibold' : 'text-neutral-400'
              }`}
            >
              <span>04. Contact Dakar</span>
              {activeSection === 3 && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
            </button>
          </nav>

          <div className="space-y-4 pt-6">
            <a
              href="tel:+221338600555"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white/10 border border-white/15 text-white text-xs font-mono tracking-wider"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>+221 33 860 05 55</span>
            </a>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenInquiryModal('Visite Showroom Almadies');
              }}
              className="w-full py-3.5 rounded-lg bg-white text-black text-xs font-semibold tracking-widest uppercase font-mono shadow-lg"
            >
              Prendre Rendez-vous Showroom
            </button>

            <div className="flex items-center justify-center gap-1 text-[11px] font-mono text-neutral-500 pt-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Route des Almadies · Dakar</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
