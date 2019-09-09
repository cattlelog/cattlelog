import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRanch } from 'app/shared/model/adminranch/ranch.model';

@Component({
  selector: 'jhi-ranch-detail',
  templateUrl: './ranch-detail.component.html'
})
export class RanchDetailComponent implements OnInit {
  ranch: IRanch;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ranch }) => {
      this.ranch = ranch;
    });
  }

  previousState() {
    window.history.back();
  }
}
