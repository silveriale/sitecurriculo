/**
 * @fileoverview Componente de card de habilidade reutilizável.
 * 
 * Este arquivo contém o componente SkillCard que exibe um card de habilidade
 * técnica com ícone, título e lista de skills. O componente é totalmente
 * reutilizável e recebe dados via props, seguindo o princípio DRY.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { SkillCardData } from '../constants/portfolio';

/**
 * Props do componente SkillCard.
 * 
 * @interface SkillCardProps
 * @extends {SkillCardData}
 */
interface SkillCardProps extends SkillCardData {}

/**
 * Mapa de classes CSS para cada cor de tema.
 * Centraliza as variantes de cor para evitar strings duplicadas.
 */
const COLOR_CLASSES = {
  purple: {
    bg: 'bg-purple-500',
    border: 'hover:border-purple-500/50',
    dot: 'bg-purple-500'
  },
  cyan: {
    bg: 'bg-cyan-500',
    border: 'hover:border-cyan-500/50',
    dot: 'bg-cyan-500'
  },
  emerald: {
    bg: 'bg-emerald-500',
    border: 'hover:border-emerald-500/50',
    dot: 'bg-emerald-500'
  }
} as const;

/**
 * Mapa de ícones SVG para cada tipo.
 * Centraliza os ícones para evitar duplicação de JSX.
 */
const ICONS = {
  code: (
    <svg className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  layout: (
    <svg className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  tools: (
    <svg className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  )
} as const;

/**
 * Componente de card de habilidade.
 * 
 * Exibe um card com:
 * - Ícone colorido no topo
 * - Título da área de habilidade
 * - Lista de skills com bullets coloridos
 * - Animação de elevação no hover
 * - Suporte à seleção de texto
 * - Design responsivo para mobile e desktop
 * 
 * O componente detecta automaticamente se está em mobile para ajustar
 * o efeito de blur do backdrop, otimizando performance.
 * 
 * @param {SkillCardProps} props - Props do componente
 * @param {string} props.title - Título do card
 * @param {'purple' | 'cyan' | 'emerald'} props.color - Cor do tema
 * @param {'code' | 'layout' | 'tools'} props.iconType - Tipo do ícone
 * @param {SkillItem[]} props.skills - Lista de habilidades
 * @returns {JSX.Element} Componente React renderizado
 */
export const SkillCard: React.FC<SkillCardProps> = ({ 
  title, 
  color, 
  iconType,
  skills 
}) => {
  // Detecta se é mobile para ajustar backdrop blur
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Obtém as classes de cor baseadas no tema
  const colorClasses = COLOR_CLASSES[color];
  
  // Obtém o ícone baseado no tipo
  const icon = ICONS[iconType];

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      drag={false}
      className={`
        bg-slate-900/60 
        ${isMobile ? 'backdrop-blur-sm' : 'backdrop-blur-xl'} 
        border 
        border-white/10 
        p-2.5 md:p-6 
        rounded-xl md:rounded-3xl 
        ${colorClasses.border}
        transition-all 
        select-text
      `}
      style={{ 
        willChange: 'transform', 
        userSelect: 'text', 
        WebkitUserSelect: 'text', 
        MozUserSelect: 'text', 
        msUserSelect: 'text' 
      }}
    >
      {/* Container do ícone com cor dinâmica */}
      <div className={`
        w-7 h-7 md:w-10 md:h-10 
        ${colorClasses.bg} 
        rounded-lg md:rounded-xl 
        mb-2 md:mb-6 
        flex 
        items-center 
        justify-center
      `}>
        {icon}
      </div>
      
      {/* Título do card */}
      <h3 
        className="text-sm md:text-xl font-bold text-white mb-1.5 md:mb-4 select-text" 
        style={{ userSelect: 'text' }}
      >
        {title}
      </h3>
      
      {/* Lista de habilidades */}
      <ul 
        className="space-y-1 md:space-y-2 text-slate-400 text-[10px] md:text-sm leading-tight select-text" 
        style={{ userSelect: 'text' }}
      >
        {skills.map((skill, index) => (
          <li 
            key={index} 
            className="flex items-center gap-2 select-text" 
            style={{ userSelect: 'text' }}
          >
            {/* Bullet point colorido */}
            <div className={`w-1 h-1 ${colorClasses.dot} rounded-full`} />
            {skill.text}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
