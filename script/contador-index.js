// Script para el contador
function updateCountdown() {
    var targetDate = new Date("May 2, 2026 12:00:00").getTime();
    var now = new Date().getTime();
    var timeLeft = targetDate - now;

    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("dias").innerHTML = days;
    document.getElementById("horas").innerHTML = hours;
    document.getElementById("minutos").innerHTML = minutes;
    document.getElementById("segundos").innerHTML = seconds;
}

setInterval(updateCountdown, 1000);