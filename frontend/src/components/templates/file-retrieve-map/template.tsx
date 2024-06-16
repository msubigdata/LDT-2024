import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";

import { Player } from "../player";
import { fileQueryOptions } from "./query-options";

const routeApi = getRouteApi("/_protected/map/$file");

export function FileRetrieveMapTemplate() {
  const fileId = routeApi.useParams().file;
  const { data: file } = useSuspenseQuery(fileQueryOptions(fileId));

  return (
    <div className="space-y-2 py-4">
      <h4 className="text-xl font-bold">{file.title}</h4>

      <Player />
    </div>
  );
}
