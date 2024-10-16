import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  constructor(
    private authSrv: AuthService,
    private router: Router,
  ) { }

  onLogin() {
    this.authSrv.login('john.due@gmail.com', '123456')
      .subscribe((user) => {
        console.log('user', user);
        this.router.navigate(['/heroes/list']);
      });
  }

}
