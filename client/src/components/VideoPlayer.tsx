import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  stream?: MediaStream;
}

export const VideoPlayer = ({ stream }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <video
      data-testid="peer-video"
      style={{ width: "100%" }}
      ref={videoRef}
      autoPlay
      muted={true}
    />
  );
}

