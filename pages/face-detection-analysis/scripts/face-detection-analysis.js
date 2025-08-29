const video = document.getElementById('video');
const canvas = document.getElementById('overlay');
const context = canvas.getContext('2d');
const infoContainer = document.getElementById('face-info-container');

// GitHub raw URL for models
const MODEL_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';

async function loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    console.log("Models loaded");
}

async function startVideo() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        console.error("Error accessing camera:", err);
    }
}

video.addEventListener('play', () => {
    function resizeCanvas() {
        // Match canvas resolution to video resolution
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    }

    resizeCanvas();

    setInterval(async () => {
        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvas, displaySize);

        const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withAgeAndGender()
            .withFaceExpressions();

        const resized = faceapi.resizeResults(detections, displaySize);

        context.clearRect(0, 0, canvas.width, canvas.height);
        infoContainer.innerHTML = "";

        resized.forEach((det, i) => {
            // Draw face box
            const box = det.detection.box;
            new faceapi.draw.DrawBox(box, { label: `Face ${i + 1}` }).draw(canvas);

            // Extract attributes
            const { age, gender, expressions } = det;
            const topExpression = Object.entries(expressions).sort((a, b) => b[1] - a[1])[0][0];

            // Create card
            const card = document.createElement('div');
            card.className = "face-about";
            card.innerHTML = `
                <div class="face-about-title">
                    <i class="fa-solid fa-user"></i>
                    <h2>Face ${i + 1}</h2>
                </div>

                <div class="face-about-info-container">
                    <div class="face-about-info">
                        <h2>Age</h2>
                        <span>${age.toFixed(0)}</span>
                    </div>
                    <div class="face-about-info">
                        <h2>Gender</h2>
                        <span>${gender}</span>
                    </div>
                    <div class="face-about-info">
                        <h2>Expression</h2>
                        <span>${topExpression}</span>
                    </div>
                </div>
            `;
            infoContainer.appendChild(card);
        });
    }, 500);
});

// Load models and start video
loadModels().then(startVideo);
