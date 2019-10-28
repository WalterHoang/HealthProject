import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSelectedEncounter, encounterErrorReset } from '../../redux/actions/encounterActions';
import EditEncounterForm from './EditEncounterForm';
import './css/encounter.css';

/**
 * This function gives the component access to the parts
 * of state it needs
 * @param {Object} state global state object 
 */
const mapStateToProps = (state) => {
    return {
        patientState: state.patients,
        encounterState: state.encounters
    }
}
/**
 * This component handles the rendering of a patient's encounters
 */
class PatientEncounterTable extends Component {
    constructor(props) {
        super(props);
        this.renderEncounter = this.renderEncounter.bind(this);
        this.convertToDate = this.convertToDate.bind(this);
        this.openModel = this.openModel.bind(this);
        this.state = {}
    }
    /**
     * opens editing model for an encounter
     */
    openModel = (encounter) => {
        this.props.dispatch(setSelectedEncounter(encounter));
        let modal = document.getElementById("edit-encounter-form-modal");
        this.props.dispatch(encounterErrorReset());
        modal.style.display = "block";
    }
    /**
    * Converts the miliseconds to a readable date
    * format
    * @param {number} milisecs past Unix epoch
    */
    convertToDate(milisecs) {
        let date = new Date(milisecs);
        return date.toLocaleString();
    }
    /**
     * Renders a row for each encounter
     * @param {Object} encounter current encounter
     * @param {number} key index in encounter array 
     */
    renderEncounter(encounter, key) {
        // to show a more readable date on the edit form
        let selectedEncounter = {
            id: encounter.id,
            patient: encounter.patient,
            notes: encounter.notes,
            provider: encounter.provider,
            visitCode: encounter.visitCode,
            billingCode: encounter.billingCode,
            icd10: encounter.icd10,
            totalCost: encounter.totalCost,
            coPay: encounter.coPay,
            chiefComplaint: encounter.chiefComplaint,
            pulse: encounter.pulse,
            systolic: encounter.systolic,
            diastolic: encounter.diastolic,
            date: this.convertToDate(encounter.date)
        }
        return (
            <tr key={'row - ' + key}>
                <td className='encounter-data'>
                    {/**Deal with the depreciated date type on the java layer */}
                    {this.convertToDate(encounter.date)}
                </td>
                <td className='encounter-data'>
                    {encounter.provider}
                </td>
                <td className='encounter-data'>
                    {encounter.chiefComplaint}
                </td>
                <td className='encounter-data'>
                    <span>ICD10: {encounter.icd10}</span>
                    <br />
                    <span>Visit Code: {encounter.visitCode}</span>
                    <br />
                    <span>Bill Code: {encounter.billingCode}</span>
                </td>
                <td className='encounter-data'>
                    <span>Total: {encounter.totalCost}</span>
                    <br />
                    <span>CoPay: {encounter.coPay}</span>
                </td>
                <td className='encounter-data'>
                    {encounter.pulse}
                </td>
                <td className='encounter-data'>
                    {encounter.systolic}
                </td>
                <td className='encounter-data'>
                    {encounter.diastolic}
                </td>
                <td className='encounter-data'>
                    {encounter.notes}
                </td>
                <td>
                    <button className='encounter-action' onClick={() => this.openModel(selectedEncounter)}>Update Encounter</button>
                </td>
            </tr>
        )
    }
    render() {
        return (
            <div>
                <EditEncounterForm></EditEncounterForm>
                <table className='encounter-table'>
                    <tbody>
                        <tr>
                            <th className='encounter-header'>
                                Encounter Date
                            </th>
                            <th className='encounter-header'>
                                Provider
                            </th>
                            <th className='encounter-header'>
                                Chief Complaint
                            </th>
                            <th className='encounter-header'>
                                Office codes
                            </th>
                            <th className='encounter-header'>
                                Cost (USD)
                            </th>
                            <th className='encounter-header'>
                                Pulse
                            </th>
                            <th className='encounter-header'>
                                Systolic
                            </th>
                            <th className='encounter-header'>
                                Diastolic
                            </th>
                            <th className='encounter-header'>
                                Notes
                            </th>
                        </tr>
                        {this.props.encounterState.patientEncounters.map(
                            (encounter, key) => this.renderEncounter(encounter, key)
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(mapStateToProps)(PatientEncounterTable);