
document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.querySelector('form');
  const checkboxAcompanante = document.getElementById('acompananteCheckbox');
  const camposAcompanante = document.getElementById('acompananteCampos');

  // Mostrar/ocultar campos de acompañante
  checkboxAcompanante.addEventListener('change', () => {
    camposAcompanante.style.display = checkboxAcompanante.checked ? 'block' : 'none';
  });

  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(formulario);

    const datos = {
      nombre: formData.get('nombre'),
      apellidos: formData.get('apellido'),
      email: formData.get('email'),
      asistencia: formData.get('asistencia'),
      transporte: formData.getAll('transporte'),
      alergias: formData.get('alergias'),
      acompananteNombre: formData.get('nombre_acompanante') || '',
      acompananteApellidos: formData.get('apellido_acompanante') || ''
    };

    try {
      const response = await fetch('http://localhost/boda/backend/asistencia.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });

      const resultado = await response.json();

      if (resultado.success) {
        Swal.fire({
          icon: 'success',
          title: 'Confirmación recibida',
          text: '¡Gracias por tu registro!',
          confirmButtonText: 'Aceptar'
        });

        formulario.reset();
        camposAcompanante.style.display = 'none'; // Oculta campos acompañante si se habían mostrado
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: resultado.message || 'Ocurrió un error inesperado.',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo conectar con el servidor. Intenta más tarde.',
        confirmButtonText: 'Aceptar'
      });
    }
  });
});

