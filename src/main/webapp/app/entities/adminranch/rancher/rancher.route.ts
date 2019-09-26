import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService, AccountService } from 'app/core';
// import { AccountService, User, UserService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Rancher } from 'app/shared/model/adminranch/rancher.model';
import { RancherService } from './rancher.service';
import { RancherComponent } from './rancher.component';
import { RancherDetailComponent } from './rancher-detail.component';
import { RancherUpdateComponent } from './rancher-update.component';
import { RancherDeletePopupComponent } from './rancher-delete-dialog.component';
import { IRancher } from 'app/shared/model/adminranch/rancher.model';

@Injectable({ providedIn: 'root' })
export class RancherResolve implements Resolve<IRancher> {
  constructor(private service: RancherService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRancher> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Rancher>) => response.ok),
        map((rancher: HttpResponse<Rancher>) => rancher.body)
      );
    }
    return of(new Rancher());
  }
}

export const rancherRoute: Routes = [
  {
    path: '',
    component: RancherComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.adminranchRancher.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RancherDetailComponent,
    resolve: {
      rancher: RancherResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.adminranchRancher.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RancherUpdateComponent,
    resolve: {
      rancher: RancherResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.adminranchRancher.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RancherUpdateComponent,
    resolve: {
      rancher: RancherResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.adminranchRancher.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const rancherPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RancherDeletePopupComponent,
    resolve: {
      rancher: RancherResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.adminranchRancher.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
