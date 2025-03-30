import { useState, useEffect } from "react";
import { useVideoContext } from "./Context";
import generateScreenshots from "../utils/generateScreenshots";

const Timeline = () => {
  const { ffmpegRef, isFileReady, videoUrl, arrowPositions } = useVideoContext();
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

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

  return (
    <div className="absolute bottom-0 flex flex-col w-full">
      <div className="timeline-container flex items-center justify-start bg-gray-700 min-h-40 max-h-40 overflow-x-auto overflow-y-hidden pl-0 w-full relative">
        {/* Left Overlay */}
        <div
          style={{ width: `${arrowPositions.left}%` }}
          className="absolute top-0 left-0 h-full bg-gray-800 opacity-50"
        />
        {/* Right Overlay */}
        <div
          style={{
            width: `${100 - arrowPositions.right}%`,
            left: `${arrowPositions.right}%`,
          }}
          className="absolute top-0 h-full bg-gray-800 opacity-50"
        />
        {isGenerating ? (
          <div className="absolute left-0 right-0 text-center text-gray-400">
            Generating screenshots...
          </div>
        ) : screenshots.length > 0 ? (
          screenshots.map((src, index) => (
            <img
              key={index}
              src={src}
              className="h-full w-auto object-cover flex-none"
              alt={`Screenshot ${index + 1}`}
            />
          ))
        ) : null}
        {/* Vertical lines */}
        <div
          style={{
            left: `calc(${arrowPositions.left}% + 8px)`, // Adjust visual position
          }}
          className="absolute top-0 h-full w-px bg-red-500 transform -translate-x-1/2"
        />
        <div
          style={{
            left: `calc(${arrowPositions.right}% - 8px)`, // Adjust visual position
          }}
          className="absolute top-0 h-full w-px bg-red-500 transform -translate-x-1/2"
        />
      </div>
    </div>
  );
};

export default Timeline;

