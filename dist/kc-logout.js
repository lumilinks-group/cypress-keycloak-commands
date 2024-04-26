"use strict";
// @ts-nocheck
Cypress.Commands.add("kcLogout", function () {
    Cypress.log({ name: "Logout" });
    var authBaseUrl = Cypress.env("auth_base_url");
    var realm = Cypress.env("auth_realm");
    return cy.request({
        url: authBaseUrl + "/realms/" + realm + "/protocol/openid-connect/logout"
    })
        .then(function (response) {
        var html = document.createElement("html");
        html.innerHTML = response.body;
        var form = html.getElementsByTagName("form")[0];
        var inputs = form.getElementsByTagName("input");
        var actionUrl = form.getAttribute('action');
        var url = "" + authBaseUrl + actionUrl;
        var body = {};
        for (var _i = 0, _a = Array.prototype.slice.call(inputs); _i < _a.length; _i++) {
            var input = _a[_i];
            body[input.name] = input.value;
        }
        return cy.request({
            method: "POST",
            url: url,
            followRedirect: false,
            form: true,
            body: body
        });
    });
});
