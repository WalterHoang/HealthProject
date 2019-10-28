package finalProject.interfaces.encounters;

import finalProject.entities.Encounter;

import java.util.List;
import java.util.Optional;

public interface IencounterDao {
    List<Encounter> getAllEncounters();

    Optional<Encounter> getEncounterById(Long id);

    List<Encounter> getAllByPatient(Long id);

    Encounter createEncounter(Encounter encounter);

    Encounter updateEncounter(Long id, Encounter encounter);

    void deleteEncounter(Long id);
}
