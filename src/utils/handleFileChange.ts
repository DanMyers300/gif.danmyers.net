async function handleFileChange(
  file: File,
  setVideoUrl: (url: string) => void,
) {
  if (file) {
    setVideoUrl(URL.createObjectURL(file));
  }
}

export default handleFileChange;
