import fetchFile from './fetchFile';
import createLink from './createLink';
import { FFmpeg } from "@ffmpeg/ffmpeg";

const fileUrl = "../public/input.mp4"

const convert = async (ffmpegRef: React.RefObject<FFmpeg>) => {
  const ffmpeg = ffmpegRef.current;

  await ffmpeg.writeFile('input.mp4',
                         await fetchFile(fileUrl)
                        )

  await ffmpeg.exec(['-i',
                     'input.mp4',
                     'output.gif'
                   ])

  const output = await ffmpeg.readFile('output.gif');

  await createLink(output);
  console.log("Conversion Done!");
}

export default convert;
