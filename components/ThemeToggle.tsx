/**
 * @fileoverview Componente de botão para alternar tema (claro/escuro).
 * 
 * Este arquivo contém o componente ThemeToggle que exibe um botão fixo
 * no canto superior esquerdo da tela, permitindo ao usuário alternar
 * entre tema claro (sol) e escuro (lua).
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../hooks/useTheme';

/**
 * Props do componente ThemeToggle.
 * 
 * @interface ThemeToggleProps
 * @property {Theme} theme - Tema atual ('light' ou 'dark')
 * @property {() => void} onToggle - Função callback para alternar tema
 */
interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

/**
 * Componente de botão para alternar tema.
 * 
 * Características:
 * - Posicionado fixo no canto superior esquerdo
 * - Ícone de sol no modo claro
 * - Ícone de lua no modo escuro
 * - Animação de rotação ao alternar
 * - Efeito de hover com escala
 * - Z-index alto para ficar sempre visível
 * - Design glassmorphism
 * 
 * @param {ThemeToggleProps} props - Props do componente
 * @param {Theme} props.theme - Tema atual
 * @param {() => void} props.onToggle - Função para alternar tema
 * @returns {JSX.Element} Componente React renderizado
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-6 left-6 z-[60] w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer shadow-xl hover:bg-white/20 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      aria-label={`Alternar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      {/* Ícone animado que alterna entre sol e lua */}
      <motion.div
        key={theme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {theme === 'light' ? (
          // Ícone de Lua (modo claro - clique para escurecer)
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        ) : (
          // Ícone de Sol (modo escuro - clique para clarear)
          <svg
            className="w-6 h-6 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12,6a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V5A1,1,0,0,0,12,6ZM5.64,8.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-1.41-1.42A1,1,0,0,0,4.22,6.64ZM6,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H5A1,1,0,0,0,6,12ZM5.64,15.95,4.22,17.36a1,1,0,0,0,0,1.41,1,1,0,0,0,1.42,0l1.41-1.41a1,1,0,0,0,0-1.42A1,1,0,0,0,5.64,15.95ZM12,18a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V19A1,1,0,0,0,12,18Zm5.66-2.05a1,1,0,0,0-1.42,1.42l1.42,1.41a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM21,11H19a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Zm-2.64-6.36a1,1,0,0,0-1.41,1.41l1.41,1.42a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.42ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
};

