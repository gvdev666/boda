// Fecha objetivo: 2 de mayo de 2026, a las 00:00:00
const fechaObjetivo = new Date('2026-05-02T00:00:00');

// Función para calcular la diferencia en segundos
function calcularTiempoRestante() {
  const ahora = new Date();
  const diferencia = fechaObjetivo - ahora;
  
  // Si la fecha ya ha pasado
  if (diferencia <= 0) {
    clearInterval(intervalo);
    document.querySelector('.contador').textContent = "¡Tiempo terminado!";
    return;
  }

  // Convertir la diferencia a días, horas, minutos y segundos
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  // Actualizar los valores en el HTML
  document.getElementById('dias').textContent = String(dias).padStart(2, '0');
  document.getElementById('horas').textContent = String(horas).padStart(2, '0');
  document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
  document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
}

// Llamar a la función cada segundo
const intervalo = setInterval(calcularTiempoRestante, 1000);
