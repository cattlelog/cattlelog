import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRanch } from 'app/shared/model/adminranch/ranch.model';
import { RanchService } from './ranch.service';

@Component({
  selector: 'jhi-ranch-delete-dialog',
  templateUrl: './ranch-delete-dialog.component.html'
})
export class RanchDeleteDialogComponent {
  ranch: IRanch;

  constructor(protected ranchService: RanchService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ranchService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'ranchListModification',
        content: 'Deleted an ranch'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ranch-delete-popup',
  template: ''
})
export class RanchDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ranch }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RanchDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.ranch = ranch;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/ranch', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/ranch', { outlets: { popup: null } }]);
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
