import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GuardService {
  canActivate(): boolean {
    return true;
  }
}
