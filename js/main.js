(() => {
    const translations = {
        en: {
            language: { label: "Choose language" },
            nav: { services: "Services", work: "Work", team: "Team", contact: "Contact", home: "Home" },
            hero: {
                title: "Welcome to Malko Labs",
                intro: "We are a creative digital agency focused on web design, UI/UX, web development, and digital experiences. We combine thoughtful design, modern technology, and performance-focused development to turn ideas into websites and digital products that look great, work smoothly, and make an impact. <br>From responsive websites and custom interfaces to optimization, digital solutions, and emerging technologies, we build experiences designed around people, purpose, and performance.",
                motto: "We design. We develop. We optimize. We build for the future.",
                servicesCta: "View Our Services", contactCta: "Get in Touch"
            },
            services: {
                title: "Our Services", webTitle: "Web Development & Digital Experiences",
                webDescription: "We turn ambitious ideas into digital experiences that work beautifully. Through thoughtful UI/UX design, front-end development, and WordPress, we build websites around your users and your business goals. From clear navigation to responsive layouts and faster load times, every detail has a purpose. The result is an accessible, refined website that feels effortless to use, is simple to manage, and gives your business room to grow.",
                videoTitle: "Videography & Motion Design",
                videoDescription: "We create engaging visual content, motion graphics, and digital media designed to communicate ideas clearly and capture attention."
            },
            work: { title: "Projects", description: "A selection of projects and digital experiences created by Malko Labs.", comingSoon: "Selected work coming soon", future: "New projects will be added here as they are ready to share." },
            team: { title: "Meet the Team", description: "Two brothers combining our skills to build thoughtful digital experiences at Malko Labs.", malkoAlt: "Portrait placeholder for Malko", malkoRole: "Web Developer & UI/UX Designer", brotherAlt: "Portrait placeholder for Malko's brother", brotherName: "My Brother", brotherRole: "Role and skills to be added" },
            contact: { title: "Contact", description: "Tell us about your project or get in touch on WhatsApp.", name: "Name", email: "Email", message: "Message", send: "Send", whatsapp: "WhatsApp", whatsappLabel: "Contact Malko Labs on WhatsApp" },
            footer: { tagline: "Thoughtful design. Modern technology. Digital experiences built for the future.", socialLabel: "Social media links" }
        },
        fr: {
            language: { label: "Choisir la langue" },
            nav: { services: "Services", work: "Projets", team: "Équipe", contact: "Contact", home: "Accueil" },
            hero: {
                title: "Bienvenue chez Malko Labs",
                intro: "Nous sommes une agence digitale créative spécialisée en design web, UI/UX, développement web et expériences numériques. Nous associons un design réfléchi, des technologies modernes et un développement axé sur la performance pour transformer vos idées en sites web et produits numériques esthétiques, fluides et percutants. <br>Des sites adaptatifs aux interfaces sur mesure, en passant par l’optimisation, les solutions numériques et les technologies émergentes, nous concevons des expériences centrées sur les personnes, vos objectifs et la performance.",
                motto: "Nous concevons. Nous développons. Nous optimisons. Nous préparons l’avenir.",
                servicesCta: "Découvrir nos services", contactCta: "Parlons de votre projet"
            },
            services: {
                title: "Nos services", webTitle: "Développement web et expériences numériques",
                webDescription: "Nous transformons les idées ambitieuses en expériences numériques agréables à utiliser. Grâce à une conception UI/UX réfléchie, au développement front-end et à WordPress, nous créons des sites adaptés à vos utilisateurs et à vos objectifs. Navigation claire, mise en page adaptative et chargement rapide : chaque détail a son utilité. Vous obtenez un site accessible et soigné, facile à utiliser comme à gérer, qui accompagne la croissance de votre activité.",
                videoTitle: "Vidéo et animation graphique",
                videoDescription: "Nous créons des contenus visuels captivants, des animations graphiques et des médias numériques qui transmettent clairement vos idées et retiennent l’attention."
            },
            work: { title: "Projets", description: "Une sélection de projets et d’expériences numériques créés par Malko Labs.", comingSoon: "Nos réalisations arrivent bientôt", future: "De nouveaux projets seront présentés ici dès qu’ils pourront être partagés." },
            team: { title: "Rencontrez l’équipe", description: "Deux frères réunissent leurs compétences pour créer des expériences numériques réfléchies chez Malko Labs.", malkoAlt: "Portrait provisoire de Malko", malkoRole: "Développeur web et designer UI/UX", brotherAlt: "Portrait provisoire du frère de Malko", brotherName: "My Brother", brotherRole: "Rôle et compétences à préciser" },
            contact: { title: "Contact", description: "Parlez-nous de votre projet ou contactez-nous sur WhatsApp.", name: "Nom", email: "E-mail", message: "Message", send: "Envoyer", whatsapp: "WhatsApp", whatsappLabel: "Contacter Malko Labs sur WhatsApp" },
            footer: { tagline: "Un design réfléchi. Des technologies modernes. Des expériences numériques tournées vers l’avenir.", socialLabel: "Réseaux sociaux" }
        }
    };

    const translationValue = (language, path) => path.split(".").reduce((value, key) => value?.[key], translations[language]);
    const applyLanguage = (language) => {
        const selectedLanguage = translations[language] ? language : "en";
        document.documentElement.lang = selectedLanguage;
        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const value = translationValue(selectedLanguage, element.dataset.i18n);
            if (value !== undefined) element.textContent = value;
        });
        document.querySelectorAll("[data-i18n-html]").forEach((element) => {
            const value = translationValue(selectedLanguage, element.dataset.i18nHtml);
            if (value !== undefined) element.innerHTML = value;
        });
        ["aria-label", "alt", "placeholder", "title"].forEach((attribute) => {
            document.querySelectorAll(`[data-i18n-${attribute}]`).forEach((element) => {
                const value = translationValue(selectedLanguage, element.dataset[`i18n${attribute[0].toUpperCase()}${attribute.slice(1)}`]);
                if (value !== undefined) element.setAttribute(attribute, value);
            });
        });
        document.querySelectorAll(".language-button").forEach((button) => {
            button.setAttribute("aria-pressed", String(button.dataset.language === selectedLanguage));
        });
        localStorage.setItem("language", selectedLanguage);
    };

    document.querySelectorAll(".language-button").forEach((button) => {
        button.addEventListener("click", () => applyLanguage(button.dataset.language));
    });
    applyLanguage(localStorage.getItem("language") || "en");

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
