// Declare audio objects
let countdownMusic = new Audio('https://ilearncoding1.github.io/specialbirthday/ninjago.mp3');
countdownMusic.loop = true; // Keep playing until countdown reaches 0

let birthdaySound = new Audio('https://ilearncoding1.github.io/specialbirthday/Devin.mp3');

let isPlaying = false; // Prevents multiple birthday sound plays

// ✅ Hidden silent video trick (forces browsers to allow autoplay)
let silentVideo = document.createElement("video");
silentVideo.src = "https://www.w3schools.com/html/mov_bbb.mp4"; // Any silent video
silentVideo.muted = true;
silentVideo.playsInline = true;
silentVideo.style.display = "none"; // Hide the video
document.body.appendChild(silentVideo);

// ✅ Try autoplay when page loads
document.addEventListener("DOMContentLoaded", function () {
    silentVideo.play().then(() => {
        // After the silent video starts, play the actual music
        startCountdownMusic();
    }).catch(err => {
        console.error("Autoplay blocked, waiting for user interaction.");
    });
});

// ✅ Backup: If autoplay fails, play after any interaction
document.addEventListener("click", function () {
    if (countdownMusic.paused) {
        startCountdownMusic();
    }
}, { once: true }); // Runs only once

// Function to play countdown music
function startCountdownMusic() {
    countdownMusic.volume = 0.5; // Adjust volume if needed
    countdownMusic.play().catch(err => console.error("Error playing countdown music:", err));
}
// Countdown Logic
const birthdayDate = new Date('February 23, 2025 00:00:00').getTime();

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const timeRemaining = birthdayDate - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

    if (timeRemaining < 0) {
        clearInterval(countdown); // Stop countdown

        document.getElementById("countdown").style.display = "none"; // Hide countdown
        document.getElementById("birthdayMessage").style.display = "block"; // Show birthday message
        document.getElementById("buttonsContainer").style.display = "flex"; // Show sound buttons

        // ✅ Stop countdown music
        countdownMusic.pause();
        countdownMusic.currentTime = 0;

        // ✅ Play birthday sound if not already playing
        if (!isPlaying) {
            birthdaySound.play().catch(err => console.error("Error playing birthday sound:", err));
            isPlaying = true;
        }

        // ✅ Trigger confetti celebration
        celebrateBirthday();
    }
}, 1000); // Update every second

// Confetti animation
function celebrateBirthday() {
    confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ff7a7a', '#ff33cc', '#ff7a7a', '#f0f0f0']
    });
}

// Play/Stop Buttons
document.getElementById('playButton').addEventListener('click', () => {
    if (birthdaySound.paused) {
        birthdaySound.play().catch(err => console.error("Error playing sound:", err));
    }
});

document.getElementById('stopButton').addEventListener('click', () => {
    if (!birthdaySound.paused) {
        birthdaySound.pause();
        birthdaySound.currentTime = 0; // Reset
    }
});

// Share Button
document.getElementById('shareButton').addEventListener('click', () => {
    const currentUrl = window.location.href;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(currentUrl).then(() => {
            alert('URL copied to clipboard!');
        }).catch(err => {
            alert('Failed to copy URL: ' + err);
        });
    } else {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = currentUrl;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('URL copied to clipboard!');
    }
});
