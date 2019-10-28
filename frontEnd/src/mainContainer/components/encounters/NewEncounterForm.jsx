import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewEncounter, setEncounterError, encounterErrorReset } from '../../redux/actions/encounterActions';

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
 * This component renders a form to add a encounter
 */
class NewEncounterForm extends Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.state = {}
    }
    /**
     * Handles the closing of the add encounter modal
     */
    closeModal = () => {
        // get affected elements
        let modal = document.getElementById("add-encounter-form-modal");
        let form = document.getElementById("add-encounter-form");
        // reset any errors that occurred
        this.props.dispatch(encounterErrorReset());
        // reset form to default/placeholder values
        form.reset();
        modal.style.display = "none";
    }
    /**
     * passes the encounter to the api
     * and passes the submit event to
     * signal to close the modal
     * @param {Object} encounter 
     * @param {*} event 
     */
    handleAdd(encounter, event) {
        this.props.dispatch(createNewEncounter(encounter));
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
        let errorMsgs = document.getElementById("add-encounter-errors");
        if (!formInfo.visitcode.value.match(/^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/)) {
            validationErrs.push('Invalid Visit Code. Example visit code: A1B 2C3');
        }
        if (!formInfo.billcode.value.match(/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/)) {
            validationErrs.push('Invalid billing code. Example billing code: 111.111.111-11');
        }
        if (!formInfo.icd10.value.match(/^[A-Z][0-9]{2}$/)) {
            validationErrs.push('Invalid ICD10 code. ICD10 code consists of 1 uppercase alphabetic character and 2 digits');
        }
        if (!formInfo.date.value.match(/(^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]$))/)) {
            validationErrs.push('Invalid date. Please double check date is entered in format yyyy-MM-dd');
        }
        if (isNaN(formInfo.totalcost.value)) {
            validationErrs.push('Invalid total cost. Please make sure only a number is entered.');
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
            this.handleAdd(newEncounter, event);
        }
    }
    render() {
        return (<div className='center-div'>
            <div id='add-encounter-form-modal' className="form-modal">
                <div className="modal-content form-container">
                    <span className="close" onClick={this.closeModal}>&times;</span>
                    <form id='add-encounter-form' onSubmit={this.handleSubmit}>
                        <h3>New Encounter Form</h3>
                        <br />
                        <div id='add-encounter-errors' tabIndex='0'>
                            {this.props.encounterState.errors !== [] ? this.props.encounterState.errors.map((error, key) =>
                                <p className='errors' key={'error - ' + key}>{error}</p>
                            ) : null
                            }
                        </div>
                        <fieldset>
                            <legend>Office Information</legend>
                            <input
                                type='text'
                                name='visitcode'
                                placeholder='Office Visit Code (ex: H7J 8W2)'
                                required
                            />
                            <input
                                type='text'
                                name='billcode'
                                placeholder='Billing Code (ex: 123.456.789-12)'
                                required
                            />
                            <input
                                type='text'
                                name='icd10'
                                placeholder='ICD10 (ex: A22)'
                                required
                            />
                        </fieldset>
                        <fieldset>
                            <legend>Encounter Information</legend>
                            <label>Date of Encounter</label>
                            <br/>
                            <input
                                type='date'
                                name='date'
                                placeholder='Date of encounter in yyyy-MM-dd format'
                                required
                            />
                            <br/>
                            <input
                                type='text'
                                name='provider'
                                placeholder='Medical Provider'
                                required
                            />
                            <input
                                type='text'
                                name='totalcost'
                                placeholder='Total Cost in USD, leaving off the $'
                                required
                            />
                            <input
                                type='text'
                                name='copay'
                                placeholder='CoPay in USD'
                                required
                            />
                            <input
                                type='text'
                                name='chiefcomplaint'
                                placeholder='Main Reason of visit'
                                required
                            />
                        </fieldset>
                        <fieldset>
                            <legend>Medical Info</legend>
                            <input
                                type='text'
                                name='pulse'
                                placeholder='Patient pulse in beats per min'
                            />
                            <input
                                type='text'
                                name='systolic'
                                placeholder='Systolic portion of blood pressure'
                            />
                            <input
                                type='text'
                                name='diastolic'
                                placeholder='Diastolic portion of blood pressure'
                            />
                            <input
                                type='text'
                                name='notes'
                                placeholder='Additional notes'
                            />
                        </fieldset>
                        <button type="submit" className='submit-btn'>Add Encounter</button>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

export default connect(mapStateToProps)(NewEncounterForm);