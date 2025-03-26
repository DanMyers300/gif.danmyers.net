import { FFmpeg } from "@ffmpeg/ffmpeg";

const fetchFile = async (fileUrl: string): Promise<Uint8Array> => {
  const response = await fetch(fileUrl);
  if (!response.ok) {
    console.error("Failed to obtain file from", fileUrl);
    throw new Error("Failed to obtain file");
  }
  return new Uint8Array(await response.arrayBuffer());
};

const createFile = async (
  ffmpegRef: React.RefObject<FFmpeg>,
  videoUrl: string | null,
  onReady: () => void
) => {
  if (!videoUrl) return;

  const ffmpeg = ffmpegRef.current;
  const fileData = await fetchFile(videoUrl);
  if (!fileData) return;

  const rawFileData = new Uint8Array(fileData.buffer.slice());
  await ffmpeg.writeFile("input.mp4", rawFileData);
  onReady();
  return rawFileData;
};

const updateFileData = async (
  videoUrl: string,
  ffmpegRef: React.RefObject<FFmpeg>,
  setVideoFile: (file: Uint8Array | null) => void,
  setIsFileReady: (ready: boolean) => void
) => {
  if (!videoUrl) return;

  ffmpegRef.current.deleteFile("input.mp4")

  const fileData = await createFile(ffmpegRef, videoUrl, () => {
    setIsFileReady(true);
  });

  setVideoFile(fileData || null);
};

export default updateFileData;
