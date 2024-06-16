import { Input } from "@/components/ui/input";

interface LocationSearchProps {
  search: string;
  setSearch: (s: string) => void;
}

export function LocationSearch({ search, setSearch }: LocationSearchProps) {
  return (
    <div className="flex flex-col gap-3">
      <Input
        className="w-full !ring-0 !ring-offset-0"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Найти локацию.."
      />
    </div>
  );
}
