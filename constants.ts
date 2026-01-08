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
    id: 'roble-a',
    name: 'Roble A',
    description: 'Espacios optimizados con acabados de lujo y diseño funcional.',
    bgText: 'ROBLE A',
    specs: [
      { label: 'Construcción', value: '140.55 m²' },
      { label: 'Recámaras', value: '3' },
      { label: 'Baños', value: '2.5' },
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200'
  },
  {
    id: 'roble-b',
    name: 'Roble B',
    description: 'Amplitud y elegancia en cada detalle para tu familia.',
    bgText: 'ROBLE B',
    specs: [
      { label: 'Construcción', value: '143.56 m²' },
      { label: 'Recámaras', value: '3' },
      { label: 'Baños', value: '2.5' },
    ],
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200'
  },
  {
    id: 'secuoya',
    name: 'Secuoya',
    description: 'El modelo más imponente con espacios premium y confort total.',
    bgText: 'SECUOYA',
    specs: [
      { label: 'Construcción', value: '173.90 m²' },
      { label: 'Recámaras', value: '3' },
      { label: 'Baños', value: '2.5' },
    ],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200'
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'padel',
    title: 'Cancha de Pádel',
    description: 'Disfruta de uno de los deportes de mayor crecimiento en instalaciones de primer nivel.',
    image: 'https://images.unsplash.com/photo-1626224580194-860c36f6756f?q=80&w=1200'
  },
  {
    id: 'pool',
    title: 'Alberca Tipo Resort',
    description: 'Relájate y disfruta el lujo en una alberca diseñada para tu descanso total.',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200'
  },
  {
    id: 'gym',
    title: 'Gimnasio Equipado',
    description: 'Todo lo necesario para mantener tu estilo de vida saludable sin salir de casa.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200'
  },
  {
    id: 'terraza',
    title: 'Terraza para Eventos',
    description: 'El espacio ideal para celebraciones y momentos especiales con amigos y familia.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200'
  },
  {
    id: 'dog-park',
    title: 'Dog Park',
    description: 'Un espacio seguro y divertido diseñado especialmente para tus mascotas.',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200'
  },
  {
    id: 'seguridad',
    title: 'Acceso Controlado 24/7',
    description: 'Tu tranquilidad es nuestra prioridad con vigilancia y tecnología de punta.',
    image: 'https://images.unsplash.com/photo-1557597774-9d2739f85a76?q=80&w=1200'
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
