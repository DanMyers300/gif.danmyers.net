import { useState, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";

interface TimelineProps {
  ffmpegRef: React.RefObject<FFmpeg>;
  isFileReady: boolean;
}

const Timeline = ({ ffmpegRef, isFileReady }: TimelineProps) => {
  const [screenshot, setScreenshot] = useState<string | undefined>(undefined);
  const ffmpeg = ffmpegRef.current;

  useEffect(() => {
    const generateScreenshot = async () => {
    if (!isFileReady || !ffmpeg) return;

    await ffmpeg.exec([
      "-ss", "00:00:01",
      "-i", "input.mp4",
      "-vframes", "1",
      "screenshot.png",
    ]);

    const screenshotData = await ffmpeg.readFile("screenshot.png");
    const blob = new Blob([screenshotData], { type: "image/png" });
    setScreenshot(URL.createObjectURL(blob));

    };

    generateScreenshot();
  }, [isFileReady, ffmpeg]);

  return (
    <div className="absolute bottom-0 flex flex-col">
      <div className="text-white w-screen text-center"> timeline </div>
      <div className="bg-gray-700 w-screen h-48"> 
        {screenshot && <img src={screenshot} alt="Screenshot" />}
      </div>
    </div>
  );
};

export default Timeline;
