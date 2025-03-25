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

    if (video && canvas) {
      const ctx = canvas.getContext("2d");

      const drawFrame = () => {
        if (ctx && video) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
        requestAnimationFrame(drawFrame);
      };

      drawFrame();
    }
  }, [videoUrl]);

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
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors"
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

