import { IRanch } from 'app/shared/model/adminranch/ranch.model';

export interface IConsultant {
  id?: number;
  userId?: number;
  licence?: string;
  ranches?: IRanch[];
}

export class Consultant implements IConsultant {
  constructor(public id?: number, public userId?: number, public licence?: string, public ranches?: IRanch[]) {}
}
