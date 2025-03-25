const fetchFile = async (fileUrl: string) => {
  const response = await fetch(fileUrl);
  if (!response.ok) {
    console.error("failed to obtain file");
    return "";
  }

  const data = new Uint8Array(await response.arrayBuffer());
  return data
}

export default fetchFile;
