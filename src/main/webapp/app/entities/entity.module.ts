import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'consultant',
        loadChildren: './adminranch/consultant/consultant.module#AdminranchConsultantModule'
      },
      {
        path: 'rancher',
        loadChildren: './adminranch/rancher/rancher.module#AdminranchRancherModule'
      },
      {
        path: 'ranch',
        loadChildren: './adminranch/ranch/ranch.module#AdminranchRanchModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
