describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get('[alt="Sylvia Palmer"]').click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {

    cy.get('[alt="Edit"]')
      .first()
      .click({ force: true });

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Marilyn Monroe")
    cy.get('[alt="Tori Malcolm"]').click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Marilyn Monroe");
    cy.contains(".appointment__card--show", "Tori Malcolm");

  })

  it("should cancel an interview", () => {
    // clicks the delete button

    cy.get('[alt="Delete"]')
      .first()
      .click({ force: true });

    cy.get("[data-testid=appointment-actions]")
      .contains("Confirm")
      .click()
    // check deleting indicator exists
    cy.get('[data-testid=status]')
      .contains("Deleting")
    // check deleting indicator does not exist
    cy.contains("Deleting").should("not.exist");
    // check that .appointment__card--show element that contains the text "Archie Cohen" should not exist
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  })
});
