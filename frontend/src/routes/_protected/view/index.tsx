import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/view/")({
  component: () => <div>Hello /_protected/view/!</div>,
});
