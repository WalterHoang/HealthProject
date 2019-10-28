package finalProject.interfaces.patients;

import finalProject.entities.Patient;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IpatientService {
    ResponseEntity<List<Patient>> getPatients();
    ResponseEntity<Patient> getPatientById(Long id);
    ResponseEntity<Patient> createNewPatient(Patient patient);
    ResponseEntity<Patient> updatePatient(Long id, Patient patient);
    ResponseEntity deletePatient(Long id);
}
