import React, { useCallback, useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
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
              controls={false}
              className="
                shadow border mx-auto
                max-w-screen max-h-72
                lg:max-h-120 md:max-h-100
                border-bordercolor rounded"
              ref={playerRef}
              playing={playing}
              playsInline
            />

            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={handlePlayPause}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                         focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
                         mb-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
                         dark:focus:ring-blue-800"
                disabled={!videoUrl}
              >
                {playing ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PreviewPlate;

