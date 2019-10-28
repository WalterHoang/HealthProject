package finalProject.dataloader;

import finalProject.entities.*;
import finalProject.interfaces.encounters.IencounterRepo;
import finalProject.interfaces.patients.IpatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.util.Date;

@Component
public class Dataloader implements CommandLineRunner {
    @Autowired
    private IpatientRepo patientRepo;
    @Autowired
    private IencounterRepo encounterRepo;

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
    private Encounter sampleEncounter1 = new Encounter(testPatient,
            "",
            "H7J 8W2",
            "Blue Shield",
            "123.456.789-12",
            "A22",
            (float)205.50,
            (float)5.50,
            "Fractured Arm",
            null,
            null,
            null,
            testDate);
    private Encounter sampleEncounter2 = new Encounter(testPatient,
            "",
            "K9W 2E7",
            "Blue Shield",
            "321.654.789-12",
            "A21",
            (float)205.75,
            (float)5.75,
            "Fractured Leg",
            null,
            null,
            null,
            testDate);
    private Encounter sampleEncounter3 =new Encounter(testPatient,
            "Regular patient",
            "V9S 8Y7",
            "Blue Shield",
            "322.614.759-12",
            "A21",
            (float)75.50,
            (float)3.50,
            "Abnormal fever",
             75,
            121,
            79,
            testDate);

    @Override
    public void run(String... args) throws Exception {
        loadPatients();
        loadEncounters();
    }
    private void loadPatients(){
        testPatient.setId(Integer.toUnsignedLong(1));
        patientRepo.save(testPatient);
    }
    private void loadEncounters(){
        sampleEncounter1.setId(Integer.toUnsignedLong(1));
        encounterRepo.save(sampleEncounter1);
        sampleEncounter2.setId(Integer.toUnsignedLong(2));
        encounterRepo.save(sampleEncounter2);
        sampleEncounter3.setId(Integer.toUnsignedLong(3));
        encounterRepo.save(sampleEncounter3);
    }
}
