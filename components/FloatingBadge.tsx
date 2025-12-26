/**
 * @fileoverview Componente de badge flutuante com animação.
 * 
 * Este arquivo contém o componente FloatingBadge que exibe um badge com texto
 * que possui animações de entrada (scale e rotate) e uma animação contínua
 * de flutuação vertical. Utilizado para exibir informações importantes como
 * formação acadêmica.
 */

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Props do componente FloatingBadge.
 * 
 * @interface FloatingBadgeProps
 * @property {string} text - Texto a ser exibido no badge
 */
interface FloatingBadgeProps {
  text: string;
}


/**
 * Componente de badge flutuante animado.
 * 
 * Exibe um badge com texto que possui:
 * - Animação de entrada: escala de 0 para 1 e rotação de -10° para 0°
 * - Animação contínua: movimento vertical suave (flutuação de 10px)
 * - Indicador visual: ponto pulsante na cor cyan
 * - Background semi-transparente com efeito de blur
 * - Design responsivo para mobile e desktop
 * 
 * A animação de flutuação cria um efeito sutil que atrai atenção
 * sem ser invasivo, ideal para destacar informações importantes.
 * 
 * @param {FloatingBadgeProps} props - Props do componente
 * @param {string} props.text - Texto a ser exibido no badge
 * @returns {JSX.Element} Componente React renderizado
 */
export const FloatingBadge: React.FC<FloatingBadgeProps> = ({ text }) => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -10 }}
      animate={{ 
        scale: 1,
        rotate: 0,
        y: [0, -10, 0]
      }}
      transition={{
        scale: { duration: 0.5, type: 'spring' },
        y: { 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-xl"
    >
      {/* Indicador pulsante */}
      <div className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse" />
      
      {/* Texto do badge */}
      <span className="text-white text-sm md:text-base font-medium tracking-wide">
        {text}
      </span>
    </motion.div>
  );
};
