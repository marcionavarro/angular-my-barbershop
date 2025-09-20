import { NzButtonComponent } from 'ng-zorro-antd/button';

import { Component, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { ThemeService } from '@shared/services/theme/theme.service';

@Component({
  selector: 'app-login',
  imports: [NzButtonComponent, TranslocoModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private themeService = inject(ThemeService);
  private translocoService = inject(TranslocoService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  changeLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
