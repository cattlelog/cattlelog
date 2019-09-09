/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { ConsultantDeleteDialogComponent } from 'app/entities/adminranch/consultant/consultant-delete-dialog.component';
import { ConsultantService } from 'app/entities/adminranch/consultant/consultant.service';

describe('Component Tests', () => {
  describe('Consultant Management Delete Component', () => {
    let comp: ConsultantDeleteDialogComponent;
    let fixture: ComponentFixture<ConsultantDeleteDialogComponent>;
    let service: ConsultantService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ConsultantDeleteDialogComponent]
      })
        .overrideTemplate(ConsultantDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConsultantDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConsultantService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
