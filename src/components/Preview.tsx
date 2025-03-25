import React, { useState, useCallback, useEffect, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

interface PreviewPlateProps {
  videoUrl: string | null;
}

const PreviewPlate: React.FC<PreviewPlateProps> = ({
  videoUrl,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const animationFrameId = useRef<number>(0);

  const handlePlayPause = useCallback(() => {
    setPlaying((prevPlaying) => !prevPlaying);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const ctx = canvas.getContext("2d");

      const drawFrame = () => {
        if (ctx && video) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
        if (playing) {
          animationFrameId.current = requestAnimationFrame(drawFrame);
        }
      };

      const onVideoReady = () => {
        if (video && canvas) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          drawFrame();
        }
      };

      video.addEventListener("loadeddata", onVideoReady);
      video.addEventListener("loadedmetadata", onVideoReady);

      drawFrame();

      return () => {
        cancelAnimationFrame(animationFrameId.current);
        video.removeEventListener("loadeddata", onVideoReady);
        video.removeEventListener("loadedmetadata", onVideoReady);
      };
    }
  }, [videoUrl, playing]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (playing) {
        video.play();
      } else {
        video.pause();
      }
    }
  }, [playing]);

  return (
    <section className="p-4">
      <div className="flex flex-col items-center mt-5 space-y-4">
        <canvas
          ref={canvasRef}
          id="preview-canvas"
          className="shadow border max-w-1/4 border-bordercolor rounded"
        ></canvas>

        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            style={{
              position: "absolute",
              top: "-9999px",
              left: "-9999px",
            }}
            crossOrigin="anonymous"
            preload="auto"
          />
        )}

        {videoUrl && (
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handlePlayPause}
              className="
                text-white bg-blue-700
                hover:bg-blue-800 focus:ring-4
                focus:ring-blue-300 font-medium
                rounded-lg text-sm px-5 py-2.5
                mb-2 mt-2 dark:bg-blue-600
                dark:hover:bg-blue-700 focus:outline-none
                dark:focus:ring-blue-800"
            >
              {playing ? <FaPause /> : <FaPlay />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PreviewPlate;
