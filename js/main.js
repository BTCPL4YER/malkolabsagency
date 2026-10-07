(() => {
    const revealTargets = document.querySelectorAll(
        ".hero-content, .services > h2, .service-card, .site-footer"
    );

    if (!revealTargets.length) return;

    document.documentElement.classList.add("js");
    revealTargets.forEach((element) => element.classList.add("reveal-on-scroll"));

    if (!("IntersectionObserver" in window)) {
        revealTargets.forEach((element) => element.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
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

    revealTargets.forEach((element) => observer.observe(element));
})();
