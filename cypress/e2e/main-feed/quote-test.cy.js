/// <reference types="cypress" />

describe("landing page", () => {
  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(Cypress.env("front_url"));
    cy.get("#login-button").click();
    cy.get("#username").type("admin");
    cy.get("#password").type("admin");
    cy.get("#login").click();
  });

  it("go to movie description and add quote", () => {
    cy.get("#movies-list").click();
    cy.get("#movie-element").click();
    cy.get("#add-quote-modal").click();
    cy.get("#quote_en").type("test");
    cy.get("#quote_ka").type("ტესტი");
    cy.get("#image").selectFile("cypress/fixtures/test.png");
    cy.get("#movie-dropdown").click();
    cy.get("#movie-element").click();
    cy.get("#post-quote").click();
  });

  it("go to movie description and view quote", () => {
    cy.get("#movies-list").click();
    cy.get("#movie-element").click();
    cy.get("#quote-crud-modal").click();
    cy.get("#view-quote").click();
  });

  it("view quote and add comment", () => {
    cy.get("#movies-list").click();
    cy.get("#movie-element").click();
    cy.get("#quote-crud-modal").click();
    cy.get("#view-quote").click();
    cy.get("#comment-input").type("test{enter}");
  });

  it("go to movie description and edit quote", () => {
    cy.get("#movies-list").click();
    cy.get("#movie-element").click();
    cy.get("#quote-crud-modal").click();
    cy.get("#edit-quote").click();
    cy.get("#quote_en").type("edit quote");
    cy.get("#quote_ka").type("ციტატის რედაქტირება");
    cy.get("#post-quote").click();
  });

  it("go to movie description and delete quote", () => {
    cy.get("#movies-list").click();
    cy.get("#movie-element").click();
    cy.get("#quote-crud-modal").click();
    cy.get("#delete-quote").click();
  });
});
