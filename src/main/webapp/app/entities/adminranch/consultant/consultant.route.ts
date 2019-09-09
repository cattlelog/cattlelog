import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Consultant } from 'app/shared/model/adminranch/consultant.model';
import { ConsultantService } from './consultant.service';
import { ConsultantComponent } from './consultant.component';
import { ConsultantDetailComponent } from './consultant-detail.component';
import { ConsultantUpdateComponent } from './consultant-update.component';
import { ConsultantDeletePopupComponent } from './consultant-delete-dialog.component';
import { IConsultant } from 'app/shared/model/adminranch/consultant.model';

@Injectable({ providedIn: 'root' })
export class ConsultantResolve implements Resolve<IConsultant> {
  constructor(private service: ConsultantService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IConsultant> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Consultant>) => response.ok),
        map((consultant: HttpResponse<Consultant>) => consultant.body)
      );
    }
    return of(new Consultant());
  }
}

export const consultantRoute: Routes = [
  {
    path: '',
    component: ConsultantComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.adminranchConsultant.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ConsultantDetailComponent,
    resolve: {
      consultant: ConsultantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.adminranchConsultant.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ConsultantUpdateComponent,
    resolve: {
      consultant: ConsultantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.adminranchConsultant.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ConsultantUpdateComponent,
    resolve: {
      consultant: ConsultantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.adminranchConsultant.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const consultantPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ConsultantDeletePopupComponent,
    resolve: {
      consultant: ConsultantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.adminranchConsultant.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
