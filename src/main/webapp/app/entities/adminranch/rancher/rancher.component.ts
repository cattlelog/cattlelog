import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRancher } from 'app/shared/model/adminranch/rancher.model';
import { AccountService } from 'app/core';
import { RancherService } from './rancher.service';

@Component({
  selector: 'jhi-rancher',
  templateUrl: './rancher.component.html'
})
export class RancherComponent implements OnInit, OnDestroy {
  ranchers: IRancher[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected rancherService: RancherService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.rancherService
      .query()
      .pipe(
        filter((res: HttpResponse<IRancher[]>) => res.ok),
        map((res: HttpResponse<IRancher[]>) => res.body)
      )
      .subscribe(
        (res: IRancher[]) => {
          this.ranchers = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRanchers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRancher) {
    return item.id;
  }

  registerChangeInRanchers() {
    this.eventSubscriber = this.eventManager.subscribe('rancherListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
