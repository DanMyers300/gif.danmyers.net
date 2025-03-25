import fetchFile from "./fetchFile";
import createOutputUrl from "./createOutputUrl";
import { FFmpeg } from "@ffmpeg/ffmpeg";

const inputFileUrl = "/input.mp4";

const convert = async (
  ffmpegRef: React.RefObject<FFmpeg>,
  videoUrl: string | null
): Promise<string | null> => {
  if (!videoUrl) {
    console.error("No video URL provided for conversion");
    return null;
  }

  const ffmpeg = ffmpegRef.current;

  const fileData = await fetchFile(inputFileUrl);
  if (!fileData) return null;

  await ffmpeg.writeFile("input.mp4", fileData);

  await ffmpeg.exec(["-i", "input.mp4", "output.gif"]);

  const output = await ffmpeg.readFile("output.gif");

  const outputUrl = await createOutputUrl(output);

  console.log("Conversion Done!");
  return outputUrl;
};

export default convert;
