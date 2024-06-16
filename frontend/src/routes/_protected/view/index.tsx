import { useMemo, useState } from "react";

import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

import { CameraFile } from "@/components/templates/camera-file";
import { LocationSearch } from "@/components/templates/location-search";
import { Player } from "@/components/templates/player";
import { Collapsible } from "@/components/ui/collapsible";
import { useCams } from "@/hooks/camera";
import { useFiles } from "@/hooks/file";
import { useLocations } from "@/hooks/location";
import { type FileType, type LocationType } from "@/types";
import { cn } from "@/utils/cn";
import { getHighlightedText } from "@/utils/highlighting";
import { plural } from "@/utils/plural";

import type { Dispatch, SetStateAction } from "react";

export const Route = createFileRoute("/_protected/view/")({
  component: () => <ViewComponent />,
});

function ViewComponent() {
  const [search, setSearch] = useState("");

  const { locationList } = useLocations();
  const { camsList } = useCams();
  const { filesList } = useFiles();

  const [selectedLocation, setSelectedLocation] = useState<number>();
  const [selectedFile, setSelectedFile] = useState<FileType>();

  const selectedCamera = useMemo(
    () => camsList?.find((c) => c.location === selectedLocation),
    [camsList, selectedLocation],
  );

  const files = useMemo(
    () => filesList?.filter((f) => f.camera === selectedCamera?.id),
    [filesList, selectedCamera?.id],
  );

  const filteredLocationList = locationList?.filter((loc) =>
    loc.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex h-full gap-4 overflow-hidden">
      <div className="flex w-72 flex-col gap-3 border-r py-4 pr-4">
        <LocationSearch search={search} setSearch={setSearch} />

        <div className="flex flex-col gap-1 overflow-y-auto">
          {filteredLocationList?.map((loc) => (
            <Location
              location={loc}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              key={loc.id}
              files={files}
              camsCount={camsList?.filter((c) => c.location === loc.id).length ?? 0}
              search={search}
              selectedFile={selectedFile}
              onFileSelect={setSelectedFile}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center overflow-y-auto py-4">
        {selectedFile ? <Player /> : <div>Выберите файл для просмотра</div>}
      </div>
    </div>
  );
}

interface LocationProps {
  search: string;
  location: LocationType;
  selectedLocation?: number;
  setSelectedLocation: (id?: number) => void;
  files?: FileType[];
  camsCount: number;
  selectedFile?: FileType;
  onFileSelect: Dispatch<SetStateAction<FileType | undefined>>;
}

function Location({
  search,
  location,
  selectedLocation,
  setSelectedLocation,
  files,
  camsCount,
  onFileSelect,
  selectedFile,
}: LocationProps) {
  const { id, title } = location;

  const isOpen = selectedLocation === id;

  return (
    <Collapsible open={isOpen}>
      <Collapsible.Trigger
        className={cn(
          "flex w-full flex-col gap-1 rounded-md bg-muted p-4",
          isOpen ? "text-foreground" : "text-muted-foreground",
        )}
        onClick={() => {
          if (isOpen) {
            setSelectedLocation(undefined);
          } else {
            setSelectedLocation(id);
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
          {camsCount} {plural(camsCount, ["камера", "камеры", "камер"])}
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className="flex flex-col pt-1">
        {files?.map((f) => (
          <CameraFile onFileSelect={onFileSelect} selectedFile={selectedFile} file={f} key={f.id} />
        ))}
      </Collapsible.Content>
    </Collapsible>
  );
}
