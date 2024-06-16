import { FileVideoIcon, MapIcon, VideoIcon } from "lucide-react";

const MODULES = [
  {
    to: "/view",
    title: "Просмотр",
    Icon: VideoIcon,
  },
  {
    to: "/map",
    title: "Карта",
    Icon: MapIcon,
  },
  {
    to: "/hub",
    title: "Файлы",
    Icon: FileVideoIcon,
  },
];

export const appConfig = {
  name: "Sky Wall",
  navLinks: MODULES,
  chunkSize: 10 * 1024 * 1024, // 10 MB
};
