import { FFmpeg } from "@ffmpeg/ffmpeg";
import fetchFile from "./fetchFile";

const createFile = async (
  ffmpegRef: React.RefObject<FFmpeg>,
  videoUrl: string | null,
  setVideoFile: (fileData:string) => void
) => {
  if (!videoUrl) {
    console.error("No video URL provided for conversion");
    return null;
  }

  const ffmpeg = ffmpegRef.current;

  const fileData = await fetchFile(videoUrl);
  if (!fileData) return null;

  await ffmpeg.writeFile("input.mp4", fileData);
  setVideoFile("input.mp4");
}

export default createFile;
