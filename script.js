/* =========================================================
   THE EARTH WE LEAVE BEHIND
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. NAVBAR SCROLL EFFECT
    ===================================================== */

    const nav = document.querySelector("nav");

    function handleNavbar() {

        if (!nav) return;

        if (window.scrollY > 50) {

            nav.style.background = "rgba(5, 8, 6, 0.92)";
            nav.style.backdropFilter = "blur(20px)";
            nav.style.borderBottomColor =
                "rgba(140, 207, 99, 0.18)";

        } else {

            nav.style.background = "rgba(5, 8, 6, 0.7)";
            nav.style.backdropFilter = "blur(15px)";
            nav.style.borderBottomColor =
                "rgba(255,255,255,0.08)";
        }
    }

    window.addEventListener("scroll", handleNavbar);
    handleNavbar();


    /* =====================================================
       2. SMOOTH SCROLL FOR INTERNAL LINKS
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const navHeight = nav ? nav.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       3. ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.id;
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active-nav");

            const href =
                link.getAttribute("href");

            if (href === "#" + currentSection) {
                link.classList.add("active-nav");
            }

        });
    }

    window.addEventListener(
        "scroll",
        updateActiveNav
    );

    updateActiveNav();


    /* =====================================================
       4. CAUSES SLIDER
    ===================================================== */

    const slides = document.querySelector(".slides");
    const slideItems = document.querySelectorAll(".slide");

    const prevButton =
        document.querySelector(".slider-btn.prev");

    const nextButton =
        document.querySelector(".slider-btn.next");

    let currentSlide = 0;

    function updateCausesSlider() {

        if (!slides || slideItems.length === 0) return;

        slides.style.transform =
            `translateX(-${currentSlide * 100}%)`;

    }

    function nextSlide() {

        if (slideItems.length === 0) return;

        currentSlide++;

        if (currentSlide >= slideItems.length) {
            currentSlide = 0;
        }

        updateCausesSlider();
    }

    function previousSlide() {

        if (slideItems.length === 0) return;

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slideItems.length - 1;
        }

        updateCausesSlider();
    }

    if (nextButton) {
        nextButton.addEventListener(
            "click",
            nextSlide
        );
    }

    if (prevButton) {
        prevButton.addEventListener(
            "click",
            previousSlide
        );
    }

    updateCausesSlider();


    /* =====================================================
       5. CAUSES SLIDER - KEYBOARD
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "ArrowRight") {
            nextSlide();
        }

        if (event.key === "ArrowLeft") {
            previousSlide();
        }

    });


    /* =====================================================
       6. CAUSES SLIDER - TOUCH SWIPE
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    const causesSlider =
        document.querySelector(".causes-slider");

    if (causesSlider) {

        causesSlider.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );

        causesSlider.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0].screenX;

                const difference =
                    touchStartX - touchEndX;

                if (Math.abs(difference) < 50) return;

                if (difference > 0) {
                    nextSlide();
                } else {
                    previousSlide();
                }

            },
            { passive: true }
        );

    }


    /* =====================================================
       7. ACTION CHECKLIST
    ===================================================== */

    const checkboxes =
        document.querySelectorAll(
            '.checklist input[type="checkbox"]'
        );

    const progressText =
        document.getElementById("progress");

    const progressFill =
        document.getElementById("progress-fill");

    function updateProgress() {

        if (
            !checkboxes.length ||
            !progressText ||
            !progressFill
        ) return;

        const total =
            checkboxes.length;

        const completed =
            document.querySelectorAll(
                '.checklist input[type="checkbox"]:checked'
            ).length;

        const percentage =
            (completed / total) * 100;

        progressText.textContent =
            `${completed} / ${total}`;

        progressFill.style.width =
            `${percentage}%`;

    }

    checkboxes.forEach(checkbox => {

        checkbox.addEventListener(
            "change",
            updateProgress
        );

    });

    updateProgress();


    /* =====================================================
       8. CHECKLIST LABEL ANIMATION
    ===================================================== */

    const checklistLabels =
        document.querySelectorAll(
            ".checklist label"
        );

    checklistLabels.forEach(label => {

        const checkbox =
            label.querySelector("input");

        if (!checkbox) return;

        checkbox.addEventListener(
            "change",
            () => {

                if (checkbox.checked) {

                    label.style.borderColor =
                        "#8ccf63";

                    label.style.background =
                        "rgba(140, 207, 99, 0.06)";

                } else {

                    label.style.borderColor =
                        "#303730";

                    label.style.background =
                        "transparent";

                }

            }
        );

    });


    /* =====================================================
       9. DATA COUNTER
    ===================================================== */

    const counter =
        document.querySelector(".counter");

    let counterStarted = false;

    function animateCounter() {

        if (!counter || counterStarted) return;

        counterStarted = true;

        const target =
            parseFloat(
                counter.dataset.target || "1.5"
            );

        const duration = 1500;

        const startTime =
            performance.now();

        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);

            const eased =
                1 - Math.pow(1 - progress, 3);

            const value =
                target * eased;

            counter.textContent =
                value.toFixed(1);

            if (progress < 1) {
                requestAnimationFrame(
                    updateCounter
                );
            }

        }

        requestAnimationFrame(
            updateCounter
        );
    }


    /* =====================================================
       10. INTERSECTION OBSERVER
    ===================================================== */

    const dataSection =
        document.querySelector(".data-section");

    if (dataSection && counter) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {
                            animateCounter();
                            counterObserver.disconnect();
                        }

                    });

                },
                {
                    threshold: 0.35
                }
            );

        counterObserver.observe(dataSection);

    }


    /* =====================================================
       11. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".info-card, " +
            ".impact-item, " +
            ".sustainability-card, " +
            ".solution-card, " +
            ".stat, " +
            ".team-card"
        );

    revealElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity .7s ease, transform .7s ease";

    });

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       12. STAGGER CARD ANIMATION
    ===================================================== */

    const cardGroups = [
        ".cards .info-card",
        ".sustainability-grid .sustainability-card",
        ".solution-grid .solution-card",
        ".stats .stat"
    ];

    cardGroups.forEach(selector => {

        const cards =
            document.querySelectorAll(selector);

        cards.forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 0.08}s`;

        });

    });


    /* =====================================================
       13. MOUSE PARALLAX - HERO
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroContent =
        document.querySelector(".hero-content");

    if (
        hero &&
        heroContent &&
        window.innerWidth > 768
    ) {

        hero.addEventListener(
            "mousemove",
            event => {

                const x =
                    (event.clientX /
                    window.innerWidth - 0.5);

                const y =
                    (event.clientY /
                    window.innerHeight - 0.5);

                heroContent.style.transform =
                    `translate(${x * 10}px, ${y * 10}px)`;

            }
        );

        hero.addEventListener(
            "mouseleave",
            () => {

                heroContent.style.transform =
                    "translate(0, 0)";

            }
        );

    }


    /* =====================================================
       14. SUSTAINABILITY CARD TILT
    ===================================================== */

    const sustainabilityCards =
        document.querySelectorAll(
            ".sustainability-card"
        );

    if (window.innerWidth > 900) {

        sustainabilityCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        (y - centerY) / 25;

                    const rotateY =
                        (centerX - x) / 25;

                    card.style.transform =
                        `translateY(-8px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)`;

                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "translateY(0) rotateX(0) rotateY(0)";

                }
            );

        });

    }


    /* =====================================================
       15. TEAM SLIDER
    ===================================================== */

    const teamCards =
        document.querySelectorAll(
            ".team-card"
        );

    const teamDots =
        document.querySelectorAll(
            ".team-dot"
        );

    let currentTeam = 0;

    window.showTeam = function(index) {

        if (!teamCards.length) return;

        if (index < 0) {
            index = teamCards.length - 1;
        }

        if (index >= teamCards.length) {
            index = 0;
        }

        currentTeam = index;

        teamCards.forEach(
            (card, i) => {

                card.classList.toggle(
                    "active",
                    i === currentTeam
                );

            }
        );

        teamDots.forEach(
            (dot, i) => {

                dot.classList.toggle(
                    "active-dot",
                    i === currentTeam
                );

            }
        );

    };


    window.changeTeam = function(direction) {

        showTeam(
            currentTeam + direction
        );

    };


    showTeam(0);


    /* =====================================================
       16. TEAM AUTO SLIDE
    ===================================================== */

    let teamAutoSlide =
        setInterval(() => {

            changeTeam(1);

        }, 6000);


    const teamSection =
        document.querySelector(".team-section");

    if (teamSection) {

        teamSection.addEventListener(
            "mouseenter",
            () => {

                clearInterval(
                    teamAutoSlide
                );

            }
        );

        teamSection.addEventListener(
            "mouseleave",
            () => {

                teamAutoSlide =
                    setInterval(() => {

                        changeTeam(1);

                    }, 6000);

            }
        );

    }


    /* =====================================================
       17. BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".primary-button, " +
            ".secondary-button, " +
            ".nav-button"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                this.style.transform =
                    "scale(0.97)";

                setTimeout(() => {

                    this.style.transform =
                        "";

                }, 150);

            }
        );

    });


    /* =====================================================
       18. IMAGE LOAD EFFECT
    ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );

    images.forEach(img => {

        img.addEventListener(
            "load",
            () => {

                img.classList.add(
                    "image-loaded"
                );

            }
        );

    });


    /* =====================================================
       19. BACK TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(
            '.final-section a[href="#home"]'
        );

    if (backToTop) {

        backToTop.addEventListener(
            "click",
            event => {

                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       20. REDUCE MOTION SUPPORT
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (prefersReducedMotion.matches) {

        document.documentElement.style
            .scrollBehavior = "auto";

        revealElements.forEach(element => {

            element.style.opacity = "1";
            element.style.transform =
                "none";
            element.style.transition =
                "none";

        });

    }


    /* =====================================================
       21. CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%cTHE EARTH WE LEAVE BEHIND",
        "color:#8ccf63;font-size:20px;font-weight:bold;"
    );

    console.log(
        "%cClimate change awareness website",
        "color:#9da49d;font-size:12px;"
    );

});
