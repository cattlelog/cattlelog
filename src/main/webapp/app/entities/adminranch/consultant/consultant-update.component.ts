import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IConsultant, Consultant } from 'app/shared/model/adminranch/consultant.model';
import { ConsultantService } from './consultant.service';
import { IRanch } from 'app/shared/model/adminranch/ranch.model';
import { RanchService } from 'app/entities/adminranch/ranch';

@Component({
  selector: 'jhi-consultant-update',
  templateUrl: './consultant-update.component.html'
})
export class ConsultantUpdateComponent implements OnInit {
  isSaving: boolean;

  ranches: IRanch[];

  editForm = this.fb.group({
    id: [],
    userId: [null, [Validators.required]],
    licence: [],
    ranches: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected consultantService: ConsultantService,
    protected ranchService: RanchService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ consultant }) => {
      this.updateForm(consultant);
    });
    this.ranchService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRanch[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRanch[]>) => response.body)
      )
      .subscribe((res: IRanch[]) => (this.ranches = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(consultant: IConsultant) {
    this.editForm.patchValue({
      id: consultant.id,
      userId: consultant.userId,
      licence: consultant.licence,
      ranches: consultant.ranches
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const consultant = this.createFromForm();
    if (consultant.id !== undefined) {
      this.subscribeToSaveResponse(this.consultantService.update(consultant));
    } else {
      this.subscribeToSaveResponse(this.consultantService.create(consultant));
    }
  }

  private createFromForm(): IConsultant {
    return {
      ...new Consultant(),
      id: this.editForm.get(['id']).value,
      userId: this.editForm.get(['userId']).value,
      licence: this.editForm.get(['licence']).value,
      ranches: this.editForm.get(['ranches']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsultant>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackRanchById(index: number, item: IRanch) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
