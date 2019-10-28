package finalProject.services;

import finalProject.dataObjects.PatientDao;
import finalProject.entities.Address;
import finalProject.entities.Insurance;
import finalProject.entities.Patient;
import finalProject.entities.Sex;
import finalProject.exceptions.*;
import finalProject.interfaces.patients.IpatientRepo;
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
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;

@RunWith(MockitoJUnitRunner.class)
public class PatientServiceTest {
    @Mock
    PatientDao mockPatientDao;
    @Mock
    IpatientRepo mockPatientRepo;
    @InjectMocks
    PatientService patientService;
    private static Patient newPatient;
    private static Patient testPatient;
    private static List<Patient> patients = new ArrayList<>();

    @Before
    public void setUp() {
        Address testAddress = new Address("123 test street",
                "test city",
                "CO",
                "12345");
        Insurance testInsurance = new Insurance("Medicaid");
        Sex testSex = new Sex("Male");
        testPatient = new Patient("Walter",
                "Hoang",
                "123-45-6789",
                testAddress,
                22,
                59,
                195,
                testInsurance,
                testSex);
        newPatient = new Patient("James", "Bond", "111-11-1111", testAddress, 54, 64, 205, testInsurance, testSex);
        newPatient.setId(Integer.toUnsignedLong(1));
        testPatient.setId(Integer.toUnsignedLong(1));
        patients.add(testPatient);
    }

    @Test
    public void getPatients() {
        Mockito.when(mockPatientDao.getPatients()).thenReturn(patients);
        ResponseEntity<List<Patient>> expectedStatus = new ResponseEntity<>(patients, HttpStatus.OK);
        assertEquals("Testing get patients failed.", expectedStatus, patientService.getPatients());
    }

    @Test(expected = ServerError.class)
    public void getPatientsFail() {
        Mockito.when(mockPatientDao.getPatients()).thenThrow(ServerError.class);
        patientService.getPatients();
    }

    @Test(expected = ServiceUnavailable.class)
    public void getPatientsFail2() {
        Mockito.when(mockPatientDao.getPatients()).thenThrow(ServiceUnavailable.class);
        patientService.getPatients();
    }

    @Test
    public void getPatientById() {
        Mockito.when(mockPatientDao.getPatientById(testPatient.getId())).thenReturn(Optional.of(testPatient));
        ResponseEntity<Patient> expectedStatus = new ResponseEntity<>(testPatient, HttpStatus.OK);
        assertEquals("Failed get by id.", expectedStatus, patientService.getPatientById(testPatient.getId()));
    }

    @Test(expected = NotFound.class)
    public void PatientNotFound() {
        Mockito.when(mockPatientDao.getPatientById(testPatient.getId())).thenThrow(NotFound.class);
        patientService.getPatientById(testPatient.getId());
    }

    @Test(expected = ServiceUnavailable.class)
    public void getByIdUnAvailable() {
        Mockito.when(mockPatientDao.getPatientById(testPatient.getId())).thenThrow(ServiceUnavailable.class);
        patientService.getPatientById(testPatient.getId());
    }

    @Test(expected = ServerError.class)
    public void getByIdUnexpected() {
        Mockito.when(mockPatientDao.getPatientById(testPatient.getId())).thenThrow(ServerError.class);
        patientService.getPatientById(testPatient.getId());
    }

    @Test
    public void createPatient() {
        Mockito.when(mockPatientDao.createNewPatient(testPatient)).thenReturn(testPatient);
        ResponseEntity<Patient> expectedStatus = new ResponseEntity<>(testPatient, HttpStatus.CREATED);
        assertEquals("Testing create patient failed.", expectedStatus, patientService.createNewPatient(testPatient));
    }
    @Test(expected = BadRequest.class)
    public void invalidCreate(){
        testPatient.setFirstName("");
        patientService.createNewPatient(testPatient);
    }

    @Test(expected = ConflictError.class)
    public void createPatientFail() {
        Mockito.when(mockPatientDao.getPatientBySsn(testPatient.getSsn())).thenReturn(Optional.of(testPatient));
        patientService.createNewPatient(testPatient);
    }

