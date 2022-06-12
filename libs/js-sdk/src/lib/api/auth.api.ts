import { fetchJSON, postJSON } from './fetch';
import { API_URL } from '../constants';
import { UserSnapshot } from '../model/user';

export interface LoginForm {
  email: string;
  password: string;
}

export interface ResetPasswordForm {
  token: string;
  password: string;
  rePassword: string;
}

const login = ({ email, password }: LoginForm) => {
  console.log(API_URL);
  return postJSON(`${API_URL}/sign-in`, {
    email,
    password,
  });
};

const forgotPasswordSendMail = (email: string) =>
  postJSON(`${API_URL}/forgot-password/send-mail`, {
    email,
  });

const resetPassword = ({ token, password, rePassword }: ResetPasswordForm) =>
  postJSON(`${API_URL}/forgot-password/reset`, {
    token,
    password,
    rePassword,
  });

const resendEmailActive = (email: string) =>
  fetchJSON(`${API_URL}/resendEmailActive?email=${email}`);

const getInfo = () => fetchJSON(`${API_URL}/information/mobile`);

const selectCompany: (companyId: number) => Promise<LoginResponse> = (
  companyId
) => fetchJSON(`${API_URL}/select-company?id=${companyId}`);

export interface LoginResponse {
  user: UserSnapshot;
  token: string;
}

export const authApi = {
  login,
  getInfo,
  selectCompany,
  resendEmailActive,
  resetPassword,
  forgotPasswordSendMail,
};
