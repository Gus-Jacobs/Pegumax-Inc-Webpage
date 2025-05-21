document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Slogan Typewriter Effect
    const slogans = [
        "Unlocking the Next Dimension of Reality.",
        "Crafting Tomorrow's Solutions, Today.",
        "Where Vision Meets Unrivaled Innovation.",
        "Redefining the Boundaries of Possibility."
    ];
    let sloganIndex = 0;
    let charIndex = 0;
    const animatedSloganElement = document.getElementById('animated-slogan');
    let typingSpeed = 70; // milliseconds per character - slightly faster for smoother feel
    let deletingSpeed = 35; // milliseconds per character - slightly faster
    let delayBetweenSlogans = 2000; // milliseconds - slightly shorter pause

    function typeSlogan() {
        if (charIndex < slogans[sloganIndex].length) {
            animatedSloganElement.textContent += slogans[sloganIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeSlogan, typingSpeed);
        } else {
            setTimeout(deleteSlogan, delayBetweenSlogans);
        }
    }

    function deleteSlogan() {
        if (charIndex > 0) {
            animatedSloganElement.textContent = slogans[sloganIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(deleteSlogan, deletingSpeed);
        } else {
            sloganIndex = (sloganIndex + 1) % slogans.length;
            setTimeout(typeSlogan, typingSpeed + 50); // Small delay before typing new slogan
        }
    }

    // Start the typewriter effect after the initial fade-in of other elements
    // Increased delay to allow hero section to fully load before slogan animation starts
    setTimeout(() => {
        typeSlogan();
    }, 2800); // Give the hero section a moment to load and fade in


    // 2. Scroll-Triggered Fade-In Effect for Sections
    // Explicitly add .js-scroll class to sections here to ensure they are targeted
    document.querySelector('#about').classList.add('js-scroll');
    document.querySelector('#mission').classList.add('js-scroll');
    document.querySelector('#future').classList.add('js-scroll');

    const scrollElements = document.querySelectorAll('.js-scroll');
    console.log("Scroll elements found for animation:", scrollElements.length); // Debugging line

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementHeight = el.getBoundingClientRect().height;
        const viewportHeight = (window.innerHeight || document.documentElement.clientHeight);

        // Element is considered in view if its top is above the bottom of the viewport
        // and its bottom is below the top of the viewport.
        // The dividend makes it appear earlier (e.g., when 1/2 of it is visible)
        return (elementTop <= viewportHeight - (elementHeight / dividend) && elementTop + elementHeight > 0);
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
        console.log("Element scrolled into view:", element.id); // Debugging line
    };

    const handleScrollAnimation = () => {
        updatedScrollElements.forEach((el) => { // Use updatedScrollElements
            if (elementInView(el, 1.5)) { // Adjusted dividend to 1.5 for slightly earlier trigger
                displayScrollElement(el);
            }
            // Optional: If you want elements to fade out when scrolled back up:
            // else if (el.classList.contains('scrolled')) {
            //     el.classList.remove('scrolled');
            // }
        });
    };

    // Re-select scrollElements after adding the classes to ensure they are included
    // This is important because querySelectorAll only grabs elements present at call time.
    const updatedScrollElements = document.querySelectorAll('.js-scroll');
    console.log("Updated scroll elements after class add:", updatedScrollElements.length);


    window.addEventListener('scroll', handleScrollAnimation);

    // Initial check in case elements are already in view on load (e.g., on larger screens)
    handleScrollAnimation();

    // 3. Update copyright year dynamically
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 4. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});