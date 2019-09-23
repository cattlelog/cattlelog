import { Component, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { RancherService } from 'app/entities/adminranch/rancher/rancher.service';
import { ConsultantService } from 'app/entities/adminranch/consultant/consultant.service';
import { AccountService, UserService, User } from 'app/core';
// import { ActivatedRoute } from '@angular/router';

import { IRancher, Rancher } from 'app/shared/model/adminranch/rancher.model';
import { IConsultant, Consultant } from 'app/shared/model/adminranch/consultant.model';

@Component({
  selector: 'jhi-login-modal',
  templateUrl: './login.component.html'
})
export class JhiLoginModalComponent implements AfterViewInit {
  authenticationError: boolean;
  // rancher: IRancher;
  // consultant: IConsultant;

  loginForm = this.fb.group({
    username: [''],
    password: [''],
    rememberMe: [true]
  });

  constructor(
    private eventManager: JhiEventManager,
    private loginService: LoginService,
    private rancherService: RancherService,
    private consultantService: ConsultantService,
    private stateStorageService: StateStorageService,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private router: Router,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {}

  ngAfterViewInit() {
    setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []), 0);
  }

  cancel() {
    this.authenticationError = false;
    this.loginForm.patchValue({
      username: '',
      password: ''
    });
    this.activeModal.dismiss('cancel');
  }

  login() {
    this.loginService
      .login({
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value,
        rememberMe: this.loginForm.get('rememberMe').value
      })
      .then(user => {
        this.authenticationError = false;
        this.activeModal.dismiss('login success');

        // Verify the roles (authorities)
        // If its a rancher, verify the record exists.
        if (user.authorities.includes('ROLE_USER')) {
          // alert('it is a rancher! Ajayyyy');

          this.rancherService.findByUserId(user.id).subscribe(
            response => {
              // alert('response body: ' + response.body);
              // alert('rancher user id: ' + response.body.userId);
              // alert('rancher id: ' + response.body.id);
            },
            response => {
              // If status is 404, the ranch record has to be created.
              if (response.status === 404) {
                // Create the new Rancher record
                // alert('we need to create a ranch record');
                const rancher: IRancher = new Rancher();
                rancher.userId = user.id;
                this.rancherService.create(rancher).subscribe();
              }
            }
          );
        }

        if (user.authorities.includes('ROLE_CONSULTANT')) {
          this.consultantService.findByUserId(user.id).subscribe(
            () => {},
            response => {
              // If status is 404, the consultant record has to be created.
              if (response.status === 404) {
                // Create the new Consultant record
                const consultant: IConsultant = new Consultant();
                consultant.userId = user.id;
                this.consultantService.create(consultant).subscribe();
              }
            }
          );
        }

        // If doesn't exist, create the record.

        if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
          this.router.navigate(['']);
        }

        this.eventManager.broadcast({
          name: 'authenticationSuccess',
          content: 'Sending Authentication Success'
        });

        // previousState was set in the authExpiredInterceptor before being redirected to login modal.
        // since login is successful, go to stored previousState and clear previousState
        const redirect = this.stateStorageService.getUrl();
        if (redirect) {
          this.stateStorageService.storeUrl(null);
          this.router.navigateByUrl(redirect);
          // } else {
          //   this.router.navigateByUrl('/');
          // }
        }
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }

  register() {
    this.activeModal.dismiss('to state register');
    this.router.navigate(['/register']);
  }

  requestResetPassword() {
    this.activeModal.dismiss('to state requestReset');
    this.router.navigate(['/reset', 'request']);
  }
}
