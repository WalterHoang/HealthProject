export default {
    // CRUD function API requests
    CREATE_PATIENT_ASYNC: 'CREATE_PATIENT_ASYNC',
    GET_PATIENT_LIST_ASYNC: 'GET_PATIENT_LIST_ASYNC',
    DELETE_PATIENT_ASYNC: 'DELETE_PATIENT_ASYNC',
    UPDATE_PATIENT_ASYNC: 'UPDATE_PATIENT_ASYNC',
    // success and error handling
    EDIT_ASYNC_SUCCESS: 'EDIT_ASYNC_SUCCESS', // used to render success message to redirect back to table
    EDIT_ASYNC_RESET: 'EDIT_ASYNC_RESET', // resets success status
    SET_PATIENT_DATA: 'SET_PATIENT_DATA', // used for get list success
    SET_PATIENT_INFO: 'SET_PATIENT_INFO', // used to prefill edit form
    PATIENT_ASYNC_ERROR: 'PATIENT_ASYNC_ERROR', // used to set error field in patients state
    PATIENT_ERROR_RESET: 'PATIENT_ERROR_RESET' // used to reset error messages
}