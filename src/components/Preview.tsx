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
          <>
            <ReactPlayer
              url={videoUrl}
              width="80%"
              ref={playerRef}
              playing={playing}
              playsInline
              onClick={handlePlayPause}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default PreviewPlate;

