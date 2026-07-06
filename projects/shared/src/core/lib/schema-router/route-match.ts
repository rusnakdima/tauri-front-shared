import type { Page } from "../types";
import type { GuardEvaluationResult } from "./guard.service";

export interface RouteMatch {
  page: Page;
  params: Record<string, string>;
  guards: GuardEvaluationResult[];
}

export interface GuardResult {
  passed: boolean;
  redirectTo?: string;
  error?: string;
}

export interface NavigationTarget {
  route: string;
  page: Page;
  params: Record<string, string>;
  extras?: NavigationExtras;
}

export interface NavigationExtras {
  replaceUrl?: boolean;
  queryParams?: Record<string, string>;
  fragment?: string;
  preserveFragment?: boolean;
  state?: Record<string, unknown>;
}
