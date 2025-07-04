import { useState } from 'react';
import UploadButton from "./UploadButton";
import { LuPanelLeftOpen, LuPanelRightOpen } from 'react-icons/lu';

const SideBar = () => {
  const [sideBar, toggleSideBar] = useState('open');

  const handleToggleSideBar = () => {
    toggleSideBar(sideBar === 'open' ? 'closed' : 'open');
  };

  const isSidebarOpen = sideBar === 'open';

  return (
    <>
      <section
        className={`bg-[#2b1e41] flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarOpen ? 'w-[15%]' : 'w-[5%]'
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

        < UploadButton isSidebarOpen={isSidebarOpen} />

      </section>
    </>
  );
};

export default SideBar;
