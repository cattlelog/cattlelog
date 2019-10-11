import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate, Router } from '@angular/router';
import { UserRouteAccessService, AccountService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ranch } from 'app/shared/model/adminranch/ranch.model';
import { RanchService } from './ranch.service';
import { RanchComponent } from './ranch.component';
import { RanchDetailComponent } from './ranch-detail.component';
import { RanchUpdateComponent } from './ranch-update.component';
import { RanchAccessComponent } from './ranch-access.component';
import { RanchDeletePopupComponent } from './ranch-delete-dialog.component';
import { IRanch } from 'app/shared/model/adminranch/ranch.model';

@Injectable({ providedIn: 'root' })
export class RanchAccess implements CanActivate {
  constructor(private ranchService: RanchService, private accountService: AccountService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.verifyAccess(route);
    // const result = this.verifyAccess(route);
    // return result;
  }

  verifyAccess(route: ActivatedRouteSnapshot): Promise<boolean> {
    const id = route.params['id'] ? route.params['id'] : null;
    return this.accountService.identity().then(account => {
      if (account) {
        if (this.accountService.hasAnyAuthority(['ROLE_ADMIN'])) {
          return true;
        }

        return new Promise(resolve => {
          this.ranchService
            .findAllByUserId(account.id)
            .pipe(
              filter((res: HttpResponse<IRanch[]>) => res.ok),
              map((res: HttpResponse<IRanch[]>) => res.body)
            )
            .subscribe((res: IRanch[]) => {
              if (id && res.map(i => i.id).includes(Number(id))) {
                resolve(true);
              } else {
                this.router.navigate(['accessdenied']);
                resolve(false);
              }
            });
        });
      } else {
        this.router.navigate(['accessdenied']);
        return false;
      }
    });
  }
}

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
    path: 'all',
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
    canActivate: [UserRouteAccessService, RanchAccess]
  },
  {
    path: 'access',
    component: RanchAccessComponent,
    resolve: {
      ranch: RanchResolve
    },
    data: {
      authorities: ['ROLE_USER', 'ROLE_CONSULTANT'],
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
    canActivate: [UserRouteAccessService, RanchAccess]
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
    canActivate: [UserRouteAccessService, RanchAccess],
    outlet: 'popup'
  }
];
