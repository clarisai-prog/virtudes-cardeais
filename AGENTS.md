# AGENTS.md - Guia do Projeto Virtudes Cardeais

Este documento fornece informações essenciais sobre a arquitetura, tecnologias e convenções do projeto para agentes de IA.

## Visão Geral do Projeto

**Virtudes Cardeais: A Forja do Caráter** é um aplicativo web progressivo (PWA) educacional focado em teologia católica. O aplicativo apresenta um guia interativo sobre as quatro virtudes cardeais (Prudência, Justiça, Fortaleza e Temperança) com conteúdo em português brasileiro.

### Funcionalidades Principais
- Navegação por capítulos interativos (3 capítulos + tela inicial e conclusão)
- Geração e download de PDF com resumo do guia
- Suporte a PWA (instalável, funciona offline via Service Worker)
- Design responsivo com tema escuro elegante

## Stack Tecnológico

| Categoria | Tecnologia | Versão |
|-----------|------------|--------|
| Framework UI | React | 19.0.0 |
| Build Tool | Vite | 6.2.0 |
| Linguagem | TypeScript | ~5.8.2 |
| Estilização | Tailwind CSS | 4.1.14 |
| Ícones | Material Symbols (Google Fonts) | - |
| Fontes | Noto Serif, Noto Sans | - |
| PDF | jsPDF (CDN) | 2.5.1 |
| AI SDK | @google/genai | ^1.29.0 |
| Animações | motion | ^12.23.24 |
| Ícones React | lucide-react | ^0.546.0 |

## Estrutura de Arquivos

```
virtudes_cardeais/
├── index.html              # Aplicação principal (SPA vanilla HTML/JS)
├── src/
│   ├── App.tsx            # Componente React (vazio - não utilizado atualmente)
│   ├── main.tsx           # Entry point React (não utilizado atualmente)
│   └── index.css          # Import do Tailwind CSS
├── icons/                 # Diretório para ícones do PWA (vazio atualmente)
├── videos/                # Vídeos do aplicativo
│   ├── video-1.mp4
│   ├── video-2.mp4
│   └── video-3.mp4
├── manifest.json          # Configuração do PWA
├── sw.js                  # Service Worker para funcionalidade offline
├── package.json           # Dependências e scripts npm
├── tsconfig.json          # Configuração TypeScript
├── vite.config.ts         # Configuração do Vite
├── .env.example           # Variáveis de ambiente de exemplo
└── metadata.json          # Metadados do projeto AI Studio
```

## Arquitetura da Aplicação

### Estrutura de Telas
O aplicativo utiliza uma arquitetura de "telas" (screens) vanilla JavaScript dentro de um único arquivo HTML:

1. **screen-cover**: Tela inicial com introdução e botão de instalação PWA
2. **screen-cap1**: Capítulo 1 - Prudência e Justiça
3. **screen-cap2**: Capítulo 2 - Fortaleza
4. **screen-cap3**: Capítulo 3 - Temperança
5. **screen-conclusion**: Tela de conclusão com download de PDF

Cada tela é um `<div>` com a classe `.screen` e navegação via função JavaScript `nav(screenId)`.

### Sistema de Navegação
```javascript
function nav(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + screenId).classList.add('active');
}
```

### Padrão Visual
- **Cores principais**: 
  - Roxo primário: `#7311d4` / `#4d0b8f`
  - Dourado: `#D4AF37` / `#eebd2b`
  - Fundo escuro: `#191022`
  - Superfície: `#231630`
- **Tipografia**: Noto Serif (títulos), Noto Sans (corpo)
- **Tema**: Sempre modo escuro (`class="dark"` no HTML)

## Comandos de Build e Desenvolvimento

```bash
# Instalar dependências
npm install

# Desenvolvimento local (porta 3000)
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Limpar diretório dist
npm run clean

# Verificação de tipos TypeScript
npm run lint
```

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Obrigatório para chamadas à API Gemini
GEMINI_API_KEY=sua_chave_api_aqui

# URL da aplicação (injetada automaticamente pelo AI Studio)
APP_URL=https://sua-url-aqui
```

## Convenções de Código

### HTML/CSS
- Usar classes utilitárias do Tailwind CSS
- Seguir convenção de nomenclatura kebab-case para classes CSS customizadas
- Imagens de fundo carregadas via URLs do Google (formato `lh3.googleusercontent.com`)

### JavaScript
- Funções globais para interatividade: `nav()`, `markCompleted()`, `downloadPDF()`
- Evitar modificar a lógica de navegação entre telas sem considerar o estado do PWA

### TypeScript/React
- O projeto possui configuração React/TypeScript mas o código principal está em vanilla JS no HTML
- Path alias `@/` mapeado para raiz do projeto

## Considerações de Segurança

1. **Service Worker**: O arquivo `sw.js` implementa cache-first strategy. Ao modificar recursos, incrementar a versão do cache (`CACHE_NAME = 'virtudes-v{N}'`).

2. **HMR (Hot Module Replacement)**: Desabilitado quando `DISABLE_HMR=true` (ambiente AI Studio) para evitar flickering durante edições do agente.

3. **CSP e Recursos Externos**: O app carrega recursos de:
   - Google Fonts (CSS e ícones)
   - jsPDF via CDN
   - Imagens via Google User Content

## Notas de Implementação

### Geração de PDF
O recurso de download de PDF utiliza a biblioteca jsPDF carregada via CDN:
```javascript
const jsPDF = window.jspdf ? window.jspdf.jsPDF : window.jsPDF;
```

### PWA Install
O botão de instalação só aparece quando o evento `beforeinstallprompt` é disparado pelo navegador.

### Vídeos
Os vídeos (`videos/video-1.mp4`, etc.) estão referenciados no código mas atualmente os players mostram apenas um botão de play decorativo.

## Ambiente de Desenvolvimento

Este projeto foi criado no **Google AI Studio** e pode ser executado localmente ou implantado no Cloud Run.

- URL do projeto no AI Studio: https://ai.studio/apps/c7d150b1-3d8c-49ce-89b1-b736cd4933f8
- O arquivo `metadata.json` contém metadados específicos do AI Studio.

## Conteúdo do Aplicativo

O conteúdo é religioso/católico em português brasileiro, focado nas virtudes cardeais:

1. **Prudência e Justiça**: Ordem da vida, tratar Deus com justiça
2. **Fortaleza**: Ciência de levantar, combatendo o perfeccionismo
3. **Temperança**: Domínio do conforto, atrasar prazeres legítimos

Cada capítulo contém:
- Definição bíblica da virtude
- Sintoma do vício oposto
- Micro-ação prática para o dia
- Botão de conclusão interativo
