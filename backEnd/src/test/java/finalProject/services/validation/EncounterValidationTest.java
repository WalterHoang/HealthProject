package finalProject.services.validation;

import finalProject.entities.*;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static org.junit.Assert.*;

public class EncounterValidationTest {
    private EncounterValidation validator = new EncounterValidation();

    private Address testAddress = new Address("123 test street",
            "test city",
            "CO",
            "12345");
    private Insurance testInsurance = new Insurance("Medicaid");
    private Sex testSex = new Sex("Male");
    private Patient testPatient = new Patient("Walter",
            "Hoang",
            "123-45-6789",
            testAddress,
            22,
            59,
            195,
            testInsurance,
            testSex);
    private Date testDate = new Date();
    private Encounter testValidEncounter;

    @Before
    public void setup() {
        testValidEncounter = new Encounter(testPatient,
                "",
                "K9W 2E7",
                "Blue Shield",
                "321.654.789-12",
                "A21",
                (float) 205.75,
                (float) 5.75,
                "Fractured Leg",
                null,
                null,
                null,
                testDate);
    }

    @Test
    public void testValidEncounter() {
        assertTrue(validator.validateEncounterInfo(testValidEncounter));
    }

    @Test
    public void invalidPatient() {
        testValidEncounter.setPatient(null);
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
    }
    @Test
    public void invalidVisitCode(){
        testValidEncounter.setVisitCode(null);
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
        testValidEncounter.setVisitCode("h7J 8W2");
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
        testValidEncounter.setVisitCode("H7J8W2");
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
        testValidEncounter.setVisitCode(" H7J 8W2");
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
        testValidEncounter.setVisitCode("H7J 8W2 ");
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
        testValidEncounter.setVisitCode("H7J-8W2");
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
    }
    @Test
    public void invalidProvider(){
        testValidEncounter.setProvider(null);
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
        testValidEncounter.setProvider("");
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
    }
    @Test
    public void invalidBillCode(){
        testValidEncounter.setBillingCode(null);
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
        testValidEncounter.setBillingCode("");
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
        testValidEncounter.setBillingCode("A23.456.789-12");
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
    }
    @Test
    public void invalidIcd10(){
        testValidEncounter.setIcd10(null);
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
        testValidEncounter.setIcd10("");
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
        testValidEncounter.setIcd10("a22");
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
        testValidEncounter.setIcd10("A2");
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
        testValidEncounter.setIcd10("A222");
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
        testValidEncounter.setIcd10("A11 ");
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
    }
    @Test
    public void invalidCost(){
        testValidEncounter.setTotalCost(null);
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
        testValidEncounter.setTotalCost((float) -1.00);
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
        testValidEncounter.setTotalCost((float) -0.01);
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
    }


    @Test
    public void invalidCoPay(){
        testValidEncounter.setCoPay(null);
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
        testValidEncounter.setCoPay((float) -1.00);
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
        testValidEncounter.setCoPay((float) -0.01);
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
    }
    @Test
    public void invalidComplaint(){
        testValidEncounter.setChiefComplaint(null);
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
        testValidEncounter.setChiefComplaint("");
        assertFalse(validator.validateEncounterInfo(testValidEncounter));
    }
    @Test
    public void invalidDate(){
    testValidEncounter.setDate(null);
    assertFalse(validator.validateEncounterInfo(testValidEncounter));
    }
}