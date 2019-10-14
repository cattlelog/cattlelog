export interface IRanchWithAccess {
  id?: number;
  name?: string;
  status?: string;
  consultantUserId?: number;
  consultantName?: string;
}

export class Ranch implements IRanchWithAccess {
  constructor(public id?: number, public name?: string, public status?: string, public consultantUserId?: number) {}
}
