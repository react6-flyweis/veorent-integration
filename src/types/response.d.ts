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

interface IPaginatedResponse<T> {
  status: number;
  message: string;
  data: {
    docs: T[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
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
