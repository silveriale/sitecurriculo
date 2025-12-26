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
import { TECHNOLOGIES } from '../constants/portfolio';

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
 * Interface para item de tecnologia com ID único.
 * 
 * @interface TechItem
 * @property {string} id - Identificador único para key do React
 * @property {string} tech - Nome da tecnologia
 */
interface TechItem {
  id: string;
  tech: string;
}

/**
 * Componente de transição com onda animada.
 * 
 * Cria uma onda que:
 * - Entra na tela durante o scroll (progresso 0.2 a 0.3)
 * - Permanece visível com marquee de tecnologias (progresso 0.3 a 0.35)
 * - Sai da tela antes da próxima seção (progresso 0.35 a 0.45)
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
   * Breakpoints de transição:
   * - 0.2: onda começa a entrar (100vh = completamente abaixo da tela)
   * - 0.3: onda está centralizada (0vh = cobrindo a viewport)
   * - 0.35: onda permanece centralizada
   * - 0.45: onda sai completamente (-120vh = acima da tela)
   */
  const waveY = useTransform(
    progress,
    [0.2, 0.3, 0.35, 0.45],
    ["100vh", "0vh", "0vh", "-120vh"]
  );

  /**
   * Controla a opacidade do conteúdo (marquee de tecnologias) dentro da onda.
   * 
   * O conteúdo aparece gradualmente quando a onda está visível:
   * - 0.25: invisível (opacidade 0)
   * - 0.3: totalmente visível (opacidade 1)
   * - 0.35: permanece visível (opacidade 1)
   * - 0.4: desaparece (opacidade 0)
   */
  const contentOpacity = useTransform(
    progress,
    [0.25, 0.3, 0.35, 0.4],
    [0, 1, 1, 0]
  );

  /**
   * Gera lista de tecnologias repetidas para o marquee.
   * Repete 3 vezes para garantir fluidez na animação infinita.
   * Cada item recebe um ID único para keys do React.
   */
  const repeatedTechs: TechItem[] = [
    ...TECHNOLOGIES, 
    ...TECHNOLOGIES, 
    ...TECHNOLOGIES
  ].map((tech, index) => ({
    id: `wave-tech-${tech}-${index}`,
    tech
  }));

  return (
    <motion.div
      style={{ 
        y: waveY,
        zIndex: 45 
      }}
      className="fixed inset-0 w-full h-[120vh] pointer-events-none"
    >
       
      {/* Curva superior da onda (SVG) */}
      <svg
        viewBox="0 0 1440 320"
        className="absolute top-0 w-full -translate-y-[99%] fill-cyan-600"
      >
        <path
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,208C960,235,1056,245,1152,224C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
      
      {/* Corpo central da onda com marquee de tecnologias */}
      <div className="w-full h-full bg-cyan-600 relative flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: contentOpacity }}
          className="w-full flex flex-col gap-4"
        >
          {/* Primeira linha do marquee: direção esquerda para direita */}
          <motion.div 
            animate={{ x: [0, -800] }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex whitespace-nowrap gap-12"
          >
            {repeatedTechs.map((item) => (
              <span 
                key={item.id} 
                className="text-4xl md:text-8xl font-black text-white italic tracking-tighter uppercase opacity-80"
              >
                {item.tech}
              </span>
            ))}
          </motion.div>
          
          {/* Segunda linha do marquee: direção direita para esquerda */}
          <motion.div 
            animate={{ x: [-800, 0] }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex whitespace-nowrap gap-12"
          >
            {repeatedTechs.map((item) => (
              <span 
                key={item.id} 
                className="text-4xl md:text-8xl font-black text-white italic tracking-tighter uppercase opacity-40"
              >
                {item.tech}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Curva inferior da onda (SVG espelhado) */}
      <svg
        viewBox="0 0 1440 320"
        className="absolute bottom-0 w-full translate-y-[99%] rotate-180 fill-cyan-600"
      >
        <path
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,208C960,235,1056,245,1152,224C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </motion.div>
  );
};
