/// <reference types="@angular/localize" />

import { LOCALE_ID, enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { loadTranslations } from '@angular/localize';

import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';

if (environment.production) {
  enableProdMode();
}


async function setupLocale() {
  if (localStorage.getItem('locale') !== 'de') {
    return 'en-US';
  }

  const response = await fetch('assets/messages.de.json');
  const result = await response.json();
  loadTranslations(result.translations);
  registerLocaleData(localeDe);
  return 'de';

}

// ng add @angular/localize --useAtRuntime
// Das Paket wird dann automatisch im Abschnitt dependencies der package.json eingetragen!
setupLocale().then(localeValue => {

  bootstrapApplication(AppComponent, {
    providers: [
      ...appConfig.providers,
      { provide: LOCALE_ID, useValue: localeValue }
    ]
  })
    .catch((err) => console.error(err));

});
