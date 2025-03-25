import createOutputUrl from './createOutputUrl';

const createLink = async (outputUrl) => {
    const link = document.createElement("a");
    link.href = await createOutputUrl(outputUrl);
    link.download = "output.gif";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export default createLink;
