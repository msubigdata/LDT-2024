interface Highlight {
  time: number;
  previewUrl: string;
  description: string;
  type: "normal" | "threat";
}

interface VideoHighlightsProps {
  highlights: Highlight[];
  onHighlightClick: (time: number) => void;
}

export function VideoHighlights({ highlights, onHighlightClick }: VideoHighlightsProps) {
  return (
    <div className="mt-4 grid grid-cols-4 gap-4 pb-10">
      {highlights.map((highlight) => (
        <button
          type="button"
          key={highlight.time}
          onClick={() => {
            onHighlightClick(highlight.time);
          }}
          className="cursor-pointer"
        >
          <img
            src={highlight.previewUrl}
            alt={highlight.description}
            className="h-32 w-full rounded-md object-cover"
          />
          <p>{highlight.time}</p>
        </button>
      ))}
    </div>
  );
}
