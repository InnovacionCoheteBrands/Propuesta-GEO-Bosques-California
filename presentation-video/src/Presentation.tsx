import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';

export const Presentation: React.FC = () => {
  return (
    <AbsoluteFill className="bg-off-white text-text-main font-sans">
      <Sequence from={0} durationInFrames={150}>
        <IntroScene />
      </Sequence>
      
      <Sequence from={150} durationInFrames={300}>
        <VisionScene />
      </Sequence>
      
      <Sequence from={450} durationInFrames={300}>
        <CimientosScene />
      </Sequence>
      
      <Sequence from={750} durationInFrames={350}>
        <EstrategiaGeoScene />
      </Sequence>

      <Sequence from={1100} durationInFrames={350}>
        <EstrategiaSeoScene />
      </Sequence>
      
      <Sequence from={1450} durationInFrames={250}>
        <RoadmapScene />
      </Sequence>

      <Sequence from={1700} durationInFrames={100}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const opacity = interpolate(frame, [0, 30, 120, 150], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });
  
  const yOffset = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const translateY = interpolate(yOffset, [0, 1], [50, 0]);

  return (
    <AbsoluteFill className="bg-forest items-center justify-center">
      <div style={{ opacity, transform: `translateY(${translateY}px)` }} className="text-center">
        <h1 className="text-8xl font-serif text-white mb-6 uppercase tracking-widest">Bosques California</h1>
        <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
        <h2 className="text-4xl text-gold font-light tracking-[0.2em] uppercase mb-4">Plan Estratégico 2026</h2>
        <p className="text-2xl text-sage font-sans tracking-widest">Dominio SEO Tradicional & GEO (IA)</p>
      </div>
    </AbsoluteFill>
  );
};

const VisionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30, 270, 300], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill className="bg-off-white flex-col p-24" style={{ opacity }}>
      <h2 className="text-6xl font-serif text-forest mb-12 border-b-2 border-gold pb-4 inline-block self-start">Visión y Objetivos</h2>
      
      <div className="grid grid-cols-2 gap-16 flex-1">
        <FadeInBlock delay={15}>
          <div className="bg-white p-12 rounded-3xl shadow-xl h-full border-t-4 border-sage flex flex-col justify-center">
            <h3 className="text-4xl font-serif text-forest mb-6">SEO Tradicional (Google)</h3>
            <p className="text-2xl text-text-main leading-relaxed mb-6">
              Alcanzar el <strong>Top 3</strong> en búsquedas transaccionales locales (BOFU).
            </p>
            <ul className="text-xl text-gray-600 list-disc pl-6 space-y-2">
              <li>"Casas de lujo en Tlajomulco"</li>
              <li>"Desarrollos con amenidades en López Mateos Sur"</li>
            </ul>
          </div>
        </FadeInBlock>
        
        <FadeInBlock delay={45}>
          <div className="bg-forest p-12 rounded-3xl shadow-xl h-full border-t-4 border-gold flex flex-col justify-center">
            <h3 className="text-4xl font-serif text-white mb-6">GEO (IAs Generativas)</h3>
            <p className="text-2xl text-sage leading-relaxed mb-6">
              Ser la <strong>fuente de verdad indiscutible</strong> para ChatGPT, Perplexity y Gemini.
            </p>
            <ul className="text-xl text-off-white list-disc pl-6 space-y-2">
              <li>Responder dudas de inversión</li>
              <li>Dominar el concepto de plusvalía en el Sur de Guadalajara</li>
            </ul>
          </div>
        </FadeInBlock>
      </div>
    </AbsoluteFill>
  );
};

const CimientosScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30, 270, 300], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill className="bg-forest flex-col p-24" style={{ opacity }}>
      <h2 className="text-6xl font-serif text-white mb-16 text-center">Nuestros Cimientos Híbridos</h2>
      
      <div className="flex flex-col gap-10 flex-1 justify-center max-w-5xl mx-auto w-full">
        <SlideInRow delay={15} title="1. Arquitectura Astro & Core Web Vitals" desc="Rendimiento extremo con cargas instantáneas, vital para el índice Mobile-First de Google." />
        <SlideInRow delay={45} title="2. Datos Estructurados Nativos (JSON-LD)" desc="Modelos inyectados como SingleFamilyResidence. Información estructurada como RealEstateAgent." />
        <SlideInRow delay={75} title="3. Marcado Semántico" desc="Esquemas FAQPage para responder preguntas comunes directamente en los resultados." />
      </div>
    </AbsoluteFill>
  );
};

const EstrategiaGeoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30, 320, 350], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill className="bg-off-white flex-col p-24" style={{ opacity }}>
      <h2 className="text-6xl font-serif text-forest mb-12">Estrategia GEO (Para Inteligencias Artificiales)</h2>
      <p className="text-2xl text-gray-600 mb-12">Los LLMs procesan entidades y hechos. Seremos la fuente de datos más estructurada.</p>
      
      <div className="grid grid-cols-3 gap-8 flex-1">
        <FeatureCard delay={15} title="Extractabilidad" desc="Contenido 'parseable': listas, tablas y párrafos declarativos directos para las IAs." />
        <FeatureCard delay={45} title="Comunidad Exitosa Milenium" desc="Acuñar y definir este término como entidad propia. Obligaremos a las IAs a citarnos como autoridad." />
        <FeatureCard delay={75} title="Data-Dense Formats" desc="Tablas comparativas (ej. metros, baños) que las IAs prefieren para generar resúmenes exactos." />
      </div>
    </AbsoluteFill>
  );
};

const EstrategiaSeoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30, 320, 350], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill className="bg-forest flex-col p-24" style={{ opacity }}>
      <h2 className="text-6xl font-serif text-white mb-12">Estrategia SEO Tradicional (E-E-A-T)</h2>
      <p className="text-2xl text-sage mb-12">Demostrar Experiencia, Pericia, Autoridad y Confianza.</p>
      
      <div className="grid grid-cols-3 gap-8 flex-1">
        <FeatureCardDark delay={15} title="SEO Local" desc="Sincronización NAP perfecta. Automatización de reseñas mencionando palabras clave clave." />
        <FeatureCardDark delay={45} title="SEO de Imágenes" desc="Optimización de archivos y atributos alt para captar búsquedas visuales en Google Discover." />
        <FeatureCardDark delay={75} title="Señales de Confianza" desc="Secciones dinámicas de 'Avances de Obra' y Testimoniales para validación algorítmica." />
      </div>
    </AbsoluteFill>
  );
};

const RoadmapScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30, 220, 250], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill className="bg-off-white flex-col p-24" style={{ opacity }}>
      <h2 className="text-6xl font-serif text-forest mb-16 text-center">Ejecución del Roadmap</h2>
      
      <div className="flex justify-between items-center flex-1 gap-12">
        <RoadmapStep delay={15} phase="Mes 1" title="Technical & Local Core" items={['Auditoría Schema', 'Sincronización NAP', 'SEO de Imágenes']} />
        <RoadmapStep delay={45} phase="Mes 2-3" title="Despliegue de Autoridad" items={['Redacción SEO/GEO', 'Clusters de Inversión', 'Educación de Estilo de Vida']} />
        <RoadmapStep delay={75} phase="Mes 4+" title="Conversión & Trust" items={['Avances de Obra', 'Reseñas', 'Linkbuilding PR']} />
      </div>
    </AbsoluteFill>
  );
};

const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill className="bg-forest items-center justify-center" style={{ opacity }}>
      <div className="text-center">
        <h1 className="text-8xl font-serif text-white mb-8 uppercase tracking-widest">El Futuro</h1>
        <p className="text-3xl text-sage mb-12 max-w-4xl mx-auto leading-relaxed font-sans">
          Posicionando a Bosques California en cada búsqueda, mapa y respuesta de Inteligencia Artificial.
        </p>
        <div className="w-32 h-1 bg-gold mx-auto"></div>
      </div>
    </AbsoluteFill>
  );
};

// Animación Auxiliar 1: Fade In & Slide Up
const FadeInBlock: React.FC<{children: React.ReactNode, delay: number}> = ({children, delay}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const translateY = interpolate(frame - delay, [0, 30], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  return <div style={{ opacity, transform: `translateY(${translateY}px)` }} className="h-full">{children}</div>;
};

// Animación Auxiliar 2: Slide from Left
const SlideInRow: React.FC<{title: string, desc: string, delay: number}> = ({title, desc, delay}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  
  const translateX = interpolate(progress, [0, 1], [-100, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div style={{ opacity, transform: `translateX(${translateX}px)` }} className="bg-white/10 p-8 rounded-2xl border-l-4 border-gold">
      <h4 className="text-3xl font-bold text-white mb-2">{title}</h4>
      <p className="text-xl text-sage">{desc}</p>
    </div>
  );
};

// Animación Auxiliar 3: Cards
const FeatureCard: React.FC<{title: string, desc: string, delay: number}> = ({title, desc, delay}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  
  const scale = interpolate(progress, [0, 1], [0.9, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div style={{ opacity, transform: `scale(${scale})` }} className="bg-white p-10 rounded-3xl shadow-lg border-t-4 border-sage flex flex-col justify-start">
      <h3 className="text-3xl font-serif text-forest mb-4">{title}</h3>
      <p className="text-xl text-text-main leading-relaxed">{desc}</p>
    </div>
  );
};

const FeatureCardDark: React.FC<{title: string, desc: string, delay: number}> = ({title, desc, delay}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  
  const scale = interpolate(progress, [0, 1], [0.9, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div style={{ opacity, transform: `scale(${scale})` }} className="bg-white/10 p-10 rounded-3xl border-t-4 border-gold flex flex-col justify-start">
      <h3 className="text-3xl font-serif text-gold mb-4">{title}</h3>
      <p className="text-xl text-off-white leading-relaxed">{desc}</p>
    </div>
  );
};

// Animación Auxiliar 4: Roadmap Steps
const RoadmapStep: React.FC<{phase: string, title: string, items: string[], delay: number}> = ({phase, title, items, delay}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const translateY = interpolate(frame - delay, [0, 30], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{ opacity, transform: `translateY(${translateY}px)` }} className="flex-1 bg-white p-10 rounded-3xl shadow-xl h-full flex flex-col">
      <span className="text-gold font-bold tracking-widest uppercase mb-2 block">{phase}</span>
      <h3 className="text-3xl font-serif text-forest mb-6 pb-4 border-b border-gray-200">{title}</h3>
      <ul className="flex-1 flex flex-col gap-4">
        {items.map((item, i) => (
          <li key={i} className="text-xl text-gray-600 flex items-start gap-4">
            <div className="w-2 h-2 rounded-full bg-sage mt-2"></div>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
