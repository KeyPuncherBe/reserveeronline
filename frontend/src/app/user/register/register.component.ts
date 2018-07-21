import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;
  public errorMsg: string;
  public hide = true;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.user = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)],
        this.serverSideValidateUsername()],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, this.passwordValidator(12)]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.comparePasswords })
    });
  }

  private passwordValidator(length: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return control.value.length < length ? {
        'passwordTooShort':
          { requiredLength: length, actualLength: control.value.length }
      } : null;
    };
  }

  private comparePasswords(control: AbstractControl): { [key: string]: any } {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password.value === confirmPassword.value ? null : { 'passwordsDiffer': true };
  }

  serverSideValidateUsername(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this.authenticationService
        .checkUserNameAvailability(control.value)
        .pipe(
          map(available => {
            if (available) {
              return null;
            }
            return { userAlreadyExists: true };
          })
        );
    };
  }

  onSubmit() {
    if (this.user.valid) {
      this.authenticationService.register(this.user.value.username,
        this.user.value.passwordGroup.password).subscribe(val => {
          if (val) {
            if (this.authenticationService.redirectUrl) {
              this.router.navigateByUrl(this.authenticationService.redirectUrl);
              this.authenticationService.redirectUrl = undefined;
            } else {
              this.router.navigate(['/hoevewinkel']);
            }
          }
        }, err => {
        this.errorMsg = err.message;
          console.log(this.errorMsg);
        });
    } else {
      console.log('form invalid');
    }

  }

}
