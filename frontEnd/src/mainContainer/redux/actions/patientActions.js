import constants from '../../constants/patientConstants/constants';

/**
 * This function calls the saga with an
 * action to create a patient
 * @param {Object} patient patient info 
 */
export const addPatient = (patient) => {
    return {
        type: constants.CREATE_PATIENT_ASYNC,
        payload: patient
    }
}
/**
 * This function calls the saga with an action
 * to update a patient
 * @param {Long} id existing patient id
 * @param {Object} patient object with new patient info
 */
export const updatePatient = (id, patient) => {
    return {
        type: constants.UPDATE_PATIENT_ASYNC,
        id,
        payload: patient
    }
}
/**
 * This function calls the saga with an
 * action to delete a patient
 * @param {Long} id existing patient id 
 */
export const deletePatient = (id) => {
    return {
        type: constants.DELETE_PATIENT_ASYNC,
        payload: id
    }
}
/**
 * This function calls the saga to
 * get all patients 
 */
export const getAllPatients = () => {
    return {
        type: constants.GET_PATIENT_LIST_ASYNC
    }
}
/**
 * This function provides the store with the
 * results from the getALL api request
 * @param {array} data array of patients
 */
export const setPatientData = (data) => {
    return {
        type: constants.SET_PATIENT_DATA,
        payload: data
    }
}
/**
 * This function handles the selecting of a
 * patient to edit. Used to prefill edit form
 * and to get patient id
 * @param {Object} patient patient info 
 */
export const setPatientInfo = (patient) => {
    return {
        type: constants.SET_PATIENT_INFO,
        payload: patient
    }
}
/**
 * This function creates a confirmation 
 * to show the reader that the edit action worked
 * 
 */
export const editAsyncSuccess = () => {
    return {
        type: constants.EDIT_ASYNC_SUCCESS
    }
}
/**
 * This function resets the status of a successful
 * edit async request for future edits
 */
export const editAsyncReset = () => {
    return {
        type: constants.EDIT_ASYNC_RESET
    }
}
/**
 * This function holds all of the errors that are
 * needed for the user to see when an action fails.
 * @param {[String]} errArray "An array of errors." 
 */
export const patientAsyncError = (errArray) => {
    return {
        type: constants.PATIENT_ASYNC_ERROR,
        payload: errArray
    }
}
/**
 * This function resets all of the errors
 * so they will go away on a successful action
 */
export const errorReset = () => {
    return {
        type: constants.PATIENT_ERROR_RESET
    }
}