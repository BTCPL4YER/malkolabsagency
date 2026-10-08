export const initAnimations = () => {
    const revealElements = document.querySelectorAll(".hero-content, .services > h2, .service-card, .portfolio-section h2, .portfolio-card, .team-member, .contact-form, .site-footer");
    if (!revealElements.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("reveal", "visible"));
        return;
    }

    document.documentElement.classList.add("js");
    const observer = new IntersectionObserver((entries, activeObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            activeObserver.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        observer.observe(element);
    });
};
