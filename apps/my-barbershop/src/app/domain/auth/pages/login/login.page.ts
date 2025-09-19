import { NzButtonComponent } from 'ng-zorro-antd/button';

import { Component, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-login',
  imports: [NzButtonComponent, TranslocoModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private translocoService = inject(TranslocoService);

  changeLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
