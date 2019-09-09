import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRanch } from 'app/shared/model/adminranch/ranch.model';
import { AccountService } from 'app/core';
import { RanchService } from './ranch.service';

@Component({
  selector: 'jhi-ranch',
  templateUrl: './ranch.component.html'
})
export class RanchComponent implements OnInit, OnDestroy {
  ranches: IRanch[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected ranchService: RanchService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.ranchService
      .query()
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
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRanches();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRanch) {
    return item.id;
  }

  registerChangeInRanches() {
    this.eventSubscriber = this.eventManager.subscribe('ranchListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
