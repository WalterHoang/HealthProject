package finalProject.services.validation;

import finalProject.entities.Address;
import finalProject.entities.Insurance;
import finalProject.entities.Patient;
import finalProject.entities.Sex;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class PatientValidationTest {
    private PatientValidation patientValidation = new PatientValidation();

    private Address testAddress = new Address("123 test street",
            "test city",
            "CO",
            "12345");
    private Insurance testInsurance = new Insurance("Medicaid");
    private Sex testSex = new Sex("Male");
    private Patient testPatient;

    @Before
    public void setUp() throws Exception {
        testPatient = new Patient("Walter",
                "Hoang",
                "123-45-6789",
                testAddress,
                22,
                59,
                195,
                testInsurance,
                testSex);
    }


    @Test
    public void validatePatientInfo() {
        assertTrue(patientValidation.validatePatientInfo(testPatient));
    }

    @Test
    public void invalidFirstName() {
        testPatient.setFirstName("");
        assertFalse(patientValidation.validatePatientInfo(testPatient));
    }
    @Test
    public void invalidLastName(){
        testPatient.setLastName("");
        assertFalse(patientValidation.validatePatientInfo(testPatient));
    }
    @Test
    public void invalidSsn(){
        testPatient.setSsn("");
        assertFalse(patientValidation.validatePatientInfo(testPatient));
    }
    @Test
    public void invalidAddress(){
        testPatient.setAddress(null);
        assertFalse(patientValidation.validatePatientInfo(testPatient));
        testPatient.setAddress(testAddress);
        testAddress.setStreet("");
        assertFalse(patientValidation.validatePatientInfo(testPatient));
        testAddress.setStreet("1234");
        testAddress.setCity("");
        assertFalse(patientValidation.validatePatientInfo(testPatient));
        testAddress.setCity("denver");
        testAddress.setState("A");
        assertFalse(patientValidation.validatePatientInfo(testPatient));
        testAddress.setState("CO");
        testAddress.setZip("12");
        assertFalse(patientValidation.validatePatientInfo(testPatient));
    }
    @Test
    public void invalidAge(){
        testPatient.setAge(0);
        assertFalse(patientValidation.validatePatientInfo(testPatient));
    }
    @Test
    public void invalidHeight(){
        testPatient.setHeight(0);
        assertFalse(patientValidation.validatePatientInfo(testPatient));
    }
    @Test
    public void invalidWeight(){
        testPatient.setWeight(0);
        assertFalse(patientValidation.validatePatientInfo(testPatient));
    }
    @Test
    public void invalidInsurance(){
        testPatient.setInsurance(null);
        assertFalse(patientValidation.validatePatientInfo(testPatient));
        testPatient.setInsurance(testInsurance);
        testInsurance.setInsurance("");
        assertFalse(patientValidation.validatePatientInfo(testPatient));
    }
    @Test
    public void invalidSex(){
        testPatient.setSex(null);
        assertFalse(patientValidation.validatePatientInfo(testPatient));
        testPatient.setSex(testSex);
        testSex.setSex("Apache Helecopter");
        assertFalse(patientValidation.validatePatientInfo(testPatient));
    }
}