import { cameraSchema } from "@/types";

import { axiosInstance } from "./axios";

export const cameraRequests = {
  getCameras: {
    key: ["GET_CAMERAS"],
    fn: () =>
      axiosInstance
        .get(`/location/camera/`)
        .then(({ data }) => cameraSchema.array().optional().parse(data)),
  },
};
