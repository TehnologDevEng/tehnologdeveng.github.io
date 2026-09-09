export interface EngineeringProduct {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  description: string;
  features: string[];
  tags: string[];
  externalUrl: string;
  modalId: string;
  badge?: string;
  imageSrc?: string;
  imageCaption?: string;
}

export interface ModalContent {
  id: string;
  title: string;
  subtitle?: string;
  externalUrl?: string;
  externalUrlText?: string;
  description: string;
  features: string[];
  imageSrc?: string;
  imageCaption?: string;
  instruction?: {
    version: string;
    purpose: string;
    inputs: { name: string; desc: string; unit?: string }[];
    calculationSteps: string[];
    recommendations: string[];
  };
}

export interface TelemetrySample {
  id: string;
  wellName: string;
  status: 'normal' | 'warning' | 'danger';
  frequency: number; // Hz
  current: number; // A
  intakePressure: number; // atm
  motorTemp: number; // °C
  flowRate: number; // m3/day
  vibration: number; // mm/s
  diagnosis: string;
  aiConfidence: number;
  recommendation: string;
}

export interface ScreenshotItem {
  id: string;
  title: string;
  caption: string;
  imageSrc: string;
  description: string;
}
