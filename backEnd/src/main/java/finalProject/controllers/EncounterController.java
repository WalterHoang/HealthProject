package finalProject.controllers;

import finalProject.entities.Encounter;
import finalProject.entities.Patient;
import finalProject.exceptions.BadRequest;
import finalProject.exceptions.NotFound;
import finalProject.exceptions.ServerError;
import finalProject.exceptions.ServiceUnavailable;
import finalProject.interfaces.encounters.IencounterService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/encounters")
@Api(value = "This is the controller for encounters.", produces = "This is the base package for the Encounter endpoints.")
public class EncounterController {
    @Autowired
    private IencounterService encounterService;

    /**
     * This method gets a list of all encounters
     *
     * @return a list of all encounters
     */
    @GetMapping
    @ApiOperation("Gets all encounters in the system")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", responseContainer = "List", response = Encounter.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ServerError.class),
            @ApiResponse(code = 503, message = "Service Unavailable", response = ServiceUnavailable.class),
    })
    public ResponseEntity<List<Encounter>> getAllEncounters() {
        return encounterService.getAllEncounters();
    }

    /**
     * This method gets all encounters associated with a patient
     *
     * @param id id of patient
     * @return a list of all encounters associated with a patient
     */
    @GetMapping(value = "/patient/{id}")
    @ApiOperation("Gets all encounters associated with a patient")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", responseContainer = "List", response = Encounter.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ServerError.class),
            @ApiResponse(code = 503, message = "Service Unavailable", response = ServiceUnavailable.class),
            @ApiResponse(code = 404, message = "Not found", response = NotFound.class)
    })
    public ResponseEntity<List<Encounter>> getAllByPatient(@PathVariable Long id) {
        return encounterService.getAllByPatient(id);
    }

    /**
     * Gets a encounter by id
     *
     * @param id encounter's id
     * @return a encounter if found
     */
    @GetMapping(value = "/{id}")
    @ApiOperation("Gets a encounter by id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = Encounter.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ServerError.class),
            @ApiResponse(code = 503, message = "Service Unavailable", response = ServiceUnavailable.class),
            @ApiResponse(code = 404, message = "Not Found", response = NotFound.class)
    })
    public ResponseEntity<Encounter> getEncounterById(@PathVariable Long id) {
        return encounterService.getEncounterById(id);
    }

    /**
     * Passes request to create encounter to service
     *
     * @param encounter object containing encounter info
     * @return the new encounter with a status code
     */
    @PostMapping
    @ApiOperation("Creates a new encounter in the system.")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Created", response = Patient.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ServerError.class),
            @ApiResponse(code = 503, message = "Service Unavailable", response = ServiceUnavailable.class),
            @ApiResponse(code = 400, message = "Bad Request", response = BadRequest.class),
    })
    public ResponseEntity<Encounter> createEncounter(@RequestBody Encounter encounter) {
        return encounterService.createEncounter(encounter);
    }

    /**
     * Updates a selected encounter by id
     *
     * @param id        id of encounter to update
     * @param encounter object containing new encounter info
     * @return new encounter with id of old encounter and a status code
     */
    @PutMapping(value = "/{id}")
    @ApiOperation("Updates a selected patient in the system")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = Patient.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ServerError.class),
            @ApiResponse(code = 503, message = "Service Unavailable", response = ServiceUnavailable.class),
            @ApiResponse(code = 400, message = "Bad Request", response = BadRequest.class),
            @ApiResponse(code = 404, message = "Not Found", response = NotFound.class),
    })
    public ResponseEntity<Encounter> updateEncounter(@PathVariable Long id, @RequestBody Encounter encounter) {
        return encounterService.updateEncounter(id, encounter);
    }

    /**
     * Deletes a selected encounter by id
     *
     * @param id id of encounter to delete
     * @return a status code
     */
    @DeleteMapping(value = "/{id}")
    @ApiOperation("Removes an encounter by id")
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "No Content"),
            @ApiResponse(code = 500, message = "Internal Server Error", response = ServerError.class),
            @ApiResponse(code = 503, message = "Service Unavailable", response = ServiceUnavailable.class),
            @ApiResponse(code = 404, message = "Not Found", response = NotFound.class)
    })
    public ResponseEntity deleteEncounter(@PathVariable Long id) {
        return encounterService.deleteEncounter(id);
    }
}
