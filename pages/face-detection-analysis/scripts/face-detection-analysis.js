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
    console.log("Models loaded ✅");
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
    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
        const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withAgeAndGender()
            .withFaceExpressions();

        const resized = faceapi.resizeResults(detections, displaySize);

        context.clearRect(0, 0, canvas.width, canvas.height);
        infoContainer.innerHTML = ""; // Clear previous face cards

        resized.forEach((det, i) => {
            // Draw face box with label
            const box = det.detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, { label: `Face ${i + 1}` });
            drawBox.draw(canvas);

            // Process attributes
            const { age, gender, expressions } = det;
            const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
            const topExpression = sorted[0][0];

            // Create a face info card
            const card = document.createElement('div');
            card.className = "face-box";
            card.innerHTML = `
                <h2>Face ${i+1}</h2>
                <div>
                    <h2>Age</h2>
                    <span>${age.toFixed(0)}</span>
                </div>
                <div>
                    <h2>Gender</h2>
                    <span>${gender}</span>
                </div>
                <div>
                    <h2>Expression</h2>
                    <span>${topExpression}</span>
                </div>
            `;
            infoContainer.appendChild(card);
        });
    }, 500);
});

// Load models and start video
loadModels().then(startVideo);
