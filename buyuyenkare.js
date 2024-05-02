const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const timerElement = document.querySelector(".timer");
let timerInterval;

function drawRectangle(x, y) {
    ctx.beginPath();
    ctx.rect(centerX - x / 2, centerY - y / 2, x,x); // Dikdörtgenin merkezini hesapla
    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas'ı temizle
}

const startButton = document.querySelector('.start');
startButton.addEventListener('click', function() {
    GameLoop();
});

function GameLoop() {
    const duration = 60000; // 1 dakika (60 saniye) milisaniye cinsinden
    const startTime = new Date();

    function animateRound() {
        for (let i = 1; i <= 6; i++) {
            setTimeout(() => {
                drawRectangle(50 * i, 50 * i); // Her seferinde yeni bir dikdörtgen çiz
            }, i * 1000); // Her dikdörtgen arasında 1 saniye gecikme
        }
    }

    function startAnimation() {
        animateRound();
        setTimeout(() => {
            clearCanvas(); // Tüm dikdörtgenler çizildikten sonra canvas'ı temizle
            setTimeout(startAnimation, 1000); // Bir sonraki animasyona başlamadan önce 1 saniye bekle
        }, 7000); // Tüm dikdörtgenlerin çizilmesinden 1 saniye sonra temizle
    }

    startAnimation();

    setTimeout(() => {
        clearInterval(timerInterval);
        timerElement.textContent = "Süre Doldu!";
        clearCanvas(); // Süre dolduğunda canvas'ı temizle
    }, duration);

    timerInterval = setInterval(function() {
        const remainingTime = duration - (new Date() - startTime);
        const seconds = Math.ceil(remainingTime / 1000);
        timerElement.textContent = `Kalan Zaman: ${seconds} saniye`;
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
        }
    }, 100);
}
