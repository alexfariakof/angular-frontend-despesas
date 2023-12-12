export interface IAuth {
  authenticated : boolean,
  created: string,
  expiration: string
  accessToken: string,
  message: string;
}
