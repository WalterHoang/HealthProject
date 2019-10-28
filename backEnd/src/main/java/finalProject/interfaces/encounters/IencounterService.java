package finalProject.interfaces.encounters;

import finalProject.entities.Encounter;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IencounterService {
    ResponseEntity<List<Encounter>> getAllEncounters();

    ResponseEntity<List<Encounter>> getAllByPatient(Long id);

    ResponseEntity<Encounter> getEncounterById(Long id);

    ResponseEntity<Encounter> createEncounter(Encounter encounter);

    ResponseEntity<Encounter> updateEncounter(Long id, Encounter encounter);

    ResponseEntity deleteEncounter(Long id);
}
