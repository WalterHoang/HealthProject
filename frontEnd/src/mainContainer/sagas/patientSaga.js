import { all, put, takeEvery, call } from 'redux-saga/effects';
import constants from '../constants/patientConstants/constants';
import { getAllPatients, setPatientData, editAsyncSuccess, patientAsyncError } from '../redux/actions/patientActions';
import { fetchPatients, createPatient, updatePatient, deletePatient } from '../../api/api';
/**
 * This function handles the API requests from the patients domain
 */
export function* watchPatients() {
    yield all([
        takeEvery(constants.GET_PATIENT_LIST_ASYNC, getPatients),
        takeEvery(constants.CREATE_PATIENT_ASYNC, createNewPatient),
        takeEvery(constants.UPDATE_PATIENT_ASYNC, editPatient),
        takeEvery(constants.DELETE_PATIENT_ASYNC, removePatient)
    ])
}
/**
 * This function calls the api call to get all patients
 */
export function* getPatients() {
    try {
        const data = yield call(fetchPatients)
        yield put(setPatientData(data));
    } catch (err) {
        let error = [];
        if (err === 503) {
            error.push('Database unavailable, please try again later.')
            yield put(patientAsyncError(error));
        } else {
            error.push('An unexpected error has occurred, please try again later or contact an admin.')
            yield put(patientAsyncError(error));
        }
    }
}
/**
 * This function calls the api to 
 * create a patient
 * @param {Object} action 
 */
export function* createNewPatient(action) {
    try {
        yield call(() => createPatient(action.payload));
        yield put(getAllPatients());
    } catch (err) {
        let error = [];
        if (err === 503) {
            error.push('Database unavailable, please try again later.')
            yield put(patientAsyncError(error));
        } else if (err === 409) {
            error.push('That SSN already exists in the database!');
            yield put(patientAsyncError(error));
        } else if (err === 400) {
            error.push('The information was invalid or something else went wrong. Try again or contact an admin.')
            yield put(patientAsyncError(error));
        } else {
            error.push('An unexpected error has occurred, please try again later or contact an admin.')
            yield put(patientAsyncError(error));
        }
    }
}
/**
 * This function calls the calls the api
 * function to update a patient
 * @param {Object} action contains id of patient to update and new patient info
 */
export function* editPatient(action) {
    try {
        yield call(() => updatePatient(action.id, action.payload));
        yield put(editAsyncSuccess());
    } catch (err) {
        let error = [];
        if (err === 503) {
            error.push('Database unavailable, please try again later.')
            yield put(patientAsyncError(error));
        } else if (err === 404) {
            error.push('The patient you are trying to update cannot be found.');
            yield put(patientAsyncError(error));
        } else if (err === 409) {
            error.push('That SSN already exists in the database!');
            yield put(patientAsyncError(error));
        } else if (err === 400) {
            error.push('The information was invalid or something else went wrong. Try again or contact an admin.')
            yield put(patientAsyncError(error));
        } else {
            error.push('An unexpected error has occurred, please try again later or contact an admin.')
            yield put(patientAsyncError(error));
        }
    }
}
/**
 * This function calls the api function
 * to remove a patient from the database
 * @param {Object} action contains id of patient to delete 
 */
export function* removePatient(action) {
    try {
        yield call(() => deletePatient(action.payload));
        yield put(getAllPatients());
    } catch (err) {
        let error = [];
        if (err === 503) {
            error.push('Database unavailable, please try again later.')
            yield put(patientAsyncError(error));
        } else if (err === 404) {
            error.push('The patient you are trying to update cannot be found.');
            yield put(patientAsyncError(error));
        } else if (err === 409) {
            error.push('There are encounters associated with the patient.');
            yield put(patientAsyncError(error));
        } else {
            error.push('An unexpected error has occurred, please try again later or contact an admin.')
            yield put(patientAsyncError(error));
        }
    }
}