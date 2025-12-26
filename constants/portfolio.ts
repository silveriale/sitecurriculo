/**
 * @fileoverview Constantes e dados do portfólio.
 * 
 * Este arquivo centraliza todos os dados estáticos do portfólio, incluindo
 * informações pessoais, lista de habilidades técnicas e tecnologias.
 * Dados separados facilita manutenção e possíveis integrações futuras.
 */

/**
 * Interface que define a estrutura de um item de habilidade na lista de skills.
 * 
 * @interface SkillItem
 * @property {string} text - Texto descritivo da habilidade
 */
export interface SkillItem {
  text: string;
}

/**
 * Interface que define a estrutura de um card de habilidade.
 * 
 * @interface SkillCard
 * @property {string} id - Identificador único do card
 * @property {string} title - Título do card
 * @property {string} color - Cor do tema (purple, cyan, emerald)
 * @property {string} iconType - Tipo do ícone (code, layout, tools)
 * @property {SkillItem[]} skills - Lista de habilidades do card
 */
export interface SkillCardData {
  id: string;
  title: string;
  color: 'purple' | 'cyan' | 'emerald';
  iconType: 'code' | 'layout' | 'tools';
  skills: SkillItem[];
}

/**
 * Lista de cards de habilidades técnicas.
 * Cada card representa uma área de expertise com suas respectivas habilidades.
 */
export const SKILL_CARDS: SkillCardData[] = [
  {
    id: 'backend',
    title: 'Back-end & APIs',
    color: 'purple',
    iconType: 'code',
    skills: [
      { text: 'Node.js & TypeScript' },
      { text: 'Arquitetura RESTful & HTTP' },
      { text: 'Bancos de Dados SQL/NoSQL' },
      { text: 'Deploy de Aplicações' }
    ]
  },
  {
    id: 'frontend',
    title: 'UX/UI & Front-end',
    color: 'cyan',
    iconType: 'layout',
    skills: [
      { text: 'React & Fundamentos Web' },
      { text: 'Tailwind CSS Avançado' },
      { text: 'Estudos de UX/UI Design' },
      { text: 'HTML, CSS, JS ES6+ & TS' }
    ]
  },
  {
    id: 'infra',
    title: 'Infra & Tools',
    color: 'emerald',
    iconType: 'tools',
    skills: [
      { text: 'Docker & Containerização' },
      { text: 'Git & GitHub (Flow)' },
      { text: 'Testes Automatizados' },
      { text: 'Configuração de Ambiente' }
    ]
  }
];

/**
 * Lista de tecnologias para o marquee da onda de transição.
 * Array de strings com nomes das principais tecnologias utilizadas.
 */
export const TECHNOLOGIES = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Tailwind CSS",
  "Git",
  "Github",
  "APIs",
  "Docker",
  "Next.js"
];

/**
 * Calcula a idade baseada na data de nascimento.
 * @returns {number} Idade atual em anos
 */
const calcularIdade = (): number => {
  const nascimento = new Date(2000, 1, 14); // 14/02/2000
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  
  return idade;
};

/**
 * Informações pessoais da desenvolvedora.
 * Centraliza dados de contato e informações profissionais.
 */
export const PERSONAL_INFO = {
  name: {
    first: 'Leticia',
    middle: 'Silveria',
    last: 'da Costa'
  },
  age: calcularIdade(),
  location: 'Carioca',
  role: 'Desenvolvedora Full Stack',
  education: [
    'Bacharelado em Ciências Matemáticas e da Terra - UFRJ',
    'Desenvolvedora Full Stack - Rocketseat'
  ],
  contact: {
    email: 'leticia.silveria.costa@gmail.com',
    linkedin: 'https://linkedin.com/in/leticia-silveria-da-costa-4ba861346/',
    github: 'https://github.com/silveriale/'
  }
};
