import ReactPlayer from "react-player";

const EditorArea = () => {
  return (
    <div className="flex flex-grow justify-center items-center">
      <div className="bg-[#463a5e] w-19/20 h-19/20 flex justify-center items-center">
        <div className="flex justify-center items-center w-2/3 h-2/3 mb-50">
          <ReactPlayer
            url="https://youtu.be/9PldqVePztM"
            width="100%"
            height="100%"
            controls={true}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorArea;
