/**
 * @fileoverview Componente da seção de contato do portfólio.
 * 
 * Este arquivo contém o componente ContactSection que exibe informações de contato,
 * links para redes sociais (LinkedIn, GitHub) e um botão de email.
 * A seção aparece na última parte do portfólio com animações de entrada suaves.
 */

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { PERSONAL_INFO } from '../constants/portfolio';

/**
 * Props do componente ContactSection.
 * 
 * @interface ContactSectionProps
 * @property {MotionValue<number>} opacity - Valor de opacidade controlado pelo scroll (0 a 1)
 */
interface ContactSectionProps {
  opacity: MotionValue<number>;
}

/**
 * Componente da seção de contato.
 * 
 * Exibe o nome, título profissional, links para redes sociais e email.
 * Utiliza animações do Framer Motion para entrada suave dos elementos
 * quando a seção entra na viewport durante o scroll.
 * 
 * Características:
 * - Opacidade controlada pelo progresso do scroll
 * - Animação de entrada suave (fade in + slide up)
 * - Links externos com target="_blank" e rel="noopener noreferrer" para segurança
 * - Efeitos de hover nos botões (escala e mudança de cor)
 * - Rodapé com copyright dinâmico (ano atual)
 * - Design responsivo para mobile e desktop
 * 
 * @param {ContactSectionProps} props - Props do componente
 * @param {MotionValue<number>} props.opacity - Opacidade controlada pelo scroll do componente pai
 * @returns {JSX.Element} Componente React renderizado
 */
export const ContactSection: React.FC<ContactSectionProps> = ({ opacity }) => {
  // Obtém ano atual para copyright
  const currentYear = new Date().getFullYear();
  
  // Desestrutura informações pessoais das constantes
  const { name, contact } = PERSONAL_INFO;
  
  return (
    <motion.div 
      style={{ opacity }}
      className="text-center w-full max-w-3xl pointer-events-auto"
    >
      {/* Linha decorativa com gradiente */}
      <div className="h-[2px] w-24 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-12" />

      {/* Container de conteúdo com animação de entrada */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.8 }}
      >
        {/* Nome completo */}
        <h1 className="text-5xl md:text-7xl font-black text-white font-display leading-tight">
          {name.first} <br className="md:hidden" /> {name.middle}
        </h1>
        
        {/* Título profissional */}
        <p className="text-xl md:text-2xl text-cyan-400 font-medium tracking-[0.3em] uppercase mb-12">
          Full Stack Developer
        </p>

        {/* Container de botões de contato */}
        <div className="flex flex-wrap justify-center gap-4">
          {/* Botão LinkedIn */}
          <a 
            href={contact.linkedin}
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-cyan-400 hover:scale-105 transition-all flex items-center gap-2"
          >
            LinkedIn
          </a>
          
          {/* Botão GitHub */}
          <a 
            href={contact.github}
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-500 hover:scale-105 transition-all flex items-center gap-2"
          >
            GitHub
          </a>
          
          {/* Botão E-mail */}
          <a 
            href={`mailto:${contact.email}`}
            className="px-8 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-500 hover:scale-105 transition-all flex items-center gap-2"
          >
            E-mail
          </a>
        </div>
      </motion.div>
      
      {/* Rodapé com copyright */}
      <p className="mt-20 text-slate-500 text-sm">
        © {currentYear} {name.first} {name.middle} {name.last}. Feito com paixão entre Rio e São Paulo.
      </p>
    </motion.div>
  );
};
