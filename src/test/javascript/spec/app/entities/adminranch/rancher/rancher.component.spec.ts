/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { RancherComponent } from 'app/entities/adminranch/rancher/rancher.component';
import { RancherService } from 'app/entities/adminranch/rancher/rancher.service';
import { Rancher } from 'app/shared/model/adminranch/rancher.model';

describe('Component Tests', () => {
  describe('Rancher Management Component', () => {
    let comp: RancherComponent;
    let fixture: ComponentFixture<RancherComponent>;
    let service: RancherService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RancherComponent],
        providers: []
      })
        .overrideTemplate(RancherComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RancherComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RancherService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Rancher(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ranchers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
