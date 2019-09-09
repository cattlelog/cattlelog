import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRancher } from 'app/shared/model/adminranch/rancher.model';
import { RancherService } from './rancher.service';

@Component({
  selector: 'jhi-rancher-delete-dialog',
  templateUrl: './rancher-delete-dialog.component.html'
})
export class RancherDeleteDialogComponent {
  rancher: IRancher;

  constructor(protected rancherService: RancherService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.rancherService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'rancherListModification',
        content: 'Deleted an rancher'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-rancher-delete-popup',
  template: ''
})
export class RancherDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rancher }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RancherDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.rancher = rancher;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/rancher', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/rancher', { outlets: { popup: null } }]);
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
