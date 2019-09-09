/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ConsultantComponent } from 'app/entities/adminranch/consultant/consultant.component';
import { ConsultantService } from 'app/entities/adminranch/consultant/consultant.service';
import { Consultant } from 'app/shared/model/adminranch/consultant.model';

describe('Component Tests', () => {
  describe('Consultant Management Component', () => {
    let comp: ConsultantComponent;
    let fixture: ComponentFixture<ConsultantComponent>;
    let service: ConsultantService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ConsultantComponent],
        providers: []
      })
        .overrideTemplate(ConsultantComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConsultantComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConsultantService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Consultant(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.consultants[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
