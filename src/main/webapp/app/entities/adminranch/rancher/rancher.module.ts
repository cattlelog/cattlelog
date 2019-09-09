import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  RancherComponent,
  RancherDetailComponent,
  RancherUpdateComponent,
  RancherDeletePopupComponent,
  RancherDeleteDialogComponent,
  rancherRoute,
  rancherPopupRoute
} from './';

const ENTITY_STATES = [...rancherRoute, ...rancherPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RancherComponent,
    RancherDetailComponent,
    RancherUpdateComponent,
    RancherDeleteDialogComponent,
    RancherDeletePopupComponent
  ],
  entryComponents: [RancherComponent, RancherUpdateComponent, RancherDeleteDialogComponent, RancherDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminranchRancherModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
