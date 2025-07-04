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
  inputFile: File | null;
  setInputFile: React.Dispatch<React.SetStateAction<File | null>>;
  outputFile: File | null;
  setOutputFile: React.Dispatch<React.SetStateAction<File | null>>;
  outputUrl: string | null;
  setOutputUrl: React.Dispatch<React.SetStateAction<string | null>>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  videoUrl: string;
  setVideoUrl: React.Dispatch<React.SetStateAction<string>>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({children}: {children: ReactNode}) => {
  const [fileName, setFileName] = useState("");
  const [inputFile, setInputFile] = useState<File | null>(null)
  const [outputFile, setOutputFile] = useState<File | null>(null)
  const [outputUrl, setOutputUrl] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Context.Provider
      value={{
        fileName,
        setFileName,
        inputFile,
        setInputFile,
        outputFile,
        setOutputFile,
        outputUrl,
        setOutputUrl,
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
