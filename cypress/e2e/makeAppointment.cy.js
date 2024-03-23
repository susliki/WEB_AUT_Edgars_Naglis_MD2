import CuraHealthcarePage from '../support/pageObjects/curaHealthcarePage';

// Noķer un ignorē jebkuras nenoķertas izņēmuma kļūdas
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe('Make an Appointment', () => {
  const curaPage = new CuraHealthcarePage();

  it('User can make an appointment', () => {
    curaPage.visit(); // Apmeklē testējamo lapu
    curaPage.clickMakeAppointment(); // Click uz "Veikt tikšanos"
    curaPage.fillLoginCredentials('John Doe', 'ThisIsNotAPassword'); // Aizpilda autorizācijas datus
    curaPage.clickLogin(); // Click uz "Login"

    const appointmentDetails = {
      facility: 'Seoul CURA Healthcare Center',
      applyForHospitalReadmission: true,
      programType: 'Medicaid',
      visitDate: '30',
      comment: 'CURA Healthcare Service'
    }; // Definē tikšanās detaļas


    // Izveido tikšanos ar norādītajām detaļām
    curaPage.makeAppointment(appointmentDetails); 

    const expectedDetails = {
      facility: 'Seoul CURA Healthcare Center',
      hospitalReadmission: true, 
      programType: 'Medicaid',
      visitDate: '30/03/2024', 
      comment: 'CURA Healthcare Service'
    }; 

    // Validē tikšanās detaļas

    curaPage.validateAppointmentDetails(expectedDetails); 
  });
});
