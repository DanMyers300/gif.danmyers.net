import { useCallback, useState, useEffect, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import convert from "./utils/convert";

import PreviewPlate from "./components/Preview";
import ConvertButton from "./components/ConvertButton";
import FileInput from "./components/FileInput";

function App() {
  // Initialize ffmpeg
  const ffmpegRef = useRef(new FFmpeg());
  // Set the input video URL – ensure this is a valid path (e.g. `/input.mp4` if in public)
  const [videoUrl, setVideoUrl] = useState<string | null>();
  const [playing, setPlaying] = useState(false);

  // Hold the output blob URL from the conversion
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Load FFmpeg once when mounted.
  useEffect(() => {
    const ffmpeg = ffmpegRef.current;
    (async () => {
      await ffmpeg.load();
      // Optional: log ffmpeg logs
      ffmpeg.on("log", ({ message }) => {
        console.log(message);
      });
    })();
  }, []); // add an empty dependency so this only runs once

  const handlePlayPause = useCallback(() => {
    setPlaying((prevPlaying) => !prevPlaying);
  }, []);

  const runConvert = async () => {
    // Convert returns the blob URL instead of auto-downloading.
    const url = await convert(ffmpegRef, videoUrl);
    setDownloadUrl(url);
  };

  async function handleFileChange(
    file: File,
    setVideoUrl: (url: string) => void,
  ) {
    if (file) {
      setVideoUrl(URL.createObjectURL(file));
    }
  }

  const onFileChange = async (file: File) => {
    await handleFileChange(file, setVideoUrl);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-black h-screen w-screen">
      <PreviewPlate
        handlePlayPause={handlePlayPause}
        videoUrl={videoUrl}
        playing={playing}
      />
      <ConvertButton runConvert={runConvert} />
      {downloadUrl && (
        <a
          href={downloadUrl}
          download="output.gif"
          className="mt-4 text-white bg-green-700 hover:bg-green-800
                     focus:ring-4 focus:ring-green-300 font-medium rounded-lg
                     text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700
                     focus:outline-none dark:focus:ring-green-800"
        >
          Download Output GIF
        </a>
      )}
      <FileInput onFileChange={onFileChange}/>
    </div>
  );
}

export default App;
