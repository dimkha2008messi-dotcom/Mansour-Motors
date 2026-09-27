export type CameraAngle = 'front' | 'profile' | 'cockpit' | 'rear';

export interface CarFinish {
  id: string;
  name: string;
  subname: string;
  hex: string;
  accentRgb: string;
  reflectionStyle: string;
}

export interface SvdConfig {
  model: string;
  input_image: string;
  video_frames: number;
  motion_bucket_id: number;
  fps: number;
  augmentation_level: number;
  cfg_scale: number;
  seed: number;
  output_format: string;
}

export interface Hotspot {
  id: string;
  title: string;
  category: string;
  description: string;
  specs: { label: string; value: string }[];
  x: number; // percentage
  y: number; // percentage
  angle: CameraAngle;
}

export interface VehicleListing {
  id: string;
  name: string;
  brand: string;
  category: 'Supercar' | 'SUV Prestige' | 'Berline Grand Luxe' | 'Location VIP';
  power: string;
  acceleration: string;
  priceFcfa: string;
  priceEur: string;
  status: 'Disponible au Showroom' | 'Location VIP Dakar' | 'Sur Commande Spéciale';
  image: string;
  specs: string[];
}

export interface MansourService {
  id: string;
  title: string;
  tag: string;
  description: string;
  details: string[];
}
