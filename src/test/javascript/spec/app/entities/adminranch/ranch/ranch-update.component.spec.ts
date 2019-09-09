/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { RanchUpdateComponent } from 'app/entities/adminranch/ranch/ranch-update.component';
import { RanchService } from 'app/entities/adminranch/ranch/ranch.service';
import { Ranch } from 'app/shared/model/adminranch/ranch.model';

describe('Component Tests', () => {
  describe('Ranch Management Update Component', () => {
    let comp: RanchUpdateComponent;
    let fixture: ComponentFixture<RanchUpdateComponent>;
    let service: RanchService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RanchUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RanchUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RanchUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RanchService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Ranch(123);
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
        const entity = new Ranch();
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
