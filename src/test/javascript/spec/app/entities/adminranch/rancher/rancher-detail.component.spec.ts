/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { RancherDetailComponent } from 'app/entities/adminranch/rancher/rancher-detail.component';
import { Rancher } from 'app/shared/model/adminranch/rancher.model';

describe('Component Tests', () => {
  describe('Rancher Management Detail Component', () => {
    let comp: RancherDetailComponent;
    let fixture: ComponentFixture<RancherDetailComponent>;
    const route = ({ data: of({ rancher: new Rancher(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RancherDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RancherDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RancherDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rancher).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
