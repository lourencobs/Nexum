const counters = document.querySelectorAll('.stat-number');
const speed = 1500; // Valor alto para animação bem lenta

const startCounting = (counter) => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;

    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 250); // Intervalo entre cada incremento
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      startCounting(counter);
      observer.unobserve(counter); // Para evitar que o contador reinicie
    }
  });
}, {
  threshold: 1 
});

// Observa cada contador individualmente
counters.forEach(counter => {
  observer.observe(counter);
});