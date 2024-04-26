// @ts-nocheck
Cypress.Commands.add("kcLogout", () => {
  Cypress.log({ name: "Logout" });
  const authBaseUrl = Cypress.env("auth_base_url");
  const realm = Cypress.env("auth_realm");

  return cy.request({
    url: `${authBaseUrl}/realms/${realm}/protocol/openid-connect/logout`
  })
  .then(function (response) {
      const html = document.createElement("html");
      html.innerHTML = response.body;
      const form = html.getElementsByTagName("form")[0];
      const inputs = form.getElementsByTagName("input")
      const actionUrl = form.getAttribute('action');
      const url = `${authBaseUrl}${actionUrl}`;
      const body: Record<string, string> = {};
      for (let _i = 0, _a = Array.prototype.slice.call(inputs); _i < _a.length; _i++) {
          const input = _a[_i];
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