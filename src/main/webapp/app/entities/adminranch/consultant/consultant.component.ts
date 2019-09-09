import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IConsultant } from 'app/shared/model/adminranch/consultant.model';
import { AccountService } from 'app/core';
import { ConsultantService } from './consultant.service';

@Component({
  selector: 'jhi-consultant',
  templateUrl: './consultant.component.html'
})
export class ConsultantComponent implements OnInit, OnDestroy {
  consultants: IConsultant[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected consultantService: ConsultantService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.consultantService
      .query()
      .pipe(
        filter((res: HttpResponse<IConsultant[]>) => res.ok),
        map((res: HttpResponse<IConsultant[]>) => res.body)
      )
      .subscribe(
        (res: IConsultant[]) => {
          this.consultants = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInConsultants();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IConsultant) {
    return item.id;
  }

  registerChangeInConsultants() {
    this.eventSubscriber = this.eventManager.subscribe('consultantListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
