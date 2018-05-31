import "../scss/main.scss";
import { generateCountries } from "./countries.js";

window.addEventListener('load', function () { 
    var selects = document.querySelectorAll("[name*='country'");
    generateCountries(selects);

    NodeList.prototype.forEach = Array.prototype.forEach;
    var formSections = document.querySelectorAll('.form__section:not(:last-child)');


    formSections.forEach(section => {
        section.addEventListener('click', (event) => {
            var el = event.target;
            if(el.classList.contains('button')) {
                section.style.display = 'none';
                section.nextElementSibling.style.display = "block";
            }
        });
    });
});