import { locationSchema } from "@/types";

import { axiosInstance } from "./axios";

export const locationRequests = {
  getLocations: {
    key: ["GET_LOCATIONS"],
    fn: () =>
      axiosInstance
        .get(`/location/location/`)
        .then(({ data }) => locationSchema.array().optional().parse(data)),
  },
};
