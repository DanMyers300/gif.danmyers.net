const createOutputUrl = async (fileData: Uint8Array): Promise<string> => {
  const gifBlob = new Blob([fileData], { type: "image/gif" });
  const gifUrl = URL.createObjectURL(gifBlob);
  return gifUrl;
};

export default createOutputUrl;
