import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/map/")({
  component: () => <div>Hello /_protected/map/!</div>,
});
