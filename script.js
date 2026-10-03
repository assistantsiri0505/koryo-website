/* =========================================================
   KORYO FAISALABAD
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const pageLoader = document.getElementById("pageLoader");
    const navbar = document.getElementById("navbar");

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    const backToTop = document.getElementById("backToTop");

    const menuTabs = document.querySelectorAll(".menu-tab");
    const menuCards = document.querySelectorAll(".menu-card");

    const reviewCards = document.querySelectorAll(".review-card");
    const reviewDots = document.querySelectorAll(".review-dots .dot");

    const reviewPrev = document.getElementById("reviewPrev");
    const reviewNext = document.getElementById("reviewNext");

    const revealImages = document.querySelectorAll(".reveal-image");


    /* =====================================================
       PAGE LOADER
       ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            pageLoader.classList.add("hide");

            document.body.classList.remove("no-scroll");

        }, 800);

    });


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("open");
            document.body.classList.toggle("no-scroll");

            const spans = menuToggle.querySelectorAll("span");

            if (navLinks.classList.contains("open")) {

                spans[0].style.transform =
                    "translateY(6px) rotate(45deg)";

                spans[1].style.opacity = "0";

                spans[2].style.transform =
                    "translateY(-6px) rotate(-45deg)";

            } else {

                spans[0].style.transform = "";
                spans[1].style.opacity = "";
                spans[2].style.transform = "";

            }

        });


        /* Close menu after clicking a link */

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                document.body.classList.remove("no-scroll");

                const spans = menuToggle.querySelectorAll("span");

                spans[0].style.transform = "";
                spans[1].style.opacity = "";
                spans[2].style.transform = "";

            });

        });

    }


    /* =====================================================
       NAVBAR ON SCROLL
       ===================================================== */

    function updateNavbar() {

        if (window.scrollY > 60) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections = document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(".nav-links a");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();


    /* =====================================================
       MENU FILTER
       ===================================================== */

    menuTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            /* Remove active state */

            menuTabs.forEach(item => {

                item.classList.remove("active");

            });

            tab.classList.add("active");


            /* Get selected category */

            const category =
                tab.getAttribute("data-category");


            menuCards.forEach(card => {

                const cardCategory =
                    card.getAttribute("data-category");


                if (
                    category === "all" ||
                    category === cardCategory
                ) {

                    card.classList.remove("hide");

                    card.style.animation =
                        "menuCardIn .45s ease forwards";

                } else {

                    card.classList.add("hide");

                }

            });

        });

    });


    /* =====================================================
       MENU CARD ANIMATION
       ===================================================== */

    const menuAnimationStyle =
        document.createElement("style");

    menuAnimationStyle.innerHTML = `

        @keyframes menuCardIn {

            from {
                opacity: 0;
                transform: translateY(20px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }

        }

    `;

    document.head.appendChild(menuAnimationStyle);


    /* =====================================================
       REVIEWS SLIDER
       ===================================================== */

    let currentReview = 0;

    let reviewTimer;


    function showReview(index) {

        if (!reviewCards.length) return;


        /* Keep index within range */

        if (index >= reviewCards.length) {

            currentReview = 0;

        } else if (index < 0) {

            currentReview =
                reviewCards.length - 1;

        } else {

            currentReview = index;

        }


        /* Hide all reviews */

        reviewCards.forEach(card => {

            card.classList.remove("active");

        });


        /* Show selected review */

        reviewCards[currentReview]
            .classList.add("active");


        /* Update dots */

        reviewDots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentReview
            );

        });

    }


    function nextReview() {

        showReview(currentReview + 1);

    }


    function previousReview() {

        showReview(currentReview - 1);

    }


    if (reviewNext) {

        reviewNext.addEventListener(
            "click",
            () => {

                nextReview();

                restartReviewTimer();

            }
        );

    }


    if (reviewPrev) {

        reviewPrev.addEventListener(
            "click",
            () => {

                previousReview();

                restartReviewTimer();

            }
        );

    }


    /* =====================================================
       REVIEW DOTS
       ===================================================== */

    reviewDots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showReview(index);

            restartReviewTimer();

        });

    });


    /* =====================================================
       AUTO REVIEW SLIDER
       ===================================================== */

    function startReviewTimer() {

        reviewTimer = setInterval(() => {

            nextReview();

        }, 5000);

    }


    function restartReviewTimer() {

        clearInterval(reviewTimer);

        startReviewTimer();

    }


    if (reviewCards.length > 1) {

        startReviewTimer();

    }


    /* =====================================================
       PAUSE REVIEW SLIDER ON HOVER
       ===================================================== */

    const reviewsSlider =
        document.getElementById("reviewsSlider");

    if (reviewsSlider) {

        reviewsSlider.addEventListener(
            "mouseenter",
            () => {

                clearInterval(reviewTimer);

            }
        );


        reviewsSlider.addEventListener(
            "mouseleave",
            () => {

                startReviewTimer();

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList.add("revealed");

                        revealObserver
                            .unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealImages.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       GENERIC SECTION REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".story-content, .section-heading, .menu-card, .contact-content, .map-card, .stat-item"
    );


    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "section-visible"
                        );

                        sectionObserver
                            .unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        element.classList.add("section-hidden");

        sectionObserver.observe(element);

    });


    /* =====================================================
       SECTION ANIMATION STYLE
       ===================================================== */

    const sectionAnimationStyle =
        document.createElement("style");

    sectionAnimationStyle.innerHTML = `

        .section-hidden {
            opacity: 0;
            transform: translateY(30px);
            transition:
                opacity .8s ease,
                transform .8s ease;
        }

        .section-visible {
            opacity: 1;
            transform: translateY(0);
        }

    `;

    document.head.appendChild(sectionAnimationStyle);


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    function updateBackToTop() {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

    window.addEventListener(
        "scroll",
        updateBackToTop
    );

    updateBackToTop();


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    targetId === "#" ||
                    !targetId
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (target) {

                    event.preventDefault();

                    const navbarHeight =
                        navbar.offsetHeight;

                    const targetPosition =
                        target.offsetTop -
                        navbarHeight;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }

            });

        });


    /* =====================================================
       IMAGE ERROR FALLBACK
       ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener("error", () => {

                image.style.display = "none";

                image.parentElement.classList.add(
                    "image-fallback"
                );

            });

        });


    /* =====================================================
       PHONE / EXTERNAL LINK PROTECTION
       ===================================================== */

    document
        .querySelectorAll('a[target="_blank"]')
        .forEach(link => {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        });


    /* =====================================================
       KEYBOARD ACCESSIBILITY
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                if (
                    navLinks &&
                    navLinks.classList.contains("open")
                ) {

                    navLinks.classList.remove("open");

                    document.body.classList.remove(
                        "no-scroll"
                    );

                    const spans =
                        menuToggle.querySelectorAll("span");

                    spans[0].style.transform = "";
                    spans[1].style.opacity = "";
                    spans[2].style.transform = "";

                }

            }

        }
    );


    /* =====================================================
       TOUCH SWIPE FOR REVIEWS
       ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    if (reviewsSlider) {

        reviewsSlider.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        reviewsSlider.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0].screenX;

                const swipeDistance =
                    touchStartX - touchEndX;


                if (Math.abs(swipeDistance) > 50) {

                    if (swipeDistance > 0) {

                        nextReview();

                    } else {

                        previousReview();

                    }

                    restartReviewTimer();

                }

            },
            { passive: true }
        );

    }


    /* =====================================================
       CONSOLE MESSAGE
       ===================================================== */

    console.log(
        "%c KORYO FAISALABAD ",
        "background:#10110f;color:#c8a96b;padding:10px;font-size:16px;font-weight:bold;"
    );

    console.log(
        "The Korean Experience."
    );

});