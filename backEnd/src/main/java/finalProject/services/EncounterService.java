package finalProject.services;

import finalProject.entities.Encounter;
import finalProject.exceptions.BadRequest;
import finalProject.exceptions.NotFound;
import finalProject.exceptions.ServerError;
import finalProject.exceptions.ServiceUnavailable;
import finalProject.interfaces.encounters.IencounterDao;
import finalProject.interfaces.encounters.IencounterService;
import finalProject.interfaces.patients.IpatientDao;
import finalProject.services.validation.EncounterValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.CannotCreateTransactionException;
import org.springframework.web.server.ServerErrorException;

import java.util.List;

import static finalProject.constants.StringConstants.*;

/**
 * This service calls a validator for
 * encounters before passing it to the dao.
 * The service also handles which status codes to return.
 */
@Service
public class EncounterService implements IencounterService {
    @Autowired
    private IencounterDao encounterDao;
    @Autowired
    private IpatientDao patientDao;

    private EncounterValidation validator = new EncounterValidation();

    /**
     * This method gets a list of all encounters
     *
     * @return a list of encounters and/or a status code
     */
    @Override
    public ResponseEntity<List<Encounter>> getAllEncounters() {
        try {
            return new ResponseEntity<>(encounterDao.getAllEncounters(), HttpStatus.OK);
        } catch (CannotCreateTransactionException exct) {
            throw new ServiceUnavailable();
        } catch (Exception exc) {
            throw new ServerError();
        }
    }

    /**
     * Finds all encounters associated with a patient
     *
     * @param id id of the patient
     * @return a list of encounters and/or a status code
     */
    @Override
    public ResponseEntity<List<Encounter>> getAllByPatient(Long id) {
        try {
            if (patientDao.getPatientById(id).isPresent()) {
                List<Encounter> encounters = encounterDao.getAllByPatient(id);
                return new ResponseEntity<>(encounters, HttpStatus.OK);
            } else {
                throw new NotFound(PATIENT_NOT_FOUND);
            }
        } catch (CannotCreateTransactionException exct) {
            throw new ServiceUnavailable();
        } catch (Exception exc) {
            throw new ServerError();
        }
    }

    /**
     * This method finds a single encounter by its unique database id
     *
     * @param id id of encounter
     * @return a single encounter and/or a status code
     */
    @Override
    public ResponseEntity<Encounter> getEncounterById(Long id) {
        try {
            if (encounterDao.getEncounterById(id).isPresent()) {
                return new ResponseEntity<>(encounterDao.getEncounterById(id).get(), HttpStatus.OK);
            } else {
                throw new NotFound(ENCOUNTER_NOT_FOUND);
            }
        } catch (CannotCreateTransactionException exct) {
            throw new ServiceUnavailable();
        } catch (Exception exc) {
            throw new ServerError();
        }
    }

    /**
     * This method passes a new encounter to be
     * recorded in the database
     *
     * @param encounter Object containing new encounter info
     * @return the added encounter and/or a status code
     */
    @Override
    public ResponseEntity<Encounter> createEncounter(Encounter encounter) {
        try {
            if (validator.validateEncounterInfo(encounter)) {
                return new ResponseEntity<>(encounterDao.createEncounter(encounter), HttpStatus.CREATED);
            } else {
                throw new BadRequest(ENCOUNTER_VALIDATION_FAILED);
            }
        }catch (DataAccessResourceFailureException exct) {
            throw new ServiceUnavailable();
        } catch (Exception exc) {
            throw new ServerError();
        }
    }

    /**
     * This method passes a new encounter object
     * to replace an existing one in the database
     *
     * @param id        id of encounter to replace
     * @param encounter Object with new encounter info
     * @return new encounter with id of replaced encounter and/or a status code
     */
    @Override
    public ResponseEntity<Encounter> updateEncounter(Long id, Encounter encounter) {
        try {
            if (encounterDao.getEncounterById(id).isPresent()) {
                if (validator.validateEncounterInfo(encounter)) {
                    return new ResponseEntity<>(encounterDao.updateEncounter(id, encounter), HttpStatus.OK);
                } else {
                    throw new BadRequest(ENCOUNTER_VALIDATION_FAILED);
                }
            } else {
                throw new NotFound(ENCOUNTER_NOT_FOUND);
            }
        } catch (CannotCreateTransactionException exct) {
            throw new ServiceUnavailable();
        } catch (Exception exc) {
            throw new ServerError();
        }
    }

    /**
     * Remove a encounter from the database
     *
     * @param id of encounter to remove
     * @return a status code
     */
    @Override
    public ResponseEntity deleteEncounter(Long id) {
        try {
            if (encounterDao.getEncounterById(id).isPresent()) {
                encounterDao.deleteEncounter(id);
                return new ResponseEntity(HttpStatus.NO_CONTENT);
            } else {
                throw new NotFound(ENCOUNTER_NOT_FOUND);
            }
        } catch (CannotCreateTransactionException exct) {
            throw new ServiceUnavailable();
        } catch (Exception exc) {
            throw new ServerError();
        }
    }
}
