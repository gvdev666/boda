const audio = document.getElementById("miAudio");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");

// Detectar si es móvil
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

// Al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  // Si es un móvil, el audio no se reproduce automáticamente
  if (isMobile) {
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  } else {
    // En escritorio, intentar reproducir la música automáticamente
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Autoplay permitido, mostrar icono de pausa
          playIcon.style.display = "none";
          pauseIcon.style.display = "block";
        })
        .catch(() => {
          // Si autoplay es bloqueado en móvil, mostrar play
          playIcon.style.display = "block";
          pauseIcon.style.display = "none";
        });
    }
  }
});

// Control de play/pause
document.getElementById("audio-button").addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  } else {
    audio.pause();
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  }
});