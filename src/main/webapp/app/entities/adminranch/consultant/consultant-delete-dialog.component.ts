import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConsultant } from 'app/shared/model/adminranch/consultant.model';
import { ConsultantService } from './consultant.service';

@Component({
  selector: 'jhi-consultant-delete-dialog',
  templateUrl: './consultant-delete-dialog.component.html'
})
export class ConsultantDeleteDialogComponent {
  consultant: IConsultant;

  constructor(
    protected consultantService: ConsultantService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.consultantService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'consultantListModification',
        content: 'Deleted an consultant'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-consultant-delete-popup',
  template: ''
})
export class ConsultantDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ consultant }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ConsultantDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.consultant = consultant;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/consultant', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/consultant', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
