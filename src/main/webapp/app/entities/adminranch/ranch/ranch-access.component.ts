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
import { UserService } from '../../../core/user/user.service';

@Component({
  selector: 'jhi-ranch-access',
  templateUrl: './ranch-access.component.html',
  styleUrls: ['ranch.scss']
})
export class RanchAccessComponent implements OnInit {
  ranchesForConsultantWithAccess: IRanchWithAccess[];
  ranchesForRancherWithAccess: IRanchWithAccess[];
  currentAccount: Account;

  selected: IRanchWithAccess;
  options: IRanchWithAccess[];

  constructor(
    protected ranchService: RanchService,
    protected consultantService: ConsultantService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    protected userService: UserService
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
          this.ranchesForRancherWithAccess.map(r =>
            this.userService.findById(r.consultantUserId).subscribe(user => {
              r.consultantName = user.body.firstName + ' ' + user.body.lastName;
            })
          );
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadAllForConsultantWithAccess(userId) {
    this.ranchService
      .findAllForConsultantWithAccess()
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

  loadLists() {
    if (this.isConsultant()) {
      this.loadAllForConsultantWithAccess(this.currentAccount.id);
    }

    this.loadAllForRancherWithAccessByUserId(this.currentAccount.id);
  }

  ngOnInit() {
    this.accountService.identity().then(account => {
      this.currentAccount = account;

      this.loadLists();
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
  }

  grantAccess(ranchId: number, consultantUserId: number) {
    this.consultantService.findByUserId(Number(consultantUserId)).subscribe((res: IConsultant) => {
      const ranchAccess = new RanchAccess(ranchId, res.body.id);
      this.ranchService.grantAccess(ranchAccess).subscribe(
        () => {
          this.successMessage('adminranchApp.ranchAccess.granted');
          this.loadLists();
        },
        // tslint:disable-next-line:no-shadowed-variable
        (res: HttpErrorResponse) => {
          this.onError(res.error.message);
        }
      );
    });
  }

  removeAccess(ranchId: number, consultantUserId?: number) {
    if (consultantUserId === null) {
      consultantUserId = Number(this.currentAccount.id);
    }

    this.consultantService.findByUserId(Number(consultantUserId)).subscribe((res: IConsultant) => {
      this.ranchService.removeAccess(ranchId, res.body.id).subscribe(
        () => {
          this.successMessage('adminranchApp.ranchAccess.removed');
          this.loadLists();
        },
        // tslint:disable-next-line:no-shadowed-variable
        (res: HttpErrorResponse) => {
          this.onError(res.error.message);
        }
      );
    });
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

  search(event) {
    // this.mylookupservice.getResults(event.query).then(data => {
    //     this.results = data;
    // });
    this.ranchService
      .findAllForConsultantWithAccessByRanchName(event.query)
      .toPromise()
      .then(data => {
        console.log(data.body);
        this.ranchesForConsultantWithAccess = data.body;
      });
  }
}
