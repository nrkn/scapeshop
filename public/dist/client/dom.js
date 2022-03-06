import { ass } from '../lib/util.js';
export const loadImage = (src) => new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
});
export const loadText = async (src) => {
    const res = await fetch(src);
    return res.text();
};
export const loadJson = async (src) => {
    const res = await fetch(src);
    return res.json();
};
export const imageToCanvas = (image) => {
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = ass(canvas.getContext('2d'));
    ctx.drawImage(image, 0, 0);
    return canvas;
};
export const canvasToImageData = (canvas) => {
    const ctx = ass(canvas.getContext('2d'));
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
};
export const fileImage = (file) => new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    const reader = new FileReader();
    reader.onload = e => {
        const dataUrl = ass(e.target).result;
        image.onerror = e => reject(e);
        image.onload = () => resolve(image);
        image.src = dataUrl;
    };
    reader.onerror = e => reject(e);
    reader.readAsDataURL(file);
});
export const fileDataUrl = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
        const dataUrl = ass(e.target).result;
        resolve(dataUrl);
    };
    reader.onerror = e => reject(e);
    reader.readAsDataURL(file);
});
export const inputFile = (inputEl) => {
    if (inputEl.files === null)
        return;
    return inputEl.files[0];
};
export const parseXml = (xml) => new DOMParser().parseFromString(xml, 'application/xml');
//# sourceMappingURL=dom.js.map