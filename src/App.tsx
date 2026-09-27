import React, { useState } from 'react';
import { CameraAngle, CarFinish } from './types/automotive';
import { Navigation } from './components/Navigation';
import { ScrollytellingCanvas } from './components/ScrollytellingCanvas';
import { InquiryModal } from './components/InquiryModal';

const FINISHES: CarFinish[] = [
  {
    id: 'deep-obsidian',
    name: 'Nero Noctis',
    subname: 'Deep Obsidian Gloss',
    hex: '#0A0A0C',
    accentRgb: 'rgba(255, 255, 255, 0.08)',
    reflectionStyle: 'gloss-onyx',
  },
  {
    id: 'grigio-titans',
    name: 'Grigio Titans',
    subname: 'Matte Titanium Alloy',
    hex: '#52565E',
    accentRgb: 'rgba(160, 175, 200, 0.35)',
    reflectionStyle: 'matte-titanium',
  },
  {
    id: 'rosso-corsa',
    name: 'Rosso Mars',
    subname: 'Competition Scarlet',
    hex: '#991B1B',
    accentRgb: 'rgba(239, 68, 68, 0.4)',
    reflectionStyle: 'gloss-crimson',
  },
  {
    id: 'verde-mantis',
    name: 'Verde Mantis',
    subname: 'Motorsport Acid Pearl',
    hex: '#16A34A',
    accentRgb: 'rgba(34, 197, 94, 0.4)',
    reflectionStyle: 'pearl-acid',
  },
  {
    id: 'giallo-auge',
    name: 'Giallo Auge',
    subname: 'Solar Hypercar Gold',
    hex: '#CA8A04',
    accentRgb: 'rgba(234, 179, 8, 0.4)',
    reflectionStyle: 'metallic-gold',
  },
];

export default function App() {
  const [currentAngle, setCurrentAngle] = useState<CameraAngle>('front');
  const [selectedFinish, setSelectedFinish] = useState<CarFinish>(FINISHES[0]);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedVehicleTarget, setSelectedVehicleTarget] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState(0);

  const handleOpenInquiry = (vehicleName?: string) => {
    setSelectedVehicleTarget(vehicleName);
    setIsInquiryModalOpen(true);
  };

  const handleSelectSection = (sectionIndex: number) => {
    setActiveSection(sectionIndex);
    const sectionIds = ['section-hero', 'section-performance', 'section-design', 'section-final'];
    const el = document.getElementById(sectionIds[sectionIndex]);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden font-['Montserrat']">
      {/* Official Mansour Motors Header */}
      <Navigation
        onOpenInquiryModal={handleOpenInquiry}
        onSelectSection={handleSelectSection}
        activeSection={activeSection}
      />

      {/* Crystal-Clear Automotive Experience with Continuous 1080p Video */}
      <ScrollytellingCanvas
        currentAngle={currentAngle}
        selectedFinish={selectedFinish}
        onOpenInquiryModal={handleOpenInquiry}
        onActiveSectionChange={setActiveSection}
      />

      {/* Mansour Motors Dakar Allocation & VIP Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => {
          setIsInquiryModalOpen(false);
          setSelectedVehicleTarget(undefined);
        }}
        selectedFinish={selectedFinish}
        initialVehicle={selectedVehicleTarget}
      />
    </div>
  );
}
