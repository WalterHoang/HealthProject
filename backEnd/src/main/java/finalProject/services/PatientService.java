package finalProject.services;

import finalProject.entities.Patient;
import finalProject.exceptions.*;
import finalProject.interfaces.patients.IpatientDao;
import finalProject.interfaces.patients.IpatientService;
import finalProject.services.validation.PatientValidation;
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
 * This Service calls a validator for patient objects
 * and returns a status code based on the request and
 * the results
 */
@Service
public class PatientService implements IpatientService {

    private PatientValidation patientValidator = new PatientValidation();

    @Autowired
    private IpatientDao patientDao;

    /**
     * This method gets a list of patients
     *
     * @return a list of patients if successful
     */
    @Override
    public ResponseEntity<List<Patient>> getPatients() {
        try {
            return new ResponseEntity<>(patientDao.getPatients(), HttpStatus.OK);
        } catch (CannotCreateTransactionException exct) {
            throw new ServiceUnavailable();
        } catch (Exception exc) {
            throw new ServerError();
        }
    }

    /**
     * This method gets a single patient by id
     *
     * @param id a auto generated number for a patient
     * @return an object containing the requested patient info
     */
    @Override
    public ResponseEntity<Patient> getPatientById(Long id) {
        try {
            if (patientDao.getPatientById(id).isPresent()) { // first trip to see if its there
                return new ResponseEntity<>(patientDao.getPatientById(id).get(), HttpStatus.OK); // second trip to get them
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
     * This method creates a new patient
     *
     * @param patient object with patient info
     * @return the added patient
     */
    @Override
    public ResponseEntity<Patient> createNewPatient(Patient patient) {
        try {
            if (patientDao.getPatientBySsn(patient.getSsn()).isPresent()) {
                throw new ConflictError(SSN_CONFLICT);
            } else if (!patientValidator.validatePatientInfo(patient)) {
                throw new BadRequest(USER_VALIDATION_FAILED);
            }
            return new ResponseEntity<>(patientDao.createNewPatient(patient), HttpStatus.CREATED);
        } catch (DataAccessResourceFailureException exct) {
            throw new ServiceUnavailable();
        } catch (Exception exc) {
            throw new ServerError();
        }
    }

    /**
     * Updates a user in the system
     *
     * @param id      id of patient currently in system
     * @param patient object containing new patient info
     * @return object with id of old patient and info of new patient
     */
    @Override
    public ResponseEntity<Patient> updatePatient(Long id, Patient patient) {
        try {
            if (patientDao.getPatientById(id).isPresent()) {
                if (patientDao.getPatientBySsn(patient.getSsn()).isPresent()) {
                    if (patientDao.getPatientBySsn(patient.getSsn()).get().getId().equals(id)) {
                        if (patientValidator.validatePatientInfo(patient)) {
                            return new ResponseEntity<>(patientDao.updatePatient(id, patient), HttpStatus.OK);
                        } else {
                            throw new BadRequest(USER_VALIDATION_FAILED);
                        }
                    } else {
                        throw new ConflictError(SSN_CONFLICT);
                    }
                } else {
                    if (patientValidator.validatePatientInfo(patient)) {
                        return new ResponseEntity<>(patientDao.updatePatient(id, patient), HttpStatus.OK);
                    } else {
                        throw new BadRequest(USER_VALIDATION_FAILED);
                    }
                }
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
     * Removes a user from database
     *
     * @param id of patient to remove
     * @return http status code 204
     */
    @Override
    public ResponseEntity deletePatient(Long id) {
        try {
            if (patientDao.getPatientById(id).isPresent()) {
                if (patientDao.getPatientById(id).get().getEncounters().size() == 0) {
                    patientDao.deletePatient(id);
                    return new ResponseEntity(HttpStatus.NO_CONTENT);
                } else {
                    throw new ConflictError(PATIENT_HAS_ENCOUNTERS);
                }
            } else {
                throw new NotFound(PATIENT_NOT_FOUND);
            }
        } catch (CannotCreateTransactionException exct) {
            throw new ServiceUnavailable();
        } catch (Exception exc) {
            throw new ServerError();
        }
    }
}
