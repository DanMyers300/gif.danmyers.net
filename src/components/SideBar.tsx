import { useState } from 'react';
import UploadButton from "./UploadButton";
import ConvertButton from "./ConvertButton";
import { consumeContext } from "../utils/Context";
import { LuPanelLeftOpen, LuPanelRightOpen } from 'react-icons/lu';

const SideBar = () => {
  const { fileName } = consumeContext();
  const [sideBar, toggleSideBar] = useState('open');
  const isSidebarOpen = sideBar === 'open';

  const handleToggleSideBar = () => {
    toggleSideBar(sideBar === 'open' ? 'closed' : 'open');
  };

  return (
    <>
      <section
        className={`bg-[#2b1e41] flex flex-col transition-all duration-300 flex-none ${
          isSidebarOpen ? 'w-[200px]' : 'w-[50px]'
        }`}
        id="sideBar"
      >
        {/* Open/Close button */}
        <div
          className={`mt-2 text-white h-fit cursor-pointer ${
            isSidebarOpen ? 'ml-auto mr-5 w-fit' : 'mx-auto w-fit'
          }`}
          onClick={handleToggleSideBar}
        >
          {isSidebarOpen ? <LuPanelRightOpen /> : <LuPanelLeftOpen />}
        </div>

        <UploadButton isSidebarOpen={isSidebarOpen} />
        <ConvertButton isSidebarOpen={isSidebarOpen} />

        {isSidebarOpen && fileName && <div className="border bg-purple-900 truncate px-2">{fileName}</div>}
      </section>
    </>
  );
};

export default SideBar;
