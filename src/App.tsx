import { useEffect, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import convert from './utils/convert';
import ConvertButton from './components/convertButton';

function App() {
  const ffmpegRef = useRef(new FFmpeg());

  useEffect(() => {
    let ffmpeg = ffmpegRef.current;
    ffmpeg.load()
      ffmpeg.on('log', ({ message }) => {
      console.log(message);
    });
  });

  const runConvert = () => {
    convert(ffmpegRef);
  };

  return (
    <>
      <div className="">
      <ConvertButton runConvert={runConvert} />
      </div>
    </>
  )
}

export default App
