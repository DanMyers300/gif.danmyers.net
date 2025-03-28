import { createContext, useContext, useState, useRef, ReactNode, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import updateFileData from "../utils/updateFileData";

interface VideoContextType {
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  videoFile: Uint8Array | null;
  downloadUrl: string | null;
  setDownloadUrl: (url: string | null) => void;
  isFileReady: boolean;
  setIsFileReady: (arg0: React.SetStateAction<boolean>) => void;
  animationFrameId: React.RefObject<number>;
  ffmpegRef: React.RefObject<FFmpeg>;
  arrowPositions,
  setArrowPositions
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const ffmpegRef = useRef(new FFmpeg());
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoFile, setVideoFile] = useState<Uint8Array | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isFileReady, setIsFileReady] = useState(false);
  const animationFrameId = useRef<number>(0);
  const [arrowPositions, setArrowPositions] = useState({ left: 25, right: 75 });

  useEffect(() => {
    const ffmpeg = ffmpegRef.current;
    (async () => {
      await ffmpeg.load();
      ffmpeg.on("log", ({ message }) => {
        console.log(message);
      });
    })();
  }, []);

  useEffect(() => {
    updateFileData(
      videoUrl,
      ffmpegRef,
      setVideoFile,
      setIsFileReady
    );
  }, [videoUrl]);

  return (
    <VideoContext.Provider
      value={{
        videoUrl,
        setVideoUrl,
        videoFile,
        downloadUrl,
        setDownloadUrl,
        setIsFileReady,
        isFileReady,
        animationFrameId,
        ffmpegRef,
        arrowPositions,
        setArrowPositions
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};

