// Base entity interfaces for all domain models — auto-generated from Rust via ts-rs

export interface Entity {
  id: string | null;
}

export interface Timestamped {
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}

export interface SoftDeletable extends Timestamped {
  deletedAt: string | null;
}

export interface Auditable extends Timestamped {
  createdBy?: string | null;
  updatedBy?: string | null;
}

export type EntityStatus = "active" | "inactive" | "deleted" | "pending";
