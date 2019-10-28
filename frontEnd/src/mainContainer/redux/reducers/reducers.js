import { combineReducers } from 'redux';
import patientReducer from './patientReducer';
import encounterReducer from './encounterReducer';

const defaultReducer = combineReducers({
    patients: patientReducer,
    encounters: encounterReducer
});

export default defaultReducer