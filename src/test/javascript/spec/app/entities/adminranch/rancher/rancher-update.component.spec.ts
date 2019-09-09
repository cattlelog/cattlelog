/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { RancherUpdateComponent } from 'app/entities/adminranch/rancher/rancher-update.component';
import { RancherService } from 'app/entities/adminranch/rancher/rancher.service';
import { Rancher } from 'app/shared/model/adminranch/rancher.model';

describe('Component Tests', () => {
  describe('Rancher Management Update Component', () => {
    let comp: RancherUpdateComponent;
    let fixture: ComponentFixture<RancherUpdateComponent>;
    let service: RancherService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RancherUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RancherUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RancherUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RancherService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Rancher(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Rancher();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
