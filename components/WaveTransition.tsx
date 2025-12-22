/**
 * @fileoverview Componente de transição com onda animada e marquee de tecnologias.
 * 
 * Este arquivo contém o componente WaveTransition que cria uma transição visual
 * entre as seções do portfólio usando uma onda animada. A onda contém um marquee
 * de tecnologias que aparece durante a transição. A animação é controlada pelo
 * progresso do scroll da página.
 */

import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

/**
 * Props do componente WaveTransition.
 * 
 * @interface WaveTransitionProps
 * @property {MotionValue<number>} progress - Progresso do scroll (0 a 1) usado para controlar animações
 */
interface WaveTransitionProps {
  progress: MotionValue<number>;
}

/**
 * Componente de transição com onda animada.
 * 
 * Cria uma onda que:
 * - Entra na tela durante o scroll (progresso 0.3 a 0.4)
 * - Permanece visível com marquee de tecnologias (progresso 0.4 a 0.5)
 * - Sai da tela antes da próxima seção (progresso 0.5 a 0.58)
 * 
 * A onda possui:
 * - Curva superior (SVG) que cria o efeito de onda
 * - Corpo central com marquee de tecnologias em movimento
 * - Curva inferior (SVG) que fecha a onda
 * 
 * @param {WaveTransitionProps} props - Props do componente
 * @param {MotionValue<number>} props.progress - Progresso do scroll (0 a 1)
 * @returns {JSX.Element} Componente React renderizado
 */
export const WaveTransition: React.FC<WaveTransitionProps> = ({ progress }) => {
  /**
   * Controla a posição vertical da onda baseada no progresso do scroll.
   * 
   * Breakpoints ajustados para transição mais rápida:
   * - 0.2: onda começa a entrar (100vh = abaixo da tela)
   * - 0.3: onda está na posição 0 (cobrindo a tela)
   * - 0.35: onda permanece na posição 0
   * - 0.45: onda sai completamente (-118vh = acima da tela)
   */
  const waveY = useTransform(
    progress,
    [0.2, 0.3, 0.35, 0.45], // Breakpoints do progresso do scroll (ajustados para mais rápido)
    ["100vh", "0vh", "0vh", "-118vh"] // Valores de posição Y correspondentes
  );

  /**
   * Controla a rotação da onda para criar efeito de movimento dinâmico.
   * 
   * Rotação sutil: 2° ao entrar, 0° quando está visível, -2° ao sair
   */
  const waveRotate = useTransform(
    progress,
    [0.2, 0.3, 0.35, 0.45], // Breakpoints ajustados
    [2, 0, 0, -2] // Valores de rotação em graus
  );

  /**
   * Controla a opacidade do conteúdo (marquee de tecnologias) dentro da onda.
   * 
   * O conteúdo aparece gradualmente quando a onda está visível (ajustado para mais rápido):
   * - 0.25: invisível (opacidade 0)
   * - 0.3: totalmente visível (opacidade 1)
   * - 0.35: permanece visível (opacidade 1)
   * - 0.4: desaparece (opacidade 0)
   */
  const contentOpacity = useTransform(
    progress,
    [0.25, 0.3, 0.35, 0.4], // Breakpoints ajustados para mais rápido
    [0, 1, 1, 0] // Valores de opacidade (0 = invisível, 1 = visível)
  );

  // Lista de tecnologias a serem exibidas no marquee dentro da onda
  const technologies = ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS" , "Git", "Github", "APIs", "Docker", "Next.js"];
  
  // Repete a lista 3 vezes e cria objetos com IDs únicos para keys do React
  const repeatedTechs = [...technologies, ...technologies, ...technologies].map((tech, index) => ({
    id: `wave-tech-${tech}-${index}`, // ID único para cada item
    tech                                 // Nome da tecnologia
  }));

  return (
    // Container principal da onda: fixo na tela, altura de 120vh (20% a mais que a viewport)
    // zIndex 45: garante que fique acima do background mas abaixo das seções principais
    <motion.div
      style={{ y: waveY, rotate: waveRotate, zIndex: 45 }} // Posição Y, rotação e z-index controlados
      className="fixed inset-0 w-full h-[120vh] pointer-events-none" // pointer-events-none: não interfere com interações
    >
      {/* Curva superior da onda (SVG) */}
      {/* -translate-y-[99%]: move o SVG para cima, deixando apenas a curva visível */}
      <svg
        viewBox="0 0 1440 320"
        className="absolute top-0 w-full -translate-y-[99%] fill-cyan-600"
      >
        {/* Path que define a forma da onda usando curvas de Bézier */}
        <path
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,208C960,235,1056,245,1152,224C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
      
      {/* Corpo central da onda com marquee de tecnologias */}
      {/* bg-cyan-600: cor de fundo cyan que combina com a onda */}
      <div className="w-full h-full bg-cyan-600 relative flex flex-col items-center justify-center overflow-hidden">
        {/* Container do conteúdo com opacidade controlada */}
        <motion.div 
            style={{ opacity: contentOpacity }}
            className="w-full flex flex-col gap-4"
        >
            {/* Primeira linha do marquee: move da esquerda para direita */}
            <motion.div 
                // Animação: move horizontalmente de 0 para -800px
                animate={{ x: [0, -800] }}
                // Transição: duração de 15s, repete infinitamente, movimento linear
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="flex whitespace-nowrap gap-12"
            >
                {/* Renderiza cada tecnologia */}
                {repeatedTechs.map((item) => (
                    <span key={item.id} className="text-4xl md:text-8xl font-black text-white italic tracking-tighter uppercase opacity-80">
                        {item.tech}
                    </span>
                ))}
            </motion.div>
            
            {/* Segunda linha do marquee: move da direita para esquerda (direção oposta) */}
            <motion.div 
                // Animação: move horizontalmente de -800px para 0
                animate={{ x: [-800, 0] }}
                // Transição: duração de 20s (mais lenta), repete infinitamente
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="flex whitespace-nowrap gap-12"
            >
                {/* Renderiza cada tecnologia com opacidade menor (40%) */}
                {repeatedTechs.map((item) => (
                    <span key={item.id} className="text-4xl md:text-8xl font-black text-white italic tracking-tighter uppercase opacity-40">
                        {item.tech}
                    </span>
                ))}
            </motion.div>
        </motion.div>
      </div>

       {/* Curva inferior da onda (SVG) */}
       {/* translate-y-[99%]: move o SVG para baixo */}
       {/* rotate-180: rotaciona 180° para criar a curva inferior */}
       <svg
        viewBox="0 0 1440 320"
        className="absolute bottom-0 w-full translate-y-[99%] rotate-180 fill-cyan-600"
      >
        {/* Path idêntico ao superior, mas rotacionado para criar simetria */}
        <path
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,208C960,235,1056,245,1152,224C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </motion.div>
  );
};
