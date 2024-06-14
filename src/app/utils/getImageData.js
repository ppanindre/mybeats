const getImageData = async (imageUri) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const file = new File([blob], "image.jpg", { type: "image/jpeg" });

    return file;
};

export default getImageData;
