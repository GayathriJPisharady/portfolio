document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const header =
        document.getElementById("site-header");

    const progress =
        document.getElementById("progress-bar");

    const spotlight =
        document.getElementById("spotlight");

    const cursor =
        document.getElementById("cursor-label");

    const themeButton =
        document.getElementById("theme-toggle");

    const themeIcon =
        document.querySelector(".theme-icon");

    const overlay =
        document.getElementById("detail-overlay");

    const cards =
        document.querySelectorAll(".interactive-card");

    const panels =
        document.querySelectorAll(".detail-panel");

    const navLinks =
        document.querySelectorAll(".nav-links a");


    /* =========================================
       THEME
    ========================================= */

    const savedTheme =
        localStorage.getItem("gayathri-theme");

    const systemDark =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;


    if (
        savedTheme === "dark" ||
        (!savedTheme && systemDark)
    ) {

        body.classList.add("dark");

    }


    function updateThemeIcon() {

        if (!themeIcon) return;

        themeIcon.textContent =
            body.classList.contains("dark")
                ? "☀"
                : "☾";

    }


    updateThemeIcon();


    themeButton?.addEventListener(
        "click",
        () => {

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

        }
    );


    /* =========================================
       SCROLL PROGRESS
    ========================================= */

    function updateScroll() {

        const scrollTop =
            window.scrollY;

        const maxScroll =
            document.documentElement.scrollHeight
            - window.innerHeight;


        if (progress) {

            const percentage =
                maxScroll > 0
                    ? (scrollTop / maxScroll) * 100
                    : 0;

            progress.style.width =
                `${percentage}%`;

        }


        if (header) {

            header.classList.toggle(
                "scrolled",
                scrollTop > 30
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateScroll,
        { passive: true }
    );


    updateScroll();


    /* =========================================
       SPOTLIGHT
    ========================================= */

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

        },
        { passive: true }
    );


    function animateCursor() {

        currentX +=
            (mouseX - currentX) * .12;

        currentY +=
            (mouseY - currentY) * .12;


        if (spotlight) {

            spotlight.style.left =
                `${currentX}px`;

            spotlight.style.top =
                `${currentY}px`;

        }


        if (cursor) {

            cursor.style.left =
                `${mouseX}px`;

            cursor.style.top =
                `${mouseY}px`;

        }


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    /* =========================================
       CARD CURSOR
    ========================================= */

    cards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                if (
                    window.matchMedia(
                        "(pointer:fine)"
                    ).matches
                ) {

                    cursor?.classList.add(
                        "visible"
                    );

                }

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                cursor?.classList.remove(
                    "visible"
                );

                card.style.transform = "";

            }
        );


        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX
                    - rect.left;


                const y =
                    event.clientY
                    - rect.top;


                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );


                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );


                if (
                    !window.matchMedia(
                        "(pointer:fine)"
                    ).matches
                ) {
                    return;
                }


                if (
                    card.classList.contains(
                        "project-item"
                    ) ||
                    card.classList.contains(
                        "club-card"
                    )
                ) {

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        ((centerY - y)
                        / centerY) * 3;


                    const rotateY =
                        ((x - centerX)
                        / centerX) * 3;


                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-6px)
                         scale(1.01)`;

                }

            }
        );

    });


    /* =========================================
       DETAIL PANELS
    ========================================= */

    function openPanel(id) {

        const panel =
            document.getElementById(
                `modal-${id}`
            );


        if (!panel) return;


        panels.forEach(item => {

            item.classList.remove(
                "active"
            );

        });


        panel.classList.add(
            "active"
        );


        overlay?.classList.add(
            "active"
        );


        body.classList.add(
            "modal-open"
        );

    }


    function closePanel() {

        panels.forEach(panel => {

            panel.classList.remove(
                "active"
            );

        });


        overlay?.classList.remove(
            "active"
        );


        body.classList.remove(
            "modal-open"
        );

    }


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


    document
        .querySelectorAll(".detail-close")
        .forEach(button => {

            button.addEventListener(
                "click",
                closePanel
            );

        });


    overlay?.addEventListener(
        "click",
        closePanel
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closePanel();

            }

        }
    );


    /* =========================================
       ROLE ROTATION
    ========================================= */

    const role =
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


    if (role) {

        setInterval(() => {

            role.style.opacity = "0";

            role.style.transform =
                "translateY(6px)";


            setTimeout(() => {

                roleIndex =
                    (roleIndex + 1)
                    % roles.length;


                role.textContent =
                    roles[roleIndex];


                role.style.opacity =
                    "1";

                role.style.transform =
                    "translateY(0)";

            }, 300);

        }, 3000);

    }


    /* =========================================
       MAGNETIC LINKS
    ========================================= */

    document
        .querySelectorAll(".magnetic-link")
        .forEach(link => {

            link.addEventListener(
                "mousemove",
                event => {

                    if (
                        !window.matchMedia(
                            "(pointer:fine)"
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
                            ${x * .12}px,
                            ${y * .12}px
                        )`;

                }
            );


            link.addEventListener(
                "mouseleave",
                () => {

                    link.style.transform = "";

                }
            );

        });


    /* =========================================
       REVEAL
    ========================================= */

    const revealItems =
        document.querySelectorAll(
            ".section-intro, \
             .experience-item, \
             .project-item, \
             .club-card, \
             .about-grid, \
             .interest-list, \
             .contact-inner"
        );


    if (
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        revealItems.forEach(item => {

            item.style.opacity = "0";

            item.style.transform =
                "translateY(28px)";

            item.style.transition =
                "opacity .7s ease, \
                 transform .7s cubic-bezier(.22,.61,.36,1)";

        });


        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

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

                    });

                },
                {
                    threshold: .12
                }
            );


        revealItems.forEach(item => {

            revealObserver.observe(item);

        });

    }


    /* =========================================
       ACTIVE NAV
    ========================================= */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute(
                                "href"
                            ) ===
                            `#${entry.target.id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                threshold: .35
            }
        );


    sections.forEach(section => {

        navObserver.observe(section);

    });


    /* =========================================
       ESCAPE PANEL ON MOBILE BACK
    ========================================= */

    window.addEventListener(
        "popstate",
        closePanel
    );


});
