import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRancher } from 'app/shared/model/adminranch/rancher.model';

type EntityResponseType = HttpResponse<IRancher>;
type EntityArrayResponseType = HttpResponse<IRancher[]>;

@Injectable({ providedIn: 'root' })
export class RancherService {
  public resourceUrl = SERVER_API_URL + 'services/adminranch/api/ranchers';

  constructor(protected http: HttpClient) {}

  create(rancher: IRancher): Observable<EntityResponseType> {
    return this.http.post<IRancher>(this.resourceUrl, rancher, { observe: 'response' });
  }

  update(rancher: IRancher): Observable<EntityResponseType> {
    return this.http.put<IRancher>(this.resourceUrl, rancher, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRancher>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRancher[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
