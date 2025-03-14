const uploadImage = document.getElementById("uploadImage");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");
const blur = document.getElementById("blur");
const grayscale = document.getElementById("grayscale");
const downloadBtn = document.getElementById("downloadBtn");

let img = new Image();
const MAX_WIDTH = 400; // Set max width for the canvas
const MAX_HEIGHT = 300; // Set max height for the canvas

uploadImage.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

img.onload = function () {
    let imgWidth = img.width;
    let imgHeight = img.height;

    // Scale image to fit within MAX_WIDTH and MAX_HEIGHT while maintaining aspect ratio
    if (imgWidth > MAX_WIDTH || imgHeight > MAX_HEIGHT) {
        const scaleFactor = Math.min(MAX_WIDTH / imgWidth, MAX_HEIGHT / imgHeight);
        imgWidth *= scaleFactor;
        imgHeight *= scaleFactor;
    }

    canvas.width = imgWidth;
    canvas.height = imgHeight;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

function applyFilters() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = `
        brightness(${brightness.value}%)
        contrast(${contrast.value}%)
        blur(${blur.value}px)
        grayscale(${grayscale.value}%)
    `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

brightness.addEventListener("input", applyFilters);
contrast.addEventListener("input", applyFilters);
blur.addEventListener("input", applyFilters);
grayscale.addEventListener("input", applyFilters);

downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});
