/// <reference types="cypress" />

describe("landing page", () => {
  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  beforeEach(() => {
    cy.visit(Cypress.env("front_url"));
    cy.get("#login-button").click();
    cy.get("#username").type("admin");
    cy.get("#password").type("admin");
    cy.get("#login").click();
  });

  it("edit profile", () => {
    cy.get("#edit-profile").click();
    cy.intercept(
      {
        method: "POST",
        url: Cypress.env("back_url") + "/api/edit-profile",
      },
      {
        statusCode: 200,
      }
    ).as("edit-profile");
    cy.get("#image").selectFile("cypress/fixtures/test.png");
    cy.get("#username").type("test");
    cy.get("#email").type("test@email.com");
    cy.get("#password-button").click();
    cy.get("#password").type("password");
    cy.get("#confirm_password").type("password");
    cy.get("#save-button").click();
    cy.wait("@edit-profile").then((res) => res.statusCode === 200);
  });
});
