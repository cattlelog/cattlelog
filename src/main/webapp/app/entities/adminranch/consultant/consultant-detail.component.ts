import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsultant } from 'app/shared/model/adminranch/consultant.model';

@Component({
  selector: 'jhi-consultant-detail',
  templateUrl: './consultant-detail.component.html'
})
export class ConsultantDetailComponent implements OnInit {
  consultant: IConsultant;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ consultant }) => {
      this.consultant = consultant;
    });
  }

  previousState() {
    window.history.back();
  }
}
