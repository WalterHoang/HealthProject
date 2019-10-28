import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PatientPage from '../patients/PatientPage';
import EncounterPage from '../encounters/EncounterPage';
import PatientDetails from '../patients/PatientDetails';
/**
 * This class handles the routing of components based
 * on the endpoint of the url
 */
class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div>
            <Switch>
                <Route exact path = '/' component = {PatientPage} />
                <Route exact path = '/patients' component = {PatientPage}></Route>
                <Route exact path = '/patientDetails' component = {PatientDetails}></Route>
                <Route exact path = '/encounters' component = {EncounterPage}></Route>
            </Switch>
        </div>);
    }
}

export default Routes;