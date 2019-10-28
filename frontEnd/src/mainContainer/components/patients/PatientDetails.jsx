import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../navigation/navBar/NavBar';
import * as patientActions from '../../redux/actions/patientActions';
import { NavLink } from 'react-router-dom';
import './css/patientDetails.css';
import '../encounters/css/encounter.css';
import EditPatientForm from './EditPatientForm';
import PatientEncounterTable from '../encounters/PatientEncounterTable';
import { encounterErrorReset } from '../../redux/actions/encounterActions';
import NewEncounterForm from '../encounters/NewEncounterForm';

/**
 * This function gives the component access to the parts
 * of state it needs
 * @param {Object} state global state object 
 */
const mapStateToProps = (state) => {
    return {
        patientState: state.patients
    }
}
/**
 * This component renders all details for a selected patient
 */
class PatientDetails extends Component {
    constructor(props) {
        super(props);
        this.openEditModal = this.openEditModal.bind(this);
        this.openAddEncounterModal = this.openAddEncounterModal.bind(this);
        this.state = {}
    }
    /**
     * opens the edit patient form
     */
    openEditModal = () => {
        let modal = document.getElementById("edit-form-modal");
        this.props.dispatch(patientActions.errorReset());
        modal.style.display = "block";
    }
    /**
     * opens a add encounter form
     */
    openAddEncounterModal = () => {
        let modal = document.getElementById("add-encounter-form-modal");
        this.props.dispatch(encounterErrorReset());
        modal.style.display = "block";
    }
    render() {
        let selectedPatient = this.props.patientState.selectedPatient;
        return (
            <div className='center-div'>
                <NavBar />
                {this.props.patientState.editDone === true ?
                    <p>Patient info successfully updated. Please reload the page.</p>
                    : <div id='errors'>
                        {this.props.patientState.errors !== [] ? this.props.patientState.errors.map((error, key) =>
                            <p className='errors' key={'error - ' + key}>{error}</p>
                        ) : null
                        }
                    </div>
                }
                <h2>{selectedPatient.firstName + ' ' + selectedPatient.lastName}</h2>
                <button className='patient-action' onClick={this.openEditModal}>Edit patient info</button>
                <NavLink className='patient-action' to='/patients'>Close</NavLink>
                <br />
                <fieldset className='align-left adjust-field-set'>
                    <legend>Personal information</legend>
                    <p>
                        {'SSN: ' + selectedPatient.ssn}
                        <br />
                        {'Insurance: ' + selectedPatient.insurance.insurance}
                        <br />
                        {'Age: ' + selectedPatient.age}
                        <br />
                        {'Sex: ' + selectedPatient.sex.sex}
                        <br />
                        {'Height: ' + selectedPatient.height + ' in'}
                        <br />
                        {'Weight: ' + selectedPatient.weight + ' lbs'}
                    </p>
                    <p>
                        Address:
                        <br />
                        {selectedPatient.address.street}
                        <br />
                        {
                            selectedPatient.address.city + ', ' +
                            selectedPatient.address.state + ' ' +
                            selectedPatient.address.zip
                        }
                    </p>
                </fieldset>
                <br />
                <br />
                <button className='encounter-action' onClick={this.openAddEncounterModal}>Create New Encounter</button>
                <br />
                <NewEncounterForm></NewEncounterForm>
                <fieldset className='adjust-field-set'>
                    <legend>Encounter Information</legend>
                    <PatientEncounterTable></PatientEncounterTable>
                </fieldset>
                <br />
                <EditPatientForm></EditPatientForm>
            </div>);
    }
}

export default connect(mapStateToProps)(PatientDetails);