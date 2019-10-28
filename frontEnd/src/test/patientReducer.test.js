import reducer from '../mainContainer/redux/reducers/patientReducer';
import constants from '../mainContainer/constants/patientConstants/constants';

const initState = {
    selectedPatient: {},
    errors: [],
    patients: [],
    editDone: false
};
const testPatients = [
    {
        id: 1,
        name: "Walter Hoang"
    },
    {
        id: 2,
        name: "Ryants Hoang"
    }
];
const testPatient =
{
    id: 1,
    name: "Walter Hoang"
};
const testErr = ["error"];

describe('patient reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(initState, {})).toEqual(initState);
    });
    it('should set patient data', () => {
        const expectedState = {
            selectedPatient: {},
            errors: [],
            patients: testPatients,
            editDone: false
        };
        expect(reducer(initState, {
            type: constants.SET_PATIENT_DATA,
            payload: testPatients
        })).toEqual(expectedState);
    });
    it('should set patient info', () => {
        const expectedState = {
            selectedPatient: testPatient,
            errors: [],
            patients: [],
            editDone: false
        };
        expect(reducer(initState, {
            type: constants.SET_PATIENT_INFO,
            payload: testPatient
        })).toEqual(expectedState);
    });
    it('should set editstatus to true', () => {
        const expectedState = {
            selectedPatient: {},
            errors: [],
            patients: [],
            editDone: true
        };
        expect(reducer(initState, {
            type: constants.EDIT_ASYNC_SUCCESS
        })).toEqual(expectedState);
    })
    it('should set editstatus to false', () => {
        const startState = {
            selectedPatient: {},
            errors: [],
            patients: [],
            editDone: true
        };
        const expectedState = {
            selectedPatient: {},
            errors: [],
            patients: [],
            editDone: false
        };
        expect(reducer(startState, {
            type: constants.EDIT_ASYNC_RESET
        })).toEqual(expectedState);
    })
    it('should set an error', () => {
        const expectedState = {
            selectedPatient: {},
            errors: testErr,
            patients: [],
            editDone: false
        };
        expect(reducer(initState, {
            type: constants.PATIENT_ASYNC_ERROR,
            payload: testErr
        })).toEqual(expectedState);
    })
    it('should reset errors', () => {
        const startState = {
            selectedPatient: {},
            errors: testErr,
            patients: [],
            editDone: false
        };
        const expectedState = {
            selectedPatient: {},
            errors: [],
            patients: [],
            editDone: false
        };
        expect(reducer(startState, {
            type: constants.PATIENT_ERROR_RESET
        })).toEqual(expectedState);
    })
})