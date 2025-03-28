import { createContext, useContext, useState, useRef, ReactNode, useEffect } from "react"
import { FFmpeg } from "@ffmpeg/ffmpeg";

interface ContextType {
  isDraggingOver,
  setIsDraggingOver,

  fileName,
  setFileName,

  ffmpegRef: React.RefObject<FFmpeg>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const ffmpegRef = useRef(new FFmpeg());

  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    const ffmpeg = ffmpegRef.current;
    (async () => {
      await ffmpeg.load();
      ffmpeg.on("log", ({ message }) => {
        console.log(message);
      });
    })();
    console.log("FFMPEG Loaded");
  }, []);

  return (
    <Context.Provider
      value={{
        ffmpegRef,
        isDraggingOver,
        setIsDraggingOver,
        fileName,
        setFileName,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const context = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("context must be used within a ContextProvider");
  }
  return context;
};
