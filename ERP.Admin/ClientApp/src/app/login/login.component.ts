import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserAuthModel } from '../Models/Auth/user-auth-model';
import { AuthenticationService } from '../Services/Authentication/autenticacion.service';
import { BaseService } from '../Services/HTTPClient/base.service';
import { LibrariesService } from '../Services/Common/libraries-service.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public service: BaseService,
    public permissionsService: NgxPermissionsService,
    public library: LibrariesService,
    public authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }


  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Clave: ['', Validators.required]
    });


    this.loginForm.valueChanges.subscribe(x => { this.error = ""; });
    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    //let res = this.authenticationService.login(this.f.username.value, this.f.password.value)
    this.authenticationService.login(this.f.Username.value, this.f.Clave.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.ok && data.records[0].token) {
            this.loading = false;
            this.router.navigateByUrl("/home");
          } else {

            this.loading = false;
            this.loginForm.reset();
            this.library.showToast(data.errores[0].toString(), { classname: 'bg-danger text-light', icon: "fas fa-exclamation-triangle" });
            this.router.navigateByUrl("/login");
          }
        },
        error => {
          this.library.showToast("Error interno! Mensaje: " + error, { classname: 'bg-danger text-light', icon: "fas fa-exclamation-triangle" });
          this.error = error;
          this.loading = false;
        });
  }

 

}
