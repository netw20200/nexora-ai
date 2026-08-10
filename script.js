/* =========================================================
   NEXORA — AI SaaS Landing Page
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       HEADER SCROLL
    ========================= */

    const header = document.querySelector(".site-header");

    const handleHeaderScroll = () => {
        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    handleHeaderScroll();

    window.addEventListener("scroll", handleHeaderScroll);


    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            mainNav.classList.toggle("active");
            document.body.classList.toggle("menu-open");

            const isOpen = mainNav.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        /* Close menu after clicking a link */

        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");
                document.body.classList.remove("menu-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", event => {

            const clickedInsideMenu =
                mainNav.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                mainNav.classList.contains("active")
            ) {

                mainNav.classList.remove("active");
                document.body.classList.remove("menu-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    }


    /* =========================
       FAQ ACCORDION
    ========================= */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        if (!question) return;

        question.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            /* Close all */

            faqItems.forEach(otherItem => {

                otherItem.classList.remove("active");

                const otherQuestion =
                    otherItem.querySelector(".faq-question");

                if (otherQuestion) {
                    otherQuestion.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

            });

            /* Open selected */

            if (!isActive) {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });


    /* =========================
       SMOOTH SCROLL
    ========================= */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================
       CURRENT YEAR
    ========================= */

    const yearElements =
        document.querySelectorAll("[data-year]");

    yearElements.forEach(element => {
        element.textContent =
            new Date().getFullYear();
    });


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements =
        document.querySelectorAll(
            ".feature-card, .step, .pricing-card, " +
            ".testimonial-card, .stat, .showcase-window"
        );

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    }


    /* =========================
       PRICING BUTTON DEMO
    ========================= */

    const pricingButtons =
        document.querySelectorAll(
            ".pricing-card .btn"
        );

    pricingButtons.forEach(button => {

        button.addEventListener("click", event => {

            const card =
                button.closest(".pricing-card");

            if (!card) return;

            const planName =
                card.querySelector(".pricing-name");

            if (planName) {

                console.log(
                    `Selected plan: ${planName.textContent.trim()}`
                );

            }

        });

    });


    /* =========================
       DEMO BUTTONS
    ========================= */

    const demoButtons =
        document.querySelectorAll(
            '[href="#demo"]'
        );

    demoButtons.forEach(button => {

        button.addEventListener("click", event => {

            const demo =
                document.querySelector("#demo");

            if (!demo) return;

            event.preventDefault();

            demo.scrollIntoView({
                behavior: "smooth"
            });

        });

    });


    /* =========================
       REDUCED MOTION
    ========================= */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (prefersReducedMotion.matches) {

        document.documentElement.style.scrollBehavior =
            "auto";

    }

});
