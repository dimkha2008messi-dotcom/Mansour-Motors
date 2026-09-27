import React, { useState } from 'react';
import { VehicleListing, MansourService } from '../types/automotive';
import { Shield, Wrench, Sparkles, MapPin, Phone, Mail, ArrowUpRight, CheckCircle2, Car, Clock } from 'lucide-react';

interface MansourShowroomSectionProps {
  onSelectVehicle: (vehicle: VehicleListing) => void;
  onOpenInquiry: (vehicleName?: string) => void;
}

// Véhicules exacts Mansour Motors avec photos authentiques, prix FCFA et caractéristiques réelles
const VEHICLES: VehicleListing[] = [
  {
    id: 'mercedes-g63',
    name: 'Mercedes-AMG G 63 Magno Edition (W463A)',
    brand: 'Mercedes-AMG',
    category: 'SUV Prestige',
    power: '585 ch · V8 4.0L Biturbo (850 Nm)',
    acceleration: '0 à 100 km/h en 4.5s',
    priceFcfa: '195 000 000 FCFA',
    priceEur: '297 000 €',
    status: 'Disponible au Showroom',
    image: '/assets/mercedes-g63.jpg',
    specs: ['Boîte AMG SPEEDSHIFT 9G', 'Échappement latéral commutable', 'Pack Nappa Exclusif'],
  },
  {
    id: 'range-rover-sport',
    name: 'Range Rover Sport HSE P530 First Edition',
    brand: 'Land Rover',
    category: 'SUV Prestige',
    power: '530 ch · V8 4.4L Twin-Turbo (750 Nm)',
    acceleration: '0 à 100 km/h en 4.5s',
    priceFcfa: '165 000 000 FCFA',
    priceEur: '251 000 €',
    status: 'Disponible au Showroom',
    image: '/assets/range-rover-sport.jpg',
    specs: ['Suspension Dynamic Air', 'AWD Intégral Intelligent', 'Système Audio Meridian 3D'],
  },
  {
    id: 'porsche-911-gt3rs',
    name: 'Porsche 911 GT3 RS Weissach (Type 992)',
    brand: 'Porsche',
    category: 'Supercar',
    power: '525 ch · 4.0L Flat-6 Atmosphérique (9000 tr/min)',
    acceleration: '0 à 100 km/h en 3.2s',
    priceFcfa: '245 000 000 FCFA',
    priceEur: '373 000 €',
    status: 'Sur Commande Spéciale',
    image: '/assets/porsche-gt3rs.jpg',
    specs: ['Aileron Carbone Col de Cygne DRS', 'Freins Céramique PCCB', 'Pack Allègement Weissach'],
  },
  {
    id: 'mercedes-gle53',
    name: 'Mercedes-AMG GLE 53 4MATIC+ Coupé',
    brand: 'Mercedes-AMG',
    category: 'SUV Prestige',
    power: '435 ch + 22 ch EQ Boost · L6 3.0L Turbo',
    acceleration: '0 à 100 km/h en 5.3s',
    priceFcfa: '125 000 000 FCFA',
    priceEur: '190 000 €',
    status: 'Location VIP Dakar',
    image: '/assets/mercedes-gle53.jpg',
    specs: ['Transmission 4MATIC+ AMG', 'Châssis RIDE CONTROL+', 'Toit panoramique ouvrant'],
  },
  {
    id: 'aura-gt-flagship',
    name: 'AURA GT V12 Hybrid Flagship Edition',
    brand: 'AURA Supercars',
    category: 'Supercar',
    power: '650 ch combinés · V8 Twin-Turbo & Tri-Moteur',
    acceleration: '0 à 100 km/h en 3.2s',
    priceFcfa: '285 000 000 FCFA',
    priceEur: '435 000 €',
    status: 'Disponible au Showroom',
    image: '/assets/car.png',
    specs: ['Monocoque Carbone Aéro', 'Lame Venturi Active', 'Échappement Titane Inconel'],
  },
];

const SERVICES: MansourService[] = [
  {
    id: 'vente',
    title: 'Vente Showroom Prestige Dakar',
    tag: 'Neuf & Occasion Certifiée',
    description: 'Une sélection rigoureuse des modèles les plus prestigieux livrables immédiatement au Sénégal, certifiés en 150 points de contrôle avec formalités douanières et carte grise sénégalaise incluses.',
    details: ['Contrôle technique certifié 150 points', 'Garantie intégrale Mansour Motors', 'Financement et reprise automobile'],
  },
  {
    id: 'location',
    title: 'Location de Véhicules de Luxe Dakar',
    tag: 'Avec ou Sans Chauffeur',
    description: 'Flotte VIP pour personnalités, délégations d’affaires, séjours officiels et cérémonies. Mise à disposition de chauffeurs professionnels bilingues et prise en charge au salon d’honneur VIP AIBD.',
    details: ['Chauffeurs d’élite formés à la sécurité', 'Accueil personnalisé à l’Aéroport AIBD', 'Mise à disposition 24h/24 et 7j/7'],
  },
  {
    id: 'sav',
    title: 'Mansour Motors SAV Almadies',
    tag: 'Atelier Mécanique Ultramoderne',
    description: 'Inauguré sur la Route des Almadies, notre garage ultramoderne assure le diagnostic électronique avancé, la reprogrammation de clés et calculateurs, la mécanique générale et le detailing céramique.',
    details: ['Banc de diagnostic électronique multimarques', 'Reprogrammation calculateurs & boîtes auto', 'Lavage haut de gamme, polissage et céramique'],
  },
];

