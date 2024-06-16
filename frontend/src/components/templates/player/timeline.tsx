import React, { useRef } from "react";

import { Tooltip } from "@/components/ui/tooltip";

interface TimelineEvent {
  time: number;
  type: "normal" | "threat";
  previewUrl: string;
  description: string;
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
      <Tooltip.Provider>
        {events.map((event) => (
          <Tooltip key={event.time} delayDuration={1}>
            <Tooltip.Trigger asChild>
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
            </Tooltip.Trigger>
            <Tooltip.Content
              className="flex items-start gap-2 p-2"
              onClick={(e) => {
                e.stopPropagation();
                onEventClick(event.time);
              }}
            >
              <img
                src={event.previewUrl}
                alt={event.time.toString()}
                className="size-24 rounded-md object-cover"
              />
              <div className="p-3 text-sm">{event.description}</div>
            </Tooltip.Content>
          </Tooltip>
        ))}
      </Tooltip.Provider>

      <div
        className="absolute h-full w-1 bg-black"
        style={{ left: `${(currentTime / duration) * 100}%` }}
      />
    </div>
  );
}
