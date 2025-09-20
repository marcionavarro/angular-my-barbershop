import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { injectSupabase } from '@shared/functions/inject-supabase.function';
import { LoadingService } from '@shared/services/loading/loading.service';

@Component({
  selector: 'app-forgot-password',
  imports: [NzButtonComponent, NzFormModule, NzInputModule, FormsModule, TranslocoModule, RouterModule],
  templateUrl: './forgot-password.page.html',
  styleUrl: './forgot-password.page.scss',
})
export class ForgotPasswordPage {
  private supabase = injectSupabase();
  private notificationService = inject(NzNotificationService);
  protected loadingService = inject(LoadingService);

  email = model('');

  async submit() {
    this.loadingService.start();
    try {
      await this.supabase.auth.resetPasswordForEmail(this.email());
      this.notificationService.success('E-mail enviado', 'Verifique sua caixa de entrada para redefinir sua senha');
      this.email.set('');
    } catch (error) {
      console.log('🚀 ~ ForgotPasswordPage ~ submit ~ error:', error);
    }
    this.loadingService.stop();
  }
}
