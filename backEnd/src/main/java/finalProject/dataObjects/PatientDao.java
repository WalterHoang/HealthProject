package finalProject.dataObjects;

import finalProject.entities.Patient;
import finalProject.interfaces.patients.IpatientDao;
import finalProject.interfaces.patients.IpatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

/**
 * DAO object to access CRUD methods in database
 */
@Component
public class PatientDao implements IpatientDao {

    @Autowired
    private IpatientRepo patientRepo;

    @Override
    public List<Patient> getPatients() {
        return patientRepo.findAll();
    }

    @Override
    public Optional<Patient> getPatientById(Long id) {
        return patientRepo.findById(id);
    }

    @Override
    public Optional<Patient> getPatientBySsn(String ssn) {
        return patientRepo.findBySsn(ssn);
    }

    @Override
    public Patient createNewPatient(Patient patient) {
        return patientRepo.save(patient);
    }

    @Override
    public Patient updatePatient(Long id, Patient patient) {
        Patient currentPatient = patientRepo.findById(id).orElse(null);
        if (currentPatient == null) {
            return null;
        }
        patient.setId(id);
        return patientRepo.save(patient);
    }

    @Override
    public void deletePatient(Long id) {
        patientRepo.deleteById(id);
    }
}
