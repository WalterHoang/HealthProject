import constants from '../../constants/patientConstants/constants';

const initState = {
    selectedPatient: {},
    errors: [],
    patients: [],
    editDone: false
}
export default function patientReducer(state = initState, action) {
    switch (action.type) {
        case constants.SET_PATIENT_DATA: // if get list of patients is successful
            return { ...state, patients: action.payload }
        case constants.SET_PATIENT_INFO: // for a single patient to view details/edit
            return { ...state, selectedPatient: action.payload }
        case constants.EDIT_ASYNC_SUCCESS:
            return { ...state, editDone: true }
        case constants.EDIT_ASYNC_RESET:
            return { ...state, editDone: false }
        case constants.PATIENT_ASYNC_ERROR:
            return { ...state, errors: action.payload }
        case constants.PATIENT_ERROR_RESET:
            return { ...state, errors: [] }
        default:
            return state
    }
}