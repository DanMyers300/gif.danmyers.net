import SideBar from "./components/SideBar";
import EditorArea from "./components/EditorArea";

const App = () => {

  return (
    <>
      <main className="bg-[#322943] min-h-screen min-w-screen flex">

        < SideBar />
        < EditorArea />

      </main>
    </>
  )
}

export default App
