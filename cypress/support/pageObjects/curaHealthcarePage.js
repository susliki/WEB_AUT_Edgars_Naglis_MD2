class CuraHealthcarePage {
  visit() {
    cy.visit('https://katalon-demo-cura.herokuapp.com/'); // Apmeklē URL
  }

  clickMakeAppointment() {
    cy.get('#btn-make-appointment').click(); //Funkcija click uz make appoitnment button
  }

  //Funkcija login un password
  fillLoginCredentials(username, password) {
    cy.get('#txt-username').type(username); 
    cy.get('#txt-password').type(password); 
  }

  // Funkcija click uz Login button
  clickLogin() {
    cy.get('#btn-login').click(); 
  }

  //Funkcija priekš pieraksta
  makeAppointment(details) {
    cy.get('#combo_facility').select(details.facility); // Izvēlas iestādi
    if (details.applyForHospitalReadmission) {
      cy.get('#chk_hospotal_readmission').click(); // Atzīmē uzņemšanas gadījumu
    }
    cy.get(`input[name="programs"][value="${details.programType}"]`).check(); // Izvēlas programmas tipu

    cy.get('#txt_visit_date').click(); // Atver kalendāru
    cy.contains('td:not(.new):not(.old)', '30').click(); // Izvēlas datumu

    cy.get('#txt_comment').type(details.comment); // Aizpilda komentāru
    cy.get('#btn-book-appointment').click(); // Apstiprina tikšanos
  }

  //Validacijas funkcijas bloks
  validateAppointmentDetails(expectedDetails) {
    cy.get('#facility').should('have.text', expectedDetails.facility); // Pārbauda iestādi
    const expectedHospitalReadmissionText = expectedDetails.hospitalReadmission ? "Yes" : "No";
    cy.get('#hospital_readmission').should('have.text', expectedHospitalReadmissionText); // Pārbauda uzņemšanas statusu
    cy.get('#program').should('have.text', expectedDetails.programType); // Pārbauda programmas tipu
    cy.get('#visit_date').should('have.text', expectedDetails.visitDate); // Pārbauda datumu
    cy.get('#comment').should('have.text', expectedDetails.comment); // Pārbauda komentāru
  }
  //Funkcija click burger
  clickMenuIcon() {
    cy.get('.fa-bars').click(); // Click uz burgera izvēlnes ikonas
    cy.get('#menu-close').should('be.visible'); // Pārbauda, ka izvēlne ir redzama
  }

  clickHistory() {
    this.clickMenuIcon(); // Atver burger izvēlni
    cy.get('#sidebar-wrapper.active').should('exist'); // Pārbauda, ka sānjosla ir aktīva
    cy.get('a[href="history.php#history"]').click(); // Dodas uz History pogu -- nestrāda 
  }
  //Funkcija validācijai
  validateNoAppointmentMessage() {
    cy.get('.text-center').should('have.text', 'No appointment.'); // Pārbauda, ka nav tikšanās
  }
}

export default CuraHealthcarePage;

