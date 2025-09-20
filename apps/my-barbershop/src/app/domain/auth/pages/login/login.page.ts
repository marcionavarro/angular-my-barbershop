import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { injectSupabase } from '@shared/functions/inject-supabase.function';

@Component({
  selector: 'app-login',
  imports: [NzButtonComponent, NzFormModule, NzInputModule, ReactiveFormsModule, TranslocoModule, RouterModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private supabase = injectSupabase();
  private notificationService = inject(NzNotificationService);
  private router = inject(Router);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async login() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      this.notificationService.error('Erro', 'Preencha os campos corretamente');
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
      if (error) {
        this.notificationService.error('Erro ao fazer login', 'Verifique suas credenciais e tente novamente');
        return;
      }
      this.notificationService.success('Sucesso', 'Logado com sucesso');
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    } catch (err) {
      this.notificationService.error('Erro', (err as Error).message || 'Erro desconhecido');
    }
  }
}
