/**
 * @fileoverview Componente principal da aplicação de portfólio.
 * 
 * Este arquivo contém o componente App que gerencia toda a estrutura do portfólio,
 * incluindo as seções de apresentação, trajetória técnica e contato.
 * Utiliza scroll-based animations com Framer Motion para criar transições suaves
 * entre diferentes seções do portfólio.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { WaveTransition } from './components/WaveTransition';
import { FloatingBadge } from './components/FloatingBadge';
import { BackgroundLayer } from './components/BackgroundLayer';
import { ContactSection } from './components/ContactSection';
import { SkillCard } from './components/SkillCard';
import { ThemeToggle } from './components/ThemeToggle';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useTheme } from './hooks/useTheme';
import { SKILL_CARDS, PERSONAL_INFO } from './constants/portfolio';

/**
 * Componente principal da aplicação de portfólio.
 * 
 * Gerencia o scroll da página e as animações baseadas no progresso do scroll.
 * Divide o portfólio em 4 seções principais:
 * - Tela 1: Apresentação inicial (RJ/Praia)
 * - Transição: Onda com marquee de tecnologias
 * - Tela 3: Trajetória técnica com cards de habilidades
 * - Tela 4: Seção de contato
 * 
 * @returns {JSX.Element} Componente React renderizado
 */
const App: React.FC = () => {
  // Hook de tema para gerenciar modo claro/escuro
  const { theme, toggleTheme } = useTheme();

  // Hook customizado que encapsula toda a lógica de scroll e transformações
  const {
    containerRef,
    scrollYProgress,
    smoothProgress,
    sceneOpacity1,
    sceneOpacity3,
    scene3PointerEvents,
    sceneOpacity4,
    scene1TranslateY
  } = useScrollProgress();

  // Desestrutura informações pessoais para uso no JSX
  const { name, age, location, role, education } = PERSONAL_INFO;

  return (
    <div 
      ref={containerRef} 
      className="relative h-[400vh] w-full selection:bg-cyan-500 selection:text-white"
    >
      {/* Botão de toggle de tema */}
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      {/* Camada de fundo fixa com transição entre cenários RJ/SP */}
      <div 
        className="fixed inset-0 h-screen w-full pointer-events-none" 
        style={{ willChange: 'transform' }}
      >
        <BackgroundLayer progress={smoothProgress} theme={theme} />
      </div>

      {/* Componente de transição com onda e marquee de tecnologias */}
      <WaveTransition progress={smoothProgress} />

      {/* SEÇÃO 1: Apresentação - Tema RJ/Praia */}
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden z-20">
        <motion.div 
          style={{ 
            opacity: sceneOpacity1, 
            y: scene1TranslateY,
            willChange: 'transform, opacity'
          }}
          className="text-center px-4"
        >
          {/* Título principal com animação de entrada */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-white font-display mb-6 drop-shadow-2xl"
          >
            {name.first} {name.middle} <br/>
            <span className="text-cyan-300">{name.last}</span>
          </motion.h1>
          
          {/* Informações pessoais com animação de fade in */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-white/80 font-light mb-12"
          >
            {age} anos • {location} • {role}
          </motion.p>
          
          {/* Container responsivo para badges de formação */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4">
            {education.map((edu, index) => (
              <FloatingBadge key={index} text={edu} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* SEÇÃO 3: Trajetória Técnica - Tema Cidade/Tech */}
      <section 
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden z-30 px-3 md:px-4 py-2 md:py-0 select-text" 
        style={{ 
          userSelect: 'text', 
          WebkitUserSelect: 'text', 
          MozUserSelect: 'text', 
          msUserSelect: 'text', 
          pointerEvents: 'auto' 
        }}
      >
        <motion.div 
          style={{ 
            opacity: sceneOpacity3,
            pointerEvents: scene3PointerEvents,
            willChange: 'opacity',
            userSelect: 'text',
            WebkitUserSelect: 'text',
            MozUserSelect: 'text',
            msUserSelect: 'text'
          }}
          className="max-w-6xl w-full select-text"
        >
          {/* Título da seção */}
          <div className="text-center mb-2 md:mb-12">
            <h3 
              className="text-lg md:text-5xl font-black text-white leading-tight select-text" 
              style={{ userSelect: 'text' }}
            >
              Trajetória Técnica
            </h3>
          </div>

          {/* Grid responsivo de cards de habilidades */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
            {SKILL_CARDS.map((card) => (
              <SkillCard 
                key={card.id}
                id={card.id}
                title={card.title}
                color={card.color}
                iconType={card.iconType}
                skills={card.skills}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* SEÇÃO 4: Contato */}
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden z-40 px-4 pointer-events-none">
        <ContactSection opacity={sceneOpacity4} />
      </section>
      
      {/* Indicador de progresso do scroll na parte inferior */}
      <motion.div 
        style={{ 
          scaleX: scrollYProgress,
          willChange: 'transform'
        }} 
        className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 origin-left z-50" 
      />
    </div>
  );
};

export default App;
