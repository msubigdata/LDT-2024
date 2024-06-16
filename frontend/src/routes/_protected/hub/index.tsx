import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/hub/")({
  component: () => <div>Hello /_protected/hub/!</div>,
});
