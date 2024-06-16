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
const convertToTimeFormat = (totalMinutes: number) => {
  const totalSeconds = totalMinutes * 60;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const paddedHours = String(hours).padStart(2, "0");
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};

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
          <p>{convertToTimeFormat(highlight.time)}</p>
        </button>
      ))}
    </div>
  );
}
