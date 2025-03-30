import { FFmpeg } from "@ffmpeg/ffmpeg";

const createOutputUrl = async (fileData: Uint8Array): Promise<string> => {
  const gifBlob = new Blob([fileData], { type: "image/gif" });
  return URL.createObjectURL(gifBlob);
};

const getVideoDuration = async (ffmpeg: FFmpeg): Promise<number> => {
  try {
    // Method 1: Try using ffprobe if available
    try {
      await ffmpeg.exec([
        "-i", "input.mp4",
        "-hide_banner",
        "-print_format", "json",
        "-show_format",
        "-loglevel", "error",
        "duration.json"
      ]);
      
      const durationFile = await ffmpeg.readFile("duration.json");
      const durationData = JSON.parse(new TextDecoder().decode(durationFile));
      if (durationData?.format?.duration) {
        return parseFloat(durationData.format.duration);
      }
    } catch (e) {
      console.log("FFprobe method failed, trying alternative approach");
    }

    // Method 2: Fallback to parsing console output
    let duration = 0;
    const originalLog = console.log;
    
    console.log = (message: string) => {
      originalLog(message);
      const durationMatch = message.match(/Duration: (\d{2}):(\d{2}):(\d{2}\.\d+)/);
      if (durationMatch) {
        const hours = parseFloat(durationMatch[1]);
        const minutes = parseFloat(durationMatch[2]);
        const seconds = parseFloat(durationMatch[3]);
        duration = hours * 3600 + minutes * 60 + seconds;
      }
    };

    await ffmpeg.exec([
      "-i", "input.mp4",
      "-f", "null", "-",
      "-hide_banner",
      "-loglevel", "info"
    ]);

    console.log = originalLog;

    if (duration <= 0) {
      throw new Error("Duration not found in FFmpeg output");
    }

    return duration;
  } catch (error) {
    throw new Error(`Failed to get video duration: ${error.message}`);
  }
};

const convert = async (
  ffmpegRef: React.RefObject<FFmpeg>,
  arrowPositions: { left: number; right: number }
) => {
  const ffmpeg = ffmpegRef.current;
  if (!ffmpeg) {
    throw new Error("FFmpeg instance not available");
  }

  // Get the video duration
  const videoDuration = await getVideoDuration(ffmpeg);
  const startTime = (arrowPositions.left / 100) * videoDuration;
  const endTime = (arrowPositions.right / 100) * videoDuration;
  const duration = endTime - startTime;

  // Trim and convert to GIF
  await ffmpeg.exec([
    "-i", "input.mp4",
    "-ss", startTime.toString(),
    "-t", duration.toString(),
    "-vf", "fps=15,scale=320:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse",
    "-loop", "0",
    "output.gif"
  ]);

  const output = await ffmpeg.readFile("output.gif");
  return createOutputUrl(output as Uint8Array);
};

export default convert;

