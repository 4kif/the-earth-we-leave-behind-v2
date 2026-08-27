
/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".info-card, .cause, .impact-item, .solution-card, .stat, .sustainability-card"
);


const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);


revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform = "translateY(30px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    revealObserver.observe(element);

});


const style = document.createElement("style");

style.innerHTML = `

    .show {

        opacity: 1 !important;

        transform: translateY(0) !important;

    }

`;

document.head.appendChild(style);


/* =========================
   CHECKLIST
========================= */

const checkboxes = document.querySelectorAll(
    '.checklist input[type="checkbox"]'
);


const progressText =
    document.getElementById("progress");


const progressFill =
    document.getElementById("progress-fill");


function updateProgress() {

    const completed =
        document.querySelectorAll(
            '.checklist input[type="checkbox"]:checked'
        ).length;


    const total =
        checkboxes.length;


    const percentage =
        (completed / total) * 100;


    progressText.textContent =
        `${completed} / ${total}`;


    progressFill.style.width =
        `${percentage}%`;

}


checkboxes.forEach((checkbox) => {

    checkbox.addEventListener(
        "change",
        updateProgress
    );

});


/* =========================
   COUNTER
========================= */

const counters =
    document.querySelectorAll(".counter");


let counterStarted = false;


function startCounters() {

    if (counterStarted) return;

    counterStarted = true;


    counters.forEach((counter) => {

        const target =
            parseFloat(
                counter.getAttribute("data-target")
            );


        let current = 0;


        const increment =
            target / 50;


        function updateCounter() {

            current += increment;


            if (current < target) {

                counter.textContent =
                    current.toFixed(1);

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target.toFixed(1);

            }

        }


        updateCounter();

    });

}


const dataSection =
    document.querySelector(".data-section");


const counterObserver =
    new IntersectionObserver(

        (entries) => {

            if (entries[0].isIntersecting) {

                startCounters();

            }

        },

        {
            threshold: 0.3
        }

    );


counterObserver.observe(dataSection);


/* =========================
   NAVBAR
========================= */

const navbar =
    document.querySelector("nav");


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 50) {

            navbar.style.background =
                "rgba(5, 8, 6, 0.95)";

        } else {

            navbar.style.background =
                "rgba(5, 8, 6, 0.7)";

        }

    }
);


/* =========================
   HERO PARALLAX
========================= */

const hero =
    document.querySelector(".hero");


window.addEventListener(
    "scroll",
    () => {

        const scrollPosition =
            window.scrollY;


        if (
            scrollPosition <
            window.innerHeight
        ) {

            hero.style.backgroundPosition =
                `center ${scrollPosition * 0.35}px`;

        }

    }
);

/* ========================================
   OUR TEAM SLIDER
======================================== */

let currentTeam = 0;

const teamCards =
    document.querySelectorAll(".team-card");

const teamDots =
    document.querySelectorAll(".team-dot");


function showTeam(index) {

    /* LOOP SLIDER */

    if (index >= teamCards.length) {

        currentTeam = 0;

    }

    else if (index < 0) {

        currentTeam = teamCards.length - 1;

    }

    else {

        currentTeam = index;

    }


    /* CHANGE TEAM */

    teamCards.forEach((card, i) => {

        card.classList.toggle(
            "active",
            i === currentTeam
        );

    });


    /* CHANGE DOT */

    teamDots.forEach((dot, i) => {

        dot.classList.toggle(
            "active-dot",
            i === currentTeam
        );

    });

}


function changeTeam(direction) {

    showTeam(
        currentTeam + direction
    );

}

/* ==================================================
   3 DOT PAGE NAVIGATION
================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const dotMenu =
    document.getElementById("dotMenu");

const menuLinks =
    document.querySelectorAll(".dot-menu a");


/* ALL MAIN PAGES */

const pages = document.querySelectorAll(
    "body > section"
);


/* =========================
   SHOW PAGE
========================= */

function showPage(id) {

    pages.forEach((page) => {

        page.classList.remove("page-active");

    });


    const target =
        document.querySelector(id);

    if (target) {

        target.classList.add("page-active");

    }


    /* CLOSE MENU */

    dotMenu.classList.remove("active");

}


/* =========================
   MENU OPEN / CLOSE
========================= */

menuToggle.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        dotMenu.classList.toggle("active");

    }
);


/* =========================
   MENU LINKS
========================= */

menuLinks.forEach((link) => {

    link.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            const target =
                this.getAttribute("href");

            showPage(target);

            history.replaceState(
                null,
                "",
                target
            );

        }
    );

});


/* =========================
   CLOSE WHEN CLICK OUTSIDE
========================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            !dotMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            dotMenu.classList.remove("active");

        }

    }
);


/* =========================
   FIRST PAGE
========================= */

function loadInitialPage() {

    const hash =
        window.location.hash;

    if (
        hash &&
        document.querySelector(hash)
    ) {

        showPage(hash);

    }

    else {

        showPage("#home");

    }

}


loadInitialPage();

/* ========================================
   3 DOT MENU
======================================== */

const menuToggle = document.getElementById("menuToggle");
const dotMenu = document.getElementById("dotMenu");

if (menuToggle && dotMenu) {

    menuToggle.addEventListener("click", function () {

        dotMenu.classList.toggle("active");

    });

}


/* CLOSE MENU WHEN CLICK OUTSIDE */

document.addEventListener("click", function (event) {

    if (
        dotMenu &&
        menuToggle &&
        !dotMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {

        dotMenu.classList.remove("active");

    }

});
