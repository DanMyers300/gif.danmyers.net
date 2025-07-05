import ReactPlayer from "react-player";
import { useCallback, useState } from "react";
import { consumeContext } from "../utils/Context";
import Timeline from "./Timeline";
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
        <div className="relative w-full h-full">
          <div className="relative h-[calc(100%-3rem)]">
            <div className="relative pt-[56.25%] mt-5 h-[80%]">
              {videoUrl ? (
                <div className="absolute inset-0 flex max-h-[80%] justify-center items-center">
                  <ReactPlayer
                    url={videoUrl}
                    playing={playing}
                    onClick={handlePlayPause}
                    width="100%"
                    height="100%"
                    controls={false}
                    style={{ position: 'relative' }}
                  />
                  {!playing && (
                    <div 
                      className="absolute inset-0 flex justify-center items-center z-10 cursor-pointer"
                      onClick={handlePlayPause}
                    >
                      <FaPlay size={50} style={{ color: "white" }} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="absolute inset-0 flex justify-center items-center">
                  <h1>No video uploaded</h1>
                </div>
              )}
            </div>
          </div>
          <Timeline />
        </div>
      </div>
    </div>
  );
};

export default EditorArea;
