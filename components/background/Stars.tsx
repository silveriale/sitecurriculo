/**
 * @fileoverview Componentes de estrelas para os cenários noturnos.
 * 
 * Contém dois componentes de estrelas:
 * - BeachStars: Estrelas para a cena da praia noturna
 * - CityStars: Estrelas para o céu noturno da cidade
 */

import React, { useMemo } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { Theme } from '../../hooks/useTheme';

/**
 * Props para os componentes de estrelas.
 */
interface StarsProps {
  theme: Theme;
  opacity: MotionValue<number>;
}

/**
 * Componente de estrelas para a cena da praia noturna.
 * 
 * Gera estrelas aleatórias que aparecem no modo escuro durante a cena da praia.
 * Desaparecem quando a cidade entra.
 */
export const BeachStars: React.FC<StarsProps> = ({ theme, opacity }) => {
  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 3
    }));
  }, []);

  if (theme !== 'dark') return null;

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity }}
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
          }}
          transition={{
            duration: 3,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
};

/**
 * Componente de estrelas para o céu noturno da cidade.
 * 
 * Gera estrelas aleatórias que aparecem no modo escuro.
 * Aparecem apenas quando a cidade está visível.
 */
export const CityStars: React.FC<StarsProps> = ({ theme, opacity }) => {
  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 3
    }));
  }, []);

  if (theme !== 'dark') return null;

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity }}
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
          }}
          transition={{
            duration: 3,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
};

