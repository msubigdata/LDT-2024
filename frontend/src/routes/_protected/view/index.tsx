import { useMemo, useState } from "react";

import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

import { Player } from "@/components/templates/player";
import { Button } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { useCams } from "@/hooks/camera";
import { useFiles } from "@/hooks/file";
import { useLocations } from "@/hooks/location";
import { type FileType, type LocationType } from "@/types";
import { cn } from "@/utils/cn";
import { getHighlightedText } from "@/utils/highlighning";
import { plural } from "@/utils/plural";

export const Route = createFileRoute("/_protected/view/")({
  component: () => <ViewComponent />,
});

function ViewComponent() {
  const [search, setSearch] = useState("");

  const { locationList } = useLocations();
  const { camsList } = useCams();
  const { filesList } = useFiles();

  const [selectedLocation, setSelectedLocation] = useState<number>();

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
    <div className="flex h-full gap-6">
      <div className="flex w-72 flex-col gap-3 border-r py-4 pr-4">
        <LocationSearch search={search} setSearch={setSearch} />

        <div className="flex flex-col gap-1">
          {filteredLocationList?.map((loc) => (
            <Location
              location={loc}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              key={loc.id}
              files={files}
              camsCount={camsList?.filter((c) => c.location === loc.id).length ?? 0}
              search={search}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        {/* Выберите файл для просмотра */}
        <Player />
      </div>
    </div>
  );
}

interface LocationProps {
  location: LocationType;
  selectedLocation?: number;
  setSelectedLocation: (id?: number) => void;
  files?: FileType[];
  camsCount: number;
  search: string;
}

function Location({
  location,
  selectedLocation,
  setSelectedLocation,
  files,
  camsCount,
  search,
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
          <span>{getHighlightedText(title, search)}</span>
          <ChevronDown
            size="1rem"
            className={cn("transition-transform", isOpen ? "rotate-180" : "")}
          />
        </div>

        <div className="text-xs">
          {camsCount} {plural(camsCount, ["камера", "камеры", "камер"])}
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className="flex flex-col gap-3 pt-1">
        {files?.map((f) => <LocationFile file={f} key={f.id} />)}
      </Collapsible.Content>
    </Collapsible>
  );
}

interface LocationSearchProps {
  search: string;
  setSearch: (s: string) => void;
}

function LocationSearch({ search, setSearch }: LocationSearchProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* <div>Локации</div> */}
      <Input
        className="w-full"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Найти локацию.."
      />
    </div>
  );
}

interface LocationFileProps {
  file: FileType;
}
function LocationFile({ file }: LocationFileProps) {
  return (
    <Button variant="link" className="justify-start text-sm">
      {file.title}
    </Button>
  );
}
