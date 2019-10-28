package finalProject.services.validation;

import finalProject.entities.Patient;

import java.util.regex.Pattern;

/**
 * validator class for patient info
 */
public class PatientValidation {
    private String[] usStateCodes = {"AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC",
            "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO",
            "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
            "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"};

    private Boolean usCodeValidation(String usCode) {
        usCode = usCode.toUpperCase();
        for (String usStateCodes : usStateCodes) {
            if (usCode.equals(usStateCodes)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Validates a patient's information
     *
     * @param patient object with info
     * @return false if invalid, true if valid
     */
    public Boolean validatePatientInfo(Patient patient) {
        return !(patient.getFirstName() == null || patient.getFirstName().isEmpty()) // validate first name
                && !(patient.getLastName() == null || patient.getLastName().isEmpty()) // validates last name
                && (patient.getSsn() != null && Pattern.matches("[0-9]{3}-[0-9]{2}-[0-9]{4}", patient.getSsn())) // validates ssn
                && !(patient.getAddress() == null) // validates address object
                && !(patient.getAddress().getStreet().isEmpty()) // validates street portion
                && !(patient.getAddress().getCity().isEmpty()) // validates city portion
                && !(patient.getAddress().getState().isEmpty()) // checks if there is a state string
                && usCodeValidation(patient.getAddress().getState()) // checks if the state is in the correct format
                && (Pattern.matches("[0-9]{5}", patient.getAddress().getZip())) // validates zip portion
                && (patient.getAge() > 0) // checks if person's age is greater than 0
                && (patient.getHeight() > 0) // checks if height is greater than 0
                && (patient.getWeight() > 0) // validates patient's weight
                && !(patient.getInsurance() == null || patient.getInsurance().getInsurance().isEmpty()) // validate's provider
                && !(patient.getSex() == null || patient.getSex().getSex().isEmpty()) // validates patient's sex
                && (patient.getSex().getSex().equals("Male") || patient.getSex().getSex().equals("Female")); // checks if entered sex matches format
    }
}
