import React, { useState } from "react";
import { useVideoContext } from "./Context";

const FileInput: React.FC = () => {
  const { setIsFileReady, setVideoUrl } = useVideoContext();
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  // Helper function to process the file and update context
  const processFile = (file: File) => {
    setIsFileReady(false);
    setUploadedFileName(file.name);
    const objectUrl = URL.createObjectURL(file);
    setVideoUrl(objectUrl);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-md p-4 m-5 max-w-5/6 text-center ${
        isDraggingOver ? "border-blue-500 bg-blue-100" : "border-gray-400"
      }`}
    >
      {uploadedFileName ? (
        <p className="text-green-600 font-semibold">
          Uploaded: {uploadedFileName}
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
        {uploadedFileName ? "Change File" : "Select File"}
      </label>
    </div>
  );
};

export default FileInput;
