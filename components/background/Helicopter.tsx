/**
 * @fileoverview Componente de helicóptero atravessando o céu.
 * 
 * Renderiza helicópteros que atravessam a tela da esquerda para direita.
 * Os helicópteros passam em diferentes profundidades (z-index) em relação aos prédios.
 * Aparecem apenas no modo claro e quando a cidade está visível.
 */

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { Theme } from '../../hooks/useTheme';

/**
 * Props do componente Helicopter.
 */
interface HelicopterProps {
  theme: Theme;
  cityOpacity: MotionValue<number>;
}

/**
 * Componente de helicóptero atravessando o céu.
 */
export const Helicopter: React.FC<HelicopterProps> = ({ theme, cityOpacity }) => {
  if (theme !== 'light') return null;

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity: cityOpacity }}
    >
      {/* Helicóptero 1 - passa NA FRENTE dos prédios */}
      <motion.div
        className="absolute"
        style={{ 
          top: '25%', 
          left: '-10%',
          zIndex: 30
        }}
        animate={{
          x: ['0vw', '115vw'],
          y: [0, -20, 0, 20, 0]
        }}
        transition={{
          x: {
            duration: 25,
            repeat: Infinity,
            repeatDelay: 10,
            ease: "linear"
          },
          y: {
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {/* SVG do helicóptero orientado para direita */}
        <svg width="80" height="50" viewBox="0 0 80 50" className="text-slate-700">
          {/* Hélice principal (girando) */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ transformOrigin: '40px 12px' }}
          >
            <rect x="18" y="11" width="44" height="2" fill="currentColor" opacity="0.6" />
            <rect x="39" y="4" width="2" height="16" fill="currentColor" opacity="0.6" />
          </motion.g>
          
          {/* Mastro */}
          <rect x="39" y="12" width="2" height="10" fill="currentColor" opacity="0.75" />
          
          {/* Corpo principal */}
          <ellipse cx="40" cy="26" rx="18" ry="8" fill="currentColor" opacity="0.85" />
          <rect x="28" y="22" width="24" height="8" rx="3" fill="currentColor" opacity="0.8" />
          
          {/* Janela */}
          <ellipse cx="40" cy="24" rx="10" ry="5" fill="#87ceeb" opacity="0.6" />
          
          {/* Cauda (apontando para TRÁS = esquerda) */}
          <rect x="10" y="24" width="20" height="3" fill="currentColor" opacity="0.75" />
          
          {/* Hélice traseira */}
          <motion.g
            animate={{ rotate: -360 }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ transformOrigin: '10px 25px' }}
          >
            <rect x="9" y="20" width="2" height="10" fill="currentColor" opacity="0.5" />
          </motion.g>
          
          {/* Patins de pouso */}
          <rect x="26" y="34" width="28" height="2" rx="1" fill="currentColor" opacity="0.7" />
          <rect x="24" y="36" width="2" height="5" fill="currentColor" opacity="0.7" />
          <rect x="54" y="36" width="2" height="5" fill="currentColor" opacity="0.7" />
        </svg>
      </motion.div>

      {/* Helicóptero 2 - passa ATRÁS dos prédios */}
      <motion.div
        className="absolute"
        style={{ 
          top: '35%', 
          left: '-8%',
          zIndex: 10,
          opacity: 0.7,
          scale: 0.7
        }}
        animate={{
          x: ['0vw', '115vw'],
          y: [0, -15, 0, 15, 0]
        }}
        transition={{
          x: {
            duration: 32,
            repeat: Infinity,
            repeatDelay: 14,
            delay: 17,
            ease: "linear"
          },
          y: {
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <svg width="70" height="45" viewBox="0 0 70 45" className="text-slate-600">
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '35px 10px' }}
          >
            <rect x="15" y="9" width="40" height="2" fill="currentColor" opacity="0.5" />
          </motion.g>
          <rect x="34" y="10" width="2" height="8" fill="currentColor" opacity="0.6" />
          <ellipse cx="35" cy="22" rx="15" ry="6" fill="currentColor" opacity="0.75" />
          <rect x="10" y="21" width="16" height="2" fill="currentColor" opacity="0.65" />
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '10px 22px' }}
          >
            <rect x="9" y="18" width="2" height="8" fill="currentColor" opacity="0.4" />
          </motion.g>
          <rect x="23" y="28" width="24" height="2" fill="currentColor" opacity="0.6" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

