export interface IUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  profilePicture?: string;
  phoneNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CustomRequest {
  user: IUser;
  file?: object;
  params: object;
  query: object;
  path: object;
}
