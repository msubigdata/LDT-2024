import { ArrayBuffer as SparkArrayBuffer } from "spark-md5";

import { appConfig } from "@/constants/app-config";

const CHUNK_SIZE = appConfig.chunkSize;

export const calculateMD5 = async (f: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const chunks = Math.ceil(f.size / CHUNK_SIZE);
    const spark = new SparkArrayBuffer();
    const fileReader = new FileReader();

    let currentChunk = 0;

    fileReader.onload = (e) => {
      spark.append(e.target?.result as ArrayBuffer);
      currentChunk++;

      if (currentChunk < chunks) {
        loadNext();
      } else {
        resolve(spark.end());
      }
    };

    fileReader.onerror = () => {
      reject(new Error("MD5 calculation failed"));
    };

    function loadNext() {
      const start = currentChunk * CHUNK_SIZE;
      const end = start + CHUNK_SIZE >= f.size ? f.size : start + CHUNK_SIZE;
      fileReader.readAsArrayBuffer(f.slice(start, end));
    }

    loadNext();
  });
};
