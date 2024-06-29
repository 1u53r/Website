let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.item');
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    document.querySelector('.inner').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Optional: Auto slide
setInterval(nextSlide, 5000); // Change slide every 5 seconds

// Optional: Auto start animation
document.querySelector('.header-image').classList.add('animate');