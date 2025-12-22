/**
 * @fileoverview Componente de camada de fundo animada.
 * 
 * Este arquivo contém o componente BackgroundLayer que gerencia o fundo visual
 * do portfólio. Cria uma transição suave entre dois cenários:
 * - Cenário RJ/Praia: gradiente azul claro com sol e ondas
 * - Cenário SP/Cidade: gradiente escuro com skyline de prédios
 * 
 * A transição é controlada pelo progresso do scroll da página.
 */

import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

/**
 * Props do componente BackgroundLayer.
 * 
 * @interface BackgroundLayerProps
 * @property {MotionValue<number>} progress - Progresso do scroll (0 a 1) usado para controlar transições
 */
interface BackgroundLayerProps {
  progress: MotionValue<number>;
}

/**
 * Componente de camada de fundo animada.
 * 
 * Gerencia a transição visual entre dois cenários:
 * 1. Cenário RJ/Praia (início): gradiente azul claro, sol amarelo, ondas
 * 2. Cenário SP/Cidade (meio/fim): gradiente escuro, skyline de prédios
 * 
 * As animações são baseadas no progresso do scroll:
 * - 0 a 0.35: Cenário RJ visível
 * - 0.35 a 0.55: Transição entre cenários
 * - 0.55 em diante: Cenário SP visível
 * 
 * @param {BackgroundLayerProps} props - Props do componente
 * @param {MotionValue<number>} props.progress - Progresso do scroll (0 a 1)
 * @returns {JSX.Element} Componente React renderizado
 */
