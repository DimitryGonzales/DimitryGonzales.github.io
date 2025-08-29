const video = document.getElementById('video');
const canvas = document.getElementById('overlay');
const context = canvas.getContext('2d');
const infoContainer = document.getElementById('face-info-container');

// GitHub raw URL for models
const MODEL_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';

let analysisResults = [];

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

// Keep canvas in sync with video size
function resizeCanvas() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
}

video.addEventListener('play', () => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Run analysis every 750 ms
    setInterval(async () => {
        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withAgeAndGender()
            .withFaceExpressions();

        analysisResults = faceapi.resizeResults(detections, displaySize);
    }, 750);

    // Draw loop every frame
    const drawLoop = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        infoContainer.innerHTML = "";

        analysisResults.forEach((det, i) => {
            const box = det.detection.box;

            // Draw box
            context.strokeStyle = "lime";
            context.lineWidth = 2;
            context.strokeRect(box.x, box.y, box.width, box.height);

            // Draw label above the box
            const label = `Face ${i + 1}`;
            context.fillStyle = "lime";
            context.font = "16px Arial";
            const textWidth = context.measureText(label).width;
            const textHeight = 16;
            const padding = 4;
            context.fillRect(box.x, box.y - textHeight - padding * 2, textWidth + padding * 2, textHeight + padding * 2);
            context.fillStyle = "black";
            context.fillText(label, box.x + padding, box.y - padding);

            // Process attributes
            const { age, gender, expressions } = det;
            const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
            const topExpression = sorted[0][0];

            // Create info card
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

        requestAnimationFrame(drawLoop);
    };

    drawLoop();
});

// Load models and start video
loadModels().then(startVideo);
