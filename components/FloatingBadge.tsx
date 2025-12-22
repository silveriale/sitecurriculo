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
 * - Animação contínua: movimento vertical suave (flutuação)
 * - Indicador visual: ponto pulsante na cor cyan
 * 
 * @param {FloatingBadgeProps} props - Props do componente
 * @param {string} props.text - Texto a ser exibido no badge
 * @returns {JSX.Element} Componente React renderizado
 */
export const FloatingBadge: React.FC<FloatingBadgeProps> = ({ text }) => {
  return (
    <motion.div
      // Estado inicial: escala 0 (invisível) e rotacionado -10 graus
      initial={{ scale: 0, rotate: -10 }}
      // Estado animado: escala 1 (tamanho normal), rotação 0, e movimento vertical
      animate={{ 
        scale: 1,      // Tamanho normal
        rotate: 0,     // Sem rotação
        y: [0, -10, 0] // Movimento vertical: começa em 0, sobe 10px, volta a 0
      }}
      transition={{
        // Animação de escala: duração 0.5s com efeito spring (mola)
        scale: { duration: 0.5, type: 'spring' },
        // Animação vertical: duração 3s, repete infinitamente, com easing suave
        y: { 
          duration: 3,           // Duração de 3 segundos por ciclo
          repeat: Infinity,       // Repete infinitamente
          ease: "easeInOut"      // Curva de animação suave (acelera e desacelera)
        }
      }}
      // Estilos do badge: fundo semi-transparente com blur, borda arredondada
      className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-xl"
    >
      {/* Indicador visual: ponto pulsante na cor cyan */}
      {/* animate-pulse: animação CSS nativa do Tailwind para pulsação */}
      <div className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse" />
      
      {/* Texto do badge */}
      {/* Responsivo: text-sm em mobile, text-base em desktop */}
      {/* tracking-wide: espaçamento entre letras aumentado */}
      <span className="text-white text-sm md:text-base font-medium tracking-wide">
        {text}
      </span>
    </motion.div>
  );
};
