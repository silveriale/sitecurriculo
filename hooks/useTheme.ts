/**
 * @fileoverview Hook customizado para gerenciar tema (claro/escuro).
 * 
 * Este arquivo contém o hook useTheme que gerencia o estado do tema da aplicação,
 * incluindo persistência no localStorage e sincronização com o atributo data-theme
 * do elemento HTML.
 */

import { useState, useEffect } from 'react';

/**
 * Tipo do tema disponível.
 */
export type Theme = 'light' | 'dark';

/**
 * Interface que define o retorno do hook useTheme.
 * 
 * @interface UseThemeReturn
 * @property {Theme} theme - Tema atual ('light' ou 'dark')
 * @property {() => void} toggleTheme - Função para alternar entre temas
 */
interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * Hook customizado para gerenciar o tema da aplicação.
 * 
 * Funcionalidades:
 * - Detecta preferência do sistema (prefers-color-scheme)
 * - Carrega tema salvo do localStorage
 * - Salva tema no localStorage ao alterar
 * - Sincroniza com atributo data-theme do HTML
 * - Fornece função para alternar tema
 * 
 * Ordem de prioridade:
 * 1. Tema salvo no localStorage (preferência do usuário)
 * 2. Preferência do sistema (prefers-color-scheme)
 * 3. Light mode (padrão)
 * 
 * @returns {UseThemeReturn} Objeto com tema atual e função de toggle
 * 
 * @example
 * const { theme, toggleTheme } = useTheme();
 * 
 * return (
 *   <button onClick={toggleTheme}>
 *     {theme === 'light' ? '🌙' : '☀️'}
 *   </button>
 * );
 */
export const useTheme = (): UseThemeReturn => {
  /**
   * Obtém o tema inicial baseado em localStorage ou preferência do sistema.
   */
  const getInitialTheme = (): Theme => {
    // Verifica se está no browser
    if (typeof window === 'undefined') return 'light';
    
    // 1. Verifica localStorage (prioridade máxima)
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    
    // 2. Verifica preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };

  // Estado do tema
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  /**
   * Aplica o tema ao documento HTML.
   * Adiciona atributo data-theme ao elemento raiz.
   */
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove tema anterior
    root.removeAttribute('data-theme');
    
    // Aplica novo tema
    root.setAttribute('data-theme', theme);
    
    // Salva no localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  /**
   * Alterna entre tema claro e escuro.
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};

