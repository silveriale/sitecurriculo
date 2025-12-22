Meu site currículo

Acesse em: https://curriculole.vercel.app/

Portfólio pessoal interativo desenvolvido com React, TypeScript e Framer Motion. Apresenta uma experiência de scroll única com animações baseadas no progresso do scroll, transições suaves entre seções e design responsivo.


• Tecnologias Utilizadas
- **React 19.2.3** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.8.2** - Superset do JavaScript com tipagem estática
- **Framer Motion 12.23.26** - Biblioteca para animações e transições
- **Vite 6.2.0** - Build tool e dev server de alta performance
- **Tailwind CSS** - Framework CSS utility-first (via CDN)
- **React DOM 19.2.3** - Renderização React no DOM


• Estrutura do Projeto
```
sitecurriculo/
├── components/           # Componentes React
│   ├── BackgroundLayer.tsx      # Camada de fundo animada (RJ/Praia → SP/Cidade)
│   ├── ContactSection.tsx       # Seção de contato com links sociais
│   ├── FloatingBadge.tsx        # Badge flutuante com animação
│   ├── TechMarquee.tsx          # Marquee animado de tecnologias
│   └── WaveTransition.tsx        # Transição com onda e marquee
├── App.tsx               # Componente principal da aplicação
├── index.tsx             # Ponto de entrada da aplicação
├── index.html            # Template HTML base
├── vite.config.ts        # Configuração do Vite
├── tsconfig.json         # Configuração do TypeScript
└── package.json          # Dependências e scripts do projeto
```


• Características Principais:

• Animações Baseadas em Scroll
   - **Scroll Progress Tracking**: O portfólio utiliza o progresso do scroll (0 a 1) para controlar todas as animações
   - **Transições Suaves**: Animações suavizadas com efeito spring do Framer Motion
   - **4 Seções Principais**:
   1. **Tela 1 (0-0.3)**: Apresentação inicial com tema RJ/Praia
   2. **Transição (0.3-0.55)**: Onda animada com marquee de tecnologias
   3. **Tela 3 (0.55-0.85)**: Trajetória técnica com cards de habilidades
   4. **Tela 4 (0.85-1.0)**: Seção de contato


• Design Responsivo
   - Layout adaptativo para mobile, tablet e desktop
   - Cards de habilidades otimizados para caber na tela do celular
   - Tipografia responsiva com breakpoints mobile/desktop
   - Espaçamentos ajustados para diferentes tamanhos de tela


• Componentes Interativos:

   • BackgroundLayer
      - Transição visual entre dois cenários:
      - **RJ/Praia**: Gradiente azul claro, sol amarelo, ondas SVG
      - **SP/Cidade**: Gradiente escuro, skyline de prédios com janelas iluminadas
      - Animações sincronizadas com o scroll

   • WaveTransition
      - Onda animada que cobre a tela durante a transição
      - Marquee de tecnologias em movimento dentro da onda
      - Duas linhas de marquee em direções opostas

   • TechMarquee
      - Lista de tecnologias em movimento contínuo
      - Texto outline (apenas contorno) com efeito hover
      - Duas direções de movimento para efeito visual dinâmico

   • FloatingBadge
      - Badge com animação de entrada (scale + rotate)
      - Animação contínua de flutuação vertical
      - Indicador visual pulsante

   • ContactSection
      - Links para LinkedIn, GitHub e Email
      - Animações de entrada suaves
      - Design moderno com gradientes


• Instalação

   Pré-requisitos
      - Node.js (versão 18 ou superior recomendada)
      - npm ou yarn

   Passos:

   1. **Clone o repositório** (ou navegue até a pasta do projeto)
      ```bash
      cd sitecurriculo
      ```

   2. **Instale as dependências**
      ```bash
      npm install
      ```

   3. **Inicie o servidor de desenvolvimento**
      ```bash
      npm run dev
      ```

   4. **Acesse no navegador**
      ```
      http://localhost:3000
      ```


