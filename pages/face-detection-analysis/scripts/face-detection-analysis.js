const video = document.getElementById('video');
const canvas = document.getElementById('overlay');
const context = canvas.getContext('2d');
const infoContainer = document.getElementById('face-info-container');

// GitHub raw URL for models
const MODEL_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';

let analysisResults = [];

// Translation dictionaries
const translations = {
    "en": {
        age: "Age",
        gender: "Gender",
        expression: "Expression",
        genders: { "male": "Male", "female": "Female" },
        expressions: { angry: "Angry", disgusted: "Disgusted", fearful: "Fearful", happy: "Happy", neutral: "Neutral", sad: "Sad", surprised: "Surprised" }
    },
    "pt-BR": {
        age: "Idade",
        gender: "Gênero",
        expression: "Expressão",
        genders: { "male": "Masculino", "female": "Feminino" },
        expressions: { angry: "Bravo", disgusted: "Nojo", fearful: "Medo", happy: "Feliz", neutral: "Neutro", sad: "Triste", surprised: "Surpreso" }
    },
    "ja": {
        age: "年齢",
        gender: "性別",
        expression: "表情",
        genders: { "male": "男性", "female": "女性" },
        expressions: { angry: "怒り", disgusted: "嫌悪", fearful: "恐れ", happy: "幸せ", neutral: "普通", sad: "悲しい", surprised: "驚き" }
    }
};

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
    applyMirror();
    window.addEventListener("resize", resizeCanvas);

    // Run face analysis every 1000 ms
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

        // Get current language dynamically
        const currentLang = document.documentElement.lang || "en";
        const i18n = translations[currentLang] || translations["en"];

        analysisResults.forEach((det, i) => {
            const box = det.detection.box;

            // Draw face box
            context.strokeStyle = "lime";
            context.lineWidth = 2;
            context.strokeRect(box.x, box.y, box.width, box.height);

            // Draw label above box
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
                    <h2>${i + 1}</h2>
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

// Load models and start webcam
loadModels().then(startVideo);
