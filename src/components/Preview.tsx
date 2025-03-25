import React, { useEffect, useRef } from "react";

interface PreviewPlateProps {
  handlePlayPause: () => void;
  videoUrl: string | null;
  playing: boolean;
}

const PreviewPlate: React.FC<PreviewPlateProps> = ({
  handlePlayPause,
  videoUrl,
  playing,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    let animationFrameId: number;
  
    if (video && canvas) {
      const ctx = canvas.getContext("2d");
      
      const drawFrame = () => {
        if (ctx && video) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
        // Request the next frame only if playing.
        if (playing) {
          animationFrameId = requestAnimationFrame(drawFrame);
        }
      };
  
      // Start drawing if playing, otherwise draw one frame.
      if (playing) {
        drawFrame();
      } else {
        // If not playing, draw one final frame.
        if (ctx && video) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
      }
  
      // Cleanup function to cancel the animation frame.
      return () => {
        cancelAnimationFrame(animationFrameId);
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
      <div className="flex flex-col items-center space-y-4">
        <canvas
          ref={canvasRef}
          id="preview-canvas"
          className="shadow border border-bordercolor rounded"
          width={640}
          height={360}
        ></canvas>

        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            style={{ display: "none" }}
            crossOrigin="anonymous"
          />
        )}

        {videoUrl && (
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handlePlayPause}
              className="text-white bg-blue-700
              hover:bg-blue-800 focus:ring-4
              focus:ring-blue-300 font-medium
              rounded-lg text-sm px-5 py-2.5
              me-2 mb-2 dark:bg-blue-600
              dark:hover:bg-blue-700 focus:outline-none
              dark:focus:ring-blue-800"
            >
              {playing ? "Pause" : "Play"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PreviewPlate;

