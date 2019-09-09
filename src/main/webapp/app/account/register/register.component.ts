import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared';
import { LoginModalService } from 'app/core';
import { Register } from './register.service';
import { RancherService } from '../../entities/adminranch/rancher/rancher.service';
import { IRancher, Rancher } from '../../shared/model/adminranch/rancher.model';
// import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'jhi-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {
  doNotMatch: string;
  error: string;
  errorEmailExists: string;
  errorUserExists: string;
  success: boolean;
  modalRef: NgbModalRef;
  authorities: any[];
  rancher: IRancher;

  registerForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*$')]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    authority: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
  });

  constructor(
    private languageService: JhiLanguageService,
    private loginModalService: LoginModalService,
    // private userService: UserService,
    private registerService: Register,
    private rancherService: RancherService,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.success = false;

    // this.userService.authorities().subscribe(authorities => {
    //   this.authorities = authorities;
    // });

    // Fill authorities
    this.authorities = [
      {
        id: 1,
        name: 'ROLE_USER',
        displayName: 'Cattleman',
        langName: 'global.form.role.option.cattleman'
      },
      {
        id: 2,
        name: 'ROLE_CONSULTANT',
        displayName: 'Consultant',
        langName: 'global.form.role.option.consultant'
      }
    ];
  }

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
  }

  register() {
    let registerAccount = {};
    const login = this.registerForm.get(['login']).value;
    const email = this.registerForm.get(['email']).value;
    const authority = this.registerForm.get(['authority']).value;
    const authorities = [];
    authorities.push('ROLE_USER');
    authorities.push(authority);
    const password = this.registerForm.get(['password']).value;
    if (password !== this.registerForm.get(['confirmPassword']).value) {
      this.doNotMatch = 'ERROR';
    } else {
      registerAccount = { ...registerAccount, login, email, authorities, password };
      this.doNotMatch = null;
      this.error = null;
      this.errorUserExists = null;
      this.errorEmailExists = null;
      this.languageService.getCurrent().then(langKey => {
        registerAccount = { ...registerAccount, langKey };
        this.registerService.save(registerAccount).subscribe(
          data => {
            this.success = true;

            // Create new Rancher or Consultant depending on Authority.
            if (authorities.includes('ROLE_USER')) {
              alert(data.id);
              // this.rancher.userId = data.id;
              // this.rancherService.create(this.rancher);
            }
            if (authorities.includes('ROLE_CONSULTANT')) {
              alert(data.id);
            }
          },
          response => this.processError(response)
        );
      });
    }
  }

  openLogin() {
    this.modalRef = this.loginModalService.open();
  }

  private processError(response: HttpErrorResponse) {
    this.success = null;
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = 'ERROR';
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = 'ERROR';
    } else {
      this.error = 'ERROR';
    }
  }
}
