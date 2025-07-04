import { FaCloudDownloadAlt } from "react-icons/fa";
import { consumeContext } from "../utils/Context";

interface DownloadButtonProps {
  isSidebarOpen: boolean;
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ isSidebarOpen }) => {
  const { outputUrl } = consumeContext();

  const handleDownload = () => {
    if (!outputUrl) return;
    
    const link = document.createElement('a');
    link.href = outputUrl;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`flex flex-col items-center ${
        isSidebarOpen ? 'p-4' : 'py-4'
      }`}
    >
      <button
        onClick={handleDownload}
        disabled={!outputUrl}
        className={`flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 rounded-md ${
          isSidebarOpen ? 'py-2 px-4 w-full' : 'p-2'
        } ${!outputUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <FaCloudDownloadAlt />
        {isSidebarOpen && <div className="ml-2">Download</div>}
      </button>
    </div>
  )
};

export default DownloadButton;
