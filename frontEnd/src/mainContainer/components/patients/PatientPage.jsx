import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../navigation/navBar/NavBar';
import * as patientActions from '../../redux/actions/patientActions';
import PatientTable from './PatientTable';
import NewPatientForm from './NewPatientForm';
import './css/patientTable.css';
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
 * This component is the main container
 * for all patient related pages
 */
class PatientPage extends Component {
    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.state = {}
    }
    componentDidMount() {
        this.props.dispatch(patientActions.editAsyncReset());
        this.props.dispatch(patientActions.errorReset());
    }
    /**
     * opens the add patient form
     */
    openModal = () => {
        let modal = document.getElementById("add-form-modal");
        this.props.dispatch(patientActions.errorReset());
        modal.style.display = "block";
    }
    render() {
        return (
            <div className='center-div'>
                <NavBar />
                <NewPatientForm></NewPatientForm>
                <h1>Patient Directory</h1>
                <button className='add-modal-trigger patient-action' onClick={this.openModal}>Add New Patient</button>
                <br />
                <div id='errors'>
                    {this.props.patientState.errors !== [] ? this.props.patientState.errors.map((error, key) =>
                        <p className='errors' key={'error - ' + key}>{error}</p>
                    ) : null
                    }
                </div>
                <PatientTable></PatientTable>
            </div>);
    }
}

export default connect(mapStateToProps)(PatientPage);