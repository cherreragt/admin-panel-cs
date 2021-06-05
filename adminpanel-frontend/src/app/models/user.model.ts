export interface UserInterface {
  id:number;
  user:string;
  role:string;
  password?:string;
}

export class UserModel {
  constructor(
    public id:number,
    public user:string,
    public role:string,
    public password?:string
  ) {

  }
}