export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ progress }) => {
  /**
   * Controla o gradiente de fundo baseado no progresso do scroll.
   * 
   * Transição entre:
   * - Gradiente azul claro (RJ/Praia): linear-gradient(to bottom, #0ea5e9, #bae6fd)
   * - Gradiente escuro (SP/Cidade): linear-gradient(to bottom, #0f172a, #1e1b4b)
   * 
   * A transição ocorre mais cedo entre 0.25 e 0.4 do progresso do scroll (ajustado para transição mais rápida).
   */
  const bgGradient = useTransform(
    progress,
    [0.25, 0.4], // Breakpoints do progresso (ajustados para mais rápido)
    [
      "linear-gradient(to bottom, #0ea5e9, #bae6fd)", // RJ Beach - azul claro
      "linear-gradient(to bottom, #0f172a, #1e1b4b)"  // SP City - escuro com tom roxo
    ]
  );

  /**
   * Controla a posição vertical do sol (cenário RJ).
   * 
   * O sol começa em y: 100 (visível) e sobe para y: -200 (fora da tela)
   * durante o progresso de 0 a 0.3 (ajustado para mais rápido).
   */
  const sunY = useTransform(progress, [0, 0.3], [100, -200]);
  
  /**
   * Controla a opacidade do sol (cenário RJ).
   * 
   * O sol desaparece gradualmente entre 0.2 e 0.3 do progresso do scroll (ajustado para mais rápido).
   */
  const sunOpacity = useTransform(progress, [0.2, 0.3], [1, 0]);

  /**
   * Controla a posição vertical do skyline (cenário SP).
   * 
   * O skyline começa em y: 600 (abaixo da tela) e sobe para y: 0 (posição normal)
   * durante o progresso de 0.3 a 0.55 (ajustado para mais rápido).
   */
  const cityY = useTransform(progress, [0.3, 0.55], [600, 0]);
  
  /**
   * Controla a opacidade do skyline (cenário SP).
   * 
   * O skyline aparece gradualmente entre 0.35 e 0.5 do progresso do scroll (ajustado para mais rápido).
   */
  const cityOpacity = useTransform(progress, [0.35, 0.5], [0, 1]);

  return (
    // Container principal com gradiente de fundo animado
    <motion.div 
      style={{ background: bgGradient }} // Gradiente controlado pelo scroll
      className="absolute inset-0 overflow-hidden" // Cobre toda a tela, esconde overflow
    >
      {/* Elementos do cenário RJ/Praia */}
      
      {/* Sol: círculo amarelo com blur para efeito de brilho */}
      {/* Responsivo: w-32 h-32 em mobile, w-64 h-64 em desktop */}
      <motion.div 
        style={{ y: sunY, opacity: sunOpacity }} // Posição e opacidade controladas
        className="absolute top-20 right-20 w-32 h-32 md:w-64 md:h-64 bg-yellow-300 rounded-full blur-2xl opacity-60"
      />
      
      {/* Ondas: SVG com forma de onda na parte inferior */}
      {/* fill-sky-800/40: cor azul escura com 40% de opacidade */}
      <motion.svg 
        style={{ opacity: sunOpacity }} // Opacidade sincronizada com o sol
        className="absolute bottom-0 left-0 w-full h-[30vh] fill-sky-800/40"
        viewBox="0 0 1000 300" 
        preserveAspectRatio="none" // Mantém proporção sem distorção
      >
        {/* Path que define a forma das ondas usando curvas de Bézier */}
        <path d="M0,300 L0,250 C100,200 200,100 300,150 C400,200 500,50 600,100 C700,150 800,250 1000,200 L1000,300 Z" />
      </motion.svg>

      {/* Elementos do cenário SP/Cidade */}
      <motion.div
        style={{ y: cityY, opacity: cityOpacity }} // Posição e opacidade controladas
        className="absolute inset-x-0 bottom-0 h-full pointer-events-none" // pointer-events-none: não interfere com interações
      >
         {/* Container do skyline: prédios na parte inferior */}
         {/* h-[60vh]: altura de 60% da viewport */}
         {/* flex items-end: alinha prédios na parte inferior */}
         <div className="absolute bottom-0 w-full h-[60vh] flex items-end justify-around gap-2 px-10">
            {/* Gera 15 prédios com características aleatórias */}
            {/* Usa IIFE (Immediately Invoked Function Expression) para calcular valores aleatórios uma vez */}
            {(() => {
              // Cria array de prédios com propriedades calculadas uma vez
              const buildings = Array.from({ length: 15 }, (_, i) => ({
                id: i,                                    // ID único para key do React
                height: 20 + Math.random() * 60,         // Altura aleatória entre 20% e 80%
                // Cria 12 janelas por prédio com propriedades aleatórias
                windows: Array.from({ length: 12 }, (_, j) => ({
                  id: j,                                 // ID único para key do React
                  isYellow: Math.random() > 0.8,         // 20% de chance de ser amarelo (luz acesa)
                  opacity: Math.random()                  // Opacidade aleatória para variação visual
                })),
                hasAntenna: Math.random() > 0.6          // 40% de chance de ter antena
              }));
              
              // Renderiza cada prédio
              return buildings.map((building) => (
                <div 
                    key={building.id} 
                    className="flex-1 bg-slate-900 border-t border-x border-slate-800 relative rounded-t-lg"
                    style={{ height: `${building.height}%` }} // Altura dinâmica baseada no valor calculado
                >
                    {/* Grid de janelas: 2 colunas, 6 linhas (12 janelas total) */}
                    <div className="grid grid-cols-2 gap-1 p-2">
                        {building.windows.map((window) => (
                            <div 
                                key={window.id} 
                                // Classe condicional: amarelo se isYellow, senão cinza escuro
                                className={`w-1 h-1 rounded-sm ${window.isYellow ? 'bg-yellow-400' : 'bg-slate-800'}`}
                                style={{ opacity: window.opacity }} // Opacidade individual para cada janela
                            />
                        ))}
                    </div>
                    {/* Antena: linha vertical roxa com brilho (shadow) */}
                    {/* Renderiza apenas se hasAntenna for true */}
                    {building.hasAntenna && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-purple-500 shadow-[0_0_10px_purple]" />
                    )}
                </div>
              ));
            })()}
         </div>
         
         {/* Gradiente de fade no topo do skyline para transição suave */}
         {/* h-1/3: altura de 33% do container */}
         <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#0f172a] to-transparent" />
      </motion.div>
    </motion.div>
  );
};
