import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRanch, IConsultant } from 'app/shared/model/adminranch/ranch.model';
import { RanchAccess } from 'app/shared/model/adminranch/ranch-access.model';
import { AccountService } from 'app/core';
import { RanchService } from './ranch.service';
import { ConsultantService } from '../consultant/consultant.service';

@Component({
  selector: 'jhi-ranch-access',
  templateUrl: './ranch-access.component.html'
})
export class RanchAccessComponent implements OnInit {
  ranches: IRanch[];
  currentAccount: Account;

  constructor(
    protected ranchService: RanchService,
    protected consultantService: ConsultantService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAllForAccessByUserId(userId) {
    this.ranchService
      .findAllForAccessByUserId(userId)
      .pipe(
        filter((res: HttpResponse<IRanch[]>) => res.ok),
        map((res: HttpResponse<IRanch[]>) => res.body)
      )
      .subscribe(
        (res: IRanch[]) => {
          this.ranches = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.accountService.identity().then(account => {
      this.currentAccount = account;
      this.loadAllForAccessByUserId(this.currentAccount.id);
    });
  }

  requestAccess(ranchId: number) {
    this.consultantService.findByUserId(Number(this.currentAccount.id)).subscribe((res: IConsultant) => {
      const ranchAccess = new RanchAccess(ranchId, res.body.id);
      this.ranchService.requestAccess(ranchAccess).subscribe(
        () => {
          this.successMessage('Request Sent');
        },
        // tslint:disable-next-line:no-shadowed-variable
        (res: HttpErrorResponse) => {
          this.onError(res.error.title);
        }
      );
    });

    // this.successMessage('Ranch id: ' + ranchAccess.ranchId + ' & User id: ' + ranchAccess.userId);
  }

  successMessage(message: string) {
    this.jhiAlertService.success(message, null, null);
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
