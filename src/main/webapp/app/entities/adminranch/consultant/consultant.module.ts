import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  ConsultantComponent,
  ConsultantDetailComponent,
  ConsultantUpdateComponent,
  ConsultantDeletePopupComponent,
  ConsultantDeleteDialogComponent,
  consultantRoute,
  consultantPopupRoute
} from './';

const ENTITY_STATES = [...consultantRoute, ...consultantPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ConsultantComponent,
    ConsultantDetailComponent,
    ConsultantUpdateComponent,
    ConsultantDeleteDialogComponent,
    ConsultantDeletePopupComponent
  ],
  entryComponents: [ConsultantComponent, ConsultantUpdateComponent, ConsultantDeleteDialogComponent, ConsultantDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminranchConsultantModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
