import "../scss/main.scss";
import { generateCountries } from "./countries.js";
var validate = require("validate.js");

window.addEventListener('load', function () {

    NodeList.prototype.forEach = Array.prototype.forEach;
    NodeList.prototype.some = Array.prototype.some;



    var selects = document.querySelectorAll("[name*='country'");

    var formSections = document.querySelectorAll('.form__section:not(:last-child)');

    var breadcrumbs = document.querySelectorAll(".breadcrumbs__item");

    var form = document.querySelector("form");
    var submitButton = document.querySelector(".form__submit");

    var cardNumber = document.querySelector(".form__input--cardnumber");

    var inputs = form.querySelectorAll('.form__input');

    var sameAsShipping = document.querySelector(".form__same-as-shipping");

    var geolocation = document.querySelector(".geolocation");

    var constraints = {
        "shipping phone": {
            presence: {allowEmpty: false},
            format: {
                pattern: "[0-9]+",
                message: "can only contain 0-9"
            }, 
            length: {
                is: 10
            }
        },
        "shipping name": {
            presence: {allowEmpty: false}
        }, 

        "shipping street": {
            presence: {allowEmpty: false}
        },

        "shipping city": {
            presence: {allowEmpty: false}
        },

        "shipping country": {
            presence: {allowEmpty: false}
        },

        "shipping zip": {
            presence: {allowEmpty: false},
            format: {
                pattern: "[0-9]+",
                message: "can only contain 0-9"
            }
        },
        "billing name": {
            presence: {allowEmpty: false}
        },
        "billing email": {
            presence: {allowEmpty: false},
            email: {message: "doesn't look like a valid email"}
        },
        "billing street": {
            presence: {allowEmpty: false}
        },
        "billing city": {
            presence: {allowEmpty: false}
        },
        "billing country": {
            presence: {allowEmpty: false}
        },
        "billing zip": {
            presence: {allowEmpty: false},
            format: {
                pattern: "[0-9]+",
                message: "can only contain 0-9"
            }
        },
        "card holder name": {
            presence: {allowEmpty: false}
        },
        "card number": {
            presence: {allowEmpty: false},
            format: {
                pattern: /^(34|37|4|5[1-5]).*$/,
                message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                  return validate.format("^%{num} is not a valid credit card number", {
                    num: value
                  });
                }
              },
        },
        "expire date": {
            presence: {allowEmpty: false}
        },
        "security code": {
            presence: {allowEmpty: false},
            format: {
                pattern: "[0-9]+",
                message: "can only contain 0-9"
            }
        }

    }

    generateCountries(selects);

    form.addEventListener('submit', (event) => {

        event.preventDefault();

        var errors = showErrors(form);

        if (errors) {
            return
        }
        form.submit();
    });

    // Continue next step

    formSections.forEach(section => {
        section.addEventListener('click', (event) => {
            var el = event.target;
            if (el.classList.contains('button')) {

                var errors = showErrors(section);

                if (errors) {
                    return
                }

                section.style.display = 'none';
                section.nextElementSibling.style.display = "block";

                breadcrumbStep(section.nextElementSibling);
            }
        });
    });


    // breadcrumb

    function breadcrumbStep(section) {

        breadcrumbs.forEach(crumb => crumb.classList.remove("breadcrumbs__item--active", "breadcrumbs__item--before"));

        var name = section.className.split("--")[1];

        breadcrumbs.some(crumb => {
            if (crumb.className.match(name)) {
                crumb.classList.add("breadcrumbs__item--active");
                return true;
            }

            crumb.classList.add("breadcrumbs__item--before");
            return false;
        });

    }

    //same as shipping 

    //     sameAsShipping.addEventListener('click', (e) => {
    //         var shippingFields = document.querySelectorAll(`.field__input--name-shipping, 
    //                                                        .field__input--street-shipping, 
    //                                                        .field__input--apt-shipping,
    //                                                        .field__input--city-shipping,
    //                                                        .field__input--city-shipping,
    //                                                        .field__input--country-shipping,
    //                                                        .field__input--zip-shipping`);

    //         var billingFields = document.querySelectorAll(`.field__input--name-billing, 
    //                                                         .field__input--street-billing, 
    //                                                         .field__input--apt-billing,
    //                                                         .field__input--city-billing,
    //                                                         .field__input--city-billing,
    //                                                         .field__input--country-billing,
    //                                                         .field__input--zip-billing`);

    //         shippingFields.forEach( (field, index) => { billingFields[index].value = field.value } );
    //     });


    //     // Validation

    function showErrors(section) {

        var error = document.querySelector("form .error");
        if (error) {
            var parent = error.parentNode;
            parent.removeChild(error);
            inputs.forEach(input => {
                input.classList.remove("form__input--error-background");
                input.classList.remove("form__input--error-shadow");
            })

        }

        inputs = section.querySelectorAll('.form__input');

        var invalid = inputs.some(input => {

            var singleConstraint = constraints[input.name];
            var message = singleConstraint ? validate.single(input.value, singleConstraint) : false;

            if (message) {
                var newError = document.createElement("p");
                newError.classList.add("error");
                newError.innerHTML = message[0];

                input.parentNode.appendChild(newError);

                input.classList.add("form__input--error-shadow")

                inputs.forEach(el => {
                    if (!el.validity.valid) {
                        el.classList.add("form__input--error-background");
                    }
                });

                return true;
            }
            return false;
        });

        return invalid;
    }

    //     // Detect card

    //     cardNumber.addEventListener('input', e => {
    //         var number = e.target.value;

    //         number = number.split(" ").join("");

    //         if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) {
    //             e.target.className = "field__input field__input--cardnumber field__input--Mastercard";
    //         }

    //         else if (/^4/.test(number)) {
    //             e.target.className = "field__input field__input--cardnumber field__input--Visa";
    //         }

    //         else {
    //             e.target.className = "field__input field__input--cardnumber";
    //         }

    //     });

    //     // geolocation 

    //     (function detectGeolocation() {
    //         if (navigator.geolocation) {

    //             geolocation.addEventListener('click', getLocation)


    //         } else {
    //             geolocation.style.display = "none";
    //         }
    //     })();

    //     function getLocation(e) {
    //         navigator.geolocation.getCurrentPosition( (position) => {
    //             e.target.previousElementSibling.value = `latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`;
    //         });
    //     }
});