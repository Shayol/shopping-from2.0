import "../scss/main.scss";

window.addEventListener('load', function () { 

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