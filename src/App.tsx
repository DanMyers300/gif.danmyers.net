import { ContextProvider } from './components/Context'
import Upload from './components/Upload';

function App() {
  return (
    <ContextProvider>
    <div className="bg-black h-screen
      overflow-hidden w-screen flex
      flex-col items-center"
    >
      {/* Upload Area */}
      < Upload />
      {/* Preview Area */}
      {/* Timeline Area */}
    </div>
    </ContextProvider>
  );
}


export default App;
