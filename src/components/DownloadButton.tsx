import { useVideoContext } from "./Context";

const DownloadButton = () => {
  const { downloadUrl } = useVideoContext();
  return (
    downloadUrl && (
      <a
        href={downloadUrl}
        download="output.gif"
        className="text-white bg-green-700 hover:bg-green-800
                   focus:ring-4 focus:ring-green-300 font-medium rounded-lg
                   text-sm px-5 ml-2 py-2.5 dark:bg-green-600 dark:hover:bg-green-700
                   focus:outline-none dark:focus:ring-green-800"
      >
        Download GIF
      </a>
    )
  );
};

export default DownloadButton;
