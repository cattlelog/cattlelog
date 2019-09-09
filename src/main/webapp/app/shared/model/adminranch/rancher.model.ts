export interface IRancher {
  id?: number;
  userId?: number;
  code?: string;
  shortCode?: string;
  mark?: string;
}

export class Rancher implements IRancher {
  constructor(public id?: number, public userId?: number, public code?: string, public shortCode?: string, public mark?: string) {}
}
