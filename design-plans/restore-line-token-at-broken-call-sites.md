# Restore the --color-line token at all six broken call sites

Written against: eb6199a

## Evidence chain

- Surface: `/` (home) and `/work/[slug]` case studies
- Problem: Six call sites use the Tailwind v3 shorthand `border-[--color-line]` / `bg-[--color-line]`. The compiled artifact (`.next/static/chunks/*.css`) shows this emits invalid CSS — `.border-\[--color-line\]{border-color:--color-line}` and `.bg-\[--color-line\]{background-color:--color-line}` — so the declarations are dropped by the browser. Borders fall back to `currentColor` (near-black instead of `#e8e7e3`), and the SectionHeader rule line becomes invisible (transparent background).
- Design evidence: `--color-line: #e8e7e3` token in `app/globals.css` (`@theme` and `:root`); correct sibling usage `border-[var(--color-line)]` in `components/Sidebar.tsx`, `components/Slideshow.tsx`, `components/sections/Contact.tsx:13`, `app/work/[slug]/page.tsx`, and inside the same files (`components/Nav.tsx:91` vs `:30`; `components/sections/Hero.tsx:43` vs `:61`)
- Owner: `app/globals.css` (`--color-line` token)
- Scope and affected surfaces: `components/Footer.tsx:9`, `components/Nav.tsx:30`, `components/ui/SectionHeader.tsx:19`, `components/sections/Hero.tsx:61`, `components/sections/Work.tsx:20`, `components/sections/Experience.tsx:17`
- Uncertainty: none

## Design decision

Use the canonical token form `var(--color-line)` in arbitrary Tailwind values at all six sites. This resolves the root problem: one notation for one token, restoring the intended near-invisible divider color and the SectionHeader rule line everywhere without inventing new values.

## Reuse

- `var(--color-line)` token
- Exemplar: `components/sections/Contact.tsx:13` (`border-[var(--color-line)]`)

## Changes

1. `components/Footer.tsx:9`
   - Change: `border-[--color-line]` → `border-[var(--color-line)]`
   - Preserve: footer layout, copy, padding
   - Verify: footer top rule renders `#e8e7e3`, not near-black
2. `components/Nav.tsx:30`
   - Change: `border-[--color-line]` → `border-[var(--color-line)]` in the scrolled/open bar branch
   - Preserve: blur, alpha background, transparency when not scrolled
   - Verify: mobile scrolled bar bottom border renders `#e8e7e3`
3. `components/ui/SectionHeader.tsx:19`
   - Change: `bg-[--color-line]` → `bg-[var(--color-line)]`
   - Preserve: label typography, flex layout
   - Verify: the `h-px` rule line after each section title is visible in `#e8e7e3`
4. `components/sections/Hero.tsx:61`
   - Change: `border-b border-[--color-line]` → `border-b border-[var(--color-line)]` on social links
   - Preserve: underline-on-hover accent behavior, mono styling
   - Verify: resting underlines render `#e8e7e3`
5. `components/sections/Work.tsx:20`
   - Change: `border-t border-[--color-line]` → `border-t border-[var(--color-line)]`
   - Preserve: stretched-link row behavior, spacing, shimmer title
   - Verify: row separators render `#e8e7e3`
6. `components/sections/Experience.tsx:17`
   - Change: `border-t border-[--color-line]` → `border-t border-[var(--color-line)]`
   - Preserve: grid layout, typography
   - Verify: row separators render `#e8e7e3`

## Scope

- Inherit: all consumers of these components (home page, case-study pages)
- Verify: `Sidebar`, `Slideshow`, `Contact` card borders unchanged (already correct)
- Exclude: other hard-coded colors (`bg-green-500`, Badge/Tag tints, Nav rgba background) — no binding contract established during audit; do not touch

## Validation

- Product: browsing the portfolio, section dividers match the light-line design language
- Interface: `/` at mobile (<1024px, scrolled nav bar) and desktop widths; every `SectionHeader` (Work, Experience, Stack, Contact); `/work/atlas` for case-study parity
- System: no remaining `[--color-line]` occurrences; `grep` for `\[--` returns nothing
- Repository: `npm run lint` → clean; `npm run build` → succeeds

## Stop conditions

- Stop if any edit removes a correct `var(--color-line)` usage or touches excluded colors
- Stop if any `.tsx` source still references `[--color-line]` (note: Tailwind may keep generating the orphan utility because this plan file documents the old class names — harmless as long as no source uses it)

## Design documentation

- After acceptance and validation: none (no design documentation exists or is required)
