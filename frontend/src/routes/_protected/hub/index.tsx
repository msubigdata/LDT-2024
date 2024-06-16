/* eslint-disable camelcase -- ignore cases */

import { createFileRoute, Link } from "@tanstack/react-router";
import { FileImageIcon, VideoIcon } from "lucide-react";

import { useCams } from "@/hooks/camera";
import { useFiles } from "@/hooks/file";
import { type FileType } from "@/types";
import { formatDateTime } from "@/utils/format-date";

export const Route = createFileRoute("/_protected/hub/")({
  component: () => <HubComponent />,
});

function HubComponent() {
  const { filesList } = useFiles();

  return (
    <div className="grid flex-1 grid-cols-4 gap-3 py-4">
      {filesList?.map((f) => <FileComponent key={f.id} file={f} />)}
    </div>
  );
}

interface FileComponentProps {
  file: FileType;
}
function FileComponent({ file }: FileComponentProps) {
  const { title, camera, created_date } = file;
  const { camsList } = useCams();

  const cameraTitle = camsList?.find((c) => c.id === camera)?.title;

  return (
    <Link
      to="/hub/$file"
      params={{
        file: file.id.toString(),
      }}
      className="relative flex h-64 flex-col justify-end gap-4 rounded-md bg-secondary p-4 text-card-foreground"
    >
      <div className="flex size-full items-center justify-center rounded-md bg-border text-muted-foreground">
        {file.content === "photo" ? <FileImageIcon /> : <VideoIcon />}
      </div>

      <div className="z-10 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="max-w-[200px] truncate text-sm">{title}</div>
          <div className="truncate text-sm">{cameraTitle}</div>
        </div>
        <span className="text-xs">Добавлено: {formatDateTime(created_date)}</span>
      </div>
    </Link>
  );
}
