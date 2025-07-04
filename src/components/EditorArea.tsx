import ReactPlayer from "react-player";
import { useCallback, useState } from "react";
import { consumeContext } from "../utils/Context";
import { FaPause } from "react-icons/fa6";

const EditorArea = () => {
  const { videoUrl } = consumeContext();
  const [playing, setPlaying] = useState(false);

  const handlePlayPause = useCallback(() => {
    setPlaying((playing: boolean) => !playing);
  }, []);

  return (
    <div className="flex flex-grow justify-center items-center">
      <div className="bg-[#463a5e] w-19/20 h-19/20 flex justify-center items-center">
        <div className="flex justify-center items-center w-4/5 h-4/5 mb-50">
          {playing || !videoUrl ? null : (
            <div className="absolute">
              {" "}
              <FaPause size={50} onClick={handlePlayPause} />{" "}
            </div>
          )}
          {videoUrl ? (
            <ReactPlayer
              url={videoUrl}
              playing={playing}
              onClick={handlePlayPause}
              width="100%"
              height="100%"
              controls={false}
            />
          ) : (
            <h1> No video uploaded </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorArea;
