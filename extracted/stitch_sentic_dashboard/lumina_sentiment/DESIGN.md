---
name: Lumina Sentiment
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006591'
  on-secondary: '#ffffff'
  secondary-container: '#39b8fd'
  on-secondary-container: '#004666'
  tertiary: '#005338'
  on-tertiary: '#ffffff'
  tertiary-container: '#006e4b'
  on-tertiary-container: '#67f4b7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
---

## Brand & Style

The design system is engineered for a premium AI SaaS environment, focusing on clarity, depth, and intelligence. The brand personality is sophisticated and visionary, aiming to evoke a sense of "clarity through complexity"—transforming massive datasets into actionable emotional insights.

The aesthetic follows a **Glassmorphic** direction. It relies on multi-layered transparency, background blurs, and vibrant substrate gradients to simulate physical depth. This approach creates a "heads-up display" feel that is high-tech yet approachable. High-quality motion, such as slow-drifting background blobs and subtle hover transitions, reinforces the living nature of the AI.

## Colors

The palette is anchored by a deep Indigo primary for authority and a Sky Blue secondary for technical freshness. An Emerald accent is reserved for AI-driven insights and key "aha" moments. 

Functional colors for sentiment (Positive/Negative/Neutral) are strictly applied to data visualizations and status badges. In Light Mode, the surface uses a high-transparency white (`rgba(255, 255, 255, 0.7)`) with a 12px backdrop-blur. In Dark Mode, the surface shifts to a deep navy glass (`rgba(30, 41, 59, 0.7)`). Borders should always be semi-transparent to allow background gradients to bleed through the edges, enhancing the glass effect.

## Typography

This design system utilizes **Inter** for its exceptional legibility and systematic feel. Headlines are set with tight letter-spacing and bold weights to provide a strong visual anchor against the ethereal glass backgrounds. Body text maintains a generous line height to ensure readability during deep data analysis. Labels utilize a slight tracking increase and medium weight to distinguish them from standard prose.

## Layout & Spacing

The layout uses a **Fluid Grid** system based on an 8px square-grid rhythm. On desktop, a 12-column grid is used with 24px gutters to allow the glass components enough "breathing room" to display their background blurs effectively.

Content should be grouped into logical "Glass Modules." Large-scale data visualizations should span at least 8 columns, while sidebar navigation or secondary metrics occupy 3-4 columns. Spacing between modules should be consistent at 24px or 32px to maintain a clean, organized aesthetic.

## Elevation & Depth

Depth is conveyed through a combination of backdrop-blur and multi-layered shadows.
- **Level 0 (Background):** Solid color with 2-3 large, soft, animated gradient blobs (Primary/Secondary colors) at 10% opacity.
- **Level 1 (Standard Card):** White/Navy at 70% opacity, 16px backdrop-blur, 1px semi-transparent white border. Shadow: 0 4px 30px rgba(0, 0, 0, 0.05).
- **Level 2 (Active/Hover):** Increase opacity to 85%, Shadow: 0 10px 40px rgba(0, 0, 0, 0.1).
- **Level 3 (Modals/Popovers):** 95% opacity, 24px backdrop-blur, Shadow: 0 20px 50px rgba(0, 0, 0, 0.2).

## Shapes

The design system utilizes a **Rounded** shape language with a base radius of 16px (`1rem`) for all primary containers and cards. This softens the technical nature of the data and reinforces the "premium" feel. Smaller elements like buttons and input fields follow an 8px radius, while tags and chips are fully rounded (pill-shaped) to provide visual contrast against the structured cards.

## Components

### Buttons
- **Primary:** Solid Indigo-to-Blue gradient with a subtle inner glow. White text.
- **Secondary:** Glass-style (transparent with blur) and a 1px Indigo border.

### Glass Cards
Every card must have a `backdrop-filter: blur(12px)`. Use a 1px border with a linear gradient (top-left to bottom-right) starting at `rgba(255,255,255,0.4)` to `rgba(255,255,255,0.1)`.

### Stats Cards & Mini Charts
Key metrics should be large (Headline-LG). Mini sparkline charts should be placed at the bottom of the card, using the Accent or Status colors without axes or grids to maintain a clean look.

### Input Fields
Inputs should be semi-transparent with a 1px border that glows (box-shadow) in the Primary color when focused. Use Inter Medium for placeholder text at 60% opacity.

### Navigation
Vertical sidebar with a high backdrop-blur. Active links are indicated by a subtle glass "pill" background and a 4px vertical Indigo indicator on the far left.