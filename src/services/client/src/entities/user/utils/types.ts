export interface IRawUser {
  id: string;
  email: string;
  access_token?: string | null;
}

export interface IUser {
  id: string;
  email: string;
  accessToken?: string | null;
}

export class UserDTO implements IUser {
  readonly id: string;
  readonly email: string;
  readonly accessToken: string | null;

  constructor({
    id,
    email,
    access_token,
  }: IRawUser) {
    this.id = id;
    this.email = email;
    this.accessToken = access_token ? access_token: null;
  }
}