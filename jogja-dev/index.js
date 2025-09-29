window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    if (window.scrollY > 10) {
        nav.classList.add('bg-white/10', 'backdrop-blur-md', 'border-b', 'border-white/20');
        nav.classList.remove('bg-transparent');
    } else {
        nav.classList.remove('bg-white/10', 'backdrop-blur-md', 'border-b', 'border-white/20');
        nav.classList.add('bg-transparent');
    }
});