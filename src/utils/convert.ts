import createOutputUrl from "./createOutputUrl";
import { FFmpeg } from "@ffmpeg/ffmpeg";

const convert = async (
  ffmpegRef: React.RefObject<FFmpeg>,
  videoFile
): Promise<string | null> => {

  const ffmpeg = ffmpegRef.current;

  await ffmpeg.exec(["-i", videoFile, "output.gif"]);

  const output = await ffmpeg.readFile("output.gif");

  const outputUrl = await createOutputUrl(output);

  console.log("Conversion Done!");
  return outputUrl;
};

export default convert;
