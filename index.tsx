/**
 * @fileoverview Ponto de entrada da aplicação React.
 * 
 * Este arquivo é responsável por inicializar a aplicação React e renderizar
 * o componente App no elemento root do DOM. Utiliza React 18 com createRoot
 * para melhor performance e suporta React StrictMode para desenvolvimento.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Obtém o elemento root do DOM onde a aplicação será montada
const rootElement = document.getElementById('root');

// Validação: garante que o elemento root existe antes de tentar renderizar
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Cria a raiz do React usando a API moderna do React 18
// createRoot permite renderização concorrente e melhor performance
const root = ReactDOM.createRoot(rootElement);

// Renderiza a aplicação envolvida em StrictMode
// StrictMode ajuda a identificar problemas durante o desenvolvimento
// e garante que os componentes seguem as melhores práticas do React
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
