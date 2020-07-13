import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTES } from '../../components/sidebar/sidebar.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { User } from 'src/app/pages/user';
import { RegisterService } from 'src/app/services/register.service';



@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: Router, private service: RegisterService,
    private authentificationService: AuthentificationService) { }

    message: string;
    loginForm: FormGroup;
    logModel: User;
    messageValidate = {
      email: {
        required: 'Email est obligatoire',
      },
      pass: {
        required: 'Password est obligatoire',
      },
      username: {
        required: 'Username est obligatoire',
      },
    };

  ngOnInit() {
    this.message = '';

    this.logModel = {
      Email: '',
      UserName:'',
      Password: '',
      RememberMe: false
    };

    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.required],
      UserName:['',Validators.required],
      Password: ['', Validators.required],
      RememberMe: false
    });

  }


    Login() {
    if (this.loginForm.valid) {
      this.ValidateModel();
      this.service.UserLogin(this.logModel).subscribe(success => {
        const rem = !!this.loginForm.value.RememberMe;
        const email = this.loginForm.value.Email;
        const username = this.loginForm.value.UserName;
        this.authentificationService.installStorage(rem, email);
        this.route.navigate(['dashboard']);
      }, err => {
        console.log(err);
        this.message = err.error;
      });
    }
  }


  ValidateModel() {
    this.logModel.Email = this.loginForm.value.Email;
    this.logModel.Password = this.loginForm.value.Password;
    this.logModel.UserName = this.loginForm.value.UserName
    this.logModel.RememberMe = this.loginForm.value.RememberMe;
  }

}
