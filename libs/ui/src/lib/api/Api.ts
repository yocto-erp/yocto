export enum API_STATE {
  PENDING,
  LOADING,
  SUCCESS,
  FAIL,
}

export interface ApiError {
  code: string | number;
  message: string;
  path: string;
}
