import { FFmpeg } from "@ffmpeg/ffmpeg";

interface generateScreenshotsProps {
  ffmpegRef: React.RefObject<FFmpeg>,
  isFileReady: boolean,
  videoUrl: string,
  setIsGenerating: (arg0: React.SetStateAction<boolean>) => void,
  setScreenshots: (arg0: React.SetStateAction<string[]>) => void,
};

const generateScreenshots = async ({
  ffmpegRef,
  isFileReady,
  videoUrl,
  setIsGenerating,
  setScreenshots
}: generateScreenshotsProps) => {
  if (!isFileReady || !ffmpegRef.current || !videoUrl) {
    return;
  }

  setIsGenerating(true);
  const ffmpeg = ffmpegRef.current;
  const timestamps = ["00:00:01", "00:00:02", "00:00:03"];
  const screenshotUrls: string[] = [];
  const outputFilenames: string[] = [];

  try {
    // Generate screenshots
    await Promise.all(
      timestamps.map(async (ts, index) => {
        const outputFilename = `screenshot_${index + 1}.png`;
        outputFilenames.push(outputFilename);

        await ffmpeg.exec([
          "-ss",
          ts,
          "-i",
          "input.mp4",
          "-vframes",
          "1",
          "-vf",
          "scale=320:-1",
          outputFilename,
        ]);
      })
    );

    await Promise.all(
      outputFilenames.map(async (filename) => {
        const screenshotData = await ffmpeg.readFile(filename);
        const blob = new Blob([screenshotData], { type: "image/png" });
        screenshotUrls.push(URL.createObjectURL(blob));
      })
    );

    setScreenshots(screenshotUrls);
  } catch (error) {
    console.error("Failed to generate screenshots:", error);
  } finally {
    setIsGenerating(false);
  }
};

export default generateScreenshots;
