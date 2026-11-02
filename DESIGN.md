---
name: CTennis Studio
description: A stringer's workshop drawn and photographed at circuit standard.
colors:
  cream-paper: "#f6efe3"
  pale-paper: "#fbf7ef"
  kraft-paper: "#eee3d2"
  drafting-ink: "#17130e"
  faded-ink: "#5e5243"
  copper-wire: "#a2551f"
  copper-pressed: "#87451a"
  copper-light: "#c9834d"
  copper-text: "#8f4a1a"
  on-copper: "#fff8ee"
  paper-rule: "#d9c8ae"
  paper-grid: "#e6dac6"
  midnight: "#0b1a36"
  midnight-surface: "#11244a"
  midnight-raised: "#18305e"
  moonlight: "#eef1f5"
  mist: "#b9c1cd"
  silver-wire: "#c9cfd6"
  silver-pressed: "#e4e8ec"
  silver-deep: "#9aa5b3"
  silver-text: "#d5dae0"
  midnight-rule: "#2d4674"
  midnight-grid: "#16294f"
  warm-copper: "#e9a36b"
  plate-white: "#ffffff"
  whatsapp-green: "#25d366"
typography:
  display:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
    fontSize: "clamp(2.5rem, 1.5rem + 4.2vw, 5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112"
  headline:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
    fontSize: "clamp(2.125rem, 1.5rem + 2.8vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
    fontSize: "clamp(1.5rem, 1rem + 1.4vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112"
  statement:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
    fontSize: "clamp(1.25rem, 1rem + 0.9vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.3
  lead:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.3
  button:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.2
  note:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "6px"
  md: "10px"
  full: "50%"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  section: "clamp(3.5rem, 8vw, 7rem)"
  board-gap: "clamp(0.75rem, 1.5vw, 1.25rem)"
  column-gap: "clamp(2rem, 5vw, 5rem)"
  page-max: "1440px"
components:
  button-primary:
    backgroundColor: "{colors.copper-wire}"
    textColor: "{colors.on-copper}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0.875rem 1.5rem"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.copper-pressed}"
    textColor: "{colors.on-copper}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.drafting-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0.875rem 1.5rem"
    height: "52px"
  button-outline-hover:
    backgroundColor: "{colors.drafting-ink}"
    textColor: "{colors.cream-paper}"
  nav-link:
    textColor: "{colors.drafting-ink}"
    typography: "{typography.label}"
    padding: "0.5rem 0"
  tournament-caption:
    backgroundColor: "{colors.midnight}"
    textColor: "{colors.cream-paper}"
    rounded: "{rounded.md}"
    padding: "1.125rem 1.125rem 1rem"
  tournament-caption-dark:
    backgroundColor: "{colors.midnight-surface}"
    textColor: "{colors.moonlight}"
    rounded: "{rounded.md}"
    padding: "1.125rem 1.125rem 1rem"
  year-link:
    backgroundColor: "transparent"
    textColor: "{colors.warm-copper}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.25rem 0.5rem"
    height: "40px"
  year-link-hover:
    backgroundColor: "{colors.warm-copper}"
    textColor: "{colors.midnight}"
  logo-plate:
    backgroundColor: "{colors.plate-white}"
    rounded: "{rounded.sm}"
    padding: "0.375rem 0.625rem"
  whatsapp-float:
    backgroundColor: "{colors.whatsapp-green}"
    textColor: "{colors.midnight}"
    rounded: "{rounded.full}"
    size: "56px"
---

# Design System: CTennis Studio

## Overview

**Creative North Star: "The Stringer's Drafting Table"**

The site is a working table seen from above: paper, ink, a drawing of the racquet, a length of wire, and real photographs of the man at the machine. Precision is shown through drawing and rules, warmth through paper and the photographs. Pablo's tournament record does the persuading, so photos run large and the type around them stays plain and heavy.

It works in two modes that are the same table at different hours. Light is cream drafting paper, near-black ink and copper wire. Dark is midnight blue with silver wire. The mode follows the visitor's device, and a button switches it.

