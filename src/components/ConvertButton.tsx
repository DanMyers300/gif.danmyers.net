import { SiConvertio } from "react-icons/si";
import { consumeContext } from "../utils/Context";
import convert from "../utils/Convert";

interface ConvertButtonProps {
  isSidebarOpen: boolean;
};

const ConvertButton: React.FC<ConvertButtonProps> = ({ isSidebarOpen }) => {
  const { inputFile, setOutputUrl } = consumeContext();

  const handleConvert = async () => {
    if (!inputFile) throw new Error("no file input");
    setOutputUrl(await convert(inputFile));
  };

  return (
    <div
      className={`flex flex-col items-center ${
        isSidebarOpen ? 'p-4' : 'py-4'
      }`}
    >
      <button
        className={`flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 rounded-md ${
          isSidebarOpen ? 'py-2 px-4 w-full' : 'p-2'
        } ${!inputFile ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleConvert}
      >
        < SiConvertio />
        {isSidebarOpen && <div className="ml-2">Convert</div>}
      </button>
    </div>
  )
};

export default ConvertButton;
