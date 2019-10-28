import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/patientForm.css';
import * as patientActions from '../../redux/actions/patientActions';

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
 * information handling of a patient
 * to edit.
 */
class EditPatientForm extends Component {
    constructor(props) {
        super(props);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.renderStateOptions = this.renderStateOptions.bind(this);
        this.checkSSN = this.checkSSN.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {}
    }
    componentDidMount() {
        this.props.dispatch(patientActions.editAsyncReset());
    }
    /**
     * closes the edit model and
     * resets any errors that occured
     */
    closeEditModal = () => {
        // get affected elements
        let modal = document.getElementById("edit-form-modal");
        let form = document.getElementById("edit-form");
        // reset any errors that displayed
        this.props.dispatch(patientActions.errorReset());
        // return form to default values/placeholders
        form.reset();
        modal.style.display = "none";
    }
    renderStateOptions(stateAbr, key) {
        return (
            <option key={'state' + key} value={stateAbr}>{stateAbr}</option>
        )
    }
    /**
     * checks to see if there's 
     * a conflicting ssn
     * @param {String} ssn 
     * @param {number} id patient id 
     */
    checkSSN(ssn, id) {
        let list = this.props.patientState.patients;
        for (let index = 0; index < list.length; index++) {
            if (ssn === list[index].ssn) {
                if (id === list[index].id) { //check if its from the same patient
                    return false;
                }
                return true;
            }
        }
        return false;
    }
    /**
     * passes the patient info to make a api call
     * and closes the modal
     * @param {number} id old patient id 
     * @param {*} patient object with new patient info
     */
    handleUpdate(id, patient) {
        this.props.dispatch(patientActions.updatePatient(id, patient));
        this.closeEditModal();
    }
    /**
     * validates form info
     * @param {*} event 
     */
    handleSubmit(event) {
        // store all errors in a single spot
        let validationErrors = [];
        // prevent refresh
        event.preventDefault();
        // get form elements
        let formInfo = event.target.getElementsByTagName('input');
        let formInfoSelect = event.target.getElementsByTagName('select');
        //set up to focus on errors
        let errorMsgs = document.getElementById("edit-patient-errors");
        if (!formInfo.editssn.value.match(/^[0-9]{3}-[0-9]{2}-[0-9]{4}$/)) {
            validationErrors.push("SSN must be in format xxx-xx-xxxx.");
        }
        if (this.checkSSN(formInfo.editssn.value, this.props.patientState.selectedPatient.id)) {
            validationErrors.push("This SSN already exists!");
        }
        if (formInfoSelect.editstate.value === "Select a state") {
            validationErrors.push("Please select a state.");
        }
        if (!formInfo.editzip.value.match(/^[0-9]{5}$/)) {
            validationErrors.push("Zip code must be in a 5 digit format.");
        }
        if (isNaN(formInfo.editage.value)) {
            validationErrors.push("Age must be a number.");
        }
        if (!isNaN(formInfo.editage.value) && (parseInt(formInfo.editage.value) <= 0)) {
            validationErrors.push("Age cannot be less than or equal to 0.");
        }
        if (isNaN(formInfo.editheight.value)) {
            validationErrors.push("Height must be a number.");
        }
        if (!isNaN(formInfo.editheight.value) && (parseInt(formInfo.editheight.value) < 0)) {
            validationErrors.push("Height cannot be less than 0.");
        }
        if (isNaN(formInfo.editweight.value)) {
            validationErrors.push("Weight must be a number.");
        }
        if (!isNaN(formInfo.editweight.value) && (parseInt(formInfo.editweight.value) < 0)) {
            validationErrors.push("Weight cannot be less than 0.");
        }
        if (!(formInfoSelect.editsex.value === "Male" || formInfoSelect.editsex.value === "Female")) {
            validationErrors.push("Patient sex must be either 'Male' or 'Female'.");
        }
        if (validationErrors.length > 0) {
            this.props.dispatch(patientActions.patientAsyncError(validationErrors));
            errorMsgs.focus();
        }
        if (validationErrors.length === 0) {
            // format for proper json conversion
            let patient = {
                firstName: formInfo.editfirstName.value,
                lastName: formInfo.editlastName.value,
                ssn: formInfo.editssn.value,
                address: {
                    street: formInfo.editstreet.value,
                    city: formInfo.editcity.value,
                    state: formInfoSelect.editstate.value,
                    zip: formInfo.editzip.value
                },
                age: parseInt(formInfo.editage.value),
                height: parseInt(formInfo.editheight.value),
                weight: parseInt(formInfo.editweight.value),
                insurance: {
                    insurance: formInfo.editinsurance.value
                },
                sex: {
                    sex: formInfoSelect.editsex.value
                }
            }
            this.handleUpdate(this.props.patientState.selectedPatient.id, patient);
        }
    }
    render() {
        let selectedPatient = this.props.patientState.selectedPatient;
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
                <div id='edit-form-modal' className="form-modal">
                    <div className="modal-content form-container">
                        <span className="close" onClick={this.closeEditModal}>&times;</span>
                        <form id='edit-form' onSubmit={this.handleSubmit}>
                            <h3>Edit Patient Form</h3>
                            <br />
                            <div id='edit-patient-errors' tabIndex='0'>
                                {this.props.patientState.errors !== [] ? this.props.patientState.errors.map((error, key) =>
                                    <p className='errors' key={'error - ' + key}>{error}</p>
                                ) : null
                                }
                            </div>
                            <fieldset>
                                <legend>Personal Information</legend>
                                <label>First Name</label>
                                <br />
                                <input
                                    type='text'
                                    name='editfirstName'
                                    defaultValue={selectedPatient.firstName}
                                    required
                                />
                                <br />
                                <label>Last Name</label>
                                <br />
                                <input
                                    type='text'
                                    name='editlastName'
                                    defaultValue={selectedPatient.lastName}
                                    required
                                />
                                <br />
                                <label>SSN</label>
                                <br />
                                <input
                                    type='text'
                                    name='editssn'
                                    defaultValue={selectedPatient.ssn}
                                    required
                                />
                                <br />
                                <label>Insurance Provider</label>
                                <br />
                                <input
                                    type='text'
                                    name='editinsurance'
                                    defaultValue={selectedPatient.insurance.insurance}
                                    required
                                />
                            </fieldset>
                            <fieldset>
                                <legend>Address Information</legend>
                                <label>Street Address</label>
                                <br />
                                <input
                                    type='text'
                                    name='editstreet'
                                    defaultValue={selectedPatient.address.street}
                                    required
                                />
                                <br />
                                <label>City</label>
                                <br />
                                <input
                                    type='text'
                                    name='editcity'
                                    defaultValue={selectedPatient.address.city}
                                    required
                                />
                                <br />
                                <label>State</label>
                                <br />
                                <select
                                    name='editstate'
                                    defaultValue={selectedPatient.address.state}
                                    required
                                >
                                    <option>
                                        Select a state
                                    </option>
                                    {stateAbr.map((state, key) => this.renderStateOptions(state, key))}
                                </select>
                                <br />
                                <label>Zip code</label>
                                <br />
                                <input
                                    type='text'
                                    name='editzip'
                                    defaultValue={selectedPatient.address.zip}
                                    required
                                />
                            </fieldset>
                            <fieldset>
                                <legend>Medical Info</legend>
                                <label>Sex</label>
                                <br />
                                <select
                                    name='editsex'
                                    defaultValue={selectedPatient.sex.sex}
                                    required
                                >
                                    <option value='Male'>
                                        Male
                                    </option>
                                    <option value='Female'>
                                        Female
                                   </option>
                                </select>
                                <br />
                                <label>Age</label>
                                <br />
                                <input
                                    type='text'
                                    name='editage'
                                    defaultValue={selectedPatient.age}
                                    required
                                />
                                <br />
                                <label>Height</label>
                                <br />
                                <input
                                    type='text'
                                    name='editheight'
                                    defaultValue={selectedPatient.height}
                                    required
                                />
                                <br />
                                <label>Weight</label>
                                <br />
                                <input
                                    type='text'
                                    name='editweight'
                                    defaultValue={selectedPatient.weight}
                                    required
                                />
                            </fieldset>
                            {this.props.patientState.editDone === true ?
                                <p>Patient info successfully updated. Please reload the page.</p>
                                : null}
                            <button type="submit" className='submit-btn'>
                                Update Patient Info
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(EditPatientForm);