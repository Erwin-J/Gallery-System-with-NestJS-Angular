import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Token } from '../models/token';
import { ADMIN_CONSTANTS } from '../models/ADMIN_CONSTANTS';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  @Output()
  userLoggedIn: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  set userLoggedOut(value: any) {
    this.isLoggedIn = value;
  }

  @Input()
  isTokenExpired: boolean = false;

  loginForm: FormGroup;
  loginIsAttempted: boolean = false;
  isLoginError: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });

    const sessionToken: any = sessionStorage.getItem(
      ADMIN_CONSTANTS.TOKEN_NAME
    );

    if (!sessionToken) {
      return;
    }

    const token: Token = JSON.parse(sessionToken);

    this.loginService.isAuthenticated(token?.access_token).subscribe(
      (isAuthenticated) => {
        if (!isAuthenticated) {
          return;
        }

        this.isLoggedIn = true;
        this.userLoggedIn.emit();
      },
      (error) => {
        this.isLoggedIn = false;
      }
    );
  }

  login(): void {
    this.loginIsAttempted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loginService
      .login(
        this.loginForm.get('username')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe(
        (token: Token) => {
          if (!token) {
            this.isLoginError = true;
            return;
          }

          sessionStorage.setItem(
            ADMIN_CONSTANTS.TOKEN_NAME,
            JSON.stringify(token)
          );

          this.userLoggedIn.emit();
          this.isLoggedIn = true;
          this.isLoginError = false;
          this.isTokenExpired = false;
        },
        (error) => {
          this.isLoginError = true;
          this.isTokenExpired = false;
        }
      );
  }
}
