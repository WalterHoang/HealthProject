package finalProject.services;

import finalProject.dataObjects.EncounterDao;
import finalProject.dataObjects.PatientDao;
import finalProject.entities.*;
import finalProject.exceptions.BadRequest;
import finalProject.exceptions.NotFound;
import finalProject.exceptions.ServerError;
import finalProject.exceptions.ServiceUnavailable;
import finalProject.interfaces.encounters.IencounterRepo;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;

@RunWith(MockitoJUnitRunner.class)
public class EncounterServiceTest {
    @Mock
    EncounterDao mockEncounterDao;
    @Mock
    PatientDao mockPatientDao;
    @Mock
    IencounterRepo mockEncounterRepo;
    @InjectMocks
    EncounterService encounterService;

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
    private Patient testPatient2 = new Patient("Ryants",
            "Hoang",
            "222-55-9876",
            testAddress,
            20,
            64,
            205,
            testInsurance,
            testSex);
    private Date testDate = new Date();
    private Encounter testValidEncounter;
    private Encounter testValidEncounter2;
    private List<Encounter> encounters = new ArrayList<>();
    private List<Encounter> patient1Encounters = new ArrayList<>();

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
        testValidEncounter2 = new Encounter(testPatient2,
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
        testValidEncounter.setId((long) 1);
        testValidEncounter2.setId((long) 2);
        encounters.add(testValidEncounter);
        encounters.add(testValidEncounter2);
        patient1Encounters.add(testValidEncounter);
    }

    @Test
    public void getAllEncounters() {
        Mockito.when(mockEncounterDao.getAllEncounters()).thenReturn(encounters);
        ResponseEntity<List<Encounter>> expectedStatus = new ResponseEntity<>(mockEncounterDao.getAllEncounters(), HttpStatus.OK);
        assertEquals("Failed get all test.", expectedStatus, encounterService.getAllEncounters());
    }

    @Test(expected = ServiceUnavailable.class)
    public void unavailableGetAllEncounters() {
        Mockito.when(mockEncounterDao.getAllEncounters()).thenThrow(ServiceUnavailable.class);
        encounterService.getAllEncounters();
    }

