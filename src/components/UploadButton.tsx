import { FaCloudUploadAlt } from 'react-icons/fa';
import { consumeContext } from '../utils/Context';

interface UploadButtonProps {
  isSidebarOpen: boolean;
}

const UploadButton: React.FC<UploadButtonProps> = ({ isSidebarOpen }) => {
  const {setFileName, fileInputRef, fileName, videoUrl, setVideoUrl} = consumeContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
      setVideoUrl(URL.createObjectURL(event.target.files?.[0]));
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`flex flex-col mt-4 items-center ${
        isSidebarOpen ? 'p-4' : 'py-4'
      }`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        className={`flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 rounded-md ${
          isSidebarOpen ? 'py-2 px-4 w-full' : 'p-2'
        }`}
        onClick={handleButtonClick}
      >
        <FaCloudUploadAlt />
        {isSidebarOpen && <div className="ml-2">Upload</div>}
      </button>
      <div> {fileName} </div>
    </div>
  );
}

export default UploadButton;
