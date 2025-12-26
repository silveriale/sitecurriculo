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
├── components/              # Componentes React reutilizáveis
│   ├── BackgroundLayer.tsx      # Camada de fundo animada (RJ/Praia → SP/Cidade) com suporte a tema
│   ├── ContactSection.tsx       # Seção de contato com links sociais
│   ├── FloatingBadge.tsx        # Badge flutuante com animação
│   ├── SkillCard.tsx            # Card reutilizável de habilidades técnicas
│   ├── ThemeToggle.tsx          # Botão de toggle para dark mode
│   └── WaveTransition.tsx       # Transição com onda e marquee de tecnologias
├── hooks/                   # Custom React Hooks
│   ├── useScrollProgress.ts     # Hook para gerenciar progresso de scroll e transformações
│   └── useTheme.ts              # Hook para gerenciar tema (claro/escuro) e persistência
├── utils/                   # Funções auxiliares e utilitários
│   └── buildingGenerator.ts     # Geração de prédios para o skyline da cidade
├── constants/               # Dados estáticos e configurações
│   └── portfolio.ts             # Dados do portfólio (habilidades, informações pessoais, etc)
├── App.tsx                  # Componente principal da aplicação
├── index.tsx                # Ponto de entrada da aplicação
├── index.html               # Template HTML base
├── vite.config.ts           # Configuração do Vite
├── tsconfig.json            # Configuração do TypeScript
├── package.json             # Dependências e scripts do projeto
├── README.md                # Documentação do projeto
├── REFACTORING_SUMMARY.md   # Resumo detalhado da refatoração realizada
├── DARK_MODE_GUIDE.md       # Guia completo da implementação de dark mode
├── SUNSET_SCENE_GUIDE.md    # Guia do cenário de entardecer com nuvens e helicópteros
└── TECHNICAL_GUIDE.md       # Guia técnico do sistema de scroll e animações
```


• Características Principais:

• Dark Mode
   - **Toggle de Tema**: Botão fixo no canto superior esquerdo para alternar entre modo claro e escuro
   - **Sol → Lua**: Transição visual automática entre sol (light) e lua com crateras (dark)
   - **Céu Estrelado**: 50 estrelas com animação de piscar no modo escuro
   - **Persistência**: Preferência salva no localStorage
   - **Detecção de Sistema**: Respeita preferência do sistema operacional (prefers-color-scheme)
   - **CSS Variables**: Sistema modular de cores para fácil manutenção
   - **Transições Suaves**: Todas as mudanças com transição de 1 segundo

• Animações Baseadas em Scroll
   - **Scroll Progress Tracking**: O portfólio utiliza o progresso do scroll (0 a 1) para controlar todas as animações
   - **Transições Suaves**: Animações suavizadas com efeito spring do Framer Motion
   - **4 Seções Principais**:
   1. **Tela 1 (0-0.25)**: Apresentação inicial com tema RJ/Praia
   2. **Transição (0.2-0.45)**: Onda animada com marquee de tecnologias
   3. **Tela 3 (0.45-0.65)**: Trajetória técnica com cards de habilidades
   4. **Tela 4 (0.65-1.0)**: Seção de contato


• Design Responsivo
   - Layout adaptativo para mobile, tablet e desktop
   - Cards de habilidades otimizados para caber na tela do celular
   - Tipografia responsiva com breakpoints mobile/desktop
   - Espaçamentos ajustados para diferentes tamanhos de tela


• Componentes Interativos:

   • BackgroundLayer
      - Transição visual entre dois cenários:
      - **RJ/Praia**: Gradiente azul claro/escuro, sol/lua, ondas SVG
      - **SP/Cidade**: Céu de entardecer (modo claro) ou noturno (modo escuro), skyline de prédios
      - **Nuvens**: 8 nuvens estilizadas em diferentes camadas parallax (apenas light mode)
      - **Helicópteros**: 2 helicópteros animados passando em diferentes profundidades (apenas light mode)
      - **Estrelas**: 50 estrelas piscantes no céu noturno (apenas dark mode)
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

   • Arquitetura
      - **Componentes reutilizáveis**: Seguindo princípio DRY (Don't Repeat Yourself)
      - **Separação de responsabilidades**: Lógica separada de apresentação
      - **Custom hooks**: Encapsulamento de lógica complexa
      - **Type-safe**: TypeScript em 100% do código
      - **Documentação completa**: JSDoc em todas as funções e interfaces

   • Animações
      - Todas as animações são controladas pelo progresso do scroll
      - Hook customizado `useScrollProgress` gerencia todas as transformações
      - Uso de `useTransform` do Framer Motion para mapear valores
      - `useSpring` para suavizar as transições
      - Breakpoints cuidadosamente calibrados para transições suaves

   • Performance
      - Valores aleatórios calculados uma vez com `useMemo` (não em cada render)
      - Keys únicas para otimização do React
      - Otimizações específicas para mobile (menos elementos, blur reduzido)
      - Animações otimizadas com `will-change`
      - Componentes separados para melhor code splitting

   • Acessibilidade
      - Links externos com `rel="noopener noreferrer"`
      - Estrutura semântica HTML
      - Contraste adequado de cores
      - Navegação por teclado funcional
      - Suporte à seleção de texto preservado

 
• Sobre
   **Leticia Silveria da Costa**
   - 25 anos
   - Carioca
   - Desenvolvedora Full Stack
   - Bacharelado em Ciências Matemáticas e da Terra - UFRJ


• Licença
   - Este projeto é privado e pessoal.


• Destaques Técnicos
   - **Dark Mode**: Sistema completo de tema claro/escuro com persistência
   - **Cenário de Entardecer**: Céu realista com gradiente azul-laranja-rosa, nuvens e helicópteros animados
   - **Parallax 3D**: Múltiplas camadas de profundidade (nuvens, helicópteros, prédios em diferentes z-index)
   - **Scroll-based animations**: Animações baseadas no progresso do scroll
   - **Custom Hooks**: Hooks `useScrollProgress` e `useTheme` para gerenciar estado complexo
   - **Component-driven**: Componentes reutilizáveis e modulares
   - **Glassmorphism**: Efeito de vidro fosco nos cards
   - **SVG Animations**: Ondas, formas e helicópteros criados com SVG animado
   - **Responsive Design**: Layout totalmente adaptativo
   - **TypeScript**: Tipagem estática para maior segurança
   - **CSS Variables**: Sistema modular de cores para temas
   - **LocalStorage**: Persistência de preferências do usuário
   - **Performance Optimized**: useMemo, conditional rendering, CSS transforms
   - **Clean Code**: Código refatorado seguindo princípios SOLID e DRY
   - **Well Documented**: JSDoc completo e comentários técnicos

---

Desenvolvido com paixão entre Rio e São Paulo ❤️

