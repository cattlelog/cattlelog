import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRancher } from 'app/shared/model/adminranch/rancher.model';

@Component({
  selector: 'jhi-rancher-detail',
  templateUrl: './rancher-detail.component.html'
})
export class RancherDetailComponent implements OnInit {
  rancher: IRancher;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rancher }) => {
      this.rancher = rancher;
    });
  }

  previousState() {
    window.history.back();
  }
}
