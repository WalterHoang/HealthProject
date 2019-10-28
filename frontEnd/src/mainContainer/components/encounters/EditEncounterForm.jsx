import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEncounter, setEncounterError, encounterErrorReset } from '../../redux/actions/encounterActions';

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
 * This component handles the updating of
 * an encounter
 */
class EditEncounterForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {}
    }
    /**
     * Closes the edit encounter form
     */
    closeModal = () => {
        // get affected elements
        let modal = document.getElementById("edit-encounter-form-modal");
        let form = document.getElementById("edit-encounter-form");
        // reset any errors that occurred
        this.props.dispatch(encounterErrorReset());
        // reset form to default values
        form.reset();
        modal.style.display = "none";
    }
    /**
     * passes valid encounter to api
     * while signals closeModal to trigger
     * @param {Object} encounter 
     * @param {*} event 
     */
    handleUpdate(encounter, event) {
        this.props.dispatch(updateEncounter(this.props.encounterState.selectedEncounter.id, encounter));
        this.closeModal(event);
    }
    /**
     * validates form info
     * @param {*} event 
     */
    handleSubmit(event) {
        // store all errors
        let validationErrs = [];
        // prevent refresh
        event.preventDefault();
        let formInfo = event.target.getElementsByTagName('input');
        // setup focus on errors
        let errorMsgs = document.getElementById("edit-encounter-errors");
        if (!formInfo.visitcode.value.match(/^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/)) {
            validationErrs.push('Invalid Visit Code. Example visit code: A1B 2C3');
        }
        if (!formInfo.billcode.value.match(/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/)) {
            validationErrs.push('Invalid billing code. Example billing code: 111.111.111-11 ');
        }
        if (!formInfo.icd10.value.match(/^[A-Z][0-9]{2}$/)) {
            validationErrs.push('Invalid ICD10 code. ICD10 code consists of 1 uppercase alphabetic character and 2 digits');
        }
        if (isNaN(formInfo.totalcost.value)) {
            validationErrs.push('Invalid total cost amount. Please make sure only a number is entered.');
        }
        if (formInfo.totalcost.value < 0) {
            validationErrs.push('Total cost cannot be less than 0');
        }
        if (isNaN(formInfo.copay.value)) {
            validationErrs.push('Invalid co pay amount. Please make sure only a number is entered.');
        }
        if (formInfo.copay.value < 0) {
            validationErrs.push('Co pay cannot be less than 0');
        }
        if ((formInfo.pulse.value.trim() !== '' && isNaN(formInfo.pulse.value)) || parseInt(formInfo.pulse.value) <= 0) {
            validationErrs.push('Pulse should be a number greater than 0');
        }
        if ((formInfo.systolic.value.trim() !== '' && isNaN(formInfo.systolic.value)) || parseInt(formInfo.systolic.value) <= 0) {
            validationErrs.push('Systolic should be a number greater than 0');
        }
        if ((formInfo.diastolic.value.trim() !== '' && isNaN(formInfo.diastolic.value)) || parseInt(formInfo.diastolic.value) <= 0) {
            validationErrs.push('Diastolic should be a number greater than 0');
        }
        if (validationErrs.length > 0) {
            this.props.dispatch(setEncounterError(validationErrs));
            errorMsgs.focus();
        }
        if (validationErrs.length === 0) {
            // create a new encounter object to ensure proper json object
            let newEncounter = {
                patient: this.props.patientState.selectedPatient,
                notes: formInfo.notes.value,
                visitCode: formInfo.visitcode.value,
                provider: formInfo.provider.value,
                billingCode: formInfo.billcode.value,
                icd10: formInfo.icd10.value,
                totalCost: parseFloat(formInfo.totalcost.value),
                coPay: parseFloat(formInfo.copay.value),
                chiefComplaint: formInfo.chiefcomplaint.value,
                pulse: formInfo.pulse.value.trim(),
                systolic: formInfo.systolic.value.trim(),
                diastolic: formInfo.diastolic.value.trim(),
                date: new Date(formInfo.date.value)
            };
            this.handleUpdate(newEncounter, event);
        }
    }
    render() {
        return (
            <div className='center-div'>
                <div id='edit-encounter-form-modal' className="form-modal">
                    <div className="modal-content form-container">
                        <span className="close" onClick={this.closeModal}>&times;</span>
                        <form id='edit-encounter-form' onSubmit={this.handleSubmit}>
                            <h3>Update Encounter Form</h3>
                            <br />
                            <div id='edt-encounter-errors' tabIndex='0'>
                                {this.props.encounterState.errors !== [] ? this.props.encounterState.errors.map((error, key) =>
                                    <p className='errors' key={'error - ' + key}>{error}</p>
                                ) : null
                                }
                            </div>
                            <fieldset>
                                <legend>Office Information</legend>
                                <label>Visit code</label>
                                <br />
                                <input
                                    type='text'
                                    name='visitcode'
                                    defaultValue={this.props.encounterState.selectedEncounter.visitCode}
                                    required
                                />
                                <br />
                                <label>Billing code</label>
                                <br />
                                <input
                                    type='text'
                                    name='billcode'
                                    defaultValue={this.props.encounterState.selectedEncounter.billingCode}
                                    required
                                />
                                <br />
                                <label>Icd10 code</label>
                                <br />
                                <input
                                    type='text'
                                    name='icd10'
                                    defaultValue={this.props.encounterState.selectedEncounter.icd10}
                                    required
                                />
                            </fieldset>
                            <fieldset>
                                <legend>Encounter Information</legend>
                                <label>Date of Encounter</label>
                                <br />
                                <input
                                    type='text'
                                    name='date'
                                    defaultValue={this.props.encounterState.selectedEncounter.date}
                                    required
                                />
                                <br />
                                <label>Provider</label>
                                <br />
                                <input
                                    type='text'
                                    name='provider'
                                    defaultValue={this.props.encounterState.selectedEncounter.provider}
                                    required
                                />
                                <br />
                                <label>Total cost (USD)</label>
                                <br />
                                <input
                                    type='text'
                                    name='totalcost'
                                    defaultValue={this.props.encounterState.selectedEncounter.totalCost}
                                    required
                                />
                                <br />
                                <label>Patient's copay(USD)</label>
                                <br />
                                <input
                                    type='text'
                                    name='copay'
                                    defaultValue={this.props.encounterState.selectedEncounter.coPay}
                                    required
                                />
                                <br />
                                <label>Main reason of visit</label>
                                <br />
                                <input
                                    type='text'
                                    name='chiefcomplaint'
                                    defaultValue={this.props.encounterState.selectedEncounter.chiefComplaint}
                                    required
                                />
                            </fieldset>
                            <fieldset>
                                <legend>Medical Info</legend>
                                <label>Patient pulse (Optional)</label>
                                <br />
                                <input
                                    type='text'
                                    name='pulse'
                                    defaultValue={this.props.encounterState.selectedEncounter.pulse}
                                />
                                <br />
                                <label>Patient systolic (Optional)</label>
                                <br />
                                <input
                                    type='text'
                                    name='systolic'
                                    defaultValue={this.props.encounterState.selectedEncounter.systolic}
                                />
                                <br />
                                <label>Patient diastolic (Optional)</label>
                                <br />
                                <input
                                    type='text'
                                    name='diastolic'
                                    defaultValue={this.props.encounterState.selectedEncounter.diastolic}
                                />
                                <br />
                                <label>Additional notes (Optional)</label>
                                <br />
                                <input
                                    type='text'
                                    name='notes'
                                    defaultValue={this.props.encounterState.selectedEncounter.notes}
                                />
                            </fieldset>
                            <button type="submit" className='submit-btn'>Update Encounter</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(EditEncounterForm);