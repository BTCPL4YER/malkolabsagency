import { translate } from "./language.js";

export const initForm = () => {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    const status = document.createElement("p");
    status.className = "form-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    form.append(status);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        status.textContent = "";
        const requiredFields = [...form.querySelectorAll("[required]")];
        const emptyField = requiredFields.find((field) => !field.value.trim());
        if (emptyField) {
            status.textContent = translate("contact.form.required");
            emptyField.focus();
            return;
        }
        const email = form.querySelector('input[type="email"]');
        if (email && !email.validity.valid) {
            status.textContent = translate("contact.form.invalidEmail");
            email.focus();
            return;
        }
        status.textContent = translate("contact.form.success");
    });

    document.addEventListener("languagechange", () => {
        status.textContent = "";
    });
};
