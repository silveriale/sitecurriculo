/**
 * @fileoverview Componente da seção de contato do portfólio.
 * 
 * Este arquivo contém o componente ContactSection que exibe informações de contato,
 * links para redes sociais (LinkedIn, GitHub) e um botão de email.
 * A seção aparece na última parte do portfólio com animações de entrada suaves.
 */

import React from 'react';
import { motion, MotionValue } from 'framer-motion';

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
 * Utiliza animações do Framer Motion para entrada suave dos elementos.
 * 
 * @param {ContactSectionProps} props - Props do componente
 * @param {MotionValue<number>} props.opacity - Opacidade controlada pelo scroll do componente pai
 * @returns {JSX.Element} Componente React renderizado
 */
export const ContactSection: React.FC<ContactSectionProps> = ({ opacity }) => {
  return (
    // Container principal com opacidade controlada pelo scroll
    <motion.div 
      style={{ opacity }}
      className="text-center w-full max-w-3xl"
    >
      {/* Linha decorativa com gradiente cyan para purple */}
      {/* h-[2px]: altura de 2 pixels */}
      {/* w-24: largura de 6rem (96px) */}
      {/* mx-auto: centraliza horizontalmente */}
      <div className="h-[2px] w-24 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-12" />

      {/* Container de conteúdo com animação de entrada */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}  // Estado inicial: 40px abaixo e invisível
        whileInView={{ y: 0, opacity: 1 }} // Estado quando entra na viewport: posição original e visível
        transition={{ duration: 0.8 }} // Duração da animação: 0.8 segundos
      >
        {/* Nome principal */}
        {/* Responsivo: text-5xl em mobile, text-7xl em desktop */}
        {/* md:hidden: quebra de linha apenas em mobile */}
        <h1 className="text-5xl md:text-7xl font-black text-white font-display leading-tight">
          Leticia <br className="md:hidden" /> Silveria
        </h1>
        
        {/* Título profissional */}
        {/* tracking-[0.3em]: espaçamento entre letras de 0.3em */}
        {/* uppercase: texto em maiúsculas */}
        <p className="text-xl md:text-2xl text-cyan-400 font-medium tracking-[0.3em] uppercase mb-12">
          Full Stack Developer
        </p>

        {/* Container flexível para os botões de contato */}
        {/* flex-wrap: permite quebra de linha se necessário */}
        {/* gap-4: espaçamento de 1rem entre os botões */}
        <div className="flex flex-wrap justify-center gap-4">
          {/* Botão LinkedIn */}
          {/* target="_blank": abre em nova aba */}
          {/* rel="noopener noreferrer": segurança ao abrir links externos */}
          <a 
            href="https://linkedin.com/in/leticia-silveria-da-costa-4ba861346/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-cyan-400 hover:scale-105 transition-all flex items-center gap-2"
          >
            LinkedIn
          </a>
          
          {/* Botão GitHub */}
          {/* bg-cyan-600: mesma cor da onda (cyan-600) */}
          <a 
            href="https://github.com/silveriale/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-500 hover:scale-105 transition-all flex items-center gap-2"
          >
            GitHub
          </a>
          
          {/* Botão E-mail */}
          {/* mailto: abre o cliente de email padrão com o endereço pré-preenchido */}
          <a 
            href="mailto:leticia.silveria.costa@gmail.com" 
            className="px-8 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-500 hover:scale-105 transition-all flex items-center gap-2"
          >
            E-mail
          </a>
        </div>
      </motion.div>
      
      {/* Rodapé com copyright */}
      {/* mt-20: margem superior de 5rem para espaçamento */}
      <p className="mt-20 text-slate-500 text-sm">
        © 2025 Leticia Silveria da Costa. Feito com paixão entre Rio e São Paulo.
      </p>
    </motion.div>
  );
};