export const MansourShowroomSection: React.FC<MansourShowroomSectionProps> = ({
  onSelectVehicle,
  onOpenInquiry,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'Supercar' | 'SUV Prestige' | 'Location VIP'>('all');

  const filteredVehicles = selectedFilter === 'all'
    ? VEHICLES
    : VEHICLES.filter((v) => v.category === selectedFilter || (selectedFilter === 'Location VIP' && v.status.includes('Location')));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 text-white pointer-events-auto">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-neutral-400 mb-2 sm:mb-3">
          <MapPin className="w-3.5 h-3.5 text-red-500" />
          <span>Route des Almadies · Dakar, Sénégal</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight uppercase text-white mb-3 sm:mb-4">
          Collection Showroom Mansour Motors
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed px-2">
          Chaque véhicule exposé dispose de son identité réelle, son tarif officiel en Francs CFA et Euros, et de son historique certifié au Sénégal.
        </p>

        {/* Responsive Horizontal Scroll Filter buttons on mobile */}
        <div className="flex items-center gap-2 mt-6 sm:mt-8 overflow-x-auto no-scrollbar py-2 max-w-full justify-start sm:justify-center px-1">
          {(['all', 'Supercar', 'SUV Prestige', 'Location VIP'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedFilter === filter
                  ? 'bg-white text-black font-semibold'
                  : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              {filter === 'all' ? 'Toute la Collection' : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Exact Vehicle Grid with Specific Photos, Names and Real Prices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-20">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="group relative rounded-xl luxury-glass border border-white/10 overflow-hidden flex flex-col justify-between hover:border-white/30 transition-all duration-300"
          >
            <div>
              {/* Image Preview with Real Photo */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur border border-white/15 text-[10px] font-mono text-neutral-200">
                  {vehicle.status}
                </div>
              </div>

              {/* Exact Name, Brand & Specs */}
              <div className="p-4 sm:p-6">
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                  {vehicle.brand}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white tracking-wide mb-2 sm:mb-3 leading-snug">
                  {vehicle.name}
                </h3>

                <div className="space-y-1.5 text-[11px] sm:text-xs font-mono text-neutral-300 mb-4 sm:mb-5 p-2.5 sm:p-3 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-neutral-500 shrink-0">Moteur</span>
                    <span className="text-white font-medium text-right truncate">{vehicle.power}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-neutral-500 shrink-0">0-100</span>
                    <span className="text-emerald-400 font-medium">{vehicle.acceleration}</span>
                  </div>
                </div>

                {/* Exact Price in FCFA and EUR */}
                <div className="space-y-0.5 mb-4 sm:mb-5">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                    Prix Showroom Dakar
                  </span>
                  <div className="text-lg sm:text-xl font-bold text-white tabular-nums tracking-wide">
                    {vehicle.priceFcfa}
                  </div>
                  <div className="text-[11px] sm:text-xs text-neutral-400 font-mono">
                    ≈ {vehicle.priceEur}
                  </div>
                </div>

                {/* Key Spec Badges */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {vehicle.specs.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-neutral-300 border border-white/5"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 pt-0">
              <button
                onClick={() => onOpenInquiry(vehicle.name)}
                className="w-full py-3.5 rounded-lg bg-white text-black hover:bg-neutral-200 text-xs font-semibold font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-98"
              >
                <span>Demander un Essai</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mansour Motors 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-10 border-t border-white/10">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className="p-5 sm:p-6 rounded-2xl luxury-glass border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-400 mb-2 sm:mb-3">
                <span className="text-emerald-400 uppercase tracking-wider">{service.tag}</span>
                <span>MANSOUR MOTORS</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 tracking-wide">
                {service.title}
              </h3>
              <p className="text-xs text-neutral-300 font-light leading-relaxed mb-4 sm:mb-6">
                {service.description}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10">
              {service.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white/80 shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Banner Dakar */}
      <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl luxury-glass border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-[11px] sm:text-xs font-mono tracking-widest text-emerald-400 uppercase block mb-1">
            Showroom & SAV Route des Almadies
          </span>
          <h3 className="text-xl sm:text-2xl font-semibold text-white">
            Prenez rendez-vous avec nos conseillers à Dakar
          </h3>
          <p className="text-xs text-neutral-300 mt-1 font-light">
            Près Vogue Lounge et Bio 24 · Ouvert du Lundi au Samedi de 08h à 18h
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <a
            href="tel:+221338600555"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono transition-colors text-center"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>+221 33 860 05 55</span>
          </a>

          <button
            onClick={() => onOpenInquiry('Rendez-vous Showroom Almadies')}
            className="px-6 py-3.5 rounded-lg bg-white text-black text-xs font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-colors shadow-lg text-center"
          >
            Prendre Rendez-vous
          </button>
        </div>
      </div>
    </div>
  );
};
