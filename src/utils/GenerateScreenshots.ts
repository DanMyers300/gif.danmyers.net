import { FFmpeg } from "@ffmpeg/ffmpeg";

interface GenerateScreenshotsProps {
  inputFile: File | null;
  setIsGenerating: (arg0: React.SetStateAction<boolean>) => void,
  setScreenshots: (arg0: React.SetStateAction<string[]>) => void,
};

const readFileAsArrayBuffer = (file: File | null): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    if (!file) throw new Error("No file input")
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer)
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

const GenerateScreenshots = async ({
  inputFile,
  setIsGenerating,
  setScreenshots
}: GenerateScreenshotsProps) => {
  if (!inputFile) return
  setIsGenerating(true);
  const ffmpeg = new FFmpeg();
  await ffmpeg.load()
  await ffmpeg.writeFile(inputFile.name, new Uint8Array(await readFileAsArrayBuffer(inputFile)));
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
          inputFile.name,
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

export default GenerateScreenshots;
