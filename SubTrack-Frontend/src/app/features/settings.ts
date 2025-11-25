import { Component, inject, signal } from '@angular/core';
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatCard } from '@angular/material/card';
import { SettingService } from './setting-service';

@Component({
  selector: 'app-settings',
  imports: [MatOptionModule, MatSelectModule, MatCard],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {

// Signaux pour suivre la langue et la devise
settings = inject(SettingService);

languages = [
  { code: 'en', label: 'Englisch' },
  { code: 'de', label: 'Deutsch' }
];

currencies = [
  { code: 'EUR', label: 'EUR (€)' },
  { code: 'USD', label: 'USD ($)' }
];

onLanguageChange(lang: 'en' | 'de') {
  this.settings.setLanguage(lang);
  console.log('Langue changée en :', lang);
}

onCurrencyChange(curr: 'EUR'| 'USD') {
  this.settings.setCurrency(curr);
  console.log('Devise changée en :', curr);
}
}
