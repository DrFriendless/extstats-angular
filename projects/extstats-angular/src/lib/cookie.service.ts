import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class CookieService {
  public getCookie(name: string): string {
    const ca: Array<string> = decodeURIComponent(document.cookie).split(';');
    const caLen: number = ca.length;
    const cookieName = `${name}=`;

    for (let i  = 0; i < caLen; i += 1) {
      const c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }
}
