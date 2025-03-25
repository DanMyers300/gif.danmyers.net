const createOutputUrl = async (fileData) => {
    const gifBlob = new Blob([fileData], { type: "image/gif" });
    const gifUrl = URL.createObjectURL(gifBlob);
    return gifUrl;
};

export default createOutputUrl;
