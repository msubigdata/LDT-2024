import { useMemo, useState } from "react";

import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

import { LocationSearch } from "@/components/templates/location-search";
import { Map } from "@/components/templates/map";
import { buttonVariants } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import { useCams } from "@/hooks/camera";
import { useFiles } from "@/hooks/file";
import { type Camera, type FileType } from "@/types";
import { cn } from "@/utils/cn";
import { getHighlightedText } from "@/utils/highlighting";
import { plural } from "@/utils/plural";

export const Route = createFileRoute("/_protected/map/")({
  component: () => <MapRouteComponent />,
});

function MapRouteComponent() {
  const [search, setSearch] = useState("");
  const [selectedCamera, setSelectedCamera] = useState<number>();

  const { camsList, isFetching: camsFetching } = useCams();
  const { filesList } = useFiles();

  const selectedFiles = useMemo(
    () => filesList?.filter((el) => el.camera === selectedCamera),
    [filesList, selectedCamera],
  );

  const filteredCamsList = camsList?.filter((loc) =>
    loc.title.toLowerCase().includes(search.toLowerCase()),
  );

  const activeCamera = useMemo(
    () => camsList?.find((cam) => cam.id === selectedCamera),
    [camsList, selectedCamera],
  );

  return (
    <div className={cn("relative flex size-full overflow-hidden")}>
      <div className="flex w-72 flex-col gap-3 border-r py-4 pr-4">
        <LocationSearch search={search} setSearch={setSearch} />
        <div className="flex flex-col gap-1 overflow-y-auto">
          {filteredCamsList?.map((cam) => (
            <CameraListElement
              key={cam.id}
              cam={cam}
              filesCount={filesList?.filter((f) => f.camera === cam.id).length ?? 0}
              search={search}
              selectedCamera={selectedCamera}
              setSelectedCamera={setSelectedCamera}
              files={selectedFiles}
            />
          ))}
        </div>
      </div>
      <div className="relative size-full flex-1">
        <div className={cn("absolute z-20 h-[calc(100%+50px)] w-full")}>
          <Map
            isLoading={camsFetching}
            cams={camsList}
            aim={
              activeCamera
                ? [Number(activeCamera.latitude), Number(activeCamera.longitude)]
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}

interface CameraListElementProps {
  search: string;
  cam: Camera;
  selectedCamera?: number;
  setSelectedCamera: (id?: number) => void;
  files?: FileType[];
  filesCount: number;
}
function CameraListElement({
  search,
  cam,
  selectedCamera,
  setSelectedCamera,
  files,
  filesCount,
}: CameraListElementProps) {
  const { id, title } = cam;

  const isOpen = selectedCamera === id;

  return (
    <Collapsible open={isOpen}>
      <Collapsible.Trigger
        className={cn(
          "flex w-full flex-col gap-1 rounded-md bg-muted p-4",
          isOpen ? "text-foreground" : "text-muted-foreground",
        )}
        onClick={() => {
          if (isOpen) {
            setSelectedCamera(undefined);
          } else {
            setSelectedCamera(id);
          }
        }}
      >
        <div className="flex w-full items-center justify-between text-sm">
          <span>{search ? getHighlightedText(title, search) : title}</span>
          <ChevronDown
            size="1rem"
            className={cn("transition-transform", isOpen ? "rotate-180" : "")}
          />
        </div>

        <div className="text-xs">
          {filesCount} {plural(filesCount, ["файл", "файла", "файлов"])}
        </div>
      </Collapsible.Trigger>

      <Collapsible.Content className="flex flex-col gap-3 pt-1">
        {files?.map((f) => (
          <Link
            className={cn(
              buttonVariants({ variant: "link" }),
              "justify-start text-sm text-foreground",
            )}
            key={f.id}
          >
            {f.title}
          </Link>
        ))}
      </Collapsible.Content>
    </Collapsible>
  );
}
