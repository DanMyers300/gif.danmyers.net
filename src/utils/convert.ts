import { FFmpeg } from "@ffmpeg/ffmpeg";

const createOutputUrl = async (fileData: Uint8Array): Promise<string> => {
  const gifBlob = new Blob([fileData], { type: "image/gif" });
  const gifUrl = URL.createObjectURL(gifBlob);
  return gifUrl;
};

const convert = async (
  ffmpegRef: React.RefObject<FFmpeg>,
) => {

  const ffmpeg = ffmpegRef.current;

  await ffmpeg.exec(["-i", "input.mp4", "output.gif"]);

  const output = await ffmpeg.readFile("output.gif");

  const outputUrl = await createOutputUrl(output);

  console.log("Conversion Done!");
  return outputUrl;
};

export default convert;
