export interface IConfiguration {
  dataBase: IDataBase;
  authentication: IAuthentication;
  baseUsers: IBaseUsers;
}

interface IDataBase {
  host: string;
  name: string;
}

interface IAuthentication {
  secret: string;
  saltRounds: number;
  passportSecret: string;
}

interface IBaseUsers {
  [key: string]: IBaseUser;
}

interface IBaseUser {
  userName: string;
  defaultPassword: string;
}
