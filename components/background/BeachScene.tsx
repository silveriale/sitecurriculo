/**
 * @fileoverview Componente de cenário de praia (RJ).
 * 
 * Renderiza o sol/lua e as ondas do cenário inicial.
 * Elementos desaparecem gradualmente conforme o scroll progride.
 * Transição automática entre sol (light) e lua (dark).
 */

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { Theme } from '../../hooks/useTheme';
import { BeachStars } from './Stars';

/**
 * Props do componente BeachScene.
 */
interface BeachSceneProps {
  sunY: MotionValue<number>;
  sunOpacity: MotionValue<number>;
  isMobile: boolean;
  theme: Theme;
}

/**
 * Componente de cenário de praia (RJ).
 */
export const BeachScene: React.FC<BeachSceneProps> = ({ 
  sunY, 
  sunOpacity, 
  isMobile, 
  theme 
}) => (
  <>
    {/* Estrelas para a praia noturna */}
    <BeachStars theme={theme} opacity={sunOpacity} />
    
    {/* Sol/Lua com efeito de blur e transição suave */}
    <motion.div 
      style={{ 
        y: sunY, 
        opacity: sunOpacity,
        willChange: 'transform, opacity'
      }} 
      className={`
        absolute 
        top-20 
        right-20 
        w-32 h-32 md:w-64 md:h-64 
        rounded-full 
        ${isMobile ? 'blur-xl' : 'blur-2xl'} 
        opacity-60
        transition-colors duration-1000
        ${theme === 'light' ? 'bg-yellow-300' : 'bg-slate-200'}
      `}
    >
      {/* Crateras da lua (visíveis apenas no dark mode) */}
      {theme === 'dark' && (
        <>
          <div className="absolute top-[20%] left-[30%] w-4 h-4 md:w-8 md:h-8 bg-slate-400/30 rounded-full" />
          <div className="absolute top-[50%] left-[50%] w-3 h-3 md:w-6 md:h-6 bg-slate-400/20 rounded-full" />
          <div className="absolute top-[40%] left-[20%] w-2 h-2 md:w-4 md:h-4 bg-slate-400/25 rounded-full" />
        </>
      )}
    </motion.div>
    
    {/* Ondas na parte inferior */}
    <motion.svg 
      style={{ 
        opacity: sunOpacity,
        willChange: 'opacity'
      }}
      className={`absolute bottom-0 left-0 w-full h-[30vh] transition-all duration-1000 ${
        theme === 'light' ? 'fill-sky-800/40' : 'fill-blue-900/30'
      }`}
      viewBox="0 0 1000 300" 
      preserveAspectRatio="none"
    >
      <path d="M0,300 L0,250 C100,200 200,100 300,150 C400,200 500,50 600,100 C700,150 800,250 1000,200 L1000,300 Z" />
    </motion.svg>
  </>
);

