window.addEventListener('scroll', function () {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
      header.classList.add('show');
  } else {
      header.classList.remove('show');
  }
});

// JavaScript para alternar o menu hamburguer
document.querySelector('.menu-toggle').addEventListener('click', function() {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('active'); // Alterna a classe 'active' para mostrar/ocultar o menu
});