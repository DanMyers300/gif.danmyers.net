import { useState } from 'react';
import { LuPanelLeftOpen, LuPanelRightOpen } from "react-icons/lu";

const SideBar = () => {
  const [sideBar, toggleSideBar] = useState("open")

  const handleToggleSideBar = () => {
    if (sideBar == "open") {
      toggleSideBar("closed")
    } else {
      toggleSideBar("open")
    }
  };
  return (
    <>
      {/* Side bar */}
      <section
        className="bg-[#2b1e41] flex min-h-screen"
        id="sideBar"
        style={ sideBar === "open" ? { width: '15%'} : {width: '3%'} }
      >
      <div
        className="mt-2 text-white w-fit ml-auto mr-5 h-fit cursor-pointer"
        onClick={handleToggleSideBar}
      >
        { sideBar === "open" ? < LuPanelRightOpen /> : < LuPanelLeftOpen /> }
      </div>
      </section>
    </>
  )
}

export default SideBar;