Density is calm. Sections are full-bleed bands divided by hairlines, with large headlines and generous vertical space. Motion is limited to small responses on hover. The owner has rejected overloaded pages with many animations or videos, a cold or overly serious feel, and looking like a template; the floating white cards on dark of the old site are what this world replaced.

**Key Characteristics:**
- Two paired modes: cream and copper, midnight and silver.
- Full-bleed bands and hairline rules; the tournament board is the one place that uses cards.
- One wide, heavy Archivo headline voice over a plain body.
- Real photographs at large scale, often bleeding off an edge.
- A line-drawn racquet on a drafting grid as the signature device.

## Colors

Warm paper and one metal in light; deep blue and another metal in dark. Component tokens in the frontmatter state light-mode values, and the mapping below gives each role in both modes.

| Role | Light | Dark |
|---|---|---|
| Page background | Cream Paper | Midnight |
| Quiet surface | Pale Paper | Midnight Surface |
| Band surface | Kraft Paper | Midnight Raised |
| Text | Drafting Ink | Moonlight |
| Secondary text | Faded Ink | Mist |
| Wire (actions, drawing lines) | Copper Wire | Silver Wire |
| Wire, pressed | Copper Pressed | Silver Pressed |
| Wire, scrollbar thumb | Copper Light | Silver Deep |
| Wire as text | Copper Text | Silver Text |
| Text on wire | On Copper | Midnight |
| Hairline | Paper Rule | Midnight Rule |
| Drafting grid | Paper Grid | Midnight Grid |
| Tournament caption | Midnight | Midnight Surface |
| Caption text | Cream Paper | Moonlight |
| Caption secondary text | Silver Wire | Mist |
| Caption years | Warm Copper | Warm Copper |

Hover washes behind icon controls are the wire at low strength: copper at 8% in light, silver at 10% in dark.

