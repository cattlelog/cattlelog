import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IConsultant } from 'app/shared/model/adminranch/consultant.model';

type EntityResponseType = HttpResponse<IConsultant>;
type EntityArrayResponseType = HttpResponse<IConsultant[]>;

@Injectable({ providedIn: 'root' })
export class ConsultantService {
  public resourceUrl = SERVER_API_URL + 'services/adminranch/api/consultants';

  constructor(protected http: HttpClient) {}

  create(consultant: IConsultant): Observable<EntityResponseType> {
    return this.http.post<IConsultant>(this.resourceUrl, consultant, { observe: 'response' });
  }

  update(consultant: IConsultant): Observable<EntityResponseType> {
    return this.http.put<IConsultant>(this.resourceUrl, consultant, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConsultant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConsultant[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
