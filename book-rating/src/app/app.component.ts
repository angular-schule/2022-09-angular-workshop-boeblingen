import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'br-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink
  ],
})
export class AppComponent {
  title = 'Book Rating';

  helloWelt = $localize`:@@helloWorld:** Hello World`;

  constructor() {
    console.log(this.helloWelt);
    console.log('2. Test', translate('helloWorld'))
  }

  changeLocale(targetLang: 'de' | 'en-US') {
    localStorage.setItem('locale', targetLang);
    location.reload();
  }
}

export function translate(key: string) {
  const trans = ($localize as any)['TRANSLATIONS'][key];
  if (trans) {
    return trans.text;
  }

  return key;
}
