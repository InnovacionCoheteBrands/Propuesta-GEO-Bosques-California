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
    id: 'cipres',
    name: 'Ciprés',
    description: 'Diseño inteligente en 125.49 m². La opción ideal para iniciar una nueva vida con jardín privado, vestidor y todas las amenidades.',
    bgText: 'CIPRÉS',
    specs: [
      { label: 'Construcción', value: '125.49 m²' },
      { label: 'Terreno', value: '96.00 m²' },
      { label: 'Recámaras', value: '3' },
      { label: 'Baños', value: '2.5' },
    ],
    image: '/images/model-cipres.webp',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f8e?q=80&w=1200', label: 'Fachada Ciprés' },
      { src: 'https://images.unsplash.com/photo-1584622640111-994a426fbf0a?q=80&w=1200', label: 'Sala Comedor' },
      { src: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1200', label: 'Cocina equipada' },
      { src: 'https://images.unsplash.com/photo-1595246140625-573b715d11f3?q=80&w=1200', label: 'Recámaras Amplias' },
    ]
  },
  {
    id: 'roble',
    name: 'Roble',
    description: 'El equilibrio perfecto entre funcionalidad y elegancia. Espacios diseñados con 140.55 m² de construcción, cochera para 2 autos y una planta alta optimizada.',
    bgText: 'ROBLE',
    specs: [
      { label: 'Construcción', value: '140.55 m²' },
      { label: 'Recámaras', value: '3' },
      { label: 'Baños', value: '3.5' },
    ],
    image: '/images/model-roble.webp',
    gallery: [
      { src: '/images/interior-roble-sala.webp', label: 'Sala de Estar Roble' },
      { src: '/images/interior-roble-cocina.webp', label: 'Cocina de Lujo' },
      { src: '/images/interior-roble-cocinacomedor.webp', label: 'Espacio Integrado' },
      { src: '/images/interior-roble-recamara.webp', label: 'Recámara Principal' },
      { src: '/images/interior-roble-recamarasecundaria.webp', label: 'Recámara Secundaria' },
    ]
  },
  {
    id: 'secuoya',
    name: 'Secuoya',
    description: 'Nuestra propuesta más imponente con 173.90 m². Excelencia arquitectónica en gran formato con acabados premium y espacios generosos.',
    bgText: 'SECUOYA',
    specs: [
      { label: 'Construcción', value: '173.90 m²' },
      { label: 'Recámaras', value: '3' },
      { label: 'Baños', value: '3.5' },
    ],
    image: '/images/model-secuoya.webp',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200', label: 'Residencia Secuoya' },
      { src: '/images/interior-secuoya-sala.webp', label: 'Gran Estancia' },
      { src: '/images/interior-secuoya-cocina.webp', label: 'Cocina Gourmet' },
      { src: '/images/interior-secuoya-recamara.webp', label: 'Master Suite' },
      { src: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200', label: 'Terraza y Deck' },
    ]
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'padel',
    title: 'Cancha de Pádel',
    description: 'Disfruta de uno de los deportes de mayor crecimiento en instalaciones de primer nivel.',
    image: '/images/amenity-padel.webp'
  },
  {
    id: 'pool',
    title: 'Alberca Tipo Resort',
    description: 'Relájate y disfruta el lujo en una alberca diseñada para tu descanso total.',
    image: '/images/amenity-pool.webp'
  },
  {
    id: 'gym',
    title: 'Gimnasio Equipado',
    description: 'Todo lo necesario para mantener tu estilo de vida saludable sin salir de casa.',
    image: '/images/amenity-gym.webp'
  },
  {
    id: 'terraza',
    title: 'Terraza para Eventos',
    description: 'El espacio ideal para celebraciones y momentos especiales con amigos y familia.',
    image: '/images/amenity-events.webp'
  },
  {
    id: 'dog-park',
    title: 'Dog Park',
    description: 'Un espacio seguro y divertido diseñado especialmente para tus mascotas.',
    image: '/assets/amenities/dog-park.png'
  },
  {
    id: 'seguridad',
    title: 'Acceso Controlado 24/7',
    description: 'Tu tranquilidad es nuestra prioridad con vigilancia y tecnología de punta.',
    image: '/images/amenity-security.webp'
  }
];

export const GALLERY_IMAGES: GalleryItem[] = [
  { id: '1', src: '/images/galeria-1.jpg', col: 1, speed: 0.1 },
  { id: '2', src: '/images/galeria-2.webp', col: 2, speed: 0.2 },
  { id: '3', src: '/images/galeria-3.webp', col: 3, speed: 0.15 },
  { id: '4', src: '/images/galeria-4.webp', col: 1, speed: 0.05 },
  { id: '5', src: '/images/galeria-5.webp', col: 2, speed: 0.25 },
  { id: '6', src: '/images/galeria-6.webp', col: 3, speed: 0.1 },
  { id: '7', src: '/images/galeria-7.webp', col: 1, speed: 0.15 }
];

