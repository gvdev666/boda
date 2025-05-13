document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const isActive = item.classList.contains('active');

    // Cerrar todos
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

    // Si no estaba activo, lo activamos
    if (!isActive) {
      item.classList.add('active');
    }
  });
});
