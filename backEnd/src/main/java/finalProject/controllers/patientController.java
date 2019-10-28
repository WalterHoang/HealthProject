package finalProject.controllers;

import finalProject.entities.Patient;
import finalProject.exceptions.*;
import finalProject.interfaces.patients.IpatientService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/patients")
@Api(value = "This is the controller for the patients.", produces = "This is the base package for the Patient endpoints.")
public class patientController {
    @Autowired
    private IpatientService patientService;

    /**
     * This method gets a list of patients
     *
     * @return a list of patients
     */
    @GetMapping
    @ApiOperation("Gets all Patients in the system.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", responseContainer = "List", response = Patient.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ServerError.class),
            @ApiResponse(code = 503, message = "Service Unavailable", response = ServiceUnavailable.class),
    })
    public ResponseEntity<List<Patient>> getPatients() {
        return patientService.getPatients();
    }

    /**
     * Gets a patient by id
     *
     * @param id patient's id
     * @return a patient if found
     */
    @GetMapping(value = "/{id}")
    @ApiOperation("Gets a patient by id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = Patient.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ServerError.class),
            @ApiResponse(code = 503, message = "Service Unavailable", response = ServiceUnavailable.class),
            @ApiResponse(code = 404, message = "Not Found", response = NotFound.class)
    })
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    /**
     * Creates a new patient
     *
     * @param patient object containing patient info
     * @return the new patient with a created status
     */
    @PostMapping
    @ApiOperation("Creates a new patient in the system")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Created", response = Patient.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ServerError.class),
            @ApiResponse(code = 503, message = "Service Unavailable", response = ServiceUnavailable.class),
            @ApiResponse(code = 400, message = "Bad Request", response = BadRequest.class),
            @ApiResponse(code = 409, message = "Conflict", response = ConflictError.class),
    })
    public ResponseEntity<Patient> createNewPatient(@RequestBody Patient patient) {
        return patientService.createNewPatient(patient);
    }

    /**
     * Updates a selected patient by id
     *
     * @param id      id of patient to update
     * @param patient object containing new patient info
     * @return a OK status with the new patient with the old patient's id
     */
    @PutMapping(value = "/{id}")
    @ApiOperation("Updates a selected patient.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = Patient.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ServerError.class),
            @ApiResponse(code = 503, message = "Service Unavailable", response = ServiceUnavailable.class),
            @ApiResponse(code = 400, message = "Bad Request", response = BadRequest.class),
            @ApiResponse(code = 404, message = "Not Found", response = NotFound.class),
            @ApiResponse(code = 409, message = "Conflict", response = ConflictError.class),
    })
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patient) {
        return patientService.updatePatient(id, patient);
    }

    /**
     * Removes a patient by id
     *
     * @param id of patient to remove
     * @return http status code 204
     */
    @DeleteMapping(value = "/{id}")
    @ApiOperation("Removes a patient by id.")
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "No Content"),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ServerError.class),
            @ApiResponse(code = 503, message = "Service Unavailable", response = ServiceUnavailable.class),
            @ApiResponse(code = 404, message = "Not Found", response = NotFound.class)
    })
    public ResponseEntity deletePatient(@PathVariable Long id) {
        return patientService.deletePatient(id);
    }
}
