import { useState, useEffect } from "react";
import { useVideoContext } from "./Context";
import generateScreenshots from "../utils/generateScreenshots";

const Timeline = () => {
  const { ffmpegRef, isFileReady, videoUrl } = useVideoContext();
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
    <div className="absolute bottom-0 flex flex-col w-screen">
      <div className="text-white text-center py-1">Timeline</div>
      <div
        className="timeline-container flex items-center justify-center bg-gray-700 min-h-48 max-h-48 overflow-hidden p-2 -space-x-6"
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

