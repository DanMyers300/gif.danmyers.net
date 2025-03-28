import { VideoProvider } from "./context/VideoContext";
import PreviewPlate from "./components/Preview";
import ConvertButton from "./components/ConvertButton";
import DownloadButton from "./components/DownloadButton"
import FileInput from "./components/FileInput";
import Timeline from "./components/Timeline";

function App() {
  return (
    <VideoProvider>
      <div className="
        bg-black h-screen overflow-hidden
        w-screen flex flex-col items-center"
      >
      <FileInput/>
      <ConvertButton/>
      <DownloadButton />
      <PreviewPlate />
      <Timeline />
      </div>
    </VideoProvider>
  );
}


export default App;
