/**
 * @fileoverview Componente de skyline da cidade.
 * 
 * Renderiza o conjunto de prédios que compõem o cenário SP/Cidade.
 * A quantidade de prédios e janelas é otimizada para mobile.
 * Inclui céu de entardecer com gradiente no modo claro.
 */

import React, { useMemo } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { generateBuildings, Building } from '../../utils/buildingGenerator';
import { Theme } from '../../hooks/useTheme';

/**
 * Props do componente CitySkyline.
 */
interface CitySkylineProps {
  cityY: MotionValue<number>;
  cityOpacity: MotionValue<number>;
  isMobile: boolean;
  theme: Theme;
}

/**
 * Componente de prédio individual do skyline.
 */
const BuildingComponent: React.FC<{ building: Building; isMobile: boolean }> = ({ 
  building, 
  isMobile 
}) => (
  <div 
    key={building.id} 
    className="flex-1 bg-slate-900 border-t border-x border-slate-800 relative rounded-t-lg"
    style={{ 
      height: `${building.height}%`,
      willChange: 'transform'
    }}
  >
    {/* Grid de janelas do prédio */}
    <div className="grid grid-cols-2 gap-1 p-2">
      {building.windows.map((window) => (
        <div 
          key={window.id} 
          className={`w-1 h-1 rounded-sm ${
            window.isYellow ? 'bg-yellow-400' : 'bg-slate-800'
          }`}
          style={{ opacity: window.opacity }}
        />
      ))}
    </div>
    
    {/* Antena no topo do prédio (apenas em desktop) */}
    {building.hasAntenna && !isMobile && (
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-purple-500 shadow-[0_0_10px_purple]" />
    )}
  </div>
);

/**
 * Componente de skyline da cidade.
 */
export const CitySkyline: React.FC<CitySkylineProps> = ({ 
  cityY, 
  cityOpacity, 
  isMobile, 
  theme 
}) => {
  /**
   * Gera os prédios uma única vez usando useMemo.
   * Otimizado para mobile com menos prédios e janelas.
   */
  const buildings = useMemo(() => {
    const buildingCount = isMobile ? 8 : 15;
    const windowsPerBuilding = isMobile ? 6 : 12;
    return generateBuildings(buildingCount, windowsPerBuilding);
  }, [isMobile]);

  return (
    <motion.div
      style={{ 
        y: cityY, 
        opacity: cityOpacity,
        willChange: 'transform, opacity'
      }}
      className="absolute inset-x-0 bottom-0 h-full pointer-events-none"
    >
      {/* Céu de entardecer - apenas modo claro */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          theme === 'light' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to bottom, #87ceeb 30%, #ffd89b 60%, #ffb347 75%, #ff8c42 85%, #ff6b6b 95%, #c94b4b 100%)'
        }}
      />

      {/* Container do skyline */}
      <div className="absolute bottom-0 w-full h-[60vh] flex items-end justify-around gap-2 px-10" style={{ zIndex: 20 }}>
        {buildings.map((building) => (
          <BuildingComponent 
            key={building.id} 
            building={building} 
            isMobile={isMobile} 
          />
        ))}
      </div>
      
      {/* Gradiente de fade no topo do skyline */}
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#0f172a] to-transparent" />
    </motion.div>
  );
};

