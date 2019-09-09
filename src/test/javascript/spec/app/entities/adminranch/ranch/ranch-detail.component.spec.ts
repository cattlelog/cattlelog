/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { RanchDetailComponent } from 'app/entities/adminranch/ranch/ranch-detail.component';
import { Ranch } from 'app/shared/model/adminranch/ranch.model';

describe('Component Tests', () => {
  describe('Ranch Management Detail Component', () => {
    let comp: RanchDetailComponent;
    let fixture: ComponentFixture<RanchDetailComponent>;
    const route = ({ data: of({ ranch: new Ranch(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RanchDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RanchDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RanchDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ranch).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
