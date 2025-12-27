/**
 * @fileoverview Componente de avião voando no céu noturno.
 * 
 * Renderiza aviões em silhueta que atravessam a tela da esquerda para direita.
 * Aparecem apenas no modo escuro e quando a cidade está visível.
 * Inclui dois aviões em diferentes profundidades para efeito parallax.
 */

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { Theme } from '../../hooks/useTheme';

/**
 * Props do componente Airplane.
 */
interface AirplaneProps {
  theme: Theme;
  cityOpacity: MotionValue<number>;
}

/**
 * Componente de avião voando no céu noturno.
 */
export const Airplane: React.FC<AirplaneProps> = ({ theme, cityOpacity }) => {
  if (theme !== 'dark') return null;

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity: cityOpacity }}
    >
      {/* Avião comercial principal - silhueta mais próxima */}
      <motion.div
        className="absolute"
        style={{ 
          top: '20%', 
          left: '-10%',
          zIndex: 28
        }}
        animate={{
          x: ['0vw', '120vw'],
          y: [0, -15, 0, 15, 0]
        }}
        transition={{
          x: {
            duration: 35,
            repeat: Infinity,
            repeatDelay: 8,
            ease: "linear"
          },
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <svg width="140" height="60" viewBox="0 0 140 60" className="text-slate-300">
          {/* Asas - formato arredondado */}
          <ellipse 
            cx="70" 
            cy="20" 
            rx="15" 
            ry="3" 
            fill="currentColor" 
            opacity="0.9"
            transform="rotate(25 70 20)"
          />
          <ellipse 
            cx="70" 
            cy="40" 
            rx="15" 
            ry="3" 
            fill="currentColor" 
            opacity="0.9"
            transform="rotate(-25 70 40)"
          />
          
          {/* Fuselagem */}
          <ellipse cx="75" cy="30" rx="45" ry="4" fill="currentColor" opacity="0.95" />
          
          {/* Nariz */}
          <path d="M 120 30 Q 132 30 135 30 Q 132 30 120 30" fill="currentColor" opacity="0.95" />
          
          {/* Cockpit */}
          <ellipse cx="115" cy="29" rx="6" ry="2" fill="#1e293b" opacity="0.7" />
          
          {/* Cauda vertical */}
          <path d="M 32 30 L 28 15 L 33 15 L 34 30 Z" fill="currentColor" opacity="0.9" />
          
          {/* Estabilizadores horizontais */}
          <ellipse cx="30" cy="29" rx="10" ry="1" fill="currentColor" opacity="0.85" />
          
          {/* Motores */}
          <ellipse cx="70" cy="38" rx="4" ry="3" fill="currentColor" opacity="0.85" />
          <ellipse cx="70" cy="22" rx="4" ry="3" fill="currentColor" opacity="0.85" />
          
          {/* Detalhes dos motores */}
          <ellipse cx="70" cy="38" rx="2" ry="1.5" fill="#1e293b" opacity="0.6" />
          <ellipse cx="70" cy="22" rx="2" ry="1.5" fill="#1e293b" opacity="0.6" />
          
          {/* Janelas */}
          <circle cx="50" cy="29" r="0.8" fill="#64748b" opacity="0.7" />
          <circle cx="56" cy="29" r="0.8" fill="#64748b" opacity="0.7" />
          <circle cx="62" cy="29" r="0.8" fill="#64748b" opacity="0.7" />
          <circle cx="68" cy="29" r="0.8" fill="#64748b" opacity="0.7" />
          <circle cx="74" cy="29" r="0.8" fill="#64748b" opacity="0.7" />
          <circle cx="80" cy="29" r="0.8" fill="#64748b" opacity="0.7" />
          <circle cx="86" cy="29" r="0.8" fill="#64748b" opacity="0.7" />
          <circle cx="92" cy="29" r="0.8" fill="#64748b" opacity="0.7" />
          <circle cx="98" cy="29" r="0.8" fill="#64748b" opacity="0.7" />
          <circle cx="104" cy="29" r="0.8" fill="#64748b" opacity="0.7" />
        </svg>
      </motion.div>

      {/* Avião menor ao fundo (mais distante) */}
      <motion.div
        className="absolute"
        style={{ 
          top: '35%', 
          left: '-8%',
          zIndex: 12,
          opacity: 0.6,
          scale: 0.5
        }}
        animate={{
          x: ['0vw', '120vw'],
          y: [0, -10, 0, 10, 0]
        }}
        transition={{
          x: {
            duration: 45,
            repeat: Infinity,
            repeatDelay: 12,
            delay: 22,
            ease: "linear"
          },
          y: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <svg width="120" height="50" viewBox="0 0 120 50" className="text-slate-400">
          {/* Asas */}
          <ellipse 
            cx="60" 
            cy="18" 
            rx="12" 
            ry="2.5" 
            fill="currentColor" 
            opacity="0.8"
            transform="rotate(25 60 18)"
          />
          <ellipse 
            cx="60" 
            cy="32" 
            rx="12" 
            ry="2.5" 
            fill="currentColor" 
            opacity="0.8"
            transform="rotate(-25 60 32)"
          />
          
          {/* Fuselagem */}
          <ellipse cx="65" cy="25" rx="38" ry="3.5" fill="currentColor" opacity="0.85" />
          
          {/* Nariz */}
          <path d="M 103 25 Q 113 25 116 25 Q 113 25 103 25" fill="currentColor" opacity="0.85" />
          
          {/* Cauda vertical */}
          <path d="M 28 25 L 25 13 L 29 13 L 30 25 Z" fill="currentColor" opacity="0.8" />
          
          {/* Cauda horizontal */}
          <ellipse cx="27" cy="24" rx="8" ry="0.8" fill="currentColor" opacity="0.75" />
          
          {/* Motores */}
          <ellipse cx="60" cy="31" rx="3.5" ry="2.5" fill="currentColor" opacity="0.75" />
          <ellipse cx="60" cy="19" rx="3.5" ry="2.5" fill="currentColor" opacity="0.75" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