    @Test(expected = ServerError.class)
    public void unexpectedGetAllEncounters() {
        Mockito.when(mockEncounterDao.getAllEncounters()).thenThrow(ServerError.class);
        encounterService.getAllEncounters();
    }
    @Test
    public void getAllByPatient(){
        Mockito.when(mockPatientDao.getPatientById(testPatient.getId())).thenReturn(Optional.of(testPatient));
        Mockito.when(mockEncounterDao.getAllByPatient(testPatient.getId())).thenReturn(patient1Encounters);
        ResponseEntity<List<Encounter>> expectedStatus = new ResponseEntity<>(mockEncounterDao.getAllByPatient(testPatient.getId()),HttpStatus.OK);
        assertEquals("Failed patient filter test.",expectedStatus,encounterService.getAllByPatient(testPatient.getId()));
    }
    @Test(expected = NotFound.class)
    public void noPatientFound(){
        Mockito.when(mockPatientDao.getPatientById(testPatient.getId())).thenThrow(NotFound.class);
        encounterService.getAllByPatient(testPatient.getId());
    }
    @Test(expected = ServiceUnavailable.class)
    public void unavailableGetByPatientId(){
        Mockito.when(mockPatientDao.getPatientById(testPatient.getId())).thenThrow(ServiceUnavailable.class);
        encounterService.getAllByPatient(testPatient.getId());
    }
    @Test(expected = ServerError.class)
    public void unexpectedGetByPatientId(){
        Mockito.when(mockPatientDao.getPatientById(testPatient.getId())).thenThrow(ServerError.class);
        encounterService.getAllByPatient(testPatient.getId());
    }
    @Test
    public void getEncounterById(){
        Mockito.when(mockEncounterDao.getEncounterById(testValidEncounter.getId())).thenReturn(Optional.of(testValidEncounter));
        ResponseEntity<Encounter> expectedStatus = new ResponseEntity<>(testValidEncounter,HttpStatus.OK);
        assertEquals("Failed single encounter get test",expectedStatus,encounterService.getEncounterById(testValidEncounter.getId()));
    }
    @Test(expected = NotFound.class)
    public void encounterNotFound(){
        Mockito.when(mockEncounterDao.getEncounterById(testValidEncounter.getId())).thenThrow(NotFound.class);
        encounterService.getEncounterById(testValidEncounter.getId());
    }
    @Test(expected = ServiceUnavailable.class)
    public void unavailableEncounterById(){
        Mockito.when(mockEncounterDao.getEncounterById(testValidEncounter.getId())).thenThrow(ServiceUnavailable.class);
        encounterService.getEncounterById(testValidEncounter.getId());
    }
    @Test(expected = ServerError.class)
    public void unexpectedEncounterById(){
        Mockito.when(mockEncounterDao.getEncounterById(testValidEncounter.getId())).thenThrow(ServerError.class);
        encounterService.getEncounterById(testValidEncounter.getId());
    }
    @Test
    public void createEncounter(){
        Mockito.when(mockEncounterDao.createEncounter(testValidEncounter)).thenReturn(testValidEncounter);
        ResponseEntity<Encounter> expectedStatus = new ResponseEntity<>(testValidEncounter, HttpStatus.CREATED);
        assertEquals("Failed create test.",expectedStatus,encounterService.createEncounter(testValidEncounter));
    }
    @Test(expected = BadRequest.class)
    public void invalidEncounter(){
        testValidEncounter.setChiefComplaint("");
        encounterService.createEncounter(testValidEncounter);
    }
    @Test(expected = ServiceUnavailable.class)
    public void unavailableCreateEncounter(){
        Mockito.when(mockEncounterDao.createEncounter(testValidEncounter)).thenThrow(ServiceUnavailable.class);
        encounterService.createEncounter(testValidEncounter);
    }
    @Test(expected = ServerError.class)
    public void unexpectedCreateEncounter(){
        Mockito.when(mockEncounterDao.createEncounter(testValidEncounter)).thenThrow(ServerError.class);
        encounterService.createEncounter(testValidEncounter);
    }
    @Test
    public void updateEncounter(){
        testValidEncounter2.setId((long) 1);
        Mockito.when(mockEncounterDao.updateEncounter(testValidEncounter.getId(),testValidEncounter2)).thenReturn(testValidEncounter2);
        Mockito.when(mockEncounterDao.getEncounterById(testValidEncounter.getId())).thenReturn(Optional.of(testValidEncounter));
        ResponseEntity<Encounter> expectedStatus = new ResponseEntity<>(testValidEncounter2, HttpStatus.OK);
        assertEquals("Failed update",expectedStatus,encounterService.updateEncounter(testValidEncounter.getId(),testValidEncounter2));
    }
    @Test(expected = BadRequest.class)
    public void invalidUpdate(){
        testValidEncounter2.setId((long) 1);
        testValidEncounter2.setChiefComplaint("");
        Mockito.when(mockEncounterDao.getEncounterById(testValidEncounter.getId())).thenReturn(Optional.of(testValidEncounter));
        encounterService.updateEncounter(testValidEncounter.getId(),testValidEncounter2);
    }
    @Test(expected = NotFound.class)
    public void encounterNotFoundUpdate(){
        Mockito.when(mockEncounterDao.getEncounterById(testValidEncounter.getId())).thenThrow(NotFound.class);
        encounterService.updateEncounter(testValidEncounter.getId(),testValidEncounter2);
    }
    @Test(expected = ServiceUnavailable.class)
    public void updateNotAvailable(){
        Mockito.when(mockEncounterDao.getEncounterById(testValidEncounter.getId())).thenThrow(ServiceUnavailable.class);
        encounterService.updateEncounter(testValidEncounter.getId(),testValidEncounter2);
    }
    @Test(expected = ServerError.class)
    public void updateUnexpectedErr(){
        Mockito.when(mockEncounterDao.getEncounterById(testValidEncounter.getId())).thenThrow(ServerError.class);
        encounterService.updateEncounter(testValidEncounter.getId(),testValidEncounter2);
    }
    @Test
    public void deleteEncounter(){
        Mockito.when(mockEncounterDao.getEncounterById(testValidEncounter.getId())).thenReturn(Optional.of(testValidEncounter));
        ResponseEntity expected = new ResponseEntity(HttpStatus.NO_CONTENT);
        encounterService.deleteEncounter(testValidEncounter.getId());
    }
    @Test(expected = NotFound.class)
    public void deleteNotFound(){
        Mockito.when(mockEncounterDao.getEncounterById(testValidEncounter.getId())).thenThrow(NotFound.class);
        encounterService.deleteEncounter(testValidEncounter.getId());
    }
    @Test(expected = ServiceUnavailable.class)
    public void deleteUnavailable(){
        Mockito.when(mockEncounterDao.getEncounterById(testValidEncounter.getId())).thenThrow(ServiceUnavailable.class);
        encounterService.deleteEncounter(testValidEncounter.getId());
    }
    @Test(expected = ServerError.class)
    public void deleteUnexpectedErr(){
        Mockito.when(mockEncounterDao.getEncounterById(testValidEncounter.getId())).thenThrow(ServerError.class);
        encounterService.deleteEncounter(testValidEncounter.getId());
    }
}