import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as patientActions from '../../redux/actions/patientActions';
import './css/patientTable.css';
import { getPatientEncounters } from '../../redux/actions/encounterActions';

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
 * This component handles the display
 * of all patients
 */
class PatientTable extends Component {
    constructor(props) {
        super(props);
        this.setPatientDeets = this.setPatientDeets.bind(this);
        this.renderPatient = this.renderPatient.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {}
    }
    /**
     * Dispatches action to remove patient
     * @param {number} id patient id
     */
    handleDelete(id) {
        this.props.dispatch(patientActions.deletePatient(id));
    }
    componentDidMount() {
        this.props.dispatch(patientActions.getAllPatients());
    }
    /**
     * dispatch 2 actions to set patient details to view
     * as well as their encounters
     */
    setPatientDeets = (patient) => {
        this.props.dispatch(patientActions.errorReset());
        this.props.dispatch(patientActions.setPatientInfo(patient));
        this.props.dispatch(getPatientEncounters(patient.id));
    }
    /**
     * This function renders a row
     * with the patient's info
     * @param {Object} patient patient info
     * @param {number} key index of patient from list 
     */
    renderPatient(patient, key) {
        return (
            <tr key={'row -' + key}>
                <td className='table-data'>
                    {patient.firstName + ' ' + patient.lastName}
                </td>
                <td>
                    <NavLink className='patient-action' to={'/patientDetails'} onClick={() => this.setPatientDeets(patient)}>View Details</NavLink>
                </td>
                <td>
                    <button className='patient-action' onClick={() => this.handleDelete(patient.id)}>
                        Delete Patient
                    </button>
                </td>
            </tr>
        )
    }
    render() {
        return (
            <div>
                <table className='patient-table'>
                    <tbody>
                        <tr>
                            <th className='table-header'>Patient Name</th>
                        </tr>
                        {this.props.patientState.patients.map(
                            (patient, key) => this.renderPatient(patient, key)
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(mapStateToProps)(PatientTable);