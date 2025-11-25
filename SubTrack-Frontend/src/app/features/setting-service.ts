import { Injectable, signal } from '@angular/core';
import { translations } from '../shared/translations';


@Injectable({
  providedIn: 'root'
})
export class SettingService {
  // Signaux globaux
  language = signal<'en' | 'de'>('en');
  currency = signal<'EUR' | 'USD'>('EUR');

  setLanguage(lang: 'en' | 'de') {
    this.language.set(lang);
    console.log('🌐 Langue définie sur :', lang);
  }

  setCurrency(curr: 'EUR' | 'USD') {
    this.currency.set(curr);
    console.log('💰 Devise définie sur :', curr);
  }

  
  translate(key: keyof typeof translations['en']): string {
    const lang = this.language();
    return translations[lang][key] || key;
  }
}
