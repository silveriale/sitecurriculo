/**
 * @fileoverview Utilitários para geração de prédios do skyline.
 * 
 * Este arquivo contém funções auxiliares para gerar prédios com características
 * aleatórias (altura, janelas iluminadas, antenas) para o cenário de cidade/SP
 * no background do portfólio.
 */

/**
 * Interface que define uma janela de um prédio.
 * 
 * @interface BuildingWindow
 * @property {number} id - Identificador único da janela
 * @property {boolean} isYellow - Se a janela está iluminada (amarela) ou apagada (cinza)
 * @property {number} opacity - Opacidade da janela (0 a 1)
 */
export interface BuildingWindow {
  id: number;
  isYellow: boolean;
  opacity: number;
}

/**
 * Interface que define um prédio do skyline.
 * 
 * @interface Building
 * @property {number} id - Identificador único do prédio
 * @property {number} height - Altura do prédio em porcentagem (20% a 80%)
 * @property {BuildingWindow[]} windows - Array de janelas do prédio
 * @property {boolean} hasAntenna - Se o prédio possui antena no topo
 */
export interface Building {
  id: number;
  height: number;
  windows: BuildingWindow[];
  hasAntenna: boolean;
}

/**
 * Gera uma janela aleatória para um prédio.
 * 
 * Características:
 * - 20% de chance de estar iluminada (amarela)
 * - Opacidade aleatória para variação visual
 * 
 * @param {number} id - Identificador único da janela
 * @returns {BuildingWindow} Objeto representando uma janela
 */
const generateWindow = (id: number): BuildingWindow => ({
  id,
  isYellow: Math.random() > 0.8,
  opacity: Math.random()
});

/**
 * Gera um array de janelas para um prédio.
 * 
 * @param {number} count - Número de janelas a serem geradas
 * @returns {BuildingWindow[]} Array de janelas
 */
const generateWindows = (count: number): BuildingWindow[] => {
  return Array.from({ length: count }, (_, index) => generateWindow(index));
};

/**
 * Gera um prédio com características aleatórias.
 * 
 * Características geradas:
 * - Altura aleatória entre 20% e 80% da altura do container
 * - Número especificado de janelas com características aleatórias
 * - 40% de chance de ter antena no topo
 * 
 * @param {number} id - Identificador único do prédio
 * @param {number} windowCount - Número de janelas do prédio
 * @returns {Building} Objeto representando um prédio
 */
export const generateBuilding = (
  id: number, 
  windowCount: number
): Building => ({
  id,
  height: 20 + Math.random() * 60,
  windows: generateWindows(windowCount),
  hasAntenna: Math.random() > 0.6
});

/**
 * Gera um array de prédios para compor o skyline.
 * 
 * Cada prédio é gerado com características aleatórias independentes,
 * criando um skyline único e variado.
 * 
 * @param {number} buildingCount - Número de prédios a serem gerados
 * @param {number} windowsPerBuilding - Número de janelas por prédio
 * @returns {Building[]} Array de prédios
 * 
 * @example
 * // Gera 15 prédios com 12 janelas cada (desktop)
 * const buildings = generateBuildings(15, 12);
 * 
 * @example
 * // Gera 8 prédios com 6 janelas cada (mobile)
 * const buildings = generateBuildings(8, 6);
 */
export const generateBuildings = (
  buildingCount: number,
  windowsPerBuilding: number
): Building[] => {
  return Array.from({ length: buildingCount }, (_, index) => 
    generateBuilding(index, windowsPerBuilding)
  );
};

