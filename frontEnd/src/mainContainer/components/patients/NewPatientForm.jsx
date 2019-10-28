import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as patientActions from '../../redux/actions/patientActions';
import './css/patientForm.css';

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
 * This component handles the 
 * info formating of a new patient
 */
class NewPatientForm extends Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkSSN = this.checkSSN.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.state = {}
    }
    /**
     * closes the new patient modal
     */
    closeModal = () => {
        // get affected elements
        let modal = document.getElementById("add-form-modal");
        let form = document.getElementById("add-form");
        // reset any errors that occurred
        this.props.dispatch(patientActions.errorReset());
        // reset form to default/placeholder values
        form.reset();
        modal.style.display = "none";
    }
    /**
     * checks to see if there's 
     * a conflicting ssn
     * @param {String} ssn 
     */
    checkSSN(ssn) {
        let list = this.props.patientState.patients;
        for (let index = 0; index < list.length; index++) {
            if (ssn === list[index].ssn) {
                return true;
            }
        }
        return false;
    }
    /**
     * passes the patient info to make a api call
     * and closes the modal
     * @param {*} patient object with new patient info
     */
    handleAdd(patient, event) {
        this.props.dispatch(patientActions.addPatient(patient));
        this.closeModal(event);
    }
    /**
     * Validates new patient info
     */
    handleSubmit(event) {
        let validationErrors = [];
        event.preventDefault();
        let formInfo = event.target.getElementsByTagName('input');
        let formInfoSelect = event.target.getElementsByTagName('select');
        let errorMsgs = document.getElementById("add-patient-errors");

        if (!formInfo.addssn.value.match(/^[0-9]{3}-[0-9]{2}-[0-9]{4}$/)) {
            validationErrors.push("SSN must be in format xxx-xx-xxxx.");
        }
        if (this.checkSSN(formInfo.addssn.value)) {
            validationErrors.push("This SSN already exists!");
        }
        if (formInfoSelect.addstate.value === "Select a state") {
            validationErrors.push("Please select a state.");
        }
        if (!formInfo.addzip.value.match(/^[0-9]{5}$/)) {
            validationErrors.push("Zip code must be in a 5 digit format.");
        }
        if (isNaN(formInfo.addage.value)) {
            validationErrors.push("Age must be a number.");
        }
        if (!isNaN(formInfo.addage.value) && (parseInt(formInfo.addage.value) <= 0)) {
            validationErrors.push("Age cannot be less than or equal to 0.");
        }
        if (isNaN(formInfo.addheight.value)) {
            validationErrors.push("Height must be a number.");
        }
        if (!isNaN(formInfo.addheight.value) && (parseInt(formInfo.addheight.value) < 0)) {
            validationErrors.push("Height cannot be less than 0.");
        }
        if (isNaN(formInfo.addweight.value)) {
            validationErrors.push("Weight must be a number.");
        }
        if (!isNaN(formInfo.addweight.value) && (parseInt(formInfo.addweight.value) < 0)) {
            validationErrors.push("Weight cannot be less than 0.");
        }
        if (!(formInfoSelect.addsex.value === "Male" || formInfoSelect.addsex.value === "Female")) {
            validationErrors.push("Patient sex must be either 'Male' or 'Female'.");
        }
        if (validationErrors.length > 0) {
            this.props.dispatch(patientActions.patientAsyncError(validationErrors));
            errorMsgs.focus();
        }
        if (validationErrors.length === 0) {
            let patient = {
                firstName: formInfo.addfirstName.value,
                lastName: formInfo.addlastName.value,
                ssn: formInfo.addssn.value,
                address: {
                    street: formInfo.addstreet.value,
                    city: formInfo.addcity.value,
                    state: formInfoSelect.addstate.value,
                    zip: formInfo.addzip.value
                },
                age: parseInt(formInfo.addage.value),
                height: parseInt(formInfo.addheight.value),
                weight: parseInt(formInfo.addweight.value),
                insurance: {
                    insurance: formInfo.addinsurance.value
                },
                sex: {
                    sex: formInfoSelect.addsex.value
                }
            }
            this.handleAdd(patient, event);
        }
    }
    render() {
        const stateAbr = ['AL', 'AK', 'AZ', 'AR',
            'CA', 'CO', 'CT',
            'DE', 'FL', 'GA',
            'HI', 'ID', 'IL', 'IN', 'IA',
            'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
            'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC',
            'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN',
            'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
        return (
            <div className='center-div'>
                <div id='add-form-modal' className="form-modal">
                    <div className="modal-content form-container">
                        <span className="close" onClick={this.closeModal}>&times;</span>
                        <form id='add-form' onSubmit={this.handleSubmit}>
                            <h3>New Patient Form</h3>
                            <br />
                            <div id='add-patient-errors' tabIndex='0'>
                                {this.props.patientState.errors !== [] ? this.props.patientState.errors.map((error, key) =>
                                    <p className='errors' key={'error - ' + key}>{error}</p>
                                ) : null
                                }
                            </div>
                            <fieldset>
                                <legend>Personal Information</legend>
                                <input
                                    type='text'
                                    name='addfirstName'
                                    placeholder='First name'
                                    required
                                />
                                <input
                                    type='text'
                                    name='addlastName'
                                    placeholder='Last name'
                                    required
                                />
                                <input
                                    type='text'
                                    name='addssn'
                                    placeholder='SSN (xxx-xx-xxxx)'
                                    required
                                />
                                <input
                                    type='text'
                                    name='addinsurance'
                                    placeholder='Insurance Provider. Put none if none'
                                    required
                                />
                            </fieldset>
                            <fieldset>
                                <legend>Address Information</legend>
                                <input
                                    type='text'
                                    name='addstreet'
                                    placeholder='Street address'
                                    required
                                />
                                <input
                                    type='text'
                                    name='addcity'
                                    placeholder='City'
                                    required
                                />
                                <select
                                    name='addstate'
                                    placeholder='state'
                                    required
                                >
                                    <option value='Select a state'>
                                        Select a state
                            </option>
                                    {stateAbr.map((state, key) => (
                                        <option key={'state' + key} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type='text'
                                    name='addzip'
                                    placeholder='Zip code'
                                    required
                                />
                            </fieldset>
                            <fieldset>
                                <legend>Medical Info</legend>
                                <label>Sex</label>
                                <br/>
                                <select
                                    name='addsex'
                                    placeholder='sex'
                                    required
                                >
                                    <option value='Male'>
                                        Male
                                    </option>
                                    <option value='Female'>
                                        Female
                                    </option>
                                </select>
                                <input
                                    type='text'
                                    name='addage'
                                    placeholder='Age'
                                    required
                                />
                                <input
                                    type='text'
                                    name='addheight'
                                    placeholder='Height(in inches) ex: 62'
                                    required
                                />
                                <input
                                    type='text'
                                    name='addweight'
                                    placeholder='Weight (in pounds) ex: 162'
                                    required
                                />
                            </fieldset>
                            <button type="submit" className='submit-btn'>Add Patient</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(NewPatientForm);