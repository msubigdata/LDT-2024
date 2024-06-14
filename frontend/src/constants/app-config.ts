import { FilmIcon, MapIcon, VideoIcon } from "lucide-react";

const MODULES = [
  {
    to: "/view",
    title: "Просмотр",
    Icon: VideoIcon,
  },
  {
    to: "/hub",
    title: "Файлы",
    Icon: FilmIcon,
  },
  {
    to: "/map",
    title: "Карта",
    Icon: MapIcon,
  },
];

export const appConfig = {
  name: "Sky Wall",
  navLinks: MODULES,
};
