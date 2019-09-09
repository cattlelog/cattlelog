import { IRancher } from 'app/shared/model/adminranch/rancher.model';
import { IConsultant } from 'app/shared/model/adminranch/consultant.model';

export interface IRanch {
  id?: number;
  name?: string;
  location?: string;
  rancher?: IRancher;
  consultants?: IConsultant[];
}

export class Ranch implements IRanch {
  constructor(
    public id?: number,
    public name?: string,
    public location?: string,
    public rancher?: IRancher,
    public consultants?: IConsultant[]
  ) {}
}
