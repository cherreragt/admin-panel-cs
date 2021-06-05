export interface ServerInterface {
  nameServer:string;
  ipServer:string;
  id:number;
  fk_user:number;
}

export class ServerModel {
  constructor(
    public nameServer:string,
    public ipServer:string,
    public id?:number,
    public fk_user?:number,
  ) { }
}