import { NavItem, HouseModel, Amenity, GalleryItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'modelos', label: 'Modelos' },
  { id: 'galeria', label: 'Galería' },
  { id: '#ubicacion', label: 'Ubicación' },
  { id: 'contacto', label: 'Contacto' },
];

export const HOUSE_MODELS: HouseModel[] = [
  {
    id: 'cipres',
    name: 'Ciprés',
    price: '$5,350,000.00',
    description: 'Diseño inteligente en 125.49 m². La opción ideal para iniciar una nueva vida con jardín privado, vestidor y todas las amenidades.',
    bgText: 'CIPRÉS',
    specs: [
      { label: 'Construcción', value: '125.49 m²' },
      { label: 'Terreno', value: '6x16 m²' },
      { label: 'Recámaras', value: '3' },
      { label: 'Baños', value: '2.5' },
    ],
    features: {
      pb: ['Cochera para 2 autos', 'Sala', 'Comedor', '1/2 Baño', 'Patio de servicio', 'Jardin', 'Cocina'],
      pa: ['1 Recámara principal con vestidor y baño', '2 Recámaras', 'Baño completo']
    },
    image: '/images/cipres-main.png',
    gallery: [
      { src: '/images/cipres-main.png', label: 'Fachada Ciprés' },
    ]
  },
  {
    id: 'roble',
    name: 'Roble B',
    price: '$6,395,000.00',
    description: 'El equilibrio perfecto entre funcionalidad y elegancia. Espacios diseñados con 143.56 m² de construcción, cochera para 2 autos y una planta alta optimizada.',
    bgText: 'ROBLE B',
    specs: [
      { label: 'Total', value: '143.56 m²' },
      { label: 'Planta Baja', value: '71.25 m²' },
      { label: 'Planta Alta', value: '72.31 m²' },
      { label: 'Recámaras', value: '3' },
      { label: 'Baños', value: '3.5' },
    ],
    features: {
      pb: ['Cochera para 2 autos', 'Sala', 'Comedor', 'Cocina', '1/2 Baño', 'Patio de servicio', 'Cuarto de servicio'],
      pa: ['1 Recámara principal con vestidor y baño', '2 Recámaras y 2 baños completos', 'Sala de estar']
    },
    image: '/images/roble-main.png',
    gallery: [
      { src: '/images/roble-main.png', label: 'Fachada Roble' },
      { src: '/images/roble-2.png', label: 'Interior Roble' },
      { src: '/images/roble-3.png', label: 'Distribución Roble' },
      { src: '/images/roble-4.png', label: 'Detalle Roble' },
    ]
  },
  {
    id: 'secuoya',
    name: 'Secuoya',
    price: '$8,050,000.00',
    description: 'Nuestra propuesta más imponente con 173.90 m². Excelencia arquitectónica en gran formato con acabados premium y espacios generosos.',
    bgText: 'SECUOYA',
    specs: [
      { label: 'Total', value: '173.90 m²' },
      { label: 'Planta Baja', value: '87.17 m²' },
      { label: 'Planta Alta', value: '86.73 m²' },
      { label: 'Recámaras', value: '3' },
      { label: 'Baños', value: '3.5' },
    ],
    features: {
      pb: ['Cochera para 2 autos', 'Sala', 'Comedor', 'Cocina', '1/2 Baño', 'Patio de servicio', 'Cuarto de servicio'],
      pa: ['1 Recámara principal con vestidor y baño', '2 Recámaras y 2 baños completos', 'Sala de estar']
    },
    image: '/images/secuoya-main.png',
    gallery: [
      { src: '/images/secuoya-main.png', label: 'Fachada Secuoya' },
      { src: '/images/secuoya-2.png', label: 'Interior Secuoya' },
      { src: '/images/secuoya-3.png', label: 'Planta Secuoya' },
      { src: '/images/secuoya-4.png', label: 'Detalle Secuoya' },
    ]
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'padel',
    title: 'Cancha de Pádel',
    description: 'Disfruta de uno de los deportes de mayor crecimiento en instalaciones de primer nivel.',
    image: '/images/Paddel.webp'
  },
  {
    id: 'pool',
    title: 'Alberca Tipo Resort',
    description: 'Relájate y disfruta el lujo en una alberca diseñada para tu descanso total.',
    image: '/images/Alberca.webp'
  },
  {
    id: 'gym',
    title: 'Gimnasio Equipado',
    description: 'Todo lo necesario para mantener tu estilo de vida saludable sin salir de casa.',
    image: '/images/gym-new.webp'
  },
  {
    id: 'terraza',
    title: 'Terraza para Eventos',
    description: 'El espacio ideal para celebraciones y momentos especiales con amigos y familia.',
    image: '/images/Terraza.webp'
  },
  {
    id: 'dog-park',
    title: 'Dog Park',
    description: 'Un espacio seguro y divertido diseñado especialmente para tus mascotas.',
    image: '/images/dogpark.webp'
  },
  {
    id: 'seguridad',
    title: 'Juegos Infantiles',
    description: 'Espacios seguros y divertidos para los más pequeños de la familia.',
    image: '/images/Juegos Infantiles.webp'
  }
];

export const GALLERY_IMAGES: GalleryItem[] = [
  { id: '1', src: '/images/hero-new-section.webp', col: 1, speed: 0.1 },
  { id: '2', src: '/images/interior-secuoya-sala.webp', col: 2, speed: 0.2 },
  { id: '3', src: '/images/Alberca.webp', col: 3, speed: 0.15 },
  { id: '4', src: '/images/model-roble-new.webp', col: 1, speed: 0.05 },
  { id: '5', src: '/images/Terraza.webp', col: 2, speed: 0.25 },
  { id: '6', src: '/images/galeria-5.webp', col: 3, speed: 0.1 },
  { id: '7', src: '/images/Paddel.webp', col: 1, speed: 0.15 },
  { id: '8', src: '/images/model-cipres-new.webp', col: 2, speed: 0.2 },
  { id: '9', src: '/images/Juegos Infantiles.webp', col: 3, speed: 0.1 }
];

