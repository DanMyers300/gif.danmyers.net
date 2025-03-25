const fetchFile = async (fileUrl: string): Promise<Uint8Array> => {
  const response = await fetch(fileUrl);
  if (!response.ok) {
    console.error("Failed to obtain file from", fileUrl);
    throw new Error("Failed to obtain file");
  }
  const data = new Uint8Array(await response.arrayBuffer());
  return data;
};

export default fetchFile;
