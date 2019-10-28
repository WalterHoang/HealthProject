import * as api from '../api/api';
import { runSaga } from 'redux-saga';
import sinon from 'sinon';
import { getPatients, createNewPatient, editPatient, removePatient } from '../mainContainer/sagas/patientSaga';
import * as actions from '../mainContainer/redux/actions/patientActions';

describe('patient saga', () => {
    let testPatient = { id: 1, name: "Walter Hoang" };
    let testPatients = [{ id: 1, name: "Walter Hoang" }, { id: 2, name: "Ryants Hoang" }];
    let dispatched = [];
    let stub;
    afterEach(() => {
        stub.restore();
        dispatched = [];
    });
    it('should fetch all patients', async () => {
        stub = sinon.stub(api, 'fetchPatients').callsFake(() => Promise.resolve(testPatients));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, getPatients, actions.getAllPatients()).done;
        expect(dispatched[0]).toEqual(actions.setPatientData(testPatients));
    });
    it('should return a 503', async () => {
        stub = sinon.stub(api, 'fetchPatients').callsFake(() => Promise.reject(503));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, getPatients, actions.getAllPatients()).done;
        expect(dispatched[0]).toEqual(actions.patientAsyncError(['Database unavailable, please try again later.']));
    });
    it('should return a 500', async () => {
        stub = sinon.stub(api, 'fetchPatients').callsFake(() => Promise.reject(500));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, getPatients, actions.getAllPatients()).done;
        expect(dispatched[0]).toEqual(actions.patientAsyncError(['An unexpected error has occurred, please try again later or contact an admin.']));
    });
    it('should add a new patient', async () => {
        stub = sinon.stub(api, 'createPatient').callsFake(() => Promise.resolve(testPatient));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, createNewPatient, actions.addPatient(testPatient)).done;
        expect(dispatched[0]).toEqual(actions.getAllPatients());
    });
    it('should throw a 503', async () => {
        stub = sinon.stub(api, 'createPatient').callsFake(() => Promise.reject(503));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, createNewPatient, actions.addPatient(testPatient)).done;
        expect(dispatched[0]).toEqual(actions.patientAsyncError(['Database unavailable, please try again later.']));
    });
    it('should throw a 409', async () => {
        stub = sinon.stub(api, 'createPatient').callsFake(() => Promise.reject(409));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, createNewPatient, actions.addPatient(testPatient)).done;
        expect(dispatched[0]).toEqual(actions.patientAsyncError(['That SSN already exists in the database!']));
    });
    it('should throw a 400', async () => {
        stub = sinon.stub(api, 'createPatient').callsFake(() => Promise.reject(400));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, createNewPatient, actions.addPatient(testPatient)).done;
        expect(dispatched[0]).toEqual(actions.patientAsyncError(['The information was invalid or something else went wrong. Try again or contact an admin.']));
    });
    it('should throw an unexpected error', async () => {
        stub = sinon.stub(api, 'createPatient').callsFake(() => Promise.reject(500));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, createNewPatient, actions.addPatient(testPatient)).done;
        expect(dispatched[0]).toEqual(actions.patientAsyncError(['An unexpected error has occurred, please try again later or contact an admin.']));
    });
    it('should update a patient', async () => {
        stub = sinon.stub(api, 'updatePatient').callsFake(() => Promise.resolve());
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, editPatient, actions.updatePatient(testPatient.id, testPatient)).done;
        expect(dispatched[0]).toEqual(actions.editAsyncSuccess());
    });
    it('should throw a 503', async () => {
        stub = sinon.stub(api, 'updatePatient').callsFake(() => Promise.reject(503));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, editPatient, actions.updatePatient(testPatient.id, testPatient)).done;
        expect(dispatched[0]).toEqual(actions.patientAsyncError(['Database unavailable, please try again later.']));
    });
    it('should throw a 404', async () => {
        stub = sinon.stub(api, 'updatePatient').callsFake(() => Promise.reject(404));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, editPatient, actions.updatePatient(testPatient.id, testPatient)).done;
        expect(dispatched[0]).toEqual(actions.patientAsyncError(['The patient you are trying to update cannot be found.']));
    });
    it('should throw a 409', async () => {
        stub = sinon.stub(api, 'updatePatient').callsFake(() => Promise.reject(409));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, editPatient, actions.updatePatient(testPatient.id, testPatient)).done;
        expect(dispatched[0]).toEqual(actions.patientAsyncError(['That SSN already exists in the database!']));
    });
    it('should throw 400', async () => {
        stub = sinon.stub(api, 'updatePatient').callsFake(() => Promise.reject(400));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, editPatient, actions.updatePatient(testPatient.id, testPatient)).done;
        expect(dispatched[0]).toEqual(actions.patientAsyncError(['The information was invalid or something else went wrong. Try again or contact an admin.']));
    });
    it('should throw an unexpected error', async () => {
        stub = sinon.stub(api, 'updatePatient').callsFake(() => Promise.reject(500));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, editPatient, actions.updatePatient(testPatient.id, testPatient)).done;
        expect(dispatched[0]).toEqual(actions.patientAsyncError(['An unexpected error has occurred, please try again later or contact an admin.']));
    });
    it('should remove a patient', async () => {
        stub = sinon.stub(api, 'deletePatient').callsFake(() => Promise.resolve(204));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, removePatient, actions.deletePatient(testPatient.id)).done;
        expect(dispatched[0]).toEqual(actions.getAllPatients());
    });
    it('should throw a 503', async () => {
        stub = sinon.stub(api, 'deletePatient').callsFake(() => Promise.reject(503));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, removePatient, actions.deletePatient(testPatient.id)).done;
        expect(dispatched[0]).toEqual(actions.patientAsyncError(['Database unavailable, please try again later.']));
    });
    it('should throw a 404', async () => {
        stub = sinon.stub(api, 'deletePatient').callsFake(() => Promise.reject(404));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, removePatient, actions.deletePatient(testPatient.id)).done;
        expect(dispatched[0]).toEqual(actions.patientAsyncError(['The patient you are trying to update cannot be found.']));
    })
    it('should throw a 409', async () =>{
        stub = sinon.stub(api, 'deletePatient').callsFake(() => Promise.reject(409));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, removePatient, actions.deletePatient(testPatient.id)).done;
        expect(dispatched[0]).toEqual(actions.patientAsyncError(['There are encounters associated with the patient.']));
    })
    it('should throw an unexpected error', async () => {
        stub = sinon.stub(api, 'deletePatient').callsFake(() => Promise.reject(500));
        await runSaga({
            dispatch: (action) => dispatched.push(action)
        }, removePatient, actions.deletePatient(testPatient.id)).done;
        expect(dispatched[0]).toEqual(actions.patientAsyncError(['An unexpected error has occurred, please try again later or contact an admin.']));
    })
})