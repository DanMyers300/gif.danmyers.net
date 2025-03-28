import React, { useCallback, useState, useRef } from "react";
import { useVideoContext } from "./Context";
import ReactPlayer from "react-player";

const PreviewPlate: React.FC = () => {
  const { videoUrl } = useVideoContext();
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  const handlePlayPause = useCallback(() => {
    setPlaying((prevPlaying) => !prevPlaying);
  }, []);

  return (
    <section>
      <div className="flex flex-col items-center mt-2">
        {videoUrl && (
          <div className="w-full aspect-video">
            <ReactPlayer
              url={videoUrl}
              ref={playerRef}
              playing={playing}
              playsInline
              onClick={handlePlayPause}
              width="100%"
              height="100%"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PreviewPlate;
