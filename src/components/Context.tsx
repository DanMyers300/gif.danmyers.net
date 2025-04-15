import {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  useEffect,
} from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import updateFileData from "../utils/updateFileData";

interface VideoContextType {
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  videoFile: Uint8Array | null;
  downloadUrl: string | null;
  setDownloadUrl: (url: string | null) => void;
  isFileReady: boolean;
  setIsFileReady: React.Dispatch<React.SetStateAction<boolean>>;
  animationFrameId: React.RefObject<number>;
  ffmpegRef: React.RefObject<FFmpeg>;
  arrowPositions: { left: number; right: number };
  setArrowPositions: React.Dispatch<
    React.SetStateAction<{ left: number; right: number }>
  >;
  videoDuration: number;
  setVideoDuration: (duration: number) => void;
  previewPercent: number;
  setPreviewPercent: (percent: number) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const ffmpegRef = useRef(new FFmpeg());
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoFile, setVideoFile] = useState<Uint8Array | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isFileReady, setIsFileReady] = useState(false);
  const [arrowPositions, setArrowPositions] = useState({ left: 0, right: 100 });
  const [videoDuration, setVideoDuration] = useState(0);
  const [previewPercent, setPreviewPercent] = useState(0);

  const animationFrameId = useRef<number>(0);

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
    updateFileData(videoUrl, ffmpegRef, setVideoFile, setIsFileReady);
  }, [videoUrl]);

  return (
    <VideoContext.Provider
      value={{
        videoUrl,
        setVideoUrl,
        videoFile,
        downloadUrl,
        setDownloadUrl,
        isFileReady,
        setIsFileReady,
        animationFrameId,
        ffmpegRef,
        arrowPositions,
        setArrowPositions,
        videoDuration,
        setVideoDuration,
        previewPercent,
        setPreviewPercent,
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

