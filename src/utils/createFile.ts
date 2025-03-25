import { FFmpeg } from "@ffmpeg/ffmpeg";
import fetchFile from "./fetchFile";

const createFile = async (
  ffmpegRef: React.RefObject<FFmpeg>,
  videoUrl: string | null,
  onReady: () => void
) => {
  if (!videoUrl) return;

  const ffmpeg = ffmpegRef.current;
  const fileData = await fetchFile(videoUrl);
  if (!fileData) return;

  // Clone the buffer to prevent detachment
  const clonedData = new Uint8Array(fileData.buffer.slice());
  await ffmpeg.writeFile("input.mp4", clonedData);
  onReady(); // Signal that the file is ready in FFmpeg's FS
};

export default createFile;
