import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  error: string;
  authSubscription: Subscription;
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitForm(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    const { email, password } = form.value;
    let authObserver: Observable<AuthResponseData> = this.auth.login(email, password);

    if (!this.isLoginMode) {
      authObserver = this.auth.signUp(email, password);
    }

    this.authSubscription = authObserver.subscribe(
      response => {
        console.log(response);
      },
      (errorMessage: string) => {
        this.error = errorMessage;
      }
    );
  }
}
