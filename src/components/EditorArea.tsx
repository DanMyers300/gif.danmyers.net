import ReactPlayer from "react-player";
import { useCallback, useState } from "react";
import { consumeContext } from "../utils/Context";
import { FaPlay } from "react-icons/fa";

const EditorArea = () => {
  const { videoUrl } = consumeContext();
  const [playing, setPlaying] = useState(false);

  const handlePlayPause = useCallback(() => {
    setPlaying((playing: boolean) => !playing);
  }, []);

  return (
    <div className="flex flex-grow justify-center items-center">
      <div className="bg-[#463a5e] w-19/20 h-19/20 flex justify-center items-center">
        <div className="relative w-full max-w-4xl mb-50">
          <div className="relative pt-[56.25%]">
            {!playing && videoUrl && (
              <div className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none">
                <div 
                  className="pointer-events-auto"
                  onClick={handlePlayPause}
                >
                  <FaPlay size={50} className="cursor-pointer" />
                </div>
              </div>
            )}
            {videoUrl ? (
              <div className="absolute inset-0">
                <ReactPlayer
                  url={videoUrl}
                  playing={playing}
                  onClick={handlePlayPause}
                  width="100%"
                  height="100%"
                  controls={false}
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex justify-center items-center">
                <h1>No video uploaded</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorArea;
