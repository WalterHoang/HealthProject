package finalProject.dataObjects;

import finalProject.entities.Encounter;
import finalProject.interfaces.encounters.IencounterDao;
import finalProject.interfaces.encounters.IencounterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

/**
 * Dao for encounters
 */
@Component
public class EncounterDao implements IencounterDao {
    @Autowired
    private IencounterRepo encounterRepo;

    @Override
    public List<Encounter> getAllEncounters() {
        return encounterRepo.findAll();
    }

    @Override
    public Optional<Encounter> getEncounterById(Long id) {
        return encounterRepo.findById(id);
    }

    @Override
    public List<Encounter> getAllByPatient(Long id) {
        return encounterRepo.findAllByPatientId(id);
    }

    @Override
    public Encounter createEncounter(Encounter encounter) {
        return encounterRepo.save(encounter);
    }

    @Override
    public Encounter updateEncounter(Long id, Encounter encounter) {
        Encounter selectedEncounter = encounterRepo.findById(id).orElse(null);
        if (selectedEncounter == null) {
            return null;
        }
        encounter.setId(id);
        return encounterRepo.save(encounter);
    }

    @Override
    public void deleteEncounter(Long id) {
        encounterRepo.deleteById(id);
    }
}
