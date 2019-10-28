import constants from '../../constants/encounterConstants/constants';

/**
 * This function creates a object
 * to request the api to get 
 * all encounters
 */
export const getAllEncounters = () => {
    return {
        type: constants.GET_ALL_ENCOUNTERS
    }
}
/**
 * This function gives the reducer all of the encounters
 * recieved from the api
 * @param {array} data array of encounters 
 */
export const getAllEncountersSuccess = (data) => {
    return {
        type: constants.GET_ALL_ENCOUNTERS_SUCCESS,
        payload: data
    }
}
/**
 * This function creates an object
 * to request the api to get all encounters
 * associated with a patient
 * @param {number} id id of patient
 */
export const getPatientEncounters = (id) => {
    return {
        type: constants.GET_ALL_ENCOUNTERS_BY_PATIENT_ID,
        payload: id
    }
}
/**
 * This function gives the reducer all of the encounters
 * associated with a patient recieved from the api
 * @param {array} data array of encounters 
 */
export const getPatientEncountersSuccess = (data) => {
    return {
        type: constants.GET_ALL_PATIENT_ENCOUNTERS_SUCCESS,
        payload: data
    }
}
/**
 * This function makes an object to request
 * the api to create an encounter
 * @param {Object} encounter contains encounter information 
 */
export const createNewEncounter = (encounter) => {
    return {
        type: constants.CREATE_ENCOUNTER,
        payload: encounter
    }
}
/**
 * This function creates an action to set a single encounter.
 * Used to prepopulate the update form for an encounter
 * @param {Object} encounter object containing encounter info
 */
export const setSelectedEncounter = (encounter) => {
    return {
        type: constants.SET_SELECTED_ENCOUNTER,
        payload: encounter
    }
}
/**
 * This function makes an object to request
 * the api to update an existing encounter
 * @param {number} id id of encounter to update 
 * @param {*} encounter object containing new encounter info
 */
export const updateEncounter = (id, encounter) => {
    return {
        type: constants.UPDATE_ENCOUNTER,
        id,
        payload: encounter
    }
}
/**
 * This function makes an object to
 * request the api to delete an
 * existing encounter
 * @param {number} id id of encounter
 */
export const deleteEncounter = (id) => {
    return {
        type: constants.DELETE_ENCOUNTER,
        payload: id
    }
}
/**
 * This function sets any errors that occur into state
 * @param {array} error array containing at least 1 error 
 */
export const setEncounterError = (error) =>{
    return {
        type: constants.SET_ENCOUNTER_ERROR,
        payload: error
    }
}
export const encounterErrorReset = () =>{
    return {
        type: constants.ENCOUNTER_ERROR_RESET
    }
}
