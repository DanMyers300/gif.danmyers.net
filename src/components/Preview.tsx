import React, { useCallback, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { useVideoContext } from "../context/VideoContext";

const PreviewPlate: React.FC = () => {
  const { videoUrl } = useVideoContext();
  const [playing, setPlaying] = useState(false);

  const handlePlayPause = useCallback(() => {
    setPlaying((prevPlaying) => !prevPlaying);
  }, []);

  return (
    <section>
      <div className="flex flex-col items-center mt-2">
        {videoUrl && (
          <>
            <video
              src={videoUrl}
              controls={false}
              className="
                shadow border mx-auto
                max-w-screen max-h-72
                lg:max-h-120 md:max-h-100
                border-bordercolor rounded"
              ref={(video) => {
                if (video) {
                  playing ? video.play() : video.pause();
                }
              }}
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

