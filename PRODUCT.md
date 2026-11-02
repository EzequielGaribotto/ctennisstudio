# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

In the owner's order of priority:

1. **Competition players** (federated or professional, and the people around them) who need a racquet set up to circuit standard.
2. **Club players** who play regularly and want their racquet properly strung and adjusted.
3. **People who want to learn the trade** through the courses.
4. **Tournament organisers and club coaches** who could hire him or send him players.

## Product Purpose

The website of CTennis Studio (legal/trade name Custom Tennis Studio, CTS), the business of Pablo Garibotto, a professional tennis stringer based in Mataró. It presents his services and his tournament record so that a visitor trusts him enough to get in touch.

Success means the visitor **writes to him on WhatsApp**. That is the owner's main goal for every audience.

## Positioning

In the owner's order of importance:

1. **Experience:** more than 15 years stringing on the professional circuit, with a record of real tournaments.
2. **Precision:** the same techniques, methods and machines used on the ATP/WTA circuit, applied to every racquet.
3. **Personal attention:** advice tailored to each player.
4. **Training:** he also teaches the trade, at three levels.

## Operating Context

- Services: professional stringing; racquet balancing and repair in three levels (POINT changes the balance, SET adds weight, MATCH makes one racquet match another); courses (Base, Avance, Maestría).
- Tournament Stringing Management: complete management of the official stringing service for ATP, WTA and international tournaments, aimed at organisers. Tools named by the owner: ProString Manage (he takes part in its development) and CTS Planner Tour (his own).
- Each service and course has its own WhatsApp button with a pre-written message. A contact form and the studio address with a click-to-load map are also available.
- The studio is at Av. Puig i Cadafalch, 12, Mataró.
- The site is in Spanish and English. Every text change applies to both.

## Capabilities and Constraints

- Existing Next.js site with no database. Pablo maintains it by asking for changes in plain language, so tournaments, photos and texts must stay easy to update from the existing data files.
- No prices and no online sales on the site. Showing them needs legal work first and a conversation with Ezequiel.
- Nothing visitor-facing loads from outside companies (fonts, icons, flags and scripts are self-hosted). Maps load only on click.
- Legal pages and the form's privacy consent must stay in place. The tournament trademark notice stays under the tournaments.
- Claims about him or the business must be true and provable. New claims need his approval.

## Brand Commitments

- Names in use: "CTennis Studio", "By Pablo Garibotto", "Custom Tennis Studio", "CTS". Service and course names are fixed: POINT, SET, MATCH, Base, Avance, Maestría; "Experience Tour" names the tournament section.
- **Logo:** the owner chose the newer version from his reference banners (simplified emblem, no orange stripe, "POWERED BY PABLO GARIBOTTO"). In use on the site as `public/images/logo/cts_logo_full.webp`, `cts_logo_compact.webp` and `cts_logo_emblem.webp`, cut from his file `LOGO SOLO BLACK.PNG`.
- **Colour, chosen by the owner from his reference banners (2026-11-01):** light mode is cream with copper; dark mode is midnight blue with silver. It follows the visitor's device and offers a button to switch.
- **What he does not want:** overloaded pages with many animations or videos, or a cold, overly serious feel. He does want to stop looking like a template and to work well on phones.
- **Reference he likes:** the cards and the size of screen elements on https://www.wtatennis.com/tournaments, without its amount of animation and video.

## Evidence on Hand

- 15 tournament cards in `src/data/tournaments.json`, covering 2010 to 2026 in 6 countries, including Rolex Monte-Carlo Masters, Mutua Madrid Open, Miami Open and Trofeo Conde de Godó.
- Tournament photos in `public/images/stringer/tournaments/`, plus photos of Pablo, the machines and the services in `public/images/stringer/`. Some recent tournaments still have no photos (`npm run pendientes`).
- Tournament logos in `public/images/stringer/tournament_logos/`, and reserve logos in `assets-reserva/` that are not published.
- Tournaments Pablo has managed, stated by him: Mutua Madrid Open 2022, Girona Challenger 100 2022 and 2023, La Bisbal WTA 125 2025. Their logos are shown as one-color silhouettes in `public/images/stringer/tournament_logos/silhouettes/`.
- **Reference he likes, read from the page's content only (layout not seen):** on https://www.wtatennis.com/the-tour, cards run image first, then text; images are about 4:3 on news cards and 4:5 on collection tiles.
- **Where new images came from:** the three `cts_logo_*.webp` files are cut from the owner's `LOGO SOLO BLACK.PNG` with the white background removed; `public/images/stringer/pablo/pablo_encordando_miami.webp` is a smaller copy of `OPEN MIAMI 2026 0.webp`; the browser icons are made from the same logo. Recorded here because site images keep no embedded metadata.
- **Absent, must not be invented:** testimonials, named clients or players, prices, and numbers of racquets strung or students trained.

## Product Principles

1. **Proof first.** The real tournament record is what sets him apart; show it rather than describing it with adjectives.
2. **Circuit standard, open to everyone.** Speak first to competition players without making a club player feel out of place.
3. **Always one step from WhatsApp.** Wherever a visitor becomes convinced, the way to write to him is right there.
4. **A person, not a brand.** Pablo himself does the work and gives the advice, and the site should make that clear.
5. **Only what is true.** Every claim, name and logo must correspond to something he really did.
