import { CloudUploadIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { cn } from "@/utils/cn";

import type { DropzoneOptions } from "react-dropzone";

type FileDropzoneProps = DropzoneOptions & {
  description?: string;
};

export function FileDropzone(options?: FileDropzoneProps) {
  const { description = "Выберите файл", disabled, ...rest } = options ?? {};

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled,
    ...rest,
  });

  return (
    <div
      className={cn(
        "group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-muted p-6 text-sm text-muted-foreground",
        isDragActive && "border-primary",
        disabled && "opacity-50",
      )}
      {...getRootProps()}
    >
      <div className="rounded-md border p-2">
        <CloudUploadIcon className="text-current group-hover:animate-pulse" size={20} />
      </div>
      <input {...getInputProps()} />
      {description}
    </div>
  );
}
