import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import defaultReducer from '../redux/reducers/reducers';
import { watchPatients } from '../sagas/patientSaga.js';
import { watchEncounters } from '../sagas/encounterSaga.js';

const sagaMiddleware = createSagaMiddleware();
//store setup
const store = createStore(defaultReducer,
    compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

sagaMiddleware.run(watchPatients);
sagaMiddleware.run(watchEncounters);
export default store;