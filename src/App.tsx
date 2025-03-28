import { VideoProvider } from "./components/Context";
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
      <div className="flex flex-col h-5/6 justify-start items-center">
        <div className="flex flex-row justify-center items-center" >
          <ConvertButton/>
          <DownloadButton />
        </div>
        <PreviewPlate />
        <Timeline />
      </div>
    </div>
    </VideoProvider>
  );
}


export default App;
