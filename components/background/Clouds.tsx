/**
 * @fileoverview Componente de nuvens para o céu diurno.
 * 
 * Renderiza nuvens estilizadas em diferentes camadas parallax que se movem suavemente.
 * As nuvens têm tamanhos e velocidades variadas para criar profundidade.
 * Aparecem apenas no modo claro e quando a cidade está visível.
 */

import React, { useMemo } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { Theme } from '../../hooks/useTheme';

/**
 * Props do componente Clouds.
 */
interface CloudsProps {
  theme: Theme;
  cityOpacity: MotionValue<number>;
}

/**
 * Componente de nuvens para o céu diurno.
 */
export const Clouds: React.FC<CloudsProps> = ({ theme, cityOpacity }) => {
  const clouds = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 120 - 20,
      y: 10 + Math.random() * 40,
      scale: 0.6 + Math.random() * 0.8,
      duration: 40 + Math.random() * 30,
      delay: Math.random() * 20,
      layer: i < 4 ? 'front' : 'back'
    }));
  }, []);

  if (theme !== 'light') return null;

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity: cityOpacity }}
    >
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            scale: cloud.scale,
            zIndex: cloud.layer === 'front' ? 25 : 15
          }}
          animate={{
            x: [0, 150, 0],
          }}
          transition={{
            duration: cloud.duration,
            delay: cloud.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Nuvem estilizada com círculos sobrepostos */}
          <div className="relative w-24 h-12 md:w-32 md:h-16">
            <div className="absolute left-0 top-2 w-8 h-8 md:w-12 md:h-12 bg-white/70 rounded-full blur-sm" />
            <div className="absolute left-5 top-0 w-12 h-12 md:w-16 md:h-16 bg-white/80 rounded-full blur-sm" />
            <div className="absolute left-12 top-2 w-8 h-8 md:w-12 md:h-12 bg-white/70 rounded-full blur-sm" />
            <div className="absolute left-8 top-5 w-6 h-5 md:w-8 md:h-6 bg-white/60 rounded-full blur-sm" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

