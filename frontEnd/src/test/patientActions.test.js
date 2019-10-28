import * as actions from '../mainContainer/redux/actions/patientActions';
import constants from '../mainContainer/constants/patientConstants/constants';

describe('patient actions', () => {
    const testList = [{ name: 'Walter Hoang' }, { name: 'Ryants Hoang' }];
    const testPatient = { name: 'Walter Hoang' };
    const error = ['test error'];
    const testId = 1;

    it('should create an action to request to add a patient', () => {
        const expected = {
            type: constants.CREATE_PATIENT_ASYNC,
            payload: testPatient
        };
        expect(actions.addPatient(testPatient)).toEqual(expected);
    })
    it('should create an action to update a patient', () => {
        const expected = {
            type: constants.UPDATE_PATIENT_ASYNC,
            id: testId,
            payload: testPatient
        };
        expect(actions.updatePatient(testId, testPatient)).toEqual(expected);
    })
    it('should create an action to delete a patient', () => {
        const expected = {
            type: constants.DELETE_PATIENT_ASYNC,
            payload: testId
        };
        expect(actions.deletePatient(testId)).toEqual(expected);
    })
    it('should create an action to get a list of patients', () => {
        const expected = {
            type: constants.GET_PATIENT_LIST_ASYNC
        };
        expect(actions.getAllPatients()).toEqual(expected);
    })
    it('should create an action to set the list data', () => {
        const expected = {
            type: constants.SET_PATIENT_DATA,
            payload: testList
        };
        expect(actions.setPatientData(testList)).toEqual(expected);
    })
    it('should create a action to select a single patient', () => {
        const expected = {
            type: constants.SET_PATIENT_INFO,
            payload: testPatient
        };
        expect(actions.setPatientInfo(testPatient)).toEqual(expected);
    })
    it('should create an action to show an edit worked', () => {
        const expected = {
            type: constants.EDIT_ASYNC_SUCCESS
        };
        expect(actions.editAsyncSuccess()).toEqual(expected);
    })
    it('should reset the above action', () => {
        const expected = {
            type: constants.EDIT_ASYNC_RESET
        };
        expect(actions.editAsyncReset()).toEqual(expected);
    })
    it('should create an action to set an error', () => {
        const expected = {
            type: constants.PATIENT_ASYNC_ERROR,
            payload: error
        };
        expect(actions.patientAsyncError(error)).toEqual(expected);
    })
    it('should create an action to reset the above', () => {
        const expected = {
            type: constants.PATIENT_ERROR_RESET
        };
        expect(actions.errorReset()).toEqual(expected);
    })
})