import { useMutation } from "@tanstack/react-query";

import { axiosTenant } from "./axios";

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      axiosTenant.put<IResponse<IImageUploadResponse[]>>(
        "/upload-id-picture",
        data,
      ),
  });
};
