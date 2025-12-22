/**
 * @fileoverview Componente principal da aplicação de portfólio.
 * 
 * Este arquivo contém o componente App que gerencia toda a estrutura do portfólio,
 * incluindo as seções de apresentação, trajetória técnica e contato.
 * Utiliza scroll-based animations com Framer Motion para criar transições suaves
 * entre diferentes seções do portfólio.
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { WaveTransition } from './components/WaveTransition';
import { FloatingBadge } from './components/FloatingBadge';
import { BackgroundLayer } from './components/BackgroundLayer';
import { ContactSection } from './components/ContactSection';

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
  // Referência ao container principal para cálculo do scroll
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Hook do Framer Motion que retorna o progresso do scroll (0 a 1)
  // target: elemento a ser observado para o scroll
  // offset: define quando o scroll começa e termina de ser rastreado
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] // Começa no início do elemento e termina no final
  });

  // Detecta se é mobile para ajustar performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Aplica um efeito de mola (spring) ao progresso do scroll para suavizar as animações
  // Valores reduzidos para mobile para melhor performance
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: isMobile ? 50 : 100, // Reduzido para mobile
    damping: isMobile ? 25 : 30,     // Reduzido para mobile
    restDelta: 0.001
  });

  /**
   * Breakpoints de scroll para controle das transições (ajustados para transições mais rápidas e suaves):
   * - Tela 1: 0 - 0.2 (apresentação inicial)
   * - Onda: 0.2 - 0.45 (transição com marquee de tecnologias)
   * - Tela 3: 0.5 - 0.6 (trajetória técnica)
   * - Tela 4: 0.6 - 1.0 (contato)
   */

  // Opacidade da primeira seção (Tela 1 - Apresentação)
  // Fade out mais rápido entre 0.15 e 0.25 do progresso do scroll
  const sceneOpacity1 = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 1, 0]);
  
  // Opacidade da terceira seção (Tela 3 - Trajetória Técnica)
  // Fade in mais cedo entre 0.45 e 0.55, permanece visível até 0.6, fade out rápido até 0.7
  const sceneOpacity3 = useTransform(smoothProgress, [0.45, 0.55, 0.6, 0.7], [0, 1, 1, 0]);
  
  // Opacidade da quarta seção (Tela 4 - Contato)
  // Fade in entre 0.6 e 0.7 do progresso do scroll (transição rápida)
  const sceneOpacity4 = useTransform(smoothProgress, [0.6, 0.7], [0, 1]);

  return (
    // Container principal com altura de 500vh (5x a altura da viewport) para permitir scroll longo
    // selection: estiliza o texto selecionado com cores cyan
    <div ref={containerRef} className="relative h-[500vh] w-full selection:bg-cyan-500 selection:text-white">
      {/* Camada de fundo fixa que permanece visível durante todo o scroll */}
      {/* pointer-events-none: permite que eventos de mouse passem através */}
      <div className="fixed inset-0 h-screen w-full pointer-events-none" style={{ willChange: 'transform' }}>
        <BackgroundLayer progress={smoothProgress} />
      </div>

      {/* Componente de transição com onda que contém o marquee de tecnologias */}
      <WaveTransition progress={smoothProgress} />

      {/* TELA 01: Seção de Apresentação - Tema RJ/Praia */}
      {/* sticky: mantém a seção fixa no topo durante o scroll */}
      {/* overflow-hidden: esconde conteúdo que ultrapassa os limites */}
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden z-20">
          <motion.div 
            // Opacidade controlada pelo progresso do scroll
            // y: movimento vertical suave para cima durante o scroll inicial (ajustado para acontecer mais cedo)
            style={{ 
              opacity: sceneOpacity1, 
              y: useTransform(smoothProgress, [0, 0.25], [0, -100]),
              willChange: 'transform, opacity'
            }}
            className="text-center px-4"
          >
          {/* Título principal com animação de entrada */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} // Estado inicial: invisível e 20px abaixo
            animate={{ opacity: 1, y: 0 }}   // Estado final: visível e na posição original
            className="text-5xl md:text-8xl font-black text-white font-display mb-6 drop-shadow-2xl"
          >
            Leticia Silveria <br/>
            {/* Parte do nome em cor cyan para destaque */}
            <span className="text-cyan-300">da Costa</span>
          </motion.h1>
          
          {/* Informações pessoais com animação de fade in com delay */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }} // Delay de 0.3s para criar efeito sequencial
            className="text-xl md:text-2xl text-white/80 font-light mb-12"
          >
            25 anos • Carioca • Desenvolvedora Full Stack
          </motion.p>
          
          {/* Container para centralizar o badge de formação */}
          {/* Responsivo: flex-col em mobile (um embaixo do outro), flex-row em desktop (lado a lado) */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4">
             <FloatingBadge text="Bacharelado em Ciências Matemáticas e da Terra - UFRJ" />
             <FloatingBadge text="Desenvolvedora Full Stack - Rocketseat" />
          </div>
        </motion.div>
      </section>


      {/* TELA 03: Seção de Trajetória Técnica - Tema Cidade/Tech */}
      {/* Responsivo: padding reduzido em mobile (py-2) para caber todos os cards */}
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden z-20 px-3 md:px-4 py-2 md:py-0">
        <motion.div 
          style={{ 
            opacity: sceneOpacity3,
            willChange: 'opacity'
          }}
          className="max-w-6xl w-full"
        >
          {/* Título da seção */}
          {/* Responsivo: text-lg em mobile, text-5xl em desktop */}
          <div className="text-center mb-2 md:mb-12">
            <h3 className="text-lg md:text-5xl font-black text-white leading-tight">Trajetória Técnica</h3>
          </div>

          {/* Grid de cards: 1 coluna em mobile, 3 colunas em desktop */}
          {/* Responsivo: gap-2 em mobile, gap-6 em desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
            {/* CARD 1: Back-end & APIs */}
            <motion.div 
              whileHover={{ y: -5 }} // Efeito de elevação ao passar o mouse
              className={`bg-slate-900/60 ${isMobile ? 'backdrop-blur-sm' : 'backdrop-blur-xl'} border border-white/10 p-2.5 md:p-6 rounded-xl md:rounded-3xl hover:border-purple-500/50 transition-all`}
              style={{ willChange: 'transform' }}
            >
              {/* Ícone do card - código/back-end */}
              {/* Responsivo: w-7 h-7 em mobile, w-10 h-10 em desktop */}
              <div className="w-7 h-7 md:w-10 md:h-10 bg-purple-500 rounded-lg md:rounded-xl mb-2 md:mb-6 flex items-center justify-center">
                {/* SVG de código (tags < />) */}
                <svg className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              
              {/* Título do card */}
              {/* Responsivo: text-sm em mobile, text-xl em desktop */}
              <h3 className="text-sm md:text-xl font-bold text-white mb-1.5 md:mb-4">Back-end & APIs</h3>
              
              {/* Lista de habilidades */}
              {/* Responsivo: text-[10px] em mobile, text-sm em desktop, space-y-1 em mobile */}
              <ul className="space-y-1 md:space-y-2 text-slate-400 text-[10px] md:text-sm leading-tight">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-500 rounded-full"/> Node.js & TypeScript</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-500 rounded-full"/> Arquitetura RESTful & HTTP</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-500 rounded-full"/> Bancos de Dados SQL/NoSQL</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-500 rounded-full"/> Deploy de Aplicações</li>
              </ul>
            </motion.div>

            {/* CARD 2: UX/UI & Front-end */}
            <motion.div 
              whileHover={{ y: -5 }}
              className={`bg-slate-900/60 ${isMobile ? 'backdrop-blur-sm' : 'backdrop-blur-xl'} border border-white/10 p-2.5 md:p-6 rounded-xl md:rounded-3xl hover:border-cyan-500/50 transition-all`}
              style={{ willChange: 'transform' }}
            >
              {/* Ícone do card - interface/UI */}
              <div className="w-7 h-7 md:w-10 md:h-10 bg-cyan-500 rounded-lg md:rounded-xl mb-2 md:mb-6 flex items-center justify-center">
                {/* SVG de layout/interface (janelas) */}
                <svg className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
              </div>
              <h3 className="text-sm md:text-xl font-bold text-white mb-1.5 md:mb-4">UX/UI & Front-end</h3>
              <ul className="space-y-1 md:space-y-2 text-slate-400 text-[10px] md:text-sm leading-tight">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-cyan-500 rounded-full"/> React & Fundamentos Web</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-cyan-500 rounded-full"/> Tailwind CSS Avançado</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-cyan-500 rounded-full"/> Estudos de UX/UI Design</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-cyan-500 rounded-full"/> HTML, CSS, JS ES6+ & TS</li>
              </ul>
            </motion.div>

            {/* CARD 3: Infra & Tools */}
            <motion.div 
              whileHover={{ y: -5 }}
              className={`bg-slate-900/60 ${isMobile ? 'backdrop-blur-sm' : 'backdrop-blur-xl'} border border-white/10 p-2.5 md:p-6 rounded-xl md:rounded-3xl hover:border-emerald-500/50 transition-all`}
              style={{ willChange: 'transform' }}
            >
              {/* Ícone do card - ferramentas/infraestrutura */}
              <div className="w-7 h-7 md:w-10 md:h-10 bg-emerald-500 rounded-lg md:rounded-xl mb-2 md:mb-6 flex items-center justify-center">
                {/* SVG de computador/ferramentas */}
                <svg className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
              </div>
              <h3 className="text-sm md:text-xl font-bold text-white mb-1.5 md:mb-4">Infra & Tools</h3>
              <ul className="space-y-1 md:space-y-2 text-slate-400 text-[10px] md:text-sm leading-tight">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full"/> Docker & Containerização</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full"/> Git & GitHub (Flow)</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full"/> Testes Automatizados</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full"/> Configuração de Ambiente</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>


      {/* TELA 04: Seção de Contato / Final */}
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden z-20 px-4">
        <ContactSection opacity={sceneOpacity4} />
      </section>
      
      {/* Indicador de progresso do scroll na parte inferior da tela */}
      {/* scaleX: escala horizontal baseada no progresso do scroll (0 a 1) */}
      {/* origin-left: a animação começa da esquerda */}
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