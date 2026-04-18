# Design System Specification

## 1. Overview & Creative North Star: "The Kinetic Monolith"

This design system is built on the philosophy of **The Kinetic Monolith**. It is designed to feel like a high-precision professional instrument—heavy enough to feel authoritative, yet sharp and fast enough to disappear during deep work. We are moving away from the "web-page" look toward a "software-as-instrument" aesthetic.

By utilizing intentional asymmetry and a hyper-refined 0.5px hairline stroke, the system achieves a signature look that feels "etched" rather than "drawn." We break the standard grid by prioritizing tonal depth over structural lines, allowing the user's content to take center stage within a sophisticated, dark-mode environment.

---

## 2. Color & Tonal Depth

The palette is rooted in deep obsidian tones, utilizing a "Material-High-Contrast" logic to ensure legibility while maintaining a premium, cinematic feel.

### The Surface Hierarchy (Nesting)
Hierarchy is achieved through **Tonal Layering** rather than traditional borders or shadows.
- **Base Level:** `surface` (#131318) for the main application background.
- **Mid Level:** `surface_container_low` (#1b1b20) for sidebar or secondary navigation zones.
- **Top Level:** `surface_container` (#1f1f24) for primary cards and workspace modules.
- **Highlight Level:** `surface_bright` (#39383e) exclusively for floating modals or active popovers.

### The "No-Line" Rule
Standard 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined through:
1.  **Background Shifts:** Place a `surface_container_low` element directly against the `background` to create a natural edge.
2.  **The Ghost Border:** If containment is required for high-density data, use the `outline_variant` token at 0.5px width with a 10% opacity.

### Chromatic Soul
- **Primary Accent:** `primary` (#d2bbff) transitioned into `primary_container` (#7c3aed) via subtle linear gradients (135°) to give buttons and active states a sense of light-emission rather than flat color.
- **Secondary Accent:** `secondary` (#4cd7f6) is used sparingly for technical success metrics or "ready" states.

---

## 3. Typography: Editorial Precision

The typography system leverages the confidence of **Plus Jakarta Sans** for high-level information and the industrial reliability of **Inter** and **JetBrains Mono** for the "Forge" aspect of the platform.

- **Display & Headlines (Plus Jakarta Sans):** These are the "Editorial" moments. Use `display-lg` (3.5rem) with tighter letter-spacing (-0.02em) to create a bold, confident entry point.
- **Body & Interface (Inter):** Set at `body-md` (0.875rem), this provides the "Fast" vibe—clean, neutral, and highly legible. 
- **Technical Specs (JetBrains Mono):** All data points, IDs, and code snippets must use the mono scale. This reinforces the "Spec" in the brand identity, lending a feeling of raw, unadulterated data.

---

## 4. Elevation & Depth

This design system rejects "floating" elements that feel disconnected. Everything must feel like it is part of a single, machined object.

### The Layering Principle
Depth is achieved by stacking containers from `lowest` to `highest`. An inner card should always be one "tier" higher than its parent container (e.g., a `surface_container_high` list item sitting inside a `surface_container` card).

### Ambient Shadows
Shadows must mimic natural light. Use high blur (32px to 64px) and extremely low opacity (4%-6%). The shadow color should be a tinted version of the background (`#0D0D12`) to avoid a "dirty" grey look.

### Glassmorphism
For navigation bars or floating toolbars, use a `surface` background at 70% opacity with a `backdrop-filter: blur(12px)`. This integrates the component into the layout, preventing it from feeling "pasted on."

---

## 5. Components

### Buttons
- **Primary:** `8px` radius. Background: Gradient from `primary_container` to `primary`. Text: `on_primary`. 
- **Secondary:** `8px` radius. 0.5px "Ghost Border" using `outline_variant`. No background color.
- **Tertiary:** No border or background. High-contrast text using `primary` color.

### Input Fields
- **Base:** `surface_container_lowest` background. 
- **Active State:** Change border to 0.5px `primary` with a subtle outer glow (2px blur, `primary` at 20% opacity).
- **Labels:** Always use `label-sm` in `on_surface_variant` for a muted, professional look.

### Cards & Modules
- **Rule:** Absolute prohibition of divider lines inside cards. 
- **Separation:** Use `20px` page padding and `12px` gaps. Group related content by nesting them in a container that is 2% lighter than the background.
- **Radius:** Standard `12px` (`md` scale).

### Data Tables / Lists
- Instead of lines, use "Zebra Striping" with `surface_container_low` and `surface_container`. 
- Use **JetBrains Mono** for all numeric values to ensure column alignment and a "technical" feel.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Intentional Asymmetry:** Align text to the left while keeping action buttons floated right with generous, uneven whitespace to create an editorial feel.
*   **Embrace the Dark:** Allow large areas of `#0D0D12` (Background) to breathe. Not every pixel needs a container.
*   **0.5px Precision:** Use the decimal-point stroke width for all borders to achieve the "Linear" aesthetic.

### Don't:
*   **Never use 1px solid borders:** It breaks the high-end feel and makes the UI look like a template.
*   **Avoid Pure White:** Use `on_surface` (#e4e1e9) for text. Pure white (#FFFFFF) is too harsh for a dark SaaS environment and causes eye strain.
*   **No Heavy Shadows:** If you can "see" the shadow, it's too dark. It should be a felt presence, not a visible shape.
*   **Don't Over-Color:** Stick to the Violet/Cyan accents for actions and status only. The UI should remain 90% monochromatic.