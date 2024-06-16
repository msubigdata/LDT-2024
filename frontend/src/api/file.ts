import { fileSchema } from "@/types";

import { axiosInstance } from "./axios";

export const fileRequests = {
  getFiles: {
    key: ["GET_FILES"],
    fn: () =>
      axiosInstance
        .get(`/api/location/file/`)
        .then(({ data }) => fileSchema.array().optional().parse(data)),
  },
};
