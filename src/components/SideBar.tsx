import { useState } from 'react';
import { LuPanelLeftOpen, LuPanelRightOpen } from 'react-icons/lu';
import { FaCloudUploadAlt } from 'react-icons/fa';

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
          isSidebarOpen ? 'w-[15%]' : 'w-[3%]'
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

        {/* Upload button */}
        <div
          className={`flex flex-col mt-4 items-center ${
            isSidebarOpen ? 'p-4' : 'py-4'
          }`}
        >
          <button
            className={`flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 rounded-md ${
              isSidebarOpen ? 'py-2 px-4 w-full' : 'p-2'
            }`}
          >
            <FaCloudUploadAlt />
            {isSidebarOpen && <div className="ml-2">Upload</div>}
          </button>
        </div>
      </section>
    </>
  );
};

export default SideBar;
