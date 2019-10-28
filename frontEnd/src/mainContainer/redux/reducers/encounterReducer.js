import constants from '../../constants/encounterConstants/constants';

const initState = {
    selectedEncounter: {},
    errors: [],
    allEncounters: [],
    patientEncounters: []
}

export default function encounterReducer(state = initState, action) {
    switch (action.type) {
        case constants.GET_ALL_ENCOUNTERS_SUCCESS:
            return { ...state, allEncounters: action.payload }
        case constants.GET_ALL_PATIENT_ENCOUNTERS_SUCCESS:
            return { ...state, patientEncounters: action.payload }
        case constants.SET_SELECTED_ENCOUNTER:
            return { ...state, selectedEncounter: action.payload }
        case constants.SET_ENCOUNTER_ERROR:
            return { ...state, errors: action.payload }
        case constants.ENCOUNTER_ERROR_RESET:
            return { ...state, errors: [] }
        default:
            return state
    }
}