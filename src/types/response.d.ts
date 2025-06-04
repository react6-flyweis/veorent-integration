interface IResponse<T> {
  status: number;
  message: string;
  data: T;
}

interface IResponseWithPagination<T> extends IResponse<T> {
  pagination: {
    totalDocs: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

interface ILoginResponse {
  token: string;
  id: string;
  otp: string;
  mobileNumber: string;
}

interface IImageUploadResponse {
  img: string;
  _id: string;
}
