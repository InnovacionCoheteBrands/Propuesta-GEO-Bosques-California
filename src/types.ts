export interface NavItem {
  id: string;
  label: string;
  isSpecial?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

export interface ModelSpec {
  label: string;
  value: string;
}

export interface ModelGalleryImage {
  src: string;
  label: string;
}

export interface HouseModel {
  id: string;
  name: string;
  description: string;
  specs: ModelSpec[];
  image: string;
  gallery: ModelGalleryImage[];
  bgText: string;
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  col: number; // For masonry layout column assignment
  speed: number; // Parallax speed factor
}

export interface PrequalifierData {
  purpose: string;
  budget: string;
  financing: string;
  contactPreference: string;
  locationInterest: string;
  decisionMaker: string;
  decisionFactor: string;
  name: string;
  email: string;
  phone: string;
}
