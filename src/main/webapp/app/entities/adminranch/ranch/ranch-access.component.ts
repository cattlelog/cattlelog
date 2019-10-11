import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IConsultant } from 'app/shared/model/adminranch/consultant.model';
import { IRanchWithAccess } from 'app/shared/model/adminranch/ranch-with-access.model';
import { RanchAccess } from 'app/shared/model/adminranch/ranch-access.model';
import { AccountService } from 'app/core';
import { RanchService } from './ranch.service';
import { ConsultantService } from '../consultant/consultant.service';

@Component({
  selector: 'jhi-ranch-access',
  templateUrl: './ranch-access.component.html'
})
export class RanchAccessComponent implements OnInit {
  ranchesForConsultantWithAccess: IRanchWithAccess[];
  ranchesForRancherWithAccess: IRanchWithAccess[];
  currentAccount: Account;

  constructor(
    protected ranchService: RanchService,
    protected consultantService: ConsultantService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAllForRancherWithAccessByUserId(userId) {
    this.ranchService
      .findAllForRancherWithAccessByUserId(userId)
      .pipe(
        filter((res: HttpResponse<IRanchWithAccess[]>) => res.ok),
        map((res: HttpResponse<IRanchWithAccess[]>) => res.body)
      )
      .subscribe(
        (res: IRanchWithAccess[]) => {
          this.ranchesForRancherWithAccess = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadAllForConsultantWithAccessByUserId(userId) {
    this.ranchService
      .findAllForConsultantWithAccessByUserId(userId)
      .pipe(
        filter((res: HttpResponse<IRanchWithAccess[]>) => res.ok),
        map((res: HttpResponse<IRanchWithAccess[]>) => res.body)
      )
      .subscribe(
        (res: IRanchWithAccess[]) => {
          this.ranchesForConsultantWithAccess = res.filter(
            ranch => !(ranch.consultantUserId !== userId && (ranch.status === 'ACTIVE' || ranch.status === 'NEW'))
          );
          // this.ranchesForConsultantWithAccess = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.accountService.identity().then(account => {
      this.currentAccount = account;

      if (this.isConsultant()) {
        this.loadAllForConsultantWithAccessByUserId(this.currentAccount.id);
      }

      this.loadAllForRancherWithAccessByUserId(this.currentAccount.id);
    });
  }

  requestAccess(ranchId: number) {
    this.consultantService.findByUserId(Number(this.currentAccount.id)).subscribe((res: IConsultant) => {
      const ranchAccess = new RanchAccess(ranchId, res.body.id);
      this.ranchService.requestAccess(ranchAccess).subscribe(
        () => {
          this.successMessage('adminranchApp.ranchAccess.requested');
        },
        // tslint:disable-next-line:no-shadowed-variable
        (res: HttpErrorResponse) => {
          this.onError(res.error.message);
        }
      );
    });

    // this.successMessage('Ranch id: ' + ranchAccess.ranchId + ' & User id: ' + ranchAccess.userId);
  }

  successMessage(message: string) {
    this.jhiAlertService.success(message, null, null);
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, 'timeout');
  }

  isConsultant() {
    return this.accountService.hasAnyAuthority(['ROLE_CONSULTANT']);
  }
}
