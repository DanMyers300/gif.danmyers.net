import { isMobile } from "react-device-detect";
import SideBar from "./components/SideBar";
import EditorArea from "./components/EditorArea";
import { Provider } from "./utils/Context"

const App = () => {
  return (
    <Provider>
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
    </Provider>
  );
};

export default App;
