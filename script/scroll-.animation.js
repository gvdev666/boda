const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // para que no se repita
        }
    });
}, {
    threshold: 0.1
});

const targets = document.querySelectorAll('.nuestra-historia, .text-ceremonia, .text-ceremonia-2, .ceremonia-flex');
targets.forEach(target => observer.observe(target));