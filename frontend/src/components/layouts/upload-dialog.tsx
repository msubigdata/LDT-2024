import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Dropzone } from "../modules/drop-zone";
import { Dialog } from "../ui/dialog";

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
}

export function UploadDialog({ open, onClose }: UploadDialogProps) {
  const [files, setFiles] = useState<string[]>([]);

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <Dialog.Content className="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>Загрузить видео</Dialog.Title>
          <Dialog.Description>Загрузите видео</Dialog.Description>
        </Dialog.Header>

        <div className="grid gap-4 py-4">
          <Dropzone onChange={setFiles} className="w-full" fileExtension="png" />
        </div>

        {files.map((el) => (
          <div key={el}>{el}</div>
        ))}
        <Dialog.Footer>
          <Button type="submit">Загрузить</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
