const video = document.getElementById('video');
const canvas = document.getElementById('overlay');
const context = canvas.getContext('2d');
const infoContainer = document.getElementById('face-info-container');

// GitHub raw URL for models
const MODEL_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';

// Translation dictionary
const translations = {
    "en": {
        age: "Age",
        gender: "Gender",
        face: "Face",
        expression: "Expression",
        genders: { male: "Male", female: "Female" },
        expressions: {
            neutral: "Neutral",
            happy: "Happy",
            sad: "Sad",
            angry: "Angry",
            fearful: "Fearful",
            disgusted: "Disgusted",
            surprised: "Surprised"
        }
    },
    "pt": {
        age: "Idade",
        gender: "Gênero",
        face: "Rosto",
        expression: "Expressão",
        genders: { male: "Masculino", female: "Feminino" },
        expressions: {
            neutral: "Neutro",
            happy: "Feliz",
            sad: "Triste",
            angry: "Bravo",
            fearful: "Medo",
            disgusted: "Nojo",
            surprised: "Surpreso"
        }
    },
    "ja": {
        age: "年齢",
        gender: "性別",
        face: "顔",
        expression: "表情",
        genders: { male: "男性", female: "女性" },
        expressions: {
            neutral: "ニュートラル",
            happy: "嬉しい",
            sad: "悲しい",
            angry: "怒っている",
            fearful: "恐怖",
            disgusted: "嫌悪",
            surprised: "驚き"
        }
    }
};

// Detect document language (default English if not found)
const userLang = document.documentElement.lang || "en";
const i18n = translations[userLang] || translations["en"];

let analysisResults = [];

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

// Keep canvas in sync with video size
function resizeCanvas() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
}

video.addEventListener('play', () => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Run analysis every 1000 ms
    setInterval(async () => {
        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withAgeAndGender()
            .withFaceExpressions();

        analysisResults = faceapi.resizeResults(detections, displaySize);
    }, 1000);

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
            const label = `${i + 1}`;
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
            const topExpressionKey = sorted[0][0];
            const topExpressionTranslated = i18n.expressions[topExpressionKey] || topExpressionKey;
            const genderTranslated = i18n.genders[gender] || gender;

            // Create info card
            const card = document.createElement('div');
            card.className = "face-about";
            card.innerHTML = `
                <div class="face-about-title">
                    <i class="fa-solid fa-user"></i>
                    <h2>${i18n.face} ${i + 1}</h2>
                </div>

                <div class="face-about-info-container">
                    <div class="face-about-info">
                        <h2>${i18n.age}</h2>
                        <span>${age.toFixed(0)}</span>
                    </div>

                    <div class="face-about-info">
                        <h2>${i18n.gender}</h2>
                        <span>${genderTranslated}</span>
                    </div>

                    <div class="face-about-info">
                        <h2>${i18n.expression}</h2>
                        <span>${topExpressionTranslated}</span>
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
