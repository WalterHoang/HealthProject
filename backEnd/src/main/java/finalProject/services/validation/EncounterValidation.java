package finalProject.services.validation;

import finalProject.entities.Encounter;

import java.util.regex.Pattern;

/**
 * Validator for encounter info
 */
public class EncounterValidation {
    /**
     * Validates a encounter's information
     *
     * @param encounter object with info
     * @return false if invalid, true if valid
     */
    public Boolean validateEncounterInfo(Encounter encounter) {
        return !(encounter.getPatient() == null)
                && (encounter.getVisitCode() != null && Pattern.matches("^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$", encounter.getVisitCode()))
                && !(encounter.getProvider() == null || encounter.getProvider().isEmpty())
                && (!(encounter.getBillingCode() == null || encounter.getBillingCode().isEmpty()) && Pattern.matches("^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$", encounter.getBillingCode()))
                && (encounter.getIcd10() != null && Pattern.matches("^[A-Z][0-9]{2}$", encounter.getIcd10()))
                && (encounter.getTotalCost() != null && encounter.getTotalCost() >= 0)
                && (encounter.getCoPay() != null && encounter.getCoPay() >= 0)
                && !(encounter.getChiefComplaint() == null || encounter.getChiefComplaint().isEmpty())
                && (encounter.getDate() != null);
    }
}
