import React, { useRef } from "react";

interface TimelineEvent {
  time: number;
  type: "normal" | "threat";
}

interface TimelineProps {
  events: TimelineEvent[];
  currentTime: number;
  duration: number;
  onEventClick: (time: number) => void;
}

export function Timeline({ events, currentTime, duration, onEventClick }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleTimelineClick = (event: React.MouseEvent) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      onEventClick(newTime);
    }
  };

  return (
    <div
      role="presentation"
      ref={timelineRef}
      onClick={handleTimelineClick}
      className="relative my-5 h-8 w-full cursor-pointer bg-muted"
    >
      {events.map((event) => (
        <div
          role="presentation"
          key={event.time}
          onClick={(e) => {
            e.stopPropagation();
            onEventClick(event.time);
          }}
          className={`absolute h-full w-1 ${event.type === "threat" ? "bg-destructive" : "bg-primary"}`}
          style={{ left: `${(event.time / duration) * 100}%` }}
        />
      ))}
      <div
        className="absolute h-full w-1 bg-black"
        style={{ left: `${(currentTime / duration) * 100}%` }}
      />
    </div>
  );
}
