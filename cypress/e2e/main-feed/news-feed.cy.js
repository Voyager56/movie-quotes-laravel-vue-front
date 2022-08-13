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

  it("write new quote", () => {
    cy.intercept(
      {
        method: "POST",
        url: Cypress.env("back_url") + "/api/quotes",
      },
      {
        statusCode: 200,
      }
    ).as("new-quote");
    cy.get("#open-quote-modal").click();
    cy.get("#quote_en").type("test");
    cy.get("#quote_ka").type("ტესტი");
    cy.get("#image").selectFile("cypress/fixtures/test.png");
    cy.get("#movie-dropdown").click();
    cy.get("#movie-element").click();
    cy.get("#post-quote").click();
    cy.wait("@new-quote").then((res) => res.statusCode === 200);
  });

  it("open search", () => {
    cy.get("#open-search").click();
    cy.get("#search-input").type("test{enter}");
  });

  it("open notification dropdown", () => {
    cy.get("#notification-dropdown").click();
  });

  it("go to edit profile page", () => {
    cy.get("#edit-profile").click();
    cy.get("#my-profile").should("be.visible");
  });

  it("write a comment", () => {
    cy.get("#comment-input").type("test{enter}");
  });

  it("like a post", () => {
    cy.get("#like-button").click();
  });
});
