import {context} from "./Context"

const FileInput: React.FC = () => {
  const {setFileName,
         isDraggingOver,
         fileName,
         setIsDraggingOver
  } = context();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <div
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-md p-4 m-5 max-w-1/2 text-center ${
        isDraggingOver ? "border-blue-500 bg-blue-100" : "border-gray-400"
      }`}
    >
      {fileName ? (
        <p className="text-green-600 font-semibold">
          Uploaded: {fileName}
        </p>
      ) : (
        <p className="text-gray-600">
          Drag and drop a file here, or click to select a file
        </p>
      )}
      <input
        type="file"
        accept="video/*"
        onChange={handleInputChange}
        className="hidden"
        id="file-input"
      />
      <label
        htmlFor="file-input"
        className="cursor-pointer bg-green-700 text-white px-4 py-2 rounded-lg mt-2 inline-block"
      >
        {fileName ? "Change File" : "Select File"}
      </label>
    </div>
  );
};

export default FileInput;

