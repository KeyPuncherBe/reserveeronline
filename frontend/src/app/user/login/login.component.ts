import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  public errorMsg: string;
  public hide = true;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthenticationService) { }


  ngOnInit() {
    this.user = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.user.valid) {
      this.authService.login(this.user.value.username, this.user.value.password)
      .subscribe(val => {
        if (val) {
          if (this.authService.redirectUrl) {
            this.router.navigateByUrl(this.authService.redirectUrl);
            this.authService.redirectUrl = undefined;
          } else {
            this.router.navigate(['/recipe/list']);
          }
        }
      }, err => {
        this.errorMsg = err.message;
          console.log(this.errorMsg);
        });
    }
  }

}
