import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Phone, MapPin, Calendar } from 'lucide-react';
import { CarFinish } from '../types/automotive';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFinish: CarFinish;
  initialVehicle?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  selectedFinish,
  initialVehicle,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('Achat Véhicule Showroom');
  const [location, setLocation] = useState('Showroom Route des Almadies (Dakar)');
  const [date, setDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Veuillez renseigner votre nom complet.');
      return;
    }
    if (!phone.trim()) {
      setError('Veuillez renseigner un numéro de téléphone joignable au Sénégal ou international.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl luxury-glass rounded-2xl border border-white/15 text-white shadow-2xl p-5 sm:p-6 lg:p-8 max-h-[92vh] overflow-y-auto no-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400 uppercase mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Mansour Motors Dakar · Protocole VIP</span>
            </div>

            <h2 className="text-2xl font-semibold tracking-wide text-white mb-2">
              {initialVehicle ? `Réservation ${initialVehicle}` : 'Prendre Rendez-vous / Essai'}
            </h2>
            <p className="text-xs text-neutral-300 font-light mb-6">
              Nos conseillers du Showroom Route des Almadies vous reçoivent sur rendez-vous personnalisé pour votre projet d'acquisition, location ou entretien SAV.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs font-mono">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Nom et Prénom
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Cheikh Tidiane Diop"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Téléphone / WhatsApp (Dakar)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+221 77 000 00 00"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Email de Contact
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@domaine.sn"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Type de Demande
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="Achat Véhicule Showroom">Achat Véhicule Showroom</option>
                    <option value="Location VIP Dakar">Location VIP avec Chauffeur</option>
                    <option value="Entretien & Diagnostic SAV">Entretien & Diagnostic SAV Almadies</option>
                    <option value="Detailing & Polissage Céramique">Detailing Céramique Haut de Gamme</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Lieu Souhaité
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="Showroom Route des Almadies (Dakar)">Showroom Route des Almadies</option>
                    <option value="Salon VIP AIBD Aéroport Blaise Diagne">Salon VIP AIBD (Aéroport)</option>
                    <option value="Résidence Privée / Hôtel Dakar">Livraison Résidence / Hôtel</option>
                    <option value="Saly Portudal / Petite-Côte">Saly Portudal / Petite-Côte</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg bg-white text-black text-xs font-semibold tracking-[0.2em] uppercase hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                >
                  <span>Confirmer la Demande Mansour Motors</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center pt-2">
                <a
                  href="tel:+221338600555"
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white font-mono transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ou appelez directement le +221 33 860 05 55</span>
                </a>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-semibold tracking-wide text-white mb-2">
              Demande Enregistrée avec Succès
            </h3>
            <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed mb-6 font-light">
              Merci, <strong className="text-white">{name}</strong>. Votre dossier prioritaire{' '}
              <span className="font-mono text-emerald-400">#MM-SN-{(Math.random() * 8999 + 1000).toFixed(0)}</span>{' '}
              a été transmis à l'équipe Mansour Motors Dakar. Un conseiller vous contactera par téléphone ou WhatsApp au <strong className="text-white">{phone}</strong> dans les meilleurs délais.
            </p>

            <button
              onClick={handleReset}
              className="py-2.5 px-6 rounded-lg bg-white text-black text-xs font-semibold tracking-widest uppercase hover:bg-neutral-200 transition-colors"
            >
              Retour à l'Aperçu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
