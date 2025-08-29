video.addEventListener('play', () => {
    function resizeCanvas() {
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
            const box = det.detection.box;
            new faceapi.draw.DrawBox(box, { label: `Face ${i + 1}` }).draw(canvas);

            const { age, gender, expressions } = det;
            const topExpression = Object.entries(expressions).sort((a, b) => b[1] - a[1])[0][0];

            const card = document.createElement('div');
            card.className = "face-about";
            card.innerHTML = `
                <div class="face-about-title">
                    <i class="fa-solid fa-user"></i>
                    <h2>Face ${i+1}</h2>
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
