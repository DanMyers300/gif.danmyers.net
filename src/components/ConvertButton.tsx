import { useState } from "react";
import { useVideoContext } from "./Context";
import convert from "../utils/convert";

const ConvertButton = () => {
  const {
    ffmpegRef,
    arrowPositions,
    videoFile,
    isFileReady,
    setDownloadUrl,
  } = useVideoContext();

  const [loading, setLoading] = useState(false); // State to track loading status

  const runConvert = async () => {
    if (!isFileReady || !videoFile) {
      console.warn("File is not ready for conversion");
      return;
    }

    setLoading(true); // Start loading
    try {
      const url = await convert(ffmpegRef, arrowPositions);
      setDownloadUrl(url);
    } catch (error) {
      console.error("Conversion failed:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <button
      type="button"
      onClick={runConvert}
      disabled={!isFileReady || loading} // Disable button while loading
      className={`flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
                 mt-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700
                 focus:outline-none dark:focus:ring-blue-800 ${
                   !isFileReady || loading ? "opacity-50 cursor-not-allowed" : ""
                 }`}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      ) : (
        "Convert"
      )}
    </button>
  );
};

export default ConvertButton;

