import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() { }

  setAuthenticated(value: boolean) {
    this.isAuthenticatedSubject.next(value);
  }

  Authenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
