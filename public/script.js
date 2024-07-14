document.addEventListener("DOMContentLoaded", () => {


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

    // JS Code for Show-More-Button

    let hidMeElements = document.querySelectorAll(".hid-me");
    hidMeElements.forEach(element => {
        element.style.display = "none";
    });
    let showMoreButton = document.getElementById("show-more-button");
    showMoreButton.addEventListener("click", () => {
        let isShowing = showMoreButton.innerText === "Show More";
        hidMeElements.forEach((element, index) => {
            if (isShowing) {
                element.style.display = "flex";
                showMoreButton.innerText = "Show Less"
            } else {
                element.style.display = "none";
                showMoreButton.innerText = "Show More"
            }
        });

    });

    //navbar

    const menuIcon = document.getElementById("menu-icon");
    const navLinks = document.getElementById("nav-links");

    menuIcon.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    //alert

    const closeSuccess = document.querySelector(".closeSuccess");
    const submitted = document.querySelector(".submitted");
    const closeNotSuccess = document.querySelector(".notSubmittedClose");
    const notSubmitted = document.querySelector(".notSubmitted");
    const feedbackButton = document.querySelector(".feedback-btn");
    const subscribeButton = document.querySelector(".subscribe-btn");
    const greenMessage = document.getElementById("greenMassage");
    const redMassage = document.getElementById("redMassage");

    submitted.style.display = "none";
    notSubmitted.style.display = "none";


    function showAlert(alertElement) {
        alertElement.style.display = "flex";
        alertElement.classList.add("show");
        setTimeout(() => {
            hideAlert(alertElement);
        }, 5000); // Auto hide after 5 seconds
    }

    function hideAlert(alertElement) {
        alertElement.style.display = "none";
        alertElement.classList.remove("show");
    }

    document.getElementById("feedback-form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/submit", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (response.status === 200) {
                showAlert(submitted);

            } else {
                redMassage.innerText = responseData.message;
                showAlert(notSubmitted);                
            }

            if (window.location.pathname === '/submit') {
                // Redirect to another route
                window.location.href = '/';
            }

        } catch (error) {
            console.error('Error:', error);
            notSubmitted.querySelector('.msg').textContent = 'An unexpected error occurred. Please try again!';
            showAlert(notSubmitted);
        }
    });

    document.getElementById("newsletter").addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/newsletter", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (response.status === 200) {
                greenMessage.innerText = "Congrats!! You have been registered now"
                showAlert(submitted);

            } else if(response.status === 400){
                // console.log("400")
                redMassage.innerText = responseData.message
                showAlert(notSubmitted)
            }
            
            else {
                showAlert(notSubmitted);                
            }

            if (window.location.pathname === '/newsletter') {
                // Redirect to another route
                window.location.href = '/';
            }

        } catch (error) {
            console.error('Error:', error);
            notSubmitted.querySelector('.msg').textContent = 'An unexpected error occurred. Please try again!';
            showAlert(notSubmitted);
        }
    });
});
