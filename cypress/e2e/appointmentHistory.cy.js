import CuraHealthcarePage from '../support/pageObjects/curaHealthcarePage';

// Noķer un ignorē jebkuras nenoķertas izņēmuma kļūdas
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe('Appointment History', () => {
  const curaPage = new CuraHealthcarePage();

  it('Appointment history should be empty', () => {
    curaPage.visit(); // Apmeklē testējamo lapu
    curaPage.clickMakeAppointment(); // Klikšķina uz "MakeAppointment"
    curaPage.fillLoginCredentials('John Doe', 'ThisIsNotAPassword'); // Aizpilda autorizācijas datus
    curaPage.clickLogin(); // Klikšķina uz "Login"
    curaPage.clickMenuIcon(); // Atver burgera izvēlni
    curaPage.clickHistory(); // Dodas uz Histrory sadaļu
    curaPage.validateNoAppointmentMessage(); // Pārbauda, ka nav tikšanās
  });
});