import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  onTimeUpdate: (time: number) => void;
  onLoadedMetadata: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
}

export const VideoPlayer = forwardRef<{ seekTo: (time: number) => void }, VideoPlayerProps>(
  ({ videoUrl, onTimeUpdate, onLoadedMetadata }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      seekTo(time: number) {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
        }
      },
    }));

    useEffect(() => {
      const handleTimeUpdate = () => {
        if (videoRef.current) {
          onTimeUpdate(videoRef.current.currentTime);
        }
      };

      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.addEventListener("timeupdate", handleTimeUpdate);
        return () => {
          videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        };
      }
    }, [onTimeUpdate]);

    return (
      <div className="mb-4 w-full">
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          className="w-full"
          onLoadedMetadata={onLoadedMetadata}
        >
          <track kind="captions" src="" default />
        </video>
      </div>
    );
  },
);

VideoPlayer.displayName = "VideoPlayer";
