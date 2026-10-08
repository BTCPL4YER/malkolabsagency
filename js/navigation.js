export const initNavigation = () => {
    const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
    const sections = links.map((link) => document.querySelector(link.hash)).filter(Boolean);
    if (!links.length || !sections.length) return;

    const setActiveSection = (sectionId) => {
        links.forEach((link) => {
            const active = link.hash === `#${sectionId}`;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
        });
    };

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        if (link.hash.length < 2) return;
        const target = document.querySelector(link.hash);
        if (!target || !sections.includes(target)) return;
        link.addEventListener("click", (event) => {
            event.preventDefault();
            target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
            if (window.location.hash !== link.hash) history.replaceState(null, "", link.hash);
            setActiveSection(target.id);
        });
    });

    setActiveSection(sections.find((section) => `#${section.id}` === window.location.hash)?.id || sections[0].id);
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
    }, { threshold: [0.15, 0.35, 0.6], rootMargin: "-10% 0px -35% 0px" });
    sections.forEach((section) => observer.observe(section));
};
