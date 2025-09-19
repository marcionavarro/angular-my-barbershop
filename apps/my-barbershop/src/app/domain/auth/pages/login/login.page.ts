import { Component } from '@angular/core';
import { DateUtil } from '@shared/utils/date.util';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  constructor() {
    const date = DateUtil.getFormattedDate(new Date());
    console.log(date);
  }
}