• Scripts Disponíveis

   - `npm run dev` - Inicia o servidor de desenvolvimento (porta 3000)
   - `npm run build` - Cria build de produção otimizado
   - `npm run preview` - Visualiza o build de produção localmente


• Funcionalidades

   • Seção de Apresentação
      - Nome e informações pessoais
      - Badge de formação acadêmica animado
      - Fundo com tema RJ/Praia (sol e ondas)

   • Seção de Trajetória Técnica
      - **3 Cards de Habilidades**:
      - Back-end & APIs (roxo)
      - UX/UI & Front-end (cyan)
      - Infra & Tools (verde)

   • Cada card possui:
      - Ícone temático
      - Lista de tecnologias/habilidades
      - Efeito hover com elevação
      - Design glassmorphism

   • Seção de Contato
      - Links para redes sociais:
      - LinkedIn: https://linkedin.com/in/leticia-silveria-da-costa-4ba861346/
      - GitHub: https://github.com/silveriale/
      - Email: leticia.silveria.costa@gmail.com
      - Rodapé com copyright

   • Indicador de Progresso
      - Barra de progresso na parte inferior da tela
      - Mostra o progresso do scroll com gradiente cyan → purple


   • Paleta de Cores
      - **Cyan**: `#0ea5e9`, `#bae6fd`, `#06b6d4` - Destaques e acentos
      - **Purple**: `#7c3aed`, `#1e1b4b` - Cards e gradientes
      - **Emerald**: `#10b981` - Card de Infra & Tools
      - **Slate**: `#0f172a`, `#1e293b`, `#334155` - Fundos e textos
      - **Yellow**: `#fbbf24` - Sol no cenário RJ

   • Responsividade


   • Breakpoints
      - **Mobile**: < 768px
         - Cards em coluna única
         - Tipografia reduzida
         - Espaçamentos compactos
         - Todos os 3 cards visíveis simultaneamente

      - **Desktop**: ≥ 768px
         - Cards em grid de 3 colunas
         - Tipografia maior
         - Espaçamentos amplos

   • Otimizações Mobile
      - Padding reduzido nos cards
      - Ícones menores
      - Texto das listas com tamanho mínimo (`text-[10px]`)
      - Gap entre elementos reduzido
      - Título da seção técnica com tamanho otimizado



• Configuração

   Vite
      - Porta: 3000
      - Host: 0.0.0.0 (acessível em rede local)
      - Plugin React habilitado
      - Alias `@` configurado para imports absolutos

   TypeScript
      - Target: ES2022
      - Module: ESNext
      - JSX: react-jsx
      - Module Resolution: bundler


• Notas de Desenvolvimento

   • Animações
      - Todas as animações são controladas pelo progresso do scroll
      - Uso de `useTransform` do Framer Motion para mapear valores
      - `useSpring` para suavizar as transições
      - Breakpoints cuidadosamente calibrados para transições suaves

   • Performance
      - Valores aleatórios calculados uma vez (não em cada render)
      - Keys únicas para otimização do React
      - Lazy loading de componentes quando possível
      - Animações otimizadas com `will-change` implícito

   • Acessibilidade
      - Links externos com `rel="noopener noreferrer"`
      - Estrutura semântica HTML
      - Contraste adequado de cores
      - Navegação por teclado funcional

 
• Sobre
   **Leticia Silveria da Costa**
   - 25 anos
   - Carioca
   - Desenvolvedora Full Stack
   - Bacharelado em Ciências Matemáticas e da Terra - UFRJ


• Licença
   - Este projeto é privado e pessoal.


• Destaques Técnicos
   - **Scroll-based animations**: Animações baseadas no progresso do scroll
   - **Glassmorphism**: Efeito de vidro fosco nos cards
   - **SVG Animations**: Ondas e formas criadas com SVG
   - **Responsive Design**: Layout totalmente adaptativo
   - **TypeScript**: Tipagem estática para maior segurança
   - **Component-based**: Arquitetura modular e reutilizável

---

Desenvolvido com paixão entre Rio e São Paulo ❤️

