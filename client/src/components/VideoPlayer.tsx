import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  stream?: MediaStream;
  muted?: boolean;
  className?: string;
  mirror?: boolean;
}

export const VideoPlayer = ({
  stream,
  muted = true,
  className = "",
  mirror,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <video
      data-testid="peer-video"
      className={`h-full w-full object-cover ${mirror ? "-scale-x-100" : ""} ${className}`}
      ref={videoRef}
      autoPlay
      playsInline
      muted={muted}
    />
  );
};
