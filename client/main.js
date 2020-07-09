const burger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.navbar-links');
const menuSpans = document.querySelectorAll('.bar');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuSpans.forEach(menu => {
        menu.classList.toggle('open')
    })
});