export interface AdminInterface {
  id:number;
  fk_UserId:number;
  fk_ServerId:number;
  authid:string;
  password:string;
  role:string;
  flags:string;
  vencimiento:Date;
  playername:string;
  steam:boolean;
}