/* =========================================================
   GAYATHRI J. PISHARADY
   PORTFOLIO
   SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;
    const header = document.getElementById("site-header");
    const progressBar = document.getElementById("progress-bar");
    const spotlight = document.getElementById("spotlight");
    const cursorLabel = document.getElementById("cursor-label");
    const themeToggle = document.getElementById("theme-toggle");

    const overlay = document.getElementById("detail-overlay");

    const cards = document.querySelectorAll(".interactive-card");
    const panels = document.querySelectorAll(".detail-panel");

    const navLinks = document.querySelectorAll(".nav-links a");



    /* =====================================================
       01. THEME
    ===================================================== */

    const savedTheme = localStorage.getItem("gayathri-theme");

    if (savedTheme === "dark") {
        body.classList.add("dark");
    }

    updateThemeIcon();


    function updateThemeIcon() {

        if (!themeToggle) return;

        themeToggle.textContent =
            body.classList.contains("dark")
                ? "☀"
                : "☾";

    }


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            body.classList.toggle("dark");

            const theme =
                body.classList.contains("dark")
                    ? "dark"
                    : "light";

            localStorage.setItem(
                "gayathri-theme",
                theme
            );

            updateThemeIcon();

        });

    }



    /* =====================================================
       02. SCROLL PROGRESS
    ===================================================== */

    function updateScrollProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight
            - window.innerHeight;

        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        if (progressBar) {
            progressBar.style.width =
                `${progress}%`;
        }

    }

    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();



    /* =====================================================
       03. HEADER SCROLL EFFECT
    ===================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();



    /* =====================================================
       04. CURSOR SPOTLIGHT
    ===================================================== */

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let spotlightX = mouseX;
    let spotlightY = mouseY;


    function animateSpotlight() {

        spotlightX +=
            (mouseX - spotlightX) * 0.12;

        spotlightY +=
            (mouseY - spotlightY) * 0.12;


        if (spotlight) {

            spotlight.style.left =
                `${spotlightX}px`;

            spotlight.style.top =
                `${spotlightY}px`;

        }


        if (cursorLabel) {

            cursorLabel.style.left =
                `${mouseX}px`;

            cursorLabel.style.top =
                `${mouseY}px`;

        }


        requestAnimationFrame(
            animateSpotlight
        );

    }

    animateSpotlight();


    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        },
        { passive: true }
    );



    /* =====================================================
       05. INTERACTIVE CURSOR
    ===================================================== */

    cards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                if (
                    window.matchMedia(
                        "(pointer: fine)"
                    ).matches
                ) {

                    cursorLabel?.classList.add(
                        "visible"
                    );

                }

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                cursorLabel?.classList.remove(
                    "visible"
                );

            }
        );

    });



    /* =====================================================
       06. PROJECT / CLUB / EXPERIENCE
           MOUSE POSITION
    ===================================================== */

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const percentX =
                    (x / rect.width) * 100;

                const percentY =
                    (y / rect.height) * 100;


                card.style.setProperty(
                    "--mouse-x",
                    `${percentX}%`
                );

                card.style.setProperty(
                    "--mouse-y",
                    `${percentY}%`
                );

            }
        );

    });



    /* =====================================================
       07. 3D CARD TILT
    ===================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".project-item, .club-card"
        );


    tiltCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    !window.matchMedia(
                        "(pointer: fine)"
                    ).matches
                ) {
                    return;
                }


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


                const rotateY =
                    ((x - centerX) / centerX) * 4;

                const rotateX =
                    ((centerY - y) / centerY) * 4;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-7px)
                     scale(1.01)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });



    /* =====================================================
       08. DETAIL PANELS
    ===================================================== */

    function openPanel(id) {

        if (!id) return;


        const panel =
            document.getElementById(
                `modal-${id}`
            );

        if (!panel) {

            console.warn(
                `No detail panel found for: ${id}`
            );

            return;

        }


        panels.forEach(item => {

            item.classList.remove(
                "active"
            );

            item.setAttribute(
                "aria-hidden",
                "true"
            );

        });


        panel.classList.add(
            "active"
        );

        panel.setAttribute(
            "aria-hidden",
            "false"
        );


        overlay?.classList.add(
            "active"
        );


        body.classList.add(
            "modal-open"
        );


        document
            .querySelectorAll(".interactive-card")
            .forEach(item => {

                item.classList.remove(
                    "selected"
                );

            });


        document
            .querySelector(
                `[data-modal="${id}"]`
            )
            ?.classList.add(
                "selected"
            );

    }


    function closePanels() {

        panels.forEach(panel => {

            panel.classList.remove(
                "active"
            );

            panel.setAttribute(
                "aria-hidden",
                "true"
            );

        });


        overlay?.classList.remove(
            "active"
        );


        body.classList.remove(
            "modal-open"
        );


        document
            .querySelectorAll(".interactive-card")
            .forEach(card => {

                card.classList.remove(
                    "selected"
                );

            });

    }



    /* =====================================================
       09. CARD CLICK
    ===================================================== */

    cards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const id =
                    card.dataset.modal;

                openPanel(id);

            }
        );

    });



    /* =====================================================
       10. CLOSE BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".detail-close")
        .forEach(button => {

            button.addEventListener(
                "click",
                closePanels
            );

        });


    overlay?.addEventListener(
        "click",
        closePanels
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closePanels();

            }

        }
    );



    /* =====================================================
       11. PREVENT PANEL CLICK FROM CLOSING
    ===================================================== */

    panels.forEach(panel => {

        panel.addEventListener(
            "click",
            event => {

                event.stopPropagation();

            }
        );

    });



    /* =====================================================
       12. ROLE TEXT ANIMATION
    ===================================================== */

    const roleElement =
        document.getElementById(
            "changing-role"
        );


    const roles = [

        "Mechanical Engineer",

        "CAD & Design Enthusiast",

        "Engineering Explorer",

        "Product Design Enthusiast",

        "Innovation Builder"

    ];


    let roleIndex = 0;


    if (roleElement) {

        setInterval(() => {

            roleElement.style.opacity = "0";
            roleElement.style.transform =
                "translateY(6px)";


            setTimeout(() => {

                roleIndex =
                    (roleIndex + 1)
                    % roles.length;


                roleElement.textContent =
                    roles[roleIndex];


                roleElement.style.opacity =
                    "1";

                roleElement.style.transform =
                    "translateY(0)";

            }, 300);

        }, 3000);


        roleElement.style.transition =
            "opacity .3s ease, transform .3s ease";

    }



    /* =====================================================
       13. MAGNETIC LINKS
    ===================================================== */

    const magneticLinks =
        document.querySelectorAll(
            ".magnetic-link"
        );


    magneticLinks.forEach(link => {

        link.addEventListener(
            "mousemove",
            event => {

                if (
                    !window.matchMedia(
                        "(pointer: fine)"
                    ).matches
                ) {
                    return;
                }


                const rect =
                    link.getBoundingClientRect();


                const x =
                    event.clientX
                    - rect.left
                    - rect.width / 2;


                const y =
                    event.clientY
                    - rect.top
                    - rect.height / 2;


                link.style.transform =
                    `translate(
                        ${x * 0.15}px,
                        ${y * 0.15}px
                    )`;

            }
        );


        link.addEventListener(
            "mouseleave",
            () => {

                link.style.transform =
                    "";

            }
        );

    });



    /* =====================================================
       14. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-intro, \
             .experience-item, \
             .project-item, \
             .club-card, \
             .about-grid, \
             .interest-list, \
             .contact-inner"
        );


    revealElements.forEach(
        element => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(35px)";

            element.style.transition =
                "opacity .8s ease, \
                 transform .8s cubic-bezier(.22,.61,.36,1)";

        }
    );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";


                        revealObserver.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );



    /* =====================================================
       15. ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        navLinks.forEach(
                            link => {

                                link.classList.remove(
                                    "active"
                                );

                                const href =
                                    link.getAttribute(
                                        "href"
                                    );


                                if (
                                    href ===
                                    `#${entry.target.id}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    }
                );

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach(
        section => {

            sectionObserver.observe(
                section
            );

        }
    );



    /* =====================================================
       16. SMOOTH ANCHOR NAVIGATION
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetID =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        targetID === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });



    /* =====================================================
       17. CARD OPEN LABEL
    ===================================================== */

    cards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                if (cursorLabel) {

                    cursorLabel.querySelector(
                        "span"
                    ).textContent = "OPEN";

                }

            }
        );

    });



    /* =====================================================
       18. REDUCED MOTION SUPPORT
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

        document
            .querySelectorAll("*")
            .forEach(element => {

                element.style.scrollBehavior =
                    "auto";

            });

    }



    /* =====================================================
       19. INITIAL LOAD
    ===================================================== */

    window.dispatchEvent(
        new Event("scroll")
    );


    console.log(
        "Gayathri portfolio initialized."
    );

});
