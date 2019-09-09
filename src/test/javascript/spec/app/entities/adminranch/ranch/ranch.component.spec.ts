/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { RanchComponent } from 'app/entities/adminranch/ranch/ranch.component';
import { RanchService } from 'app/entities/adminranch/ranch/ranch.service';
import { Ranch } from 'app/shared/model/adminranch/ranch.model';

describe('Component Tests', () => {
  describe('Ranch Management Component', () => {
    let comp: RanchComponent;
    let fixture: ComponentFixture<RanchComponent>;
    let service: RanchService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RanchComponent],
        providers: []
      })
        .overrideTemplate(RanchComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RanchComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RanchService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Ranch(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ranches[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
