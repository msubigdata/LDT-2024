import { type Dispatch, type SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { type FileType } from "@/types";
import { cn } from "@/utils/cn";

interface CameraFileProps {
  file: FileType;
  selectedFile?: FileType;
  onFileSelect: Dispatch<SetStateAction<FileType | undefined>>;
}
export function CameraFile({ file, selectedFile, onFileSelect }: CameraFileProps) {
  const fileSelected = file.id === selectedFile?.id;
  return (
    <Button
      variant="link"
      className={cn("justify-start text-sm", fileSelected ? "text-primary" : "text-foreground")}
      onClick={() => {
        onFileSelect(file);
      }}
    >
      {file.title}
    </Button>
  );
}