### Primary
- **Copper Wire** (#a2551f): the light-mode action color. Buttons, racquet strings, drafting marks, blueprint markers, and the underline on the active menu item.
- **Copper Text** (#8f4a1a): copper when it has to be read, on course names, service names and arrows. It holds at least 4.5:1 on every light surface.
- **Silver Wire** (#c9cfd6): the same job as Copper Wire in dark mode, with dark text on it.

### Secondary
- **Warm Copper** (#e9a36b): the year links on tournament captions, in both modes. It is the one place copper survives in dark mode.

### Neutral
- **Cream Paper** (#f6efe3), **Pale Paper** (#fbf7ef), **Kraft Paper** (#eee3d2): light page, quiet surface, and the band behind the Experience Tour and footer.
- **Drafting Ink** (#17130e), **Faded Ink** (#5e5243): light text and secondary text. Ink, never pure black.
- **Paper Rule** (#d9c8ae), **Paper Grid** (#e6dac6): hairlines and the drafting grid. The grid is deliberately fainter than any rule.
- **Midnight** (#0b1a36), **Midnight Surface** (#11244a), **Midnight Raised** (#18305e): dark page, quiet surface and band.
- **Moonlight** (#eef1f5), **Mist** (#b9c1cd): dark text and secondary text.
- **Midnight Rule** (#2d4674), **Midnight Grid** (#16294f): dark hairlines and grid.

### Named Rules
**The Two Wires Rule.** Each mode has one wire: copper on cream, silver on midnight. Use the role variables so a color swaps with the mode, and never hardcode a wire color into a component.

**The Navy Caption Rule.** In light mode, tournament card captions are navy (#0b1a36) with cream text, silver secondary text and warm copper years. This is the owner's choice from a sketch he approved. Keep them navy; do not restyle them to paper to match the page.

**The White Plate Rule.** Tournament logos are made for a white background, so they always sit on a white plate (#ffffff), in both modes. The CTS logo is the opposite: ink on transparent, inverted by filter in dark mode, and it never gets a plate.

**The One Green Rule.** WhatsApp green (#25d366) belongs only to the floating phone button. Every other WhatsApp action wears the wire color.

## Typography

**Display Font:** Archivo at 800 weight and 112% width (with system sans fallback)
**Body Font:** Archivo at normal width (with system sans fallback)

**Character:** One family doing two jobs. Stretched wide and heavy it has the weight of a stamped tournament board; at normal width it stays out of the way. Archivo is self-hosted by the framework, with the width axis loaded for the headline voice.

### Hierarchy
- **Display** (800, wide, clamp up to 5rem, 1.05): the page title on the encordado and equilibrado pages.
- **Headline** (800, wide, clamp up to 4rem, 1.05): section titles on the home page. The home service panels step down to a clamp from 2rem to 3.25rem.
- **Title** (800, wide, clamp up to 2.25rem, 1): service names on the blueprint. Course names run a little larger (up to 2.5rem) and tournament cities a little smaller (up to 1.875rem).
- **Statement** (500, clamp up to 1.75rem, 1.3, max 34ch): the service line under the home logo.
- **Lead** (400, clamp up to 1.25rem, 1.6, max 62ch): the paragraph that introduces a section.
- **Body** (400, 1rem, 1.6): default running text. List rows tighten to about 1.35.
- **Label** (500, 0.9375rem): menu items and tournament category lines. Year links use 600 weight with tabular figures.
- **Button** (700, 1.0625rem, 1.2): button text and "more" links.
- **Note** (400, 0.8125rem, 1.5): the trademark notice under the tournaments.

### Named Rules
**The Wide Voice Rule.** Headlines are the one wide, heavy voice: 800 weight, 112% width, slightly tight spacing. Everything else stays at normal width, so width alone tells the visitor what is a headline.

**The Logo Headline Rule.** The home page's main heading is the full logo, large. No text headline competes with it in the first screen.

## Layout

The page is a stack of full-bleed bands. Content inside a band sits in a container up to 1440px wide with a fluid gutter, and bands alternate between the page background and the band surface. Sections are separated by vertical space of about 3.5rem to 7rem.

Three structures recur:
- **Split band:** two equal columns, text and a photo that bleeds to the screen edge, with no gutter on the photo side (home hero, service panels).
- **Sticky workshop:** on the encordado page, a 42/58 split where the photo holds in view under the header while the text scrolls past.
- **Header pair:** a large title on the left and a lead paragraph on the right, aligned along their bottom edge (Experience Tour, equilibrado).

Responsive behavior is built into each structure. The sticky header is 72px tall and collapses its menu and WhatsApp button at 1320px, when the floating button takes over. The tournament board goes from four columns to two at 1180px and to one at 600px, with the cover photo changing from 4:5 to 4:3 below 1180px. Splits and header pairs stack at 860px. The blueprint's labels leave the drawing and become a ruled list below 1000px. The equilibrado photo gallery becomes a sideways snap scroller at 700px.

### Named Rules
**The Bands Before Boxes Rule.** Group content with full-bleed bands, whitespace and rules. The tournament board is the only card grid; a new section gets a band, not a set of floating cards.

**The Earned Grid Rule.** The drafting grid (36px squares of 1px lines) appears only behind a drawing of the racquet. No drawing, no grid.

## Elevation & Depth

The system is flat. Depth comes from tonal bands and from photographs, not shadows, and surfaces do not lift on hover.

### Shadow Vocabulary
- **Plate lift** (`box-shadow: 0 4px 12px rgba(0, 0, 0, 0.22)`): the white logo plate where it sits on top of a tournament photo.
- **Floating action** (`box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3)`): the floating WhatsApp button, which genuinely hovers over the page.

### Named Rules
**The Flat Paper Rule.** A shadow is allowed only on something physically lying over a photo or over the page. Bands, buttons, captions and photos stay flat.

## Shapes

Corners are slight, as on cut card. Controls use 6px; photos in galleries and tournament cards use 10px. Circles are reserved for blueprint markers and the floating WhatsApp button. Photos that bleed off a screen edge have square corners, since they are part of the band rather than objects on it.

Rules carry the form language. A 2px rule in the text color opens a list or a course column, and 1px rules in the hairline color separate its rows. The racquet itself is the one drawn silhouette: frame in the text color, strings and drafting marks in the wire color.

### Named Rules
**The Two Corners Rule.** Controls are 6px and pictures are 10px. Don't add other radii to new work.

## Components

Direct and workshop-plain: solid controls, ruled lists, no decoration that doesn't do a job.

### Buttons
- **Shape:** gently curved (6px), at least 52px tall, 44px in the header.
- **Primary:** wire color with its paired text. It is nearly always the WhatsApp action, with the icon before the label.
- **Outline:** transparent with a 2px inset line in the text color, for secondary page actions such as "Ver más".
- **Hover:** primary moves to the pressed wire; outline fills with the text color and inverts. Transition is background color at 0.2s.
- **Focus:** a 2px outline in the wire text color, offset 3px, for keyboard users only.
- **Icon controls:** 44px square, transparent, with the low-strength wire wash on hover (language, theme, menu, social).

### Tournament Cards
The signature proof, modeled on large tournament-board cards.
- **Cover:** a large photo (4:5, or 4:3 below 1180px) that opens the photo viewer, scaling to 1.03 on hover over 0.4s. A tournament with no photos shows the logo plate large and centered on the caption color.
- **Logo plate:** white, pinned to the top left of the photo, carrying the tournament logos and category stamps.
- **Caption:** see The Navy Caption Rule. City in the wide voice with the flag at the far right, category below, then the years.
- **Years:** warm copper links, at least 40px tall, filling with warm copper on hover. Years without photos are plain muted text, not links.
- **Board:** four cards show first, the outline button reveals the rest, and the trademark notice stays under the board.

### Ruled Lists
Used for course contents, what a service includes, and the blueprint's labels on small screens. They open with a 2px rule in the text color and separate rows with hairlines. No bullets, boxes or icons.

### Navigation
A sticky band in the page background with a hairline beneath. Compact logo at the left, menu items in Label, then language, theme and the WhatsApp button. Hover and the current page get a 2px wire-colored underline offset 6px. Below 1320px the menu opens as a ruled list inside the header, at 1.125rem and 600 weight.

### Racquet Blueprint
The signature drawing: a side view of the racquet in lines, using the page's own colors so it works in both modes. On the equilibrado page, circular markers (S, P, M) in the wire color connect by leader lines to the POINT, SET and MATCH labels, each a link with an arrow that shifts 4px on hover. Below 1000px the drafting marks and leaders go away, line weights double, and the letters repeat beside the ruled list so the drawing still connects to the services.

### Service Panels
The home page's two doors to the service pages. Encordado is a photo with a navy gradient rising from the bottom behind light text; equilibrado is the blueprint on the drafting grid. On hover the title underlines at 3px and the arrow shifts 4px.

### Floating WhatsApp
A 56px green circle at the bottom right, from 1320px down, when the header's WhatsApp button is gone. The footer adds 72px of bottom padding on phones so the button covers nothing.

## Do's and Don'ts

### Do:
- **Do** use the role variables in `src/app/globals.css` for every color, so both modes keep working.
- **Do** keep a WhatsApp action in reach on every service surface: wire-colored in the page, green only on the floating phone button.
- **Do** use real photographs at large scale, and let lead photos bleed to the screen edge.
- **Do** keep tournament captions navy in light mode (#0b1a36), as the owner approved.
- **Do** keep tap targets at 44px or more, 40px for year links.
- **Do** set headlines in Archivo at 800 weight and 112% width.
- **Do** separate content with a 2px opening rule and 1px hairlines.

### Don't:
- **Don't** float white cards on a dark background; it is what made the old site read as a template.
- **Don't** overload a page with animation or video; the owner rejected that. Keep motion to small hover responses.
- **Don't** load fonts, icons, flags or scripts from outside companies.
- **Don't** put tournament logos directly on photos or colored surfaces without the white plate.
- **Don't** put the drafting grid behind content that has no drawing of the racquet.
- **Don't** use WhatsApp green on anything but the floating button.
- **Don't** invent numbers on the blueprint; its drafting marks are deliberately unlabeled.
