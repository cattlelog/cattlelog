import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRanch } from 'app/shared/model/adminranch/ranch.model';
import { IRanchWithAccess } from 'app/shared/model/adminranch/ranch-with-access.model';
import { IRanchAccess } from 'app/shared/model/adminranch/ranch-access.model';

type EntityResponseType = HttpResponse<IRanch>;
type EntityArrayResponseType = HttpResponse<IRanch[]>;

@Injectable({ providedIn: 'root' })
export class RanchService {
  public resourceUrl = SERVER_API_URL + 'services/adminranch/api/ranches';

  constructor(protected http: HttpClient) {}

  create(ranch: IRanch): Observable<EntityResponseType> {
    return this.http.post<IRanch>(this.resourceUrl, ranch, { observe: 'response' });
  }

  update(ranch: IRanch): Observable<EntityResponseType> {
    return this.http.put<IRanch>(this.resourceUrl, ranch, { observe: 'response' });
  }

  requestAccess(ranchAccess: IRanchAccess): Observable<EntityResponseType> {
    return this.http.post<IRanchAccess>(`${this.resourceUrl}/access/request`, ranchAccess, { observe: 'response' });
  }

  grantAccess(grantAccess: IRanchAccess): Observable<EntityResponseType> {
    return this.http.post<IRanchAccess>(`${this.resourceUrl}/access/grant`, grantAccess, { observe: 'response' });
  }

  removeAccess(ranchId: number, consultantId: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/access/${ranchId}/${consultantId}`, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRanch>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllByRancherId(id: number): Observable<EntityResponseType> {
    return this.http.get<IRanch[]>(`${this.resourceUrl}/rancher/${id}`, { observe: 'response' });
  }

  findAllByUserId(id: number): Observable<EntityResponseType> {
    return this.http.get<IRanch[]>(`${this.resourceUrl}/user/${id}`, { observe: 'response' });
  }

  findAllForConsultantWithAccess(): Observable<EntityResponseType> {
    return this.http.get<IRanchWithAccess[]>(`${this.resourceUrl}/access`, { observe: 'response' });
  }

  findAllForConsultantWithAccessByRanchName(ranchName: string): Observable<EntityResponseType> {
    return this.http.get<IRanchWithAccess[]>(`${this.resourceUrl}/access/ranch/${ranchName}`, { observe: 'response' });
  }

  findAllForRancherWithAccessByUserId(id: number): Observable<EntityResponseType> {
    return this.http.get<IRanchWithAccess[]>(`${this.resourceUrl}/access/rancher/user/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRanch[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
