import { useCallback, useState, useEffect, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";

import convert from "./utils/convert";
import createFile from "./utils/createFile";
import handleFileChange from "./utils/handleFileChange";

import PreviewPlate from "./components/Preview";
import ConvertButton from "./components/ConvertButton";
import FileInput from "./components/FileInput";
import Timeline from "./components/Timeline";

function App() {
  const ffmpegRef = useRef(new FFmpeg());

  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoFile, setVideoFile] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

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
    if (!videoUrl) return
    createFile(ffmpegRef, videoUrl, setVideoFile);
  }, [videoUrl])

  const runConvert = async () => {
    const url = await convert(ffmpegRef, videoFile);
    setDownloadUrl(url);
  };

  const onFileChange = async (file: File) => {
    await handleFileChange(file, setVideoUrl);
  };

  return (
    <div className="bg-black h-screen overflow-hidden w-screen">
      <div className="flex flex-col justify-center items-center ">
        <FileInput onFileChange={onFileChange}/>
        <div className="flex flex-row justify-center items-center" >
          <ConvertButton runConvert={runConvert} />
          {downloadUrl && (
            <a
              href={downloadUrl}
              download="output.gif"
              className="text-white bg-green-700 hover:bg-green-800
                         focus:ring-4 focus:ring-green-300 font-medium rounded-lg
                         text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700
                         focus:outline-none dark:focus:ring-green-800"
            >
              Download Output GIF
            </a>
          )}
        </div>
        <PreviewPlate
          videoUrl={videoUrl}
        />
        <Timeline />
      </div>
    </div>
  );
}

export default App;
