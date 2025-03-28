import { useVideoContext } from "./Context";
import convert from "../utils/convert";

const ConvertButton = () => {
  const { ffmpegRef, videoFile, isFileReady, setDownloadUrl } = useVideoContext();

  const runConvert = async () => {
    if (!isFileReady || !videoFile) {
      console.warn("File is not ready for conversion");
      return;
    }

    try {
      const url = await convert(ffmpegRef);
      setDownloadUrl(url);
    } catch (error) {
      console.error("Conversion failed:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={runConvert}
      disabled={!isFileReady} // Disable button until file is ready
      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
                 mt-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700
                 focus:outline-none dark:focus:ring-blue-800 ${
                   !isFileReady ? "opacity-50 cursor-not-allowed" : ""
                 }`}
    >
      Convert
    </button>
  );
};

export default ConvertButton;

