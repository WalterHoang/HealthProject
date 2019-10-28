import { all, put, takeEvery, call } from 'redux-saga/effects';
import constants from '../constants/encounterConstants/constants';
import {
    getAllEncounters,
    getAllEncountersSuccess,
    getPatientEncounters,
    getPatientEncountersSuccess,
    setEncounterError
} from '../redux/actions/encounterActions';
import {
    fetchAllEncounters,
    fetchEncountersByPatient,
    createEncounter,
    updateEncounter,
    deleteEncounter
} from '../../api/api';
/**
 * This function watches for any api requests
 * that involves encounters
 */
export function* watchEncounters() {
    yield all([
        takeEvery(constants.GET_ALL_ENCOUNTERS, findAllEncounters),
        takeEvery(constants.GET_ALL_ENCOUNTERS_BY_PATIENT_ID, findAllByPatientId),
        takeEvery(constants.CREATE_ENCOUNTER, addNewEncounter),
        takeEvery(constants.UPDATE_ENCOUNTER, updateSelectedEncounter),
        takeEvery(constants.DELETE_ENCOUNTER, removeEncounter)
    ])
}
/**
 * This function calls the api to fetch
 * all encounters
 */
export function* findAllEncounters() {
    try {
        const data = yield call(fetchAllEncounters);
        yield put(getAllEncountersSuccess(data));
    } catch (err) {
        let error = [];
        if (err === 503) {
            error.push('Database unavailable, please try again later.');
            yield put(setEncounterError(error));
        } else {
            error.push('An unexpected error has occurred, please try again later or contact an admin.');
            yield put(setEncounterError(error));
        }
    }
}
/**
 * This function calls the api to fetch all
 * encounters associated with a patient
 * @param {Object} action action containing patient id 
 */
export function* findAllByPatientId(action) {
    try {
        const data = yield call(() => fetchEncountersByPatient(action.payload));
        yield put(getPatientEncountersSuccess(data));
    } catch (err) {
        let error = [];
        if (err === 404) {
            error.push('There are currently no encounters associated with the patient or the patient cannot be found.');
            yield put(setEncounterError(error));
        } else if (err === 503) {
            error.push('Database unavailable, please try again later.');
            yield put(setEncounterError(error));
        } else {
            error.push('An unexpected error has occurred, please try again later or contact an admin.');
            yield put(setEncounterError(error));
        }
    }
}
/**
 * This function calls the api to create
 * a new encounter and to call the above
 * function on success
 * @param {Object} action Object containing encounter info
 */
export function* addNewEncounter(action) {
    try {
        yield call(() => createEncounter(action.payload));
        yield put(getPatientEncounters(action.payload.patient.id));
    } catch (err) {
        let error = [];
        if (err === 400) {
            error.push('The information was invalid or something else went wrong. Try again or contact an admin.');
            yield put(setEncounterError(error));
        } else if (err === 503) {
            error.push('Database unavailable, please try again later.');
            yield put(setEncounterError(error));
        } else {
            error.push('An unexpected error has occurred, please try again later or contact an admin.');
            yield put(setEncounterError(error));
        }
    }
}
/**
 * This function calls the api to update an existing
 * encounter than calls the function that gets
 * all encounters associated with a patient
 * @param {Object} action contains new encounter info and id 
 * of old encounter info 
 */
export function* updateSelectedEncounter(action) {
    try {
        yield call(() => updateEncounter(action.id, action.payload));
        yield put(getPatientEncounters(action.payload.patient.id));
    } catch (err) {
        let error = [];
        if (err === 400) {
            error.push('The information was invalid or something else went wrong. Try again or contact an admin.');
            yield put(setEncounterError(error));
        } else if (err === 404) {
            error.push('The selected encounter or the associated patient could not be found in the database.');
            yield put(setEncounterError(error));
        } else if (err === 503) {
            error.push('Database unavailable, please try again later.');
            yield put(setEncounterError(error));
        } else {
            error.push('An unexpected error has occurred, please try again later or contact an admin.');
            yield put(setEncounterError(error));
        }
    }
}
/**
 * This function calls the api to
 * delete an encounter in the database.
 * Right now can only be done in the encounters page
 * @param {Object} action object containing encounter id 
 */
export function* removeEncounter(action) {
    try {
        yield call(() => deleteEncounter(action.payload));
        yield put(getAllEncounters());
    } catch (err) {
        let error = [];
        if (err === 404) {
            error.push('The selected encounter or the associated patient could not be found in the database.');
            yield put(setEncounterError(error));
        } else if (err === 503) {
            error.push('Database unavailable, please try again later.');
            yield put(setEncounterError(error));
        } else {
            error.push('An unexpected error has occurred, please try again later or contact an admin.');
            yield put(setEncounterError(error));
        }
    }
}