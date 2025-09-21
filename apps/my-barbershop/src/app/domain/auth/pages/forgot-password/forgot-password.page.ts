import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { injectSupabase } from '@shared/functions/inject-supabase.function';
import { LoadingService } from '@shared/services/loading/loading.service';
import { eDynamicField } from '@widget/components/dynamic-form/dynamic-field.enum';
import { iDynamicFormConfig } from '@widget/components/dynamic-form/dynamic-form-config.interface';
import { DynamicFormComponent } from '@widget/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-forgot-password',
  imports: [NzButtonComponent, NzFormModule, NzInputModule, FormsModule, TranslocoModule, RouterModule, DynamicFormComponent],
  templateUrl: './forgot-password.page.html',
  styleUrl: './forgot-password.page.scss',
})
export class ForgotPasswordPage {
  private supabase = injectSupabase();
  private notificationService = inject(NzNotificationService);
  protected loadingService = inject(LoadingService);

  formConfig: iDynamicFormConfig[] = [
    {
      label: 'Email',
      name: 'email',
      type: {
        field: eDynamicField.INPUT,
        typeField: 'email',
      },
      validations: [Validators.required, Validators.email],
      size: 24,
    },
  ];

  @ViewChild(DynamicFormComponent) dynamicForm!: DynamicFormComponent;

  async submit() {
    this.loadingService.start();
    try {
      const { email } = this.dynamicForm.form.value;
      await this.supabase.auth.resetPasswordForEmail(email);
      this.notificationService.success('E-mail enviado', 'Verifique sua caixa de entrada para redefinir sua senha');
      this.dynamicForm.form.reset();
    } catch (error) {
      console.log('🚀 ~ ForgotPasswordPage ~ submit ~ error:', error);
    }
    this.loadingService.stop();
  }
}
