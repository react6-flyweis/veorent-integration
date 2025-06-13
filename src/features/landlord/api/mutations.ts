import { useMutation } from "@tanstack/react-query";

import { axiosLandlord } from "./axios";

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      axiosLandlord.put<IResponse<IImageUploadResponse[]>>(
        "/upload-id-picture",
        data,
      ),
  });
};
