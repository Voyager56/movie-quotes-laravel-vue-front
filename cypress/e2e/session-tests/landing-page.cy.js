/// <reference types="cypress" />

describe("landing page", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("test log-in", () => {
    cy.intercept(
      {
        method: "POST",
        url: Cypress.env("back_url") + "/api/login",
      },
      {
        statusCode: 200,
      }
    ).as("login");
    cy.visit(Cypress.env("front_url"));
    cy.get("#login-button").click();
    cy.get("#username").type("admin");
    cy.get("#password").type("admin");
    cy.get("#login").click();

    cy.wait("@login").then((res) => res.statusCode === 200);
  });

  it("test registration", () => {
    cy.intercept(
      {
        method: "POST",
        url: Cypress.env("back_url") + "/api/register",
      },
      {
        statusCode: 200,
      }
    ).as("register");
    cy.visit(Cypress.env("front_url"));
    cy.get("#signup-button").click();
    cy.get("#username").type("username");
    cy.get("#email").type("somerandomemail@email.com");
    cy.get("#password").type("password");
    cy.get("#confirm-password").type("password");
    cy.get("#signup").click();
    cy.get("#email-sent").click();
    cy.wait("@register").then((res) => res.statusCode === 200);
  });

  it("language change test", () => {
    cy.get("#lang-dropdown").click();
    cy.get("#ka").click();
  });

  it("test logout", () => {
    cy.visit(Cypress.env("front_url"));
    cy.get("#login-button").click();
    cy.get("#username").type("admin");
    cy.get("#password").type("admin");
    cy.get("#login").click();
    cy.intercept(
      {
        method: "POST",
        url: Cypress.env("back_url") + "/api/logout",
      },
      {
        statusCode: 200,
      }
    ).as("logout");
    cy.get("#logout").click();
    cy.wait("@logout").then((res) => res.statusCode === 200);
  });
});
