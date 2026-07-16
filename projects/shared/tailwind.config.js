/**
 * TailwindCSS v4 Configuration for @tauri-front/shared
 * CSS-first: Uses CSS custom properties from theme tokens
 */
export default {
  darkMode: ['class', '.dark'],
  content: ['./src/**/*.{html,ts,scss}'],
  theme: {
    extend: {
      colors: {
        // M3 Color tokens (reference CSS variables)
        primary: {
          DEFAULT: 'var(--color-primary)',
          fg: 'var(--color-on-primary)',
          container: 'var(--color-primary-container)',
          'on-container': 'var(--color-on-primary-container)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          fg: 'var(--color-on-secondary)',
          container: 'var(--color-secondary-container)',
          'on-container': 'var(--color-on-secondary-container)',
        },
        tertiary: {
          DEFAULT: 'var(--color-tertiary)',
          fg: 'var(--color-on-tertiary)',
          container: 'var(--color-tertiary-container)',
          'on-container': 'var(--color-on-tertiary-container)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          fg: 'var(--color-on-error)',
          container: 'var(--color-error-container)',
          'on-container': 'var(--color-on-error-container)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          'container-lowest': 'var(--color-surface-container-lowest)',
          'container-low': 'var(--color-surface-container-low)',
          container: 'var(--color-surface-container)',
          'container-high': 'var(--color-surface-container-high)',
          'container-highest': 'var(--color-surface-container-highest)',
        },
        on: {
          primary: 'var(--color-on-primary)',
          secondary: 'var(--color-on-secondary)',
          tertiary: 'var(--color-on-tertiary)',
          error: 'var(--color-on-error)',
          surface: 'var(--color-on-surface)',
          'surface-variant': 'var(--color-on-surface-variant)',
        },
        outline: {
          DEFAULT: 'var(--color-outline)',
          variant: 'var(--color-outline-variant)',
        },
        // Legacy semantic aliases for compatibility
        accent: 'var(--accent)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        info: 'var(--info)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        border: 'var(--border)',
        'border-subtle': 'var(--border-subtle)',
      },
      borderRadius: {
        xs: 'var(--radius-xs, 4px)',
        sm: 'var(--radius-sm, 8px)',
        md: 'var(--radius-md, 12px)',
        lg: 'var(--radius-lg, 16px)',
        xl: 'var(--radius-xl, 28px)',
        full: 'var(--radius-full, 9999px)',
      },
      boxShadow: {
        1: 'var(--shadow-1)',
        2: 'var(--shadow-2)',
        3: 'var(--shadow-3)',
        4: 'var(--shadow-4)',
        5: 'var(--shadow-5)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        focus: 'var(--shadow-focus)',
        inset: 'var(--shadow-inset)',
      },
      spacing: {
        'sys-layout-xs': '4px',
        'sys-layout-sm': '8px',
        'sys-layout-md': '16px',
        'sys-layout-lg': '24px',
        'sys-layout-xl': '32px',
      },
      fontFamily: {
        sans: 'var(--font-family)',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '250ms',
      },
    },
  },
  plugins: [],
};