    @Test(expected = ServerError.class)
    public void createPatientFail2() {
        Mockito.when(mockPatientDao.getPatientBySsn(testPatient.getSsn())).thenThrow(ServerError.class);
        patientService.createNewPatient(testPatient);
    }

    @Test(expected = ServiceUnavailable.class)
    public void createPatientFail3() {
        Mockito.when(mockPatientDao.getPatientBySsn(testPatient.getSsn())).thenThrow(ServiceUnavailable.class);
        patientService.createNewPatient(testPatient);
    }

    @Test
    public void updatePatient() {
        Mockito.when(mockPatientDao.updatePatient(Integer.toUnsignedLong(1), newPatient)).thenReturn(newPatient);
        Mockito.when(mockPatientDao.getPatientById(testPatient.getId())).thenReturn(Optional.of(testPatient));
        Mockito.when(mockPatientDao.getPatientBySsn(newPatient.getSsn())).thenReturn(Optional.of(newPatient));
        ResponseEntity<Patient> expectedStatus = new ResponseEntity<>(newPatient, HttpStatus.OK);
        assertEquals("Update failed.", expectedStatus, patientService.updatePatient(testPatient.getId(), newPatient));
    }

    @Test(expected = NotFound.class)
    public void updateNotFound() {
        Mockito.when(mockPatientDao.getPatientById(testPatient.getId())).thenThrow(NotFound.class);
        patientService.updatePatient(testPatient.getId(), newPatient);
    }

    @Test(expected = ConflictError.class)
    public void updateConflict() {
        testPatient.setId(Integer.toUnsignedLong(2));
        Mockito.when(mockPatientDao.getPatientById(newPatient.getId())).thenReturn(Optional.of(newPatient));
        Mockito.when(mockPatientDao.getPatientBySsn(newPatient.getSsn())).thenReturn(Optional.of(testPatient));
        patientService.updatePatient(Integer.toUnsignedLong(1), newPatient);
    }

    @Test(expected = BadRequest.class)
    public void updateInvalid(){
        newPatient.setInsurance(null);
        Mockito.when(mockPatientDao.getPatientById(testPatient.getId())).thenReturn(Optional.of(testPatient));
        Mockito.when(mockPatientDao.getPatientBySsn(newPatient.getSsn())).thenReturn(Optional.of(newPatient));
        patientService.updatePatient(testPatient.getId(), newPatient);
    }
    @Test(expected = ServiceUnavailable.class)
    public void updateUnavailable(){
        Mockito.when(mockPatientDao.getPatientById(testPatient.getId())).thenThrow(ServiceUnavailable.class);
        patientService.updatePatient(testPatient.getId(), newPatient);
    }
    @Test(expected = ServerError.class)
    public void updateError(){
        Mockito.when(mockPatientDao.getPatientById(testPatient.getId())).thenThrow(ServerError.class);
        patientService.updatePatient(testPatient.getId(), newPatient);
    }
    @Test
    public void deletePatient(){
        Mockito.when(mockPatientDao.getPatientById(testPatient.getId())).thenReturn(Optional.of(testPatient));
        ResponseEntity expectedStatus = new ResponseEntity(HttpStatus.NO_CONTENT);
        assertEquals(expectedStatus, patientService.deletePatient(testPatient.getId()));
    }
    @Test(expected = NotFound.class)
    public void deleteNotFound(){
        Mockito.when(mockPatientDao.getPatientById(testPatient.getId())).thenThrow(NotFound.class);
        patientService.deletePatient(testPatient.getId());
    }
    @Test(expected = ServiceUnavailable.class)
    public void deleteUnavailable(){
        Mockito.when(mockPatientDao.getPatientById(testPatient.getId())).thenThrow(ServiceUnavailable.class);
        patientService.deletePatient(testPatient.getId());
    }
    @Test(expected = ServerError.class)
    public void deleteError(){
        Mockito.when(mockPatientDao.getPatientById(testPatient.getId())).thenThrow(ServerError.class);
        patientService.deletePatient(testPatient.getId());
    }
}