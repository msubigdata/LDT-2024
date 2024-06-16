import React, { useEffect, useRef, useState } from "react";

import preview1 from "@/assets/preview-1.png";
import preview2 from "@/assets/preview-2.png";
import testVideo from "@/assets/test.mp4";
import { PageLoader } from "@/components/modules/page-loader";

import { VideoHighlights } from "./highlights";
import { Timeline } from "./timeline";
import { VideoPlayer } from "./video-player";

interface Highlight {
  time: number;
  previewUrl: string;
  description: string;
  type: "normal" | "threat";
}

interface VideoData {
  id: string;
  url: string;
  title: string;
  description: string;
  highlights: Highlight[];
}

export function Player() {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const videoPlayerRef = useRef<{ seekTo: (time: number) => void }>(null);

  useEffect(() => {
    const testVideoData: VideoData = {
      id: "1",
      url: testVideo,
      title: "Название видео",
      description: "Дата и время загрузки",
      highlights: [
        {
          time: 1.5,
          previewUrl: preview1,
          description: "Дрон коптерного типа",
          type: "threat",
        },
        {
          time: 10.25,
          previewUrl: preview2,
          description: "Дрон коптерного типа",
          type: "threat",
        },
      ],
    };

    setVideoData(testVideoData);
    setLoading(false);
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleHighlightClick = (time: number) => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(time);
    }

    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEventClick = (time: number) => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(time);
    }
  };

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleLoadedMetadata = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const videoElement = event.currentTarget;
    setDuration(videoElement.duration);
  };

  if (loading) {
    return <PageLoader>Загрузка видео</PageLoader>;
  }

  return (
    <div className="size-full flex-1 pb-10 pt-3" ref={containerRef}>
      {videoData ? (
        <>
          {/* <h1 className="text-2xl font-bold">{videoData.title}</h1>
          <p className="mb-4">{videoData.description}</p> */}
          <VideoPlayer
            ref={videoPlayerRef}
            videoUrl={videoData.url}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
          <Timeline
            events={videoData.highlights.map(({ time, type, previewUrl, description }) => ({
              time,
              type,
              previewUrl,
              description,
            }))}
            currentTime={currentTime}
            duration={duration}
            onEventClick={handleEventClick}
          />
          <VideoHighlights
            highlights={videoData.highlights}
            onHighlightClick={handleHighlightClick}
          />
        </>
      ) : (
        <div>No video data available</div>
      )}
    </div>
  );
}
