import reducer from '../mainContainer/redux/reducers/encounterReducer';
import constants from '../mainContainer/constants/encounterConstants/constants';

const initState = {
    selectedEncounter: {},
    errors: [],
    allEncounters: [],
    patientEncounters: []
};

const testEncounters = [
    {
        id: 1,
        patient: {
            id: 1,
            name: "Walter Hoang"
        },
        chiefComplaint: "Bad back"
    },
    {
        id: 2,
        patient: {
            id: 2,
            name: "Ryants Hoang"
        },
        chiefComplaint: "Fractured leg"
    }
];
const testEncounter = {
    id: 1,
    patient: {
        id: 1,
        name: "Walter Hoang"
    },
    chiefComplaint: "Bad back"
};
const testError = ["error"];

describe('patient reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(initState, {})).toEqual(initState);
    });
    it('should set all encounter data', () => {
        const expected = {
            selectedEncounter: {},
            errors: [],
            allEncounters: testEncounters,
            patientEncounters: []
        };
        expect(reducer(initState, {
            type: constants.GET_ALL_ENCOUNTERS_SUCCESS,
            payload: testEncounters
        })).toEqual(expected);
    })
    it('should set a specific patient\'s encounters', () => {
        const expected = {
            selectedEncounter: {},
            errors: [],
            allEncounters: [],
            patientEncounters: [testEncounters[0]]
        };
        expect(reducer(initState, {
            type: constants.GET_ALL_PATIENT_ENCOUNTERS_SUCCESS,
            payload: [testEncounters[0]]
        })).toEqual(expected);
    })
    it('should select a single encounter', () => {
        const expected = {
            selectedEncounter: testEncounter,
            errors: [],
            allEncounters: [],
            patientEncounters: []
        };
        expect(reducer(initState, {
            type: constants.SET_SELECTED_ENCOUNTER,
            payload: testEncounter
        })).toEqual(expected);
    })
    it('should set an error', () => {
        const expected = {
            selectedEncounter: {},
            errors: testError,
            allEncounters: [],
            patientEncounters: []
        };
        expect(reducer(initState, {
            type: constants.SET_ENCOUNTER_ERROR,
            payload: testError
        })).toEqual(expected);
    })
    it('should reset an error state', () => {
        const init = {
            selectedEncounter: {},
            errors: testError,
            allEncounters: [],
            patientEncounters: []
        };
        const expected = {
            selectedEncounter: {},
            errors: [],
            allEncounters: [],
            patientEncounters: []
        };
        expect(reducer(init, {
            type: constants.ENCOUNTER_ERROR_RESET
        })).toEqual(expected);
    })
})