import { toast } from "sonner";

import { appConfig } from "@/constants/app-config";
import { fileSchema } from "@/types";
import { calculateMD5 } from "@/utils/md5";

import { axiosInstance } from "./axios";

function cutSubstring(url: string) {
  const baseUrl = "http://158.160.61.99/api/";
  const trimmedUrl = url.replace(baseUrl, "");
  return trimmedUrl;
}

export const fileRequests = {
  getFiles: {
    key: ["GET_FILES"],
    fn: () =>
      axiosInstance
        .get(`/location/file/`)
        .then(({ data }) => fileSchema.array().optional().parse(data)),
  },
  uploadFile: {
    key: ["UPLOAD_FILE"],
    fn: async (file?: File) => {
      if (!file) return;
      const toastLoader = toast(`Идет загрузка файла.. 0`);

      let uploadProgress = 0;

      const size = file.size;
      let offset = 0;
      let url = "location/file/upload/";

      while (offset < size) {
        const chunk = file.slice(offset, offset + appConfig.chunkSize);

        const formData = new FormData();
        formData.append("file", chunk, file.name);
        formData.append("filename", file.name);
        formData.append("camera", "1");

        const response = await axiosInstance.put(cutSubstring(url), formData, {
          headers: {
            "Content-Range": `bytes ${offset}-${offset + chunk.size - 1}/${size}`,
          },
        });

        uploadProgress = ((offset + chunk.size) / size) * 100;

        toast.loading(`Идет загрузка файла.. ${Math.ceil(uploadProgress)}%`, {
          id: toastLoader,
        });

        offset = (response.data as { offset: number }).offset;
        url = (response.data as { url: string }).url;
      }

      const md5Hash = await calculateMD5(file);
      const finalizeResponse = await axiosInstance.post(cutSubstring(url), { md5: md5Hash });

      if (finalizeResponse.status === 200) {
        toast.dismiss(toastLoader);

        toast("Файл успешно загружен");
      } else {
        toast.error("Не удалось загрузить файл");
      }
    },
  },
};
