import { cn } from "./cn";

export function getHighlightedText(text: string, highlight: string) {
  // Split on highlight term and include term into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, i) => (
        <span
          // eslint-disable-next-line react/no-array-index-key -- ignore
          key={i}
          className={cn(part.toLowerCase() === highlight.toLowerCase() && "text-primary")}
        >
          {part}
        </span>
      ))}{" "}
    </span>
  );
}
