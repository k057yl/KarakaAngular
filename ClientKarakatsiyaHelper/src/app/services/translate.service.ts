import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { translations, Lang } from '../i18n';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private langSubject = new BehaviorSubject<Lang>('ru');
  lang$ = this.langSubject.asObservable();

  private currentLang: Lang = 'ru';

  switchLang(lang: Lang) {
    this.currentLang = lang;
    this.langSubject.next(lang);
  }

  t(key: string): string {
    const keys = key.split('.');
    let val: any = translations[this.currentLang];

    for (const k of keys) {
      if (val[k] === undefined) return key;
      val = val[k];
    }

    return val;
  }
}