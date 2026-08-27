/* ==================================================
   PAGE NAVIGATION
================================================== */

const mainNav =
    document.getElementById("mainNav");

const menuToggle =
    document.getElementById("menuToggle");

const dotMenu =
    document.getElementById("dotMenu");

const pages =
    document.querySelectorAll("body > section");

const menuLinks =
    document.querySelectorAll(".dot-menu a");

const exploreButtons =
    document.querySelectorAll(".explore-button");



/* ==================================================
   SHOW PAGE
================================================== */

function showPage(id, showNavigation = true) {

    const target =
        document.querySelector(id);

    if (!target) return;


    /* REMOVE ACTIVE FROM ALL */

    pages.forEach((page) => {

        page.classList.remove("page-active");

    });


    /* SHOW TARGET */

    target.classList.add("page-active");


    /* CLOSE MENU */

    if (dotMenu) {

        dotMenu.classList.remove("active");

    }


    /* SHOW / HIDE NAVIGATION */

    if (showNavigation) {

        mainNav.classList.add("menu-visible");

    } else {

        mainNav.classList.remove("menu-visible");

    }


    /* RESET PAGE POSITION */

    target.scrollTop = 0;


    /* UPDATE URL */

    history.replaceState(
        null,
        "",
        id
    );

}



/* ==================================================
   EXPLORE BUTTON
================================================== */

exploreButtons.forEach((button) => {

    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            const target =
                this.getAttribute("href");

            showPage(
                target,
                true
            );

        }
    );

});



/* ==================================================
   3 DOT MENU
================================================== */

if (menuToggle && dotMenu) {

    menuToggle.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            dotMenu.classList.toggle(
                "active"
            );

        }
    );

}



/* ==================================================
   MENU LINKS
================================================== */

menuLinks.forEach((link) => {

    link.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            const target =
                this.getAttribute("href");


            /* HOME */

            if (target === "#home") {

                showPage(
                    "#home",
                    false
                );

                return;

            }


            /* OTHER PAGES */

            showPage(
                target,
                true
            );

        }
    );

});



/* ==================================================
   CLOSE MENU OUTSIDE
================================================== */

document.addEventListener(
    "click",
    function(event) {

        if (
            dotMenu &&
            menuToggle &&
            !dotMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            dotMenu.classList.remove(
                "active"
            );

        }

    }
);



/* ==================================================
   BACK HOME
================================================== */

const backHome =
    document.querySelector(".back-home");


if (backHome) {

    backHome.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            showPage(
                "#home",
                false
            );

        }
    );

}



/* ==================================================
   INITIAL PAGE
================================================== */

window.addEventListener(
    "load",
    function() {

        /*
            ALWAYS START AT HOME.
            3 DOTS ARE HIDDEN.
        */

        showPage(
            "#home",
            false
        );

    }
);



/* ==================================================
   CHECKLIST
================================================== */

const checkboxes =
    document.querySelectorAll(
        '.checklist input[type="checkbox"]'
    );


const progressText =
    document.getElementById("progress");


const progressFill =
    document.getElementById(
        "progress-fill"
    );


function updateProgress() {

    if (
        !progressText ||
        !progressFill
    ) return;


    const completed =
        document.querySelectorAll(
            '.checklist input[type="checkbox"]:checked'
        ).length;


    const total =
        checkboxes.length;


    const percentage =
        total > 0
        ? (completed / total) * 100
        : 0;


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



/* ==================================================
   COUNTER
================================================== */

const counters =
    document.querySelectorAll(
        ".counter"
    );


let counterStarted = false;


function startCounters() {

    if (counterStarted) return;

    counterStarted = true;


    counters.forEach((counter) => {

        const target =
            parseFloat(
                counter.getAttribute(
                    "data-target"
                )
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



/* ==================================================
   START COUNTER WHEN DATA PAGE OPENS
================================================== */

const originalShowPage =
    showPage;


window.showPage =
    function(id, showNavigation = true) {

        originalShowPage(
            id,
            showNavigation
        );


        if (id === "#data") {

            startCounters();

        }

    };



/* ==================================================
   OUR TEAM SLIDER
================================================== */

let currentTeam = 0;


const teamCards =
    document.querySelectorAll(
        ".team-card"
    );


const teamDots =
    document.querySelectorAll(
        ".team-dot"
    );



function showTeam(index) {

    if (
        !teamCards.length
    ) return;


    if (
        index >= teamCards.length
    ) {

        currentTeam = 0;

    }

    else if (
        index < 0
    ) {

        currentTeam =
            teamCards.length - 1;

    }

    else {

        currentTeam = index;

    }


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

}



function changeTeam(direction) {

    showTeam(
        currentTeam + direction
    );

}



/* ==================================================
   MAKE TEAM FUNCTIONS GLOBAL
================================================== */

window.showTeam =
    showTeam;

window.changeTeam =
    changeTeam;
