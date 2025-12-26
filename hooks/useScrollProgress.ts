/**
 * @fileoverview Hook customizado para gerenciar progresso de scroll.
 * 
 * Este arquivo contém o hook useScrollProgress que encapsula toda a lógica
 * de cálculo e transformação do progresso de scroll da página, incluindo
 * efeitos de spring e transformações para opacidade e movimento das seções.
 */

import { useRef, RefObject } from 'react';
import { useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';

/**
 * Interface que define o retorno do hook useScrollProgress.
 * 
 * @interface ScrollProgressValues
 * @property {RefObject<HTMLDivElement>} containerRef - Referência ao container principal
 * @property {MotionValue<number>} scrollYProgress - Progresso bruto do scroll (0 a 1)
 * @property {MotionValue<number>} smoothProgress - Progresso suavizado com spring
 * @property {MotionValue<number>} sceneOpacity1 - Opacidade da seção de apresentação
 * @property {MotionValue<number>} sceneOpacity3 - Opacidade da seção de trajetória
 * @property {MotionValue<string>} scene3PointerEvents - Controle de pointer-events da seção 3
 * @property {MotionValue<number>} sceneOpacity4 - Opacidade da seção de contato
 * @property {MotionValue<number>} scene1TranslateY - Movimento vertical da seção 1
 */
interface ScrollProgressValues {
  containerRef: RefObject<HTMLDivElement>;
  scrollYProgress: MotionValue<number>;
  smoothProgress: MotionValue<number>;
  sceneOpacity1: MotionValue<number>;
  sceneOpacity3: MotionValue<number>;
  scene3PointerEvents: MotionValue<string>;
  sceneOpacity4: MotionValue<number>;
  scene1TranslateY: MotionValue<number>;
}

/**
 * Hook customizado para gerenciar o progresso de scroll e animações.
 * 
 * Encapsula toda a lógica de scroll do portfólio, incluindo:
 * - Detecção de viewport e progresso do scroll
 * - Aplicação de efeito spring para suavização
 * - Cálculo de opacidades para cada seção baseado em breakpoints
 * - Controle de interatividade (pointer-events) das seções
 * - Transformações de movimento (translateY)
 * 
 * Breakpoints de transição:
 * - 0 - 0.2: Seção 1 (Apresentação) totalmente visível
 * - 0.2 - 0.45: Transição com onda de tecnologias
 * - 0.45 - 0.65: Seção 3 (Trajetória Técnica) visível
 * - 0.65 - 1.0: Seção 4 (Contato) visível
 * 
 * @returns {ScrollProgressValues} Objeto com valores de scroll e transformações
 */
export const useScrollProgress = (): ScrollProgressValues => {
  // Referência ao container principal para cálculo do scroll
  const containerRef = useRef<HTMLDivElement>(null);
  
  /**
   * Hook do Framer Motion que retorna o progresso do scroll (0 a 1).
   * target: elemento a ser observado
   * offset: define quando o rastreamento inicia e termina
   */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Detecta se é mobile para ajustar performance do spring
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  /**
   * Aplica efeito spring (mola) ao progresso do scroll para suavizar animações.
   * Valores reduzidos em mobile para melhor performance.
   */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: isMobile ? 50 : 100,
    damping: isMobile ? 25 : 30,
    restDelta: 0.001
  });

  /**
   * Opacidade da primeira seção (Tela 1 - Apresentação).
   * Fade out entre 0.15 e 0.25 do progresso.
   */
  const sceneOpacity1 = useTransform(
    smoothProgress, 
    [0, 0.15, 0.25], 
    [1, 1, 0]
  );
  
  /**
   * Opacidade da terceira seção (Tela 3 - Trajetória Técnica).
   * Fade in entre 0.45-0.55, visível até 0.6, fade out até 0.65.
   */
  const sceneOpacity3 = useTransform(
    smoothProgress, 
    [0.45, 0.55, 0.6, 0.65], 
    [0, 1, 1, 0]
  );
  
  /**
   * Controla pointer-events da seção 3 baseado na opacidade.
   * Habilita interação quando opacidade > 0.1 para permitir seleção de texto.
   */
  const scene3PointerEvents = useTransform(
    sceneOpacity3, 
    (value: number) => value > 0.1 ? 'auto' : 'none'
  );
  
  /**
   * Opacidade da quarta seção (Tela 4 - Contato).
   * Fade in entre 0.65 e 0.75, depois permanece visível.
   */
  const sceneOpacity4 = useTransform(
    smoothProgress, 
    [0.65, 0.75], 
    [0, 1]
  );

  /**
   * Movimento vertical da seção 1 durante scroll.
   * Move -100px para cima entre 0 e 0.25 do progresso.
   */
  const scene1TranslateY = useTransform(
    smoothProgress, 
    [0, 0.25], 
    [0, -100]
  );

  return {
    containerRef,
    scrollYProgress,
    smoothProgress,
    sceneOpacity1,
    sceneOpacity3,
    scene3PointerEvents,
    sceneOpacity4,
    scene1TranslateY
  };
};
