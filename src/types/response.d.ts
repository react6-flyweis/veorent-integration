interface IResponse<T> {
  status: number;
  message: string;
  data: T;
}

interface ILoginResponse {
  token: string;
  id: string;
  otp: string;
  mobileNumber: string;
}
