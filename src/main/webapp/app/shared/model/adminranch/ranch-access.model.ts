export interface IRanchAccess {
  ranchId: number;
  consultantId: number;
}

export class RanchAccess implements IRanchAccess {
  constructor(public ranchId: number, public consultantId: number) {}
}
