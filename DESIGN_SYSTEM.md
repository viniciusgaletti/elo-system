# Elo System — Design System
## Baseado no Wispr Flow Design System

> Este documento é a referência completa do Design System do Elo System,
> mapeado e inspirado fielmente no Design System do Wispr Flow.
> Deve ser consultado como fonte principal para todas as decisões visuais,
> de tipografia, cor, espaçamento, componentes e padrões de interface.

---

## Sumário

1. [Filosofia de Design](#1-filosofia-de-design)
2. [Paleta de Cores](#2-paleta-de-cores)
3. [Tipografia](#3-tipografia)
4. [Espaçamento & Grid](#4-espaçamento--grid)
5. [Border Radius](#5-border-radius)
6. [Sombras & Elevação](#6-sombras--elevação)
7. [Componentes Base](#7-componentes-base)
8. [Animações & Motion](#8-animações--motion)
9. [Iconografia](#9-iconografia)
10. [Layout & Navegação](#10-layout--navegação)
11. [Responsividade](#11-responsividade)
12. [Dark Mode / Light Mode](#12-dark-mode--light-mode)
13. [Tokens de Design (CSS Variables)](#13-tokens-de-design-css-variables)
14. [Padrões de Componentes](#14-padrões-de-componentes)

---

## 1. Filosofia de Design

### Conceito Central: "Voz em Movimento" (Voice in Motion)

O design do Wispr Flow é construído sobre o conceito de **"Voice in Motion"** — voz em
movimento. Ele se inspira em filosofia, poesia, estado de flow e metáforas de rio.
Cada visual, cada blur, cada curva ecoa a mesma ideia: voz, em movimento.

### Princípios Fundamentais

| Princípio | Descrição |
|---|---|
| **Editorial, não Dashboard** | O design se inspira em revistas de lifestyle e design editorial, não em painéis SaaS tradicionais |
| **Luxo Silencioso** | Neutrals suaves e contraste pensado, afastando-se de paletas clínicas de startups de IA |
| **Humano e Fundamentado** | Propositalmente editorial — cada espaço serve à clareza emocional ou cognitiva |
| **Restrito, Porém Ousado** | Cores, tipografia e elementos são contidos, mas impactantes quando necessário |
| **Interface Invisível** | Design que parece nativo ao OS, não "colado por cima" — simplificar complexidade, ser significativo |
| **Respiração Visual** | Margens amplas, whitespace generoso e hierarquia clara — "menos SaaS dashboard, mais editorial de domingo" |

### Inspirações

- Revistas de lifestyle e design editorial
- Pôsteres de rua e marcas artísticas
- Adesivos vintage da Nike
- Apps de descoberta como AllTrails
- Fontes tipográficas com personalidade calorosa

---

## 2. Paleta de Cores

### 2.1 Cores Primárias da Marca

| Nome | Hex | HSL | Uso |
|---|---|---|---|
| **Evening Sea** (Verde Escuro) | `#034F45` | `168° 93% 16%` | CTAs, acentos UI, sidebar background, elementos de destaque |
| **Apricot White** (Creme) | `#FFFFEB` | `60° 100% 96%` | Background principal (light mode), superfícies, texto claro |
| **Pulse** (Roxo Médio) | `#8D7CE4` | `249° 66% 69%` | Acento secundário, destaques, badges, elementos interativos |

### 2.2 Cores Semânticas Expandidas

| Nome do Token | Light Mode (HSL) | Dark Mode (HSL) | Uso |
|---|---|---|---|
| **Lumen** (Verde Vibrante) | `164° 90% 42%` | `164° 90% 42%` | Sucesso, ações positivas, indicadores de progresso |
| **Dawn** (Dourado Quente) | `42° 85% 65%` | `42° 85% 55%` | Alertas, notificações, destaques calorosos |
| **Destructive** (Vermelho) | `0° 84% 60%` | `0° 63% 51%` | Erros, ações destrutivas, alertas críticos |

### 2.3 Escala de Neutrals

Inspirado na paleta "quiet luxury" do Wispr Flow:

| Nome | Hex (aprox.) | HSL | Uso |
|---|---|---|---|
| **Cream 50** | `#FFFFEB` | `60° 100% 96%` | Background principal light |
| **Cream 100** | `#FEFCE8` | `55° 92% 95%` | Cards, superfícies elevadas light |
| **Cream 200** | `#F5F0E1` | `43° 55% 92%` | Borders, divisores light |
| **Cream 300** | `#E8E0D0` | `40° 35% 86%` | Inputs, muted backgrounds |
| **Teal 900** | `#034F45` | `168° 93% 16%` | Background principal dark |
| **Teal 800** | `#064E42` | `166° 87% 16%` | Cards dark, superfícies elevadas |
| **Teal 700** | `#0A5C4F` | `168° 82% 20%` | Borders, acentos dark |
| **Teal 600** | `#0F6B5C` | `168° 75% 24%` | Hover states dark |

### 2.4 Escala de Greens (Acento)

| Nome | Hex | HSL | Uso |
|---|---|---|---|
| **Green 50** | `#ECFDF5` | `152° 81% 96%` | Background sutil |
| **Green 100** | `#D1FAE5` | `149° 80% 90%` | Background leve |
| **Green 200** | `#A7F3D0` | `152° 76% 80%` | Borders, badges |
| **Green 300** | `#6EE7B7` | `156° 72% 67%` | Ícones, tags |
| **Green 400** | `#34D399` | `160° 64% 52%` | Ícones ativos |
| **Green 500** | `#10B981` | `162° 84% 39%` | CTAs primários, botões |
| **Green 600** | `#059669` | `163° 94% 30%` | Hover em CTAs |
| **Green 700** | `#047857` | `164° 93% 18%` | Active/pressed states |

### 2.5 Escala de Purples (Secundário)

| Nome | Hex | HSL | Uso |
|---|---|---|---|
| **Purple 50** | `#F5F3FF` | `250° 100% 97%` | Background sutil |
| **Purple 100** | `#EDE9FE` | `249° 87% 95%` | Background leve |
| **Purple 200** | `#DDD6FE` | `248° 96% 92%` | Borders, tags |
| **Purple 300** | `#C4B5FD` | `249° 95% 85%` | Badges |
| **Purple 400** | `#A78BFA` | `251° 91% 76%` | Ícones, destaques |
| **Purple 500** | `#8D7CE4` | `249° 66% 69%` | Acento principal secundário |
| **Purple 600** | `#7C3AED` | `263° 83% 58%` | Hover, interações |

---

## 3. Tipografia

### 3.1 Famílias Tipográficas

O Wispr Flow utiliza um **contraste tipográfico intencional**: serif para impacto editorial
e sans-serif para clareza moderna.

| Papel | Fonte Wispr | Fonte Elo System | Fallback | Uso |
|---|---|---|---|---|
| **Display / Headings** | EB Garamond (Serif) | Crimson Pro (Serif) | Georgia, serif | Títulos, headers, texto de destaque |
| **Body / UI** | Figtree (Sans) | Satoshi (Sans) | system-ui, sans-serif | Corpo de texto, labels, botões, UI |

> **Nota**: Crimson Pro e Satoshi são equivalentes editoriais que preservam o espírito
> "utilitarian but airy" do Wispr Flow — com quirks humanísticos, especialmente em
> numerais e pontuação, que dão uma qualidade "lived-in" ao texto.

### 3.2 Escala Tipográfica

| Token | Fonte | Tamanho Mobile | Tamanho Desktop | Peso | Tracking | Leading |
|---|---|---|---|---|---|---|
| **Display** | Serif | 48px (3rem) | 72px (4.5rem) | 700 (Bold) | -0.03em | 1.05 |
| **H1** | Serif | 36px (2.25rem) | 48px (3rem) | 700 (Bold) | -0.02em | 1.1 |
| **H2** | Serif | 30px (1.875rem) | 36px (2.25rem) | 600 (Semibold) | -0.01em | 1.15 |
| **H3** | Serif | 24px (1.5rem) | 24px (1.5rem) | 600 (Semibold) | -0.025em | 1.35 |
| **H4** | Sans | 20px (1.25rem) | 20px (1.25rem) | 600 (Semibold) | -0.01em | 1.4 |
| **Body Large** | Sans | 18px (1.125rem) | 18px (1.125rem) | 400 (Normal) | 0 | 1.7 |
| **Body** | Sans | 16px (1rem) | 16px (1rem) | 400 (Normal) | 0 | 1.625 |
| **Body Small** | Sans | 14px (0.875rem) | 14px (0.875rem) | 500 (Medium) | 0 | 1.625 |
| **Caption** | Sans | 12px (0.75rem) | 12px (0.75rem) | 500 (Medium) | 0.02em | 1.5 |
| **Overline** | Sans | 11px (0.6875rem) | 11px (0.6875rem) | 600 (Semibold) | 0.08em | 1.5 |

### 3.3 Pesos Disponíveis

**Crimson Pro (Serif):**
- 200 (ExtraLight)
- 300 (Light)
- 400 (Regular)
- 500 (Medium)
- 600 (SemiBold)
- 700 (Bold)
- 800 (ExtraBold)
- 900 (Black)
- *Itálicos disponíveis para todos os pesos*

**Satoshi (Sans-Serif):**
- 300 (Light)
- 400 (Regular)
- 500 (Medium)
- 700 (Bold)
- 900 (Black)

### 3.4 Regras Tipográficas

1. **Headings** sempre em serif (Crimson Pro) — transmitem tradição, confiabilidade e elegância editorial
2. **Body text** sempre em sans-serif (Satoshi) — modernidade limpa e legibilidade
3. **Dark mode**: usar pesos ligeiramente mais pesados (medium em vez de regular) para melhorar legibilidade em fundos escuros
4. **Espaçamento**: aumentar levemente leading em dark mode para reduzir densidade perceptual
5. **Hierarquia**: usar espaçamento, tipografia e superfícies em camadas em vez de brilho — reservar texto mais brilhante para headings de primeiro nível

---

## 4. Espaçamento & Grid

### 4.1 Escala de Espaçamento (Base 4px)

| Token | Valor | Uso |
|---|---|---|
| `space-0` | 0px | Reset |
| `space-0.5` | 2px | Micro-ajustes |
| `space-1` | 4px | Espaço mínimo entre ícone e texto |
| `space-1.5` | 6px | Padding interno de badges |
| `space-2` | 8px | Padding interno de chips, gaps mínimos |
| `space-3` | 12px | Padding de botões pequenos, gaps internos |
| `space-4` | 16px | Padding padrão de componentes, gaps de lista |
| `space-5` | 20px | Padding de cards, gap de seções menores |
| `space-6` | 24px | Padding de containers, gap entre campos de form |
| `space-8` | 32px | Separação entre seções dentro de uma página |
| `space-10` | 40px | Margens de container |
| `space-12` | 48px | Separação entre blocos de conteúdo |
| `space-16` | 64px | Padding vertical de seções hero |
| `space-20` | 80px | Margens de seção grande |
| `space-24` | 96px | Espaço entre seções principais da página |
| `space-32` | 128px | Espaçamento máximo entre seções |

### 4.2 Grid System

| Propriedade | Valor | Descrição |
|---|---|---|
| **Colunas** | 12 | Grid de 12 colunas responsivo |
| **Gutter** | 24px (desktop) / 16px (mobile) | Espaço entre colunas |
| **Margem** | 32px (desktop) / 16px (mobile) | Margem lateral do container |
| **Max Width** | 1400px | Largura máxima do container |
| **Content Width** | 720px | Largura máxima para texto de leitura |

### 4.3 Container Breakpoints

| Breakpoint | Largura | Uso |
|---|---|---|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet portrait |
| `lg` | 1024px | Tablet landscape / Desktop pequeno |
| `xl` | 1280px | Desktop padrão |
| `2xl` | 1400px | Desktop largo |

---

## 5. Border Radius

Seguindo a estética do Wispr Flow de "curvas suaves" e "cantos arredondados" que evocam
clareza e calor:

| Token | Valor | Uso |
|---|---|---|
| `radius-none` | 0px | Sem arredondamento |
| `radius-sm` | 12px | Inputs, badges pequenos |
| `radius-md` | 14px | Botões, campos de formulário |
| `radius-lg` | 16px (1rem) | Cards, modais, containers |
| `radius-xl` | 20px | Cards de destaque, hero sections |
| `radius-2xl` | 24px | Containers principais, seções |
| `radius-full` | 9999px | Avatares, chips, toggles, pills |

> O `--radius` base é `1rem` (16px), todos os outros valores derivam dele.

---

## 6. Sombras & Elevação

Sombras suaves que complementam a estética de "luxo silencioso":

| Token | Valor CSS | Uso |
|---|---|---|
| `shadow-xs` | `0 1px 2px 0 rgba(3, 79, 69, 0.03)` | Inputs em repouso |
| `shadow-sm` | `0 1px 3px 0 rgba(3, 79, 69, 0.06), 0 1px 2px -1px rgba(3, 79, 69, 0.06)` | Cards sutis, botões |
| `shadow-md` | `0 4px 6px -1px rgba(3, 79, 69, 0.07), 0 2px 4px -2px rgba(3, 79, 69, 0.05)` | Dropdowns, popovers |
| `shadow-lg` | `0 10px 15px -3px rgba(3, 79, 69, 0.08), 0 4px 6px -4px rgba(3, 79, 69, 0.04)` | Modais, cards flutuantes |
| `shadow-xl` | `0 20px 25px -5px rgba(3, 79, 69, 0.10), 0 8px 10px -6px rgba(3, 79, 69, 0.04)` | Tooltips elevados, menus |
| `shadow-glow` | `0 0 20px rgba(141, 124, 228, 0.15)` | Efeito glow para elementos de destaque (purple) |
| `shadow-glow-green` | `0 0 20px rgba(16, 185, 129, 0.20)` | Efeito glow para CTAs e elementos primários |

### Sombras em Dark Mode

Em dark mode, as sombras são mais sutis e usam preto em vez de teal:

| Token | Valor CSS Dark |
|---|---|
| `shadow-sm` | `0 1px 3px 0 rgba(0, 0, 0, 0.15), 0 1px 2px -1px rgba(0, 0, 0, 0.10)` |
| `shadow-md` | `0 4px 6px -1px rgba(0, 0, 0, 0.20), 0 2px 4px -2px rgba(0, 0, 0, 0.15)` |
| `shadow-lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.25), 0 4px 6px -4px rgba(0, 0, 0, 0.15)` |

---

## 7. Componentes Base

### 7.1 Botões

#### Primary Button
```
Background:    var(--primary) — Evening Sea (#034F45)
Text:          var(--primary-foreground) — Cream (#FFFFEB)
Border:        none
Border Radius: radius-md (14px)
Padding:       12px 24px
Font:          Satoshi, 14px, Semibold (600)
Letter Spacing: 0.01em
Transition:    all 200ms ease
Hover:         Lighten 8%, shadow-sm
Active:        Darken 5%, scale(0.98)
Disabled:      opacity 0.5, cursor not-allowed
```

#### Secondary Button
```
Background:    transparent
Text:          var(--foreground)
Border:        1px solid var(--border)
Border Radius: radius-md (14px)
Padding:       12px 24px
Font:          Satoshi, 14px, Medium (500)
Hover:         bg var(--accent), border darken
Active:        scale(0.98)
```

#### Ghost Button
```
Background:    transparent
Text:          var(--foreground)
Border:        none
Padding:       12px 24px
Font:          Satoshi, 14px, Medium (500)
Hover:         bg var(--accent)
```

#### CTA Button (Acento Verde)
```
Background:    Green 500 (#10B981)
Text:          White (#FFFFFF)
Border:        none
Border Radius: radius-full (pill)
Padding:       14px 32px
Font:          Satoshi, 15px, Semibold (600)
Shadow:        shadow-glow-green
Hover:         Green 600, shadow intensificado
```

#### Tamanhos de Botão

| Tamanho | Padding | Font Size | Height |
|---|---|---|---|
| `sm` | 8px 16px | 13px | 32px |
| `md` (default) | 12px 24px | 14px | 40px |
| `lg` | 14px 32px | 15px | 48px |
| `xl` | 16px 40px | 16px | 56px |
| `icon` | 10px | — | 40px (quadrado) |

### 7.2 Cards

```
Background:    var(--card)
Border:        1px solid var(--border)
Border Radius: radius-lg (16px)
Padding:       24px
Shadow:        shadow-sm
Transition:    all 200ms ease

Hover (se interativo):
  Shadow:      shadow-md
  Border:      lighten border
  Transform:   translateY(-1px)
```

#### Card Variantes

| Variante | Características |
|---|---|
| **Default** | Borda sutil, sombra mínima |
| **Elevated** | Sem borda, shadow-md, superfície ligeiramente mais clara |
| **Interactive** | Cursor pointer, hover com elevação e borda realçada |
| **Glass** | Background semi-transparente, backdrop-blur(12px), borda 1px rgba branca |
| **Highlighted** | Borda com cor primária (green), glow sutil |

### 7.3 Inputs

```
Background:    var(--background)
Border:        1px solid var(--input)
Border Radius: radius-sm (12px)
Padding:       10px 14px
Font:          Satoshi, 14px, Regular (400)
Color:         var(--foreground)
Placeholder:   var(--muted-foreground)
Transition:    border-color 200ms ease, box-shadow 200ms ease
Height:        40px

Focus:
  Border:      var(--ring)
  Box Shadow:  0 0 0 3px rgba(ring-color, 0.1)
  Outline:     none

Error:
  Border:      var(--destructive)
  Box Shadow:  0 0 0 3px rgba(destructive, 0.1)
```

### 7.4 Badges / Tags

```
Display:       inline-flex, align-items center
Padding:       4px 10px
Border Radius: radius-full
Font:          Satoshi, 12px, Medium (500)
Letter Spacing: 0.02em

Variantes:
  Default:     bg var(--muted), color var(--muted-foreground)
  Primary:     bg Green 100, color Green 700
  Secondary:   bg Purple 100, color Purple 600
  Destructive: bg Red 100, color Red 700
  Outline:     bg transparent, border 1px solid var(--border)
```

### 7.5 Avatares

```
Border Radius: radius-full (círculo)
Border:        2px solid var(--border)
Overflow:      hidden
Object Fit:    cover

Tamanhos:
  sm:  32px × 32px
  md:  40px × 40px
  lg:  48px × 48px
  xl:  64px × 64px
  2xl: 96px × 96px

Fallback:      Iniciais em Satoshi Semibold, bg var(--muted)
```

### 7.6 Tooltips

```
Background:    var(--foreground)
Color:         var(--background)
Border Radius: radius-sm (12px)
Padding:       6px 12px
Font:          Satoshi, 12px, Medium (500)
Shadow:        shadow-lg
Max Width:     240px
Animation:     fade-in 150ms ease
```

### 7.7 Modais / Dialogs

```
Background:    var(--card)
Border:        1px solid var(--border)
Border Radius: radius-xl (20px)
Padding:       32px
Shadow:        shadow-xl
Max Width:     520px (sm), 680px (md), 960px (lg)
Overlay:       rgba(3, 79, 69, 0.60) com backdrop-blur(4px)

Animation:
  Enter:       fade-in-up 300ms ease-out
  Exit:        fade-out-down 200ms ease-in
```

### 7.8 Separadores

```
Background:    var(--border)
Height:        1px (horizontal)
Width:         1px (vertical)
Margin:        16px 0 (horizontal) | 0 16px (vertical)
```

### 7.9 Tabelas

```
Header:
  Background:   var(--muted)
  Font:         Satoshi, 12px, Semibold (600), uppercase
  Letter Spacing: 0.05em
  Padding:      12px 16px
  Color:        var(--muted-foreground)

Row:
  Padding:      16px
  Border Bottom: 1px solid var(--border)
  Hover:        bg var(--accent) com opacidade 0.5
  Transition:   background 150ms ease

Cell:
  Font:         Satoshi, 14px, Regular (400)
  Color:        var(--foreground)
```

---

## 8. Animações & Motion

### 8.1 Filosofia de Motion

O motion design é **core** para a experiência Wispr Flow. Cada movimento deve ecoar
"voz em movimento" — fluido, natural, não mecânico.

### 8.2 Easing Functions

| Nome | Valor | Uso |
|---|---|---|
| `ease-default` | `cubic-bezier(0.25, 0.1, 0.25, 1.0)` | Transições padrão |
| `ease-in` | `cubic-bezier(0.42, 0, 1.0, 1.0)` | Elementos saindo |
| `ease-out` | `cubic-bezier(0, 0, 0.58, 1.0)` | Elementos entrando |
| `ease-in-out` | `cubic-bezier(0.42, 0, 0.58, 1.0)` | Transições balanceadas |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1.0)` | Microinterações com bounce |
| `ease-smooth` | `cubic-bezier(0.22, 0.61, 0.36, 1.0)` | Transições de página/seção |

### 8.3 Durações

| Token | Valor | Uso |
|---|---|---|
| `duration-instant` | 75ms | Cor de hover em botão, opacity |
| `duration-fast` | 150ms | Tooltips, micro-transições |
| `duration-normal` | 200ms | Transições padrão de componentes |
| `duration-moderate` | 300ms | Fade-in, slide-in de elementos |
| `duration-slow` | 400ms | Transições de seção, fade-in-up |
| `duration-slower` | 500ms | Animações de hero, transições de página |
| `duration-slowest` | 700ms | Animações de entrada complexas |

### 8.4 Animações Definidas

```css
/* Fade In */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Fade In Up */
@keyframes fade-in-up {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Fade In Down */
@keyframes fade-in-down {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Scale In */
@keyframes scale-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Slide In Right */
@keyframes slide-in-right {
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Slide In Left */
@keyframes slide-in-left {
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Pulse Glow */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(141, 124, 228, 0.15); }
  50% { box-shadow: 0 0 30px rgba(141, 124, 228, 0.30); }
}

/* Float */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
```

### 8.5 Micro-interações

| Interação | Descrição |
|---|---|
| **Button hover** | Scale 1.01, shadow elevação, 150ms ease |
| **Button press** | Scale 0.98, 75ms ease |
| **Card hover** | translateY(-1px), shadow-md, border lighten, 200ms |
| **Link hover** | Underline offset animation, color shift, 150ms |
| **Toggle** | Spring easing, 300ms |
| **Sidebar expand/collapse** | Width transition 300ms ease-smooth |
| **Page transitions** | Fade-in-up 400ms ease-out |
| **Scroll behaviors** | Parallax sutil, reveal on scroll |

---

## 9. Iconografia

### 9.1 Biblioteca

- **Biblioteca principal**: Lucide React (`lucide-react`)
- **Tamanho padrão**: 20px (1.25rem)
- **Stroke width**: 1.75px
- **Cor**: `currentColor` (herda do texto)

### 9.2 Tamanhos de Ícone

| Tamanho | Dimensão | Uso |
|---|---|---|
| `xs` | 14px | Badges, inline com caption text |
| `sm` | 16px | Botões pequenos, inline com body small |
| `md` | 20px | Padrão — botões, navegação, listas |
| `lg` | 24px | Headers, menu items, cards |
| `xl` | 32px | Feature icons, empty states |
| `2xl` | 48px | Hero icons, ilustrações minimalistas |

### 9.3 Regras de Uso

1. Ícones sempre acompanham texto em ações (não apenas ícone solto, exceto em `icon buttons`)
2. Gap entre ícone e texto: `space-2` (8px)
3. Ícones em botões ficam `2px menores` que o texto
4. Em dark mode, ícones podem ter opacity ligeiramente maior para compensar contraste

---

## 10. Layout & Navegação

### 10.1 Estrutura Principal

```
┌──────────────────────────────────────────────────┐
│  Sidebar (240px)  │          Main Content        │
│                   │                              │
│  ┌─────────────┐  │  ┌────────────────────────┐  │
│  │ Logo        │  │  │ Header / Breadcrumb    │  │
│  │             │  │  ├────────────────────────┤  │
│  │ Navigation  │  │  │                        │  │
│  │ Items       │  │  │   Page Content         │  │
│  │             │  │  │                        │  │
│  │             │  │  │   (max-width: 1400px)  │  │
│  │             │  │  │   (padding: 32px)      │  │
│  │             │  │  │                        │  │
│  │─────────────│  │  │                        │  │
│  │ User/Theme  │  │  │                        │  │
│  └─────────────┘  │  └────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

### 10.2 Sidebar

```
Width:            240px (expanded), 64px (collapsed)
Background:       var(--sidebar-background) — Evening Sea
Border Right:     1px solid var(--sidebar-border)
Padding:          16px 12px

Nav Item:
  Padding:        10px 12px
  Border Radius:  radius-sm (12px)
  Font:           Satoshi, 14px, Medium (500)
  Color:          var(--sidebar-foreground) com opacity 0.7
  Transition:     all 200ms ease

Nav Item Active:
  Background:     var(--sidebar-accent)
  Color:          var(--sidebar-accent-foreground)
  Font Weight:    600

Nav Item Hover:
  Background:     var(--sidebar-accent) com opacity 0.5
  Color:          var(--sidebar-foreground)
```

### 10.3 Header

```
Height:           64px
Background:       var(--background) com backdrop-blur(8px)
Border Bottom:    1px solid var(--border)
Padding:          0 32px
Position:         sticky top-0
Z-index:          40
Display:          flex, justify-between, align-center
```

### 10.4 Breadcrumb

```
Font:             Satoshi, 13px, Medium (500)
Color:            var(--muted-foreground)
Separator:        "/" ou ">" em opacity 0.5
Active Item:      var(--foreground), Semibold
Gap:              8px
```

---

## 11. Responsividade

### 11.1 Breakpoints

| Nome | Min-width | Comportamento |
|---|---|---|
| **Mobile** | 0px | Layout single-column, sidebar oculta (sheet), padding 16px |
| **sm** | 640px | Layout single-column, sidebar oculta, padding 20px |
| **md** | 768px | Sidebar pode ser toggle, 2-column opcional |
| **lg** | 1024px | Sidebar persistente, layout completo |
| **xl** | 1280px | Container max, espaçamento expandido |
| **2xl** | 1400px | Container max final |

### 11.2 Padrões Responsivos

| Elemento | Mobile | Tablet | Desktop |
|---|---|---|---|
| **Sidebar** | Sheet/Overlay | Toggle colapsável | Permanente 240px |
| **Grid** | 1 coluna | 2 colunas | 3-4 colunas |
| **Cards** | Stack vertical | Grid 2-col | Grid 3-col |
| **Typography** | Escala reduzida | Escala intermediária | Escala completa |
| **Padding** | 16px | 24px | 32px |
| **Modais** | Full-screen (sheet) | Centered com padding | Centered com max-width |

---

## 12. Dark Mode / Light Mode

### 12.1 Estratégia

- **Implementação**: Class-based (`darkMode: ['class']`) via Tailwind
- **Persistência**: `localStorage` com chave `elo-theme`
- **Opções**: `light`, `dark`, `system`
- **Detecção**: `prefers-color-scheme` media query para modo "system"
- **Anti-flash**: Script inline no `<head>` antes do React para evitar flash de tema errado

### 12.2 Mapeamento Completo de Tokens

| Token | Light Mode | Dark Mode |
|---|---|---|
| `--background` | Cream (#FFFFEB area) — `45 28% 94%` | Evening Sea (#034F45 area) — `156 20% 5%` |
| `--foreground` | Dark Teal — `156 20% 5%` | Cream — `45 28% 94%` |
| `--card` | Lighter Cream — `45 35% 97%` | Darker Teal — `156 15% 8%` |
| `--card-foreground` | Dark Teal — `156 20% 5%` | Cream — `45 28% 94%` |
| `--popover` | Lighter Cream — `45 35% 97%` | Darker Teal — `156 15% 8%` |
| `--popover-foreground` | Dark Teal — `156 20% 5%` | Cream — `45 28% 94%` |
| `--primary` | Green Vibrant — `74 100% 50%` | Green Vibrant — `74 100% 50%` |
| `--primary-foreground` | Dark Teal — `156 20% 5%` | Dark Teal — `156 20% 5%` |
| `--secondary` | Light Purple — `258 100% 92%` | Light Purple — `258 100% 92%` |
| `--secondary-foreground` | Dark Teal — `156 20% 5%` | Dark Teal — `156 20% 5%` |
| `--muted` | Tan Muted — `45 15% 86%` | Teal Deep — `156 15% 12%` |
| `--muted-foreground` | Mid Teal — `156 10% 40%` | Light Tan — `45 15% 70%` |
| `--accent` | Tan Muted — `45 15% 86%` | Teal Deep — `156 15% 12%` |
| `--accent-foreground` | Dark Teal — `156 20% 5%` | Cream — `45 28% 94%` |
| `--destructive` | Red — `0 84.2% 60.2%` | Red Dark — `0 62.8% 50.6%` |
| `--border` | Light — `156 10% 85%` | Dark — `156 10% 18%` |
| `--input` | Light — `156 10% 85%` | Dark — `156 10% 18%` |
| `--ring` | Green Vibrant — `74 100% 50%` | Green Vibrant — `74 100% 50%` |

### 12.3 Regras de Dark Mode

1. **Nunca usar preto puro** (`#000000`) — usar teal escuro profundo como base
2. **Texto**: Cream/off-white, nunca branco puro — reduz halation
3. **Superfícies**: Criar hierarquia com variações sutis de luminosidade do teal
4. **Pesos tipográficos**: Levemente mais pesados em dark mode
5. **Sombras**: Mais sutis, usar preto com menor opacity
6. **Cores de acento**: Mantidas consistentes entre modos (green, purple)
7. **Ícones**: Mesma cor do texto, opacity pode ser levemente maior

---

## 13. Tokens de Design (CSS Variables)

### 13.1 Implementação Atual (HSL sem `hsl()` wrapper)

As variáveis CSS são armazenadas apenas com os valores HSL (sem a função `hsl()`),
permitindo composição com opacity no Tailwind:

```css
/* Exemplo: --primary: 74 100% 50% */
/* Uso: hsl(var(--primary)) ou bg-primary/50 (com opacity) */
```

### 13.2 Variáveis Completas

```css
:root {
  /* === CORE === */
  --background: 45 28% 94%;
  --foreground: 156 20% 5%;

  /* === SURFACES === */
  --card: 45 35% 97%;
  --card-foreground: 156 20% 5%;
  --popover: 45 35% 97%;
  --popover-foreground: 156 20% 5%;

  /* === SEMANTIC === */
  --primary: 74 100% 50%;
  --primary-foreground: 156 20% 5%;
  --secondary: 258 100% 92%;
  --secondary-foreground: 156 20% 5%;
  --muted: 45 15% 86%;
  --muted-foreground: 156 10% 40%;
  --accent: 45 15% 86%;
  --accent-foreground: 156 20% 5%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;

  /* === INTERACTIVE === */
  --border: 156 10% 85%;
  --input: 156 10% 85%;
  --ring: 74 100% 50%;

  /* === SHAPE === */
  --radius: 1rem;

  /* === SIDEBAR === */
  --sidebar-background: 156 20% 5%;
  --sidebar-foreground: 45 28% 94%;
  --sidebar-primary: 74 100% 50%;
  --sidebar-primary-foreground: 156 20% 5%;
  --sidebar-accent: 156 15% 12%;
  --sidebar-accent-foreground: 74 100% 50%;
  --sidebar-border: 156 10% 15%;
  --sidebar-ring: 74 100% 50%;

  /* === WISPR FLOW EXTENDED TOKENS === */
  --success: 162 84% 39%;
  --success-foreground: 152 81% 96%;
  --warning: 42 85% 65%;
  --warning-foreground: 33 90% 15%;
  --info: 249 66% 69%;
  --info-foreground: 250 100% 97%;

  /* === CHART COLORS === */
  --chart-1: 168 93% 16%;
  --chart-2: 249 66% 69%;
  --chart-3: 162 84% 39%;
  --chart-4: 42 85% 65%;
  --chart-5: 0 84% 60%;
}
```

---

## 14. Padrões de Componentes

### 14.1 Formulários

**Estrutura de campo:**
```
┌─ Label (Satoshi 14px Semibold, color foreground) ──────┐
│                                                        │
│  ┌─ Input ──────────────────────────────────────────┐  │
│  │ Placeholder text...                              │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  Helper text ou Error message (12px, muted/destructive)│
└────────────────────────────────────────────────────────┘

Gap entre Label e Input: 6px
Gap entre Input e Helper: 4px
Gap entre campos: 24px
```

### 14.2 Listas & Data Tables

```
Padrão de lista:
  - Item padding: 16px
  - Separator: 1px solid var(--border)
  - Hover: bg var(--accent) opacity 0.5
  - Selected: bg var(--accent), border-left 3px var(--primary)
  - Font: Satoshi 14px Regular
  - Secondary text: Satoshi 13px, color muted-foreground
```

### 14.3 Empty States

```
Layout:          Centralizado vertical e horizontal
Icon:            48px, color muted-foreground, opacity 0.5
Heading:         Crimson Pro 24px Semibold, margin-top 24px
Description:     Satoshi 14px Regular, color muted-foreground, max-width 360px
CTA:             Primary button, margin-top 24px
```

### 14.4 Loading States

```
Skeleton:
  Background:    var(--muted)
  Animation:     pulse (opacity 0.5 → 1.0 → 0.5), 2s ease-in-out infinite
  Border Radius: Matching do componente que substitui

Spinner:
  Size:          20px (default)
  Border:        2px solid var(--border)
  Border Top:    2px solid var(--primary)
  Animation:     rotate 360deg, 600ms linear infinite
```

### 14.5 Toast / Notifications

```
Position:        Bottom-right (desktop), Bottom-center (mobile)
Background:      var(--card)
Border:          1px solid var(--border)
Border Radius:   radius-lg (16px)
Padding:         16px 20px
Shadow:          shadow-lg
Max Width:       420px
Animation:       slide-in-right 300ms ease-out (desktop)
                 slide-in-up 300ms ease-out (mobile)
Auto-dismiss:    5 seconds
```

### 14.6 Stepper / Progress

```
Step indicator:
  Inactive:      32px circle, bg var(--muted), color muted-foreground
  Active:        32px circle, bg var(--primary), color primary-foreground
  Completed:     32px circle, bg var(--primary), checkmark icon

Connector:
  Inactive:      2px height, bg var(--border)
  Active:        2px height, bg var(--primary)

Label:
  Font:          Satoshi 13px Medium
  Active:        Semibold, color foreground
  Inactive:      Regular, color muted-foreground
```

### 14.7 Glassmorphism (para elementos especiais)

```css
.glass {
  background: rgba(255, 255, 235, 0.08);  /* Cream com opacity */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 235, 0.12);
  border-radius: var(--radius);
}

.glass-dark {
  background: rgba(3, 79, 69, 0.40);  /* Evening Sea com opacity */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 235, 0.08);
  border-radius: var(--radius);
}
```

---

## Apêndice A — Mapa de Fontes Wispr → Elo

| Wispr Flow | Elo System | Tipo | Justificativa |
|---|---|---|---|
| EB Garamond | Crimson Pro | Serif editorial | Ambas são serifadas editoriais com personalidade calorosa e quirks em numerais |
| Figtree | Satoshi | Geometric sans | Ambas são geometric sans-serif limpas, amigáveis, com ótima legibilidade em UI |

## Apêndice B — Imports de Fontes

```html
<!-- Satoshi (via Fontshare) -->
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,300,400&display=swap" rel="stylesheet" />

<!-- Crimson Pro (via Google Fonts) -->
<link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet" />
```

## Apêndice C — Stack Tecnológico

| Tecnologia | Versão | Propósito |
|---|---|---|
| React | 19.x | Framework UI |
| TypeScript | 5.9.x | Type safety |
| Tailwind CSS | 3.4.x | Utility-first CSS |
| Shadcn/ui | Latest | Componentes base acessíveis |
| Radix UI | Latest | Primitivos de componentes |
| CVA | 0.7.x | Variantes de componentes |
| Lucide React | 0.577.x | Iconografia |
| Vite | 8.x | Build tool |
| Supabase | 2.99.x | Backend & Auth |

## Apêndice D — Referências

- [Wispr Flow Rebrand](https://wisprflow.ai/rebrand) — Caso completo do rebranding
- [Wispr Flow Media Kit](https://wisprflow.ai/media-kit) — Assets e logos oficiais
- [Brandfetch - Wispr Flow](https://brandfetch.com/wisprflow.ai) — Cores e assets extraídos
- [Figtree - Google Fonts](https://fonts.google.com/specimen/Figtree) — Fonte sans do Wispr
- [Wispr Flow Features](https://wisprflow.ai/features) — Interface do produto
- [Designing a Natural Voice Interface](https://wisprflow.ai/post/designing-a-natural-and-useful-voice-interface) — Filosofia de design

---

*Este Design System é um documento vivo e deve ser atualizado conforme o desenvolvimento do Elo System evolui.*
*Última atualização: 15 de Março de 2026*
