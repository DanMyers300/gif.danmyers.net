import { ContextProvider } from './components/Context';
import Upload from './components/Upload';
import Timeline from './components/Timeline';

function App() {
  return (
    <ContextProvider>
      <div className="
        bg-black h-screen overflow-hidden
        w-screen flex flex-col items-center
        justify-between"
      >
        <Upload />
        <Timeline />
      </div>
    </ContextProvider>
  );
}

export default App;

