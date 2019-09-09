import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ranch } from 'app/shared/model/adminranch/ranch.model';
import { RanchService } from './ranch.service';
import { RanchComponent } from './ranch.component';
import { RanchDetailComponent } from './ranch-detail.component';
import { RanchUpdateComponent } from './ranch-update.component';
import { RanchDeletePopupComponent } from './ranch-delete-dialog.component';
import { IRanch } from 'app/shared/model/adminranch/ranch.model';

@Injectable({ providedIn: 'root' })
export class RanchResolve implements Resolve<IRanch> {
  constructor(private service: RanchService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRanch> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Ranch>) => response.ok),
        map((ranch: HttpResponse<Ranch>) => ranch.body)
      );
    }
    return of(new Ranch());
  }
}

export const ranchRoute: Routes = [
  {
    path: '',
    component: RanchComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.adminranchRanch.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RanchDetailComponent,
    resolve: {
      ranch: RanchResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.adminranchRanch.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RanchUpdateComponent,
    resolve: {
      ranch: RanchResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.adminranchRanch.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RanchUpdateComponent,
    resolve: {
      ranch: RanchResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.adminranchRanch.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ranchPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RanchDeletePopupComponent,
    resolve: {
      ranch: RanchResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.adminranchRanch.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
