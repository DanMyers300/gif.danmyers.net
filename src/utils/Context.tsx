import type { ReactNode } from 'react';
import {
  createContext,
  useRef,
  useState,
  useContext
} from "react";

interface ContextType {
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  videoUrl: string;
  setVideoUrl: React.Dispatch<React.SetStateAction<string>>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({children}: {children: ReactNode}) => {
  const [fileName, setFileName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Context.Provider
      value={{
        fileName,
        setFileName,
        fileInputRef,
        videoUrl,
        setVideoUrl,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const consumeContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw Error("useContext must be used within a Provider")
  };
  return context;
};
