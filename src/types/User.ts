export interface IUser {
  id: string;
  email: string;
  password: string;
  role: number;
  created_at: number | string;
  updated_at: number | string;
  status: number;
}
