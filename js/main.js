import { initNavigation } from "./navigation.js";
import { initAnimations } from "./animations.js";
import { initLanguage } from "./language.js";
import { initForm } from "./form.js";

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initAnimations();
    initLanguage();
    initForm();
});
