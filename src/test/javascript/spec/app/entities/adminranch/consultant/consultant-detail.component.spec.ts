/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ConsultantDetailComponent } from 'app/entities/adminranch/consultant/consultant-detail.component';
import { Consultant } from 'app/shared/model/adminranch/consultant.model';

describe('Component Tests', () => {
  describe('Consultant Management Detail Component', () => {
    let comp: ConsultantDetailComponent;
    let fixture: ComponentFixture<ConsultantDetailComponent>;
    const route = ({ data: of({ consultant: new Consultant(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ConsultantDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ConsultantDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConsultantDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.consultant).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
