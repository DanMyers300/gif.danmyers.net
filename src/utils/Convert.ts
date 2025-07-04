import { FFmpeg } from "@ffmpeg/ffmpeg";

const readFileAsArrayBuffer = (file: File | null): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    if (!file) throw new Error("No file input")
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer)
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

const convert = async (file: File) => {
  const ffmpeg = new FFmpeg();

  ffmpeg.on('log', ({message}) => {
    console.log(message);
  });

  await ffmpeg.load();

  await ffmpeg.writeFile(file.name, new Uint8Array(await readFileAsArrayBuffer(file)));

  await ffmpeg.exec([
    "-i", `${file.name}`,
    "-vf", "fps=30,scale=320:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse",
    "-loop", "0",
    "output.gif"
  ]);

  const data = (await ffmpeg.readFile('output.gif') as Uint8Array)
  return new Blob([data.buffer], { type: 'image/gif' });
};

export default convert;
