/* =========================================
   STYLEME JAVASCRIPT
========================================= */


const photoInput = document.getElementById("photoInput");
const uploadButton = document.getElementById("uploadButton");
const cameraButton = document.getElementById("cameraButton");

const cameraContainer = document.getElementById("cameraContainer");
const cameraVideo = document.getElementById("cameraVideo");
const captureButton = document.getElementById("captureButton");
const closeCameraButton = document.getElementById("closeCameraButton");

const userPhoto = document.getElementById("userPhoto");
const hairstyleOverlay = document.getElementById("hairstyleOverlay");
const emptyPreview = document.getElementById("emptyPreview");

const hairX = document.getElementById("hairX");
const hairY = document.getElementById("hairY");
const hairScale = document.getElementById("hairScale");
const hairRotation = document.getElementById("hairRotation");

const resetButton = document.getElementById("resetButton");
const message = document.getElementById("stylemeMessage");

let cameraStream = null;
if (selectedImage) {
    hairstyleOverlay.src = selectedImage;
    hairstyleOverlay.style.display = "block";
}


/* =========================================
   MESSAGE
========================================= */

function showMessage(text) {

    message.textContent = text;
    message.classList.add("show");

    setTimeout(() => {
        message.classList.remove("show");
    }, 3000);
}


/* =========================================
   UPLOAD PHOTO
========================================= */

uploadButton.addEventListener("click", () => {
    photoInput.click();
});


photoInput.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {

        showMessage(
            "Please choose a valid image file."
        );

        photoInput.value = "";
        return;
    }

    const imageURL = URL.createObjectURL(file);

    userPhoto.onload = () => {

        userPhoto.style.display = "block";
        emptyPreview.style.display = "none";

        hairstyleOverlay.style.display = "block";

        URL.revokeObjectURL(imageURL);
    };

    userPhoto.src = imageURL;

});


/* =========================================
   CAMERA
========================================= */

cameraButton.addEventListener("click", async () => {

    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia) {

        showMessage(
            "Camera is not available on this device."
        );

        return;
    }

    try {

        cameraStream =
            await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "user"
                },
                audio: false
            });

        cameraVideo.srcObject = cameraStream;

        cameraContainer.style.display = "block";

    } catch (error) {

        console.error(error);

        showMessage(
            "Camera access was denied. You can upload a photo instead."
        );

    }

});


/* =========================================
   CAPTURE PHOTO
========================================= */

captureButton.addEventListener("click", () => {

    if (!cameraVideo.videoWidth) {
        showMessage("Camera is not ready yet.");
        return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = cameraVideo.videoWidth;
    canvas.height = cameraVideo.videoHeight;

    const context = canvas.getContext("2d");

    /*
       Mirror the captured image so it feels
       natural like a selfie camera.
    */

    context.translate(canvas.width, 0);
    context.scale(-1, 1);

    context.drawImage(
        cameraVideo,
        0,
        0,
        canvas.width,
        canvas.height
    );

    const imageURL = canvas.toDataURL("image/jpeg", 0.9);

    userPhoto.onload = () => {

        userPhoto.style.display = "block";
        emptyPreview.style.display = "none";

        hairstyleOverlay.style.display = "block";
    };

    userPhoto.src = imageURL;

    stopCamera();

});


/* =========================================
   CLOSE CAMERA
========================================= */

closeCameraButton.addEventListener("click", () => {
    stopCamera();
});


function stopCamera() {

    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(track => track.stop());

        cameraStream = null;
    }

    cameraVideo.srcObject = null;
    cameraContainer.style.display = "none";
}


/* =========================================
   HAIRSTYLE CONTROLS
========================================= */

function updateHairstyle() {

    const x = hairX.value;
    const y = hairY.value;
    const scale = hairScale.value;
    const rotation = hairRotation.value;

    hairstyleOverlay.style.transform = `
        translate(calc(-50% + ${x}px), ${y}px)
        scale(${scale})
        rotate(${rotation}deg)
    `;
}


hairX.addEventListener("input", updateHairstyle);
hairY.addEventListener("input", updateHairstyle);
hairScale.addEventListener("input", updateHairstyle);
hairRotation.addEventListener("input", updateHairstyle);


/* =========================================
   RESET
========================================= */

resetButton.addEventListener("click", () => {

    hairX.value = 0;
    hairY.value = 0;
    hairScale.value = 1;
    hairRotation.value = 0;

    updateHairstyle();

});


/* =========================================
   INITIAL STATE
========================================= */

updateHairstyle();