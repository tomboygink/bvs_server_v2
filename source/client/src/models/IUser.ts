export interface IRoles {
  roles: IRoles_id;
}
export interface IRoles_id {
  0: number;
  1: number;
}

interface cmd {}
export interface data {
  act_mail: boolean;
  deleted: boolean;
  deleted_date: string;
  email: string;
  family: string;
  father: string;
  id: string;
  info: string;
  job_title_id: string;
  login: string;
  mail_code: string;
  name: string;
  org_id: string;
  password: string;
  re_password_code: string;
  roles_ids: IRoles;
  telephone: number;
  isLoading: boolean;
}

export interface IUser {
  cmd: string;
  code: string;
  data: data;
  error: string;
}
