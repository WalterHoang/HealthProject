import * as api from '../api/api';
import { runSaga } from 'redux-saga';
import sinon from 'sinon';
import {
    findAllEncounters,
    findAllByPatientId,
    addNewEncounter,
    updateSelectedEncounter,
    removeEncounter
} from '../mainContainer/sagas/encounterSaga';
import * as actions from '../mainContainer/redux/actions/encounterActions';

describe('patient saga', () => {
    let testEncounter = {
        id: 1,
        patient: {
            id: 1,
            name: "Walter Hoang"
        },
        chiefComplaint: "Bad back"
    };
    let testEncounters = [
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
    const testError = ['spanglish inquisition'];
    let dispatched = [];
    let stub;
    afterEach(() => {
        stub.restore();
        dispatched = [];
    });
    it('should fetch all encounters', async () => {
        stub = sinon.stub(api, 'fetchAllEncounters').callsFake(() => Promise.resolve(testEncounters));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, findAllEncounters, actions.getAllEncounters()).done;
        expect(dispatched[0]).toEqual(actions.getAllEncountersSuccess(testEncounters));
    })
    it('should throw a 503', async () => {
        stub = sinon.stub(api, 'fetchAllEncounters').callsFake(() => Promise.reject(503));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, findAllEncounters, actions.getAllEncounters()).done;
        expect(dispatched[0]).toEqual(actions.setEncounterError(['Database unavailable, please try again later.']));
    })
    it('should throw a unexpected err', async () => {
        stub = sinon.stub(api, 'fetchAllEncounters').callsFake(() => Promise.reject(testError));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, findAllEncounters, actions.getAllEncounters()).done;
        expect(dispatched[0]).toEqual(actions.setEncounterError(['An unexpected error has occurred, please try again later or contact an admin.']));
    })
    it('should find all encounters by patient id', async () => {
        stub = sinon.stub(api, 'fetchEncountersByPatient').callsFake(() => Promise.resolve([testEncounter]));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, findAllByPatientId, actions.getPatientEncounters(testEncounter.patient.id)).done;
        expect(dispatched[0]).toEqual(actions.getPatientEncountersSuccess([testEncounter]));
    })
    it('should throw a 404', async () => {
        stub = sinon.stub(api, 'fetchEncountersByPatient').callsFake(() => Promise.reject(404));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, findAllByPatientId, actions.getPatientEncounters(testEncounter.patient.id)).done;
        expect(dispatched[0]).toEqual(actions.setEncounterError(['There are currently no encounters associated with the patient or the patient cannot be found.']));
    })
    it('should throw a 503', async () => {
        stub = sinon.stub(api, 'fetchEncountersByPatient').callsFake(() => Promise.reject(503));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, findAllByPatientId, actions.getPatientEncounters(testEncounter.patient.id)).done;
        expect(dispatched[0]).toEqual(actions.setEncounterError(['Database unavailable, please try again later.']));
    })
    it('should throw an unexpected error', async () => {
        stub = sinon.stub(api, 'fetchEncountersByPatient').callsFake(() => Promise.reject(testError));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, findAllByPatientId, actions.getPatientEncounters(testEncounter.patient.id)).done;
        expect(dispatched[0]).toEqual(actions.setEncounterError(['An unexpected error has occurred, please try again later or contact an admin.']));
    })
    it('should create a new encounter', async () => {
        stub = sinon.stub(api, 'createEncounter').callsFake(() => Promise.resolve(testEncounter));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, addNewEncounter, actions.createNewEncounter(testEncounter)).done;
        expect(dispatched[0]).toEqual(actions.getPatientEncounters(testEncounter.patient.id));
    })
    it('should throw a 400', async () => {
        stub = sinon.stub(api, 'createEncounter').callsFake(() => Promise.reject(400));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, addNewEncounter, actions.createNewEncounter(testEncounter)).done;
        expect(dispatched[0]).toEqual(actions.setEncounterError(['The information was invalid or something else went wrong. Try again or contact an admin.']));
    })
    it('should throw a 503', async () => {
        stub = sinon.stub(api, 'createEncounter').callsFake(() => Promise.reject(503));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, addNewEncounter, actions.createNewEncounter(testEncounter)).done;
        expect(dispatched[0]).toEqual(actions.setEncounterError(['Database unavailable, please try again later.']));
    })
    it('should throw an unexpected error', async () => {
        stub = sinon.stub(api, 'createEncounter').callsFake(() => Promise.reject(testError));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, addNewEncounter, actions.createNewEncounter(testEncounter)).done;
        expect(dispatched[0]).toEqual(actions.setEncounterError(['An unexpected error has occurred, please try again later or contact an admin.']));
    })
    it('should update an encounter', async () => {
        stub = sinon.stub(api, 'updateEncounter').callsFake(() => Promise.resolve(testEncounter));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, updateSelectedEncounter, actions.updateEncounter(testEncounter.patient.id, testEncounter)).done;
        expect(dispatched[0]).toEqual(actions.getPatientEncounters(testEncounter.patient.id));
    })
    it('should throw a 400', async () => {
        stub = sinon.stub(api, 'updateEncounter').callsFake(() => Promise.reject(400));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, updateSelectedEncounter, actions.updateEncounter(testEncounter.patient.id, testEncounter)).done;
        expect(dispatched[0]).toEqual(actions.setEncounterError(['The information was invalid or something else went wrong. Try again or contact an admin.']));
    })
    it('should throw a 404', async () => {
        stub = sinon.stub(api, 'updateEncounter').callsFake(() => Promise.reject(404));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, updateSelectedEncounter, actions.updateEncounter(testEncounter.patient.id, testEncounter)).done;
        expect(dispatched[0]).toEqual(actions.setEncounterError(['The selected encounter or the associated patient could not be found in the database.']));
    })
    it('should throw a 503', async () => {
        stub = sinon.stub(api, 'updateEncounter').callsFake(() => Promise.reject(503));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, updateSelectedEncounter, actions.updateEncounter(testEncounter.patient.id, testEncounter)).done;
        expect(dispatched[0]).toEqual(actions.setEncounterError(['Database unavailable, please try again later.']));
    })
    it('should throw an unexpected error', async () => {
        stub = sinon.stub(api, 'updateEncounter').callsFake(() => Promise.reject(testError));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, updateSelectedEncounter, actions.updateEncounter(testEncounter.patient.id, testEncounter)).done;
        expect(dispatched[0]).toEqual(actions.setEncounterError(['An unexpected error has occurred, please try again later or contact an admin.']));
    })
    it('should delete an encounter', async () => {
        stub = sinon.stub(api, 'deleteEncounter').callsFake(() => Promise.resolve(204));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, removeEncounter, actions.deleteEncounter(testEncounter.patient.id)).done;
        expect(dispatched[0]).toEqual(actions.getAllEncounters());
    })
    it('should throw a 404', async () => {
        stub = sinon.stub(api, 'deleteEncounter').callsFake(() => Promise.reject(404));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, removeEncounter, actions.deleteEncounter(testEncounter.patient.id)).done;
        expect(dispatched[0]).toEqual(actions.setEncounterError(['The selected encounter or the associated patient could not be found in the database.']));
    })
    it('should throw a 503', async () => {
        stub = sinon.stub(api, 'deleteEncounter').callsFake(() => Promise.reject(503));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, removeEncounter, actions.deleteEncounter(testEncounter.patient.id)).done;
        expect(dispatched[0]).toEqual(actions.setEncounterError(['Database unavailable, please try again later.']));
    })
    it('should throw a unexpected error', async () => {
        stub = sinon.stub(api, 'deleteEncounter').callsFake(() => Promise.reject(testError));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, removeEncounter, actions.deleteEncounter(testEncounter.patient.id)).done;
        expect(dispatched[0]).toEqual(actions.setEncounterError(['An unexpected error has occurred, please try again later or contact an admin.']));
    })
})