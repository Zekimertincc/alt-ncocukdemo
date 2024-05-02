const startButton = document.querySelector(".start");
const timerElement = document.querySelector(".timer");
const yazılar = document.querySelectorAll(".grid p");

let currentIndex = 0;
let intervalId;
let timerInterval;

startButton.addEventListener("click", function() {
    oyunLoop();
});

function clearAll() {
    yazılar.forEach(yazı => {
        yazı.style.color = ""; // Rengi temizle
    });
}

function kelimelerSeç() {
    clearAll(); // Önceki vurguları temizle
    yazılar[currentIndex].style.color = "blue"; // Mevcut öğeyi mavi renkle vurgula
    currentIndex = (currentIndex + 1) % yazılar.length; // Bir sonraki öğeye geç
}

function oyunLoop() {
    const duration = 60000; // 1 dakika (60 saniye) milisaniye cinsinden
    const startTime = new Date();

    function animateRound() {
        kelimelerSeç();
    }

    animateRound();

    intervalId = setInterval(animateRound, 900);

    setTimeout(() => {
        clearInterval(intervalId);
        clearInterval(timerInterval);
        timerElement.textContent = "Süre Doldu!";
    }, duration);

    // Timer'ı her 100ms'de bir güncelle
    timerInterval = setInterval(function() {
        const remainingTime = duration - (new Date() - startTime);
        const seconds = Math.ceil(remainingTime / 1000);
        timerElement.textContent = `Kalan Zaman: ${seconds} saniye`;
    }, 100);
}
