"use strict";

$(function () {
    var contactForm = $("#contact_form"),
        response = {},
        validationMessage = {
            "nameValidation": "Please Enter Your Name",
            "emailValidation": "Please Use Valid Email",
            "messageValidation": "The Message Can't Be Empty",
            "SuccessMessage": "Your Message Has Been Sent"
        },
        sendingMessage = false;

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validateEmpty(str) {
        var re = /\S/;
        return re.test(str)
    }

    function add_error(errorType) {
        response["Error"] = true;
        if (!response["ErrorType"]) {
            response["ErrorType"] = [];
        }
        response["ErrorType"].push(errorType);
    }

    function append_response() {
        if (response["Error"]) {
            if (response["ErrorType"]) {
                for (var i = 0; i < response["ErrorType"].length; i++) {
                    $("[data-" + response["ErrorType"][i] + "]").addClass("kayoErrorInput").parent().append("<p class='kayoAlert kayoError'>" + validationMessage[response["ErrorType"][i]] + "</p>");
                }
            } else {
                contactForm.prepend("<p class='kayoAlert kayoError'>" + response["Error"] + "</p>");
            }
        } else {
            contactForm.prepend("<p class='kayoAlert kayoSuccess'>" + validationMessage["SuccessMessage"] + "</p>");
        }
    }

    contactForm.on("submit", function (event) {
        event.preventDefault();
        if (!sendingMessage) {
            sendingMessage = true;
            var thisForm = $(this);
            response = {};
            thisForm.find(".kayoAlert").remove();
            thisForm.addClass("kayo-submiting").find("*").removeClass("kayoErrorInput");
            thisForm.find("[type=submit]").attr('disabled', 'disabled');
            var full_name = thisForm.find("[name=full_name]").val(),
                email = thisForm.find("[name=email]").val(),
                message = thisForm.find("[name=message]").val();

            if (!validateEmpty(full_name)) {
                add_error("nameValidation")
            }
            if (!validateEmail(email)) {
                add_error("emailValidation");
            }
            if (!validateEmpty(message)) {
                add_error("messageValidation");
            }
            if (jQuery.isEmptyObject(response)) {
                response["Error"] = false;
                response = {};
                $.post('/contact', thisForm.serialize(), function (result) {
                    response = result;
                    append_response();
                    thisForm.removeClass("kayo-submiting");
                    sendingMessage = false;
                    thisForm.find("[type=submit]").removeAttr("disabled")
                });
            } else {
                append_response();
                thisForm.removeClass("kayo-submiting");
                thisForm.find("[type=submit]").removeAttr("disabled")
                sendingMessage = false;
            }
        }
    });

    function callbackFunction(resp) {
        if (resp.result === 'success') {
            $("#mc-email").val("");
        }
    }

});
