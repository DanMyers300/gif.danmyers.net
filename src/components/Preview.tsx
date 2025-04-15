import React, { useCallback, useState, useRef, useEffect } from "react";
import { useVideoContext } from "./Context";
import ReactPlayer from "react-player";

const PreviewPlate: React.FC = () => {
  const {
    videoUrl,
    videoDuration,
    setVideoDuration,
    previewPercent,
  } = useVideoContext();
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  const handlePlayPause = useCallback(() => {
    setPlaying((prevPlaying) => !prevPlaying);
  }, []);

  useEffect(() => {
    if (playerRef.current && videoDuration > 0) {
      const seekTo = (previewPercent / 100) * videoDuration;
      playerRef.current.seekTo(seekTo, "seconds");
    }
  }, [previewPercent, videoDuration]);

  return (
    <section>
      <div className="flex flex-col items-center mt-2">
        {videoUrl && (
          <div className="w-full max-h-150 aspect-video">
            <ReactPlayer
              url={videoUrl}
              ref={playerRef}
              playing={playing}
              playsInline
              onClick={handlePlayPause}
              width="100%"
              height="100%"
              onDuration={setVideoDuration}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PreviewPlate;
