/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // A soft, paper-like palette with bright color reserved for play.
    text: '#205D67',
    tint: '#FF6871',

    // Core surfaces
    background: '#FCFAF6',
    foreground: '#205D67',

    // Cards / elevated surfaces
    card: '#FFFFFF',
    cardForeground: '#205D67',

    // Primary action color (buttons, links, active states)
    primary: '#FF6871',
    primaryForeground: '#ffffff',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#EEF6F3',
    secondaryForeground: '#205D67',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#F4EDE3',
    mutedForeground: '#7E8A92',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#FFE471',
    accentForeground: '#205D67',

    // Destructive actions (delete, error states)
    destructive: '#D85050',
    destructiveForeground: '#ffffff',

    // Borders and input outlines
    border: '#E9DFD2',
    input: '#E9DFD2',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 18,
};

export default colors;
