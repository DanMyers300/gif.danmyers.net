import { isMobile } from "react-device-detect";
import SideBar from "./components/SideBar";
import EditorArea from "./components/EditorArea";

const App = () => {
  return (
    <>
      {isMobile ? (
        <div className="bg-[#322943] min-h-screen min-w-screen flex items-center justify-center text-white text-2xl p-4 text-center">
          <h1>Not Supported on Mobile</h1>
        </div>
      ) : (
        <main className="bg-[#322943] min-h-screen min-w-screen flex">
          <SideBar />
          <EditorArea />
        </main>
      )}

    </>
  );
};

export default App;
