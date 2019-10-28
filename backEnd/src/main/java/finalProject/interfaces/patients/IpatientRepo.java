package finalProject.interfaces.patients;

import finalProject.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IpatientRepo extends JpaRepository<Patient, Long> {
    Optional<Patient> findBySsn(String ssn);
}
