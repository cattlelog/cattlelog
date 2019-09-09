import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IRancher, Rancher } from 'app/shared/model/adminranch/rancher.model';
import { RancherService } from './rancher.service';

@Component({
  selector: 'jhi-rancher-update',
  templateUrl: './rancher-update.component.html'
})
export class RancherUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    userId: [null, [Validators.required]],
    code: [],
    shortCode: [],
    mark: []
  });

  constructor(protected rancherService: RancherService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rancher }) => {
      this.updateForm(rancher);
    });
  }

  updateForm(rancher: IRancher) {
    this.editForm.patchValue({
      id: rancher.id,
      userId: rancher.userId,
      code: rancher.code,
      shortCode: rancher.shortCode,
      mark: rancher.mark
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rancher = this.createFromForm();
    if (rancher.id !== undefined) {
      this.subscribeToSaveResponse(this.rancherService.update(rancher));
    } else {
      this.subscribeToSaveResponse(this.rancherService.create(rancher));
    }
  }

  private createFromForm(): IRancher {
    return {
      ...new Rancher(),
      id: this.editForm.get(['id']).value,
      userId: this.editForm.get(['userId']).value,
      code: this.editForm.get(['code']).value,
      shortCode: this.editForm.get(['shortCode']).value,
      mark: this.editForm.get(['mark']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRancher>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
