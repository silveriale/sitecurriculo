/**
 * @fileoverview Componente de camada de fundo animada.
 * 
 * Este arquivo contém o componente BackgroundLayer que gerencia o fundo visual
 * do portfólio. Cria uma transição suave entre dois cenários:
 * - Cenário RJ/Praia: gradiente azul claro com sol/lua e ondas
 * - Cenário SP/Cidade: gradiente escuro com skyline de prédios
 * 
 * A transição é controlada pelo progresso do scroll da página.
 * Suporta tema claro/escuro com transição automática entre sol e lua.
 */

import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { Theme } from '../hooks/useTheme';
import { BeachScene } from './background/BeachScene';
import { CitySkyline } from './background/CitySkyline';
import { CityStars } from './background/Stars';
import { Clouds } from './background/Clouds';
import { Helicopter } from './background/Helicopter';
import { Airplane } from './background/Airplane';

/**
 * Props do componente BackgroundLayer.
 * 
 * @interface BackgroundLayerProps
 * @property {MotionValue<number>} progress - Progresso do scroll (0 a 1) usado para controlar transições
 * @property {Theme} theme - Tema atual ('light' ou 'dark')
 */
interface BackgroundLayerProps {
  progress: MotionValue<number>;
  theme: Theme;
}

/**
 * Detecta se o dispositivo é mobile baseado na largura da janela.
 * 
 * @returns {boolean} true se a largura da janela é menor que 768px
 */
const isMobileDevice = (): boolean => {
  return typeof window !== 'undefined' && window.innerWidth < 768;
};

/**
 * Componente de camada de fundo animada.
 * 
 * Gerencia a transição visual entre dois cenários:
 * 1. Cenário RJ/Praia (início): gradiente azul claro/escuro, sol/lua, ondas, estrelas
 * 2. Cenário SP/Cidade (meio/fim): gradiente escuro, skyline de prédios
 * 
 * As animações são baseadas no progresso do scroll:
 * - 0 a 0.35: Cenário RJ visível
 * - 0.35 a 0.55: Transição entre cenários
 * - 0.55 em diante: Cenário SP visível
 * 
 * Suporta tema claro/escuro com transições suaves.
 * 
 * @param {BackgroundLayerProps} props - Props do componente
 * @param {MotionValue<number>} props.progress - Progresso do scroll (0 a 1)
 * @param {Theme} props.theme - Tema atual ('light' ou 'dark')
 * @returns {JSX.Element} Componente React renderizado
 */
export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ progress, theme }) => {
  // Detecta dispositivo mobile para otimizações
  const isMobile = isMobileDevice();
  
  /**
   * Transição de gradiente de fundo baseada no tema e progresso.
   * Light: azul claro (praia) para escuro (cidade)
   * Dark: azul escuro (noite na praia) para muito escuro (cidade noturna)
   */
  const bgGradient = useTransform(
    progress,
    [0.25, 0.4],
    theme === 'light'
      ? [
          "linear-gradient(to bottom, #0ea5e9, #bae6fd)",
          "linear-gradient(to bottom, #87ceeb , #87CEEB)"
        ]
      : [
          "linear-gradient(to bottom, #0f172a, #1e293b)",
          "linear-gradient(to bottom, #020617, #0c0a1f)"
    ]
  );

  /**
   * Posição vertical do sol.
   * Move de y: 100 para y: -200 (sobe e desaparece) entre 0 e 0.3.
   */
  const sunY = useTransform(progress, [0, 0.3], [100, -200]);
  
  /**
   * Opacidade do sol e ondas.
   * Desaparece entre 0.2 e 0.3 do progresso.
   */
  const sunOpacity = useTransform(progress, [0.2, 0.3], [1, 0]);

  /**
   * Posição vertical do skyline.
   * Move de y: 600 (abaixo) para y: 0 (posição normal) entre 0.3 e 0.55.
   */
  const cityY = useTransform(progress, [0.3, 0.55], [600, 0]);
  
  /**
   * Opacidade do skyline.
   * Aparece entre 0.35 e 0.5 do progresso.
   */
  const cityOpacity = useTransform(progress, [0.35, 0.5], [0, 1]);

  return (
    <motion.div 
      style={{ 
        background: bgGradient,
        willChange: 'background'
      }}
      className="absolute inset-0 overflow-hidden transition-colors duration-1000"
    >
      {/* Estrelas do céu noturno da cidade (apenas dark mode) */}
      <CityStars theme={theme} opacity={cityOpacity} />

      {/* Avião voando (apenas dark mode) */}
      <Airplane theme={theme} cityOpacity={cityOpacity} />

      {/* Nuvens do céu diurno (apenas light mode) */}
      <Clouds theme={theme} cityOpacity={cityOpacity} />

      {/* Helicópteros (apenas light mode) */}
      <Helicopter theme={theme} cityOpacity={cityOpacity} />

      {/* Cenário RJ/Praia */}
      <BeachScene 
        sunY={sunY} 
        sunOpacity={sunOpacity} 
        isMobile={isMobile}
        theme={theme}
      />

      {/* Cenário SP/Cidade */}
      <CitySkyline 
        cityY={cityY} 
        cityOpacity={cityOpacity} 
        isMobile={isMobile}
        theme={theme}
      />
    </motion.div>
  );
};
