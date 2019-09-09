import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  RanchComponent,
  RanchDetailComponent,
  RanchUpdateComponent,
  RanchDeletePopupComponent,
  RanchDeleteDialogComponent,
  ranchRoute,
  ranchPopupRoute
} from './';

const ENTITY_STATES = [...ranchRoute, ...ranchPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [RanchComponent, RanchDetailComponent, RanchUpdateComponent, RanchDeleteDialogComponent, RanchDeletePopupComponent],
  entryComponents: [RanchComponent, RanchUpdateComponent, RanchDeleteDialogComponent, RanchDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminranchRanchModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
