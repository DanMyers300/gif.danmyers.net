import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { useVideoContext } from "../context/VideoContext";

const PreviewPlate: React.FC = () => {
  const { videoUrl, animationFrameId } = useVideoContext();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const iosCheck = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iosCheck);
  }, []);

  const handlePlayPause = useCallback(() => {
    setPlaying((prevPlaying) => !prevPlaying);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
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

    drawFrame();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      video.removeEventListener("loadeddata", onVideoReady);
    };
  }, [videoUrl, playing, animationFrameId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (playing) {
      video.play().catch((e) => console.error("Playback failed:", e));
    } else {
      video.pause();
    }
  }, [playing]);

  return (
    <section>
      {isIOS ? (
        <h1 className="text-center text-red-500 mt-4">
          Preview not supported on iOS
        </h1>
      ) : (
        <div className="flex flex-col items-center mt-2">
          <canvas
            ref={canvasRef}
            id="preview-canvas"
            className="
              shadow border mx-auto
              max-w-screen max-h-72
              lg:max-h-120 md:max-h-100
              border-bordercolor rounded"
          />

          {videoUrl && (
            <>
              <video
                ref={videoRef}
                src={videoUrl}
                style={{
                  position: "absolute",
                  bottom: "0px",
                  width: "1px",
                  height: "1px",
                }}
                crossOrigin="anonymous"
                preload="auto"
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
      )}
    </section>
  );
};

export default PreviewPlate;

