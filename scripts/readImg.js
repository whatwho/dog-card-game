
const imgPath = "images/kutyas/kepek_jpg/";
const descPath = "images/kutyas/text_jpg/";

export const images = readImgToList(imgPath);
export const descriptions = readImgToList(descPath);

function readImgToList(path) {
    let array = [];
    for (let i = 1; i < 21; i++) {
        let image = new Image();
        image.src = path + i + ".jpg";
        array.push(image);
    }
    return array;
}
