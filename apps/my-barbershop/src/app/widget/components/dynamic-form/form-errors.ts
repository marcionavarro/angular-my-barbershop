import { InjectionToken } from '@angular/core';

export interface ErrorMessages {
  [key: string]: (params: unknown) => string;
}

export const DEFAULT_ERRORS = {
  required: () => 'Campo obrigatório',
  email: () => 'Email inválido',
  minlength: ({ requiredLength }: { requiredLength: number }) => `Mínimo de ${requiredLength} caracteres`,
  maxlength: ({ requiredLength }: { requiredLength: number }) => `Máximo de ${requiredLength} caracteres`,
  min: ({ min }: { min: number }) => `O valor mínimo é ${min}`,
  max: ({ max }: { max: number }) => `O valor máximo é ${max}`,
  mask: () => 'Valor inválido',
  passwordNotMatch: () => 'As senhas não coincidem',
  fullname: () => 'Sobrenome obrigatório',
  invalidDate: () => 'Data inválida',
};

export const ERROR_MESSAGES = new InjectionToken('ERROR_MESSAGES', {
  providedIn: 'root',
  factory: () => DEFAULT_ERRORS,
});
