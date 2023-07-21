import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { OauthService } from './books/shared/ouath.service';
import { Store } from '@ngrx/store';
import { PageActions } from './books/store/page.actions';

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

  constructor(ouathService: OauthService, store: Store) {
    console.log(this.helloWelt);
    console.log('2. Test', translate('helloWorld'))

    ouathService.loadAndLogin().then(() => {
      store.dispatch(PageActions.ready());
    })

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
