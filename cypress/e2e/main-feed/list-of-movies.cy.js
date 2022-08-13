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

  it("go to movie list and search", () => {
    cy.get("#movies-list").click();
    cy.get("#open-search").click();
    cy.get("#movie-search-input").type("test{enter}");
  });

  it("add movie", () => {
    cy.get("#movies-list").click();
    cy.get("#add-movie-modal").click();
    cy.get("#title_en").type("title");
    cy.get("#title_ka").type("სათაური");
    cy.get("#release_date").type("2001");
    cy.get("#budget").type("1000000");
    cy.get("#multiselect").click().type("Action{enter}");
    cy.get("#budget").click();
    cy.get("#director_en").type("director");
    cy.get("#director_ka").type("რეჟისორი");
    cy.get("#description_en").type("description");
    cy.get("#description_ka").type("აღწერა");
    cy.get("#image").selectFile("cypress/fixtures/test.png");
    cy.get("#submit").click();
  });

  it("edit-movie", () => {
    cy.get("#movies-list").click();
    cy.get("#movie-element").click();
    cy.get("#edit-movie").click();
    cy.get("#title_en").type("title");
    cy.get("#title_ka").type("სათაური");
    cy.get("#release_date").type("2001");
    cy.get("#budget").type("1000000");
    cy.get("#multiselect").click().type("Action{enter}");
    cy.get("#budget").click();
    cy.get("#director_en").type("director");
    cy.get("#director_ka").type("რეჟისორი");
    cy.get("#description_en").type("description");
    cy.get("#description_ka").type("აღწერა");
    cy.get("#image").selectFile("cypress/fixtures/test.png");
    cy.get("#submit").click();
  });

  it("delete movie", () => {
    cy.get("#movies-list").click();
    cy.get("#movie-element").click();
    cy.get("#delete-movie").click();
  });
});
