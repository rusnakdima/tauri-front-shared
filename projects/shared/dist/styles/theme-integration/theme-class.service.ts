import {
  getCurrentStyle,
  getComponentStyleClasses,
  type StyleVariant,
} from "../style-registry";

export class ThemeClassService {
  private static instance: ThemeClassService;

  static getInstance(): ThemeClassService {
    if (!ThemeClassService.instance) {
      ThemeClassService.instance = new ThemeClassService();
    }
    return ThemeClassService.instance;
  }

  private constructor() {
    window.addEventListener("theme-changed", this.handleThemeChange.bind(this));
  }

  private handleThemeChange(): void {
    // Intentionally empty - callback registration handles notifications
  }

  getClasses(
    componentId: string,
    explicitVariant?: string,
    explicitSize?: string,
  ): string {
    const theme = getCurrentStyle();
    return getComponentStyleClasses(
      theme,
      componentId,
      explicitVariant,
      explicitSize,
    );
  }

  onThemeChange(callback: () => void): () => void {
    const handler = () => callback();
    window.addEventListener("theme-changed", handler);

    return () => {
      window.removeEventListener("theme-changed", handler);
    };
  }
}

export const themeClassService = ThemeClassService.getInstance();
