import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRanch, Ranch } from 'app/shared/model/adminranch/ranch.model';
import { RanchService } from './ranch.service';
import { IRancher } from 'app/shared/model/adminranch/rancher.model';
import { RancherService } from 'app/entities/adminranch/rancher';
import { IConsultant } from 'app/shared/model/adminranch/consultant.model';
import { ConsultantService } from 'app/entities/adminranch/consultant';

@Component({
  selector: 'jhi-ranch-update',
  templateUrl: './ranch-update.component.html'
})
export class RanchUpdateComponent implements OnInit {
  isSaving: boolean;

  ranchers: IRancher[];

  consultants: IConsultant[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    location: [],
    rancher: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ranchService: RanchService,
    protected rancherService: RancherService,
    protected consultantService: ConsultantService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ranch }) => {
      this.updateForm(ranch);
    });
    this.rancherService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRancher[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRancher[]>) => response.body)
      )
      .subscribe((res: IRancher[]) => (this.ranchers = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.consultantService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IConsultant[]>) => mayBeOk.ok),
        map((response: HttpResponse<IConsultant[]>) => response.body)
      )
      .subscribe((res: IConsultant[]) => (this.consultants = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(ranch: IRanch) {
    this.editForm.patchValue({
      id: ranch.id,
      name: ranch.name,
      location: ranch.location,
      rancher: ranch.rancher
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ranch = this.createFromForm();
    if (ranch.id !== undefined) {
      this.subscribeToSaveResponse(this.ranchService.update(ranch));
    } else {
      this.subscribeToSaveResponse(this.ranchService.create(ranch));
    }
  }

  private createFromForm(): IRanch {
    return {
      ...new Ranch(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      location: this.editForm.get(['location']).value,
      rancher: this.editForm.get(['rancher']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRanch>>) {
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

  trackRancherById(index: number, item: IRancher) {
    return item.id;
  }

  trackConsultantById(index: number, item: IConsultant) {
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
