package finalProject.interfaces.patients;

import finalProject.entities.Patient;

import java.util.List;
import java.util.Optional;

public interface IpatientDao {
    List<Patient> getPatients();
    Optional<Patient> getPatientById(Long id);
    Optional<Patient> getPatientBySsn(String ssn);
    Patient createNewPatient(Patient patient);
    Patient updatePatient(Long id, Patient patient);
    void deletePatient(Long id);
}
