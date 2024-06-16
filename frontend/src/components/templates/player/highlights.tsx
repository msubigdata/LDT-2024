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
    <div className="mt-4 flex flex-wrap gap-4">
      {highlights.map((highlight, index) => (
        <button
          type="button"
          key={index}
          onClick={() => {
            onHighlightClick(highlight.time);
          }}
          className="cursor-pointer"
        >
          <img
            src={highlight.previewUrl}
            alt={highlight.description}
            className="size-32 object-cover"
          />
          <p>{highlight.description}</p>
        </button>
      ))}
    </div>
  );
}
