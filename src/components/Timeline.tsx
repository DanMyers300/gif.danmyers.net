import { useState, useEffect } from "react";
import { useVideoContext } from "../context/VideoContext";
import generateScreenshots from "../utils/generateScreenshots";
import { FaArrowDown } from "react-icons/fa";

const Timeline = () => {
  const { ffmpegRef, isFileReady, videoUrl } = useVideoContext();
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [arrowPositions, setArrowPositions] = useState<{ left: number; right: number }>({
    left: 25,
    right: 75,
  });

  useEffect(() => {
    generateScreenshots({
      ffmpegRef,
      isFileReady,
      videoUrl,
      setIsGenerating,
      setScreenshots,
    });

    return () => {
      screenshots.forEach((url) => URL.revokeObjectURL(url));
      setScreenshots([]);
    };
  }, [isFileReady, videoUrl, ffmpegRef]);

  const handleArrowDrag = (arrow: "left" | "right", clientX: number) => {
    const timeline = document.querySelector(".timeline-container");
    if (!timeline) return;

    const timelineRect = timeline.getBoundingClientRect();
    const newPosition = ((clientX - timelineRect.left) / timelineRect.width) * 100;

    setArrowPositions((prev) => ({
      ...prev,
      [arrow]: Math.max(0, Math.min(100, newPosition)),
    }));
  };

  return (
    <div className="absolute bottom-0 flex flex-col w-screen">
      <div className="text-white text-center py-1">Timeline</div>
      <div className="text-white">
        <FaArrowDown
          style={{ left: `${arrowPositions.left}%` }}
          className="absolute cursor-pointer transform -translate-x-1/2"
          onMouseDown={() => {
            const onMouseMove = (e: MouseEvent) => handleArrowDrag("left", e.clientX);
            const onMouseUp = () => {
              window.removeEventListener("mousemove", onMouseMove);
              window.removeEventListener("mouseup", onMouseUp);
            };
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
          }}
        />
        <FaArrowDown
          style={{ left: `${arrowPositions.right}%` }}
          className="absolute cursor-pointer transform -translate-x-1/2"
          onMouseDown={() => {
            const onMouseMove = (e: MouseEvent) => handleArrowDrag("right", e.clientX);
            const onMouseUp = () => {
              window.removeEventListener("mousemove", onMouseMove);
              window.removeEventListener("mouseup", onMouseUp);
            };
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
          }}
        />
      </div>
      <div
        className="timeline-container flex items-center justify-center bg-gray-700 h-48 overflow-hidden p-2 -space-x-6"
      >
        {isGenerating ? (
          <div className="text-gray-400">Generating screenshots...</div>
        ) : screenshots.length > 0 ? (
          screenshots.map((src, index) => (
            <img
              key={index}
              src={src}
              className="max-h-40 h-full object-contain flex-shrink-0"
              alt={`Screenshot ${index + 1}`}
            />
          ))
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Timeline;

