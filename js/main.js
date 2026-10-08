(() => {
    const revealTargets = document.querySelectorAll(
        ".hero-content, .services > h2, .service-card, .portfolio-section h2, .portfolio-card, .team-member, .whatsapp-button, .contact-form, .site-footer"
    );

    if (revealTargets.length) {
        document.documentElement.classList.add("js");
        revealTargets.forEach((element) => element.classList.add("reveal-on-scroll"));

        if (!("IntersectionObserver" in window)) {
            revealTargets.forEach((element) => element.classList.add("is-visible"));
        } else {
            const revealObserver = new IntersectionObserver(
                (entries, activeObserver) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;

                        entry.target.classList.add("is-visible");
                        activeObserver.unobserve(entry.target);
                    });
                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px",
                }
            );

            revealTargets.forEach((element) => revealObserver.observe(element));
        }
    }

    const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    const setActiveSection = (sectionId) => {
        navLinks.forEach((link) => {
            const isActive = link.hash === `#${sectionId}`;
            link.classList.toggle("active", isActive);
            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    navLinks.forEach((link) => {
        link.addEventListener("click", () => setActiveSection(link.hash.slice(1)));
    });

    const initialSection = sections.find((section) => `#${section.id}` === window.location.hash);
    setActiveSection(initialSection?.id || sections[0]?.id);

    if (sections.length && "IntersectionObserver" in window) {
        const navigationObserver = new IntersectionObserver(
            () => {
                const marker = window.innerHeight * 0.4;
                const currentSection = sections.find((section) => {
                    const bounds = section.getBoundingClientRect();
                    return bounds.top <= marker && bounds.bottom > marker;
                });

                if (currentSection) setActiveSection(currentSection.id);
            },
            { threshold: 0, rootMargin: "-10% 0px -35% 0px" }
        );

        sections.forEach((section) => navigationObserver.observe(section));
    }
})();
