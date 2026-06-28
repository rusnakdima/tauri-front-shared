import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export type AvatarSize = "sm" | "md" | "lg";

@customElement("app-avatar")
export class AppAvatar extends LitElement {
  @property() declare src: string;
  @property() declare alt: string;
  @property() declare size: AvatarSize;
  constructor() {
    super();
    for (const key of ["src", "alt", "size"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["src", "alt", "size"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        saved[key] = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
      }
    }
    super.connectedCallback();
    for (const [key, value] of Object.entries(saved)) {
      (this as Record<string, unknown>)[key] = value;
    }
  }


  static override styles = css`
    :host {
      display: inline-flex;
    }

    .avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;
      background-color: var(--bg-elevated);
      border: 1px solid var(--border-color);
    }

    .avatar-sm {
      width: 2rem;
      height: 2rem;
      font-size: 0.75rem;
    }

    .avatar-md {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 0.875rem;
    }

    .avatar-lg {
      width: 3.5rem;
      height: 3.5rem;
      font-size: 1.25rem;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .initials {
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
    }
  `;

  private _getInitials(): string {
    if (!this.alt) return "?";
    return this.alt
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2);
  }

  private _handleImageError() {
    this.src = "";
  }

  override render() {
    const sizeClass = `avatar-${this.size}`;
    if (this.src) {
      return html`
        <div class="avatar ${sizeClass}">
          <img src="${this.src}" alt="${this.alt}" @error="${this._handleImageError}" />
        </div>
      `;
    }
    return html`
      <div class="avatar ${sizeClass}">
        <span class="initials">${this._getInitials()}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-avatar": AppAvatar;
  }
}