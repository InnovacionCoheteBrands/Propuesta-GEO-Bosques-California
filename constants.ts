import { NavItem, HouseModel, Amenity, GalleryItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'modelos', label: 'Modelos' },
  { id: 'galeria', label: 'Galería' },
  { id: 'ubicacion', label: 'Ubicación' },
  { id: 'refiere', label: 'Refiere y Gana', isSpecial: true },
  { id: 'contacto', label: 'Contacto' },
];

export const HOUSE_MODELS: HouseModel[] = [
  {
    id: 'clara',
    name: 'Santa Clara',
    description: 'Diseño inteligente para la familia moderna.',
    bgText: 'CLARA',
    specs: [
      { label: 'Terreno', value: '75 m²' },
      { label: 'Construcción', value: '60 m²' },
      { label: 'Recámaras', value: '2' },
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200'
  },
  {
    id: 'barbara',
    name: 'Santa Bárbara',
    description: 'El máximo nivel de amplitud y confort.',
    bgText: 'BÁRBARA',
    specs: [
      { label: 'Terreno', value: '90 m²' },
      { label: 'Construcción', value: '122 m²' },
      { label: 'Recámaras', value: '3 + Estancia' },
    ],
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200'
  },
  {
    id: 'monica',
    name: 'Santa Mónica',
    description: 'Lujo y versatilidad en cada rincón.',
    bgText: 'MÓNICA',
    specs: [
      { label: 'Terreno', value: '105 m²' },
      { label: 'Construcción', value: '140 m²' },
      { label: 'Recámaras', value: '3 + Roof' },
    ],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200'
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'pool',
    title: 'Alberca Resort',
    description: 'Climatizada y con fuentes saltarinas.',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200'
  },
  {
    id: 'gym',
    title: 'Gym Fitness',
    description: 'Área de cardio y pesas equipada.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200'
  }
];

export const GALLERY_IMAGES: GalleryItem[] = [
  { id: '1', src: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800', col: 1, speed: 0.1 },
  { id: '2', src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800', col: 2, speed: 0.2 },
  { id: '3', src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800', col: 3, speed: 0.15 },
  { id: '4', src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800', col: 1, speed: 0.05 },
  { id: '5', src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=800', col: 2, speed: 0.25 },
  { id: '6', src: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=800', col: 3, speed: 0.1 }
];
