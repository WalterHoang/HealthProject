package finalProject.entities;

import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "encounters")
public class Encounter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "encounterId")
    @ApiModelProperty(name = "Id", value = "Auto-generated Id for user record")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "patientId")
    @ApiModelProperty(required = true, name ="Patient id", value ="Patient id to connect encounter to patient.")
    private Patient patient;
    @ApiModelProperty(name = "Notes", value = "Notes about the encounter.")
    private String notes;
    @NotNull
    @Column(name = "visitcode")
    @ApiModelProperty(name = "Visit code", value = "Office visit code 6 chars long, starts with a letter and ends with a digit")
    private String visitCode;
    @NotNull
    @Column(name = "provider")
    @ApiModelProperty(name = "Provider", value = "Name of provider.")
    private String provider;
    @NotNull
    @Column(name = "billingcode")
    @ApiModelProperty(name = "Billing code", value = "Billing code of encounter.")
    private String billingCode;
    @NotNull
    @Column(name ="icd10")
    @ApiModelProperty(name = "ICD10 code", value = "ICD10 code of encounter.")
    private String icd10;
    @NotNull
    @Column(name = "totalcost")
    @ApiModelProperty(name = "Total cost", value = "Total cost of encounter including copay in US dollars.")
    private Float totalCost;
    @NotNull
    @Column(name = "copay")
    @ApiModelProperty(name = "CoPay", value = "Patient's copay for encounter in US dollars.")
    private Float coPay;
    @NotNull
    @Column(name = "chiefcomplaint")
    @ApiModelProperty(name = "Chief Complaint", value = "Patient's initial complaint at start of encounter.")
    private String chiefComplaint;
    @Column(name = "pulse")
    @ApiModelProperty(name = "Pulse", value = "Patient's pulse in beats per min.")
    private Integer pulse;
    @Column(name = "systolic")
    @ApiModelProperty(name = "Systolic", value = "Systolic portion of blood pressure.")
    private Integer systolic;
    @Column(name = "diastolic")
    @ApiModelProperty(name = "Diastolic", value = "Diastolic portion of blood pressure.")
    private Integer diastolic;
    @NotNull
    @Column(name = "date")
    @ApiModelProperty(name ="Date", value ="Date of encounter.")
    private Date date;

    public Encounter(){}

    public Encounter(Patient patient,
                     String notes,
                     @NotNull String visitCode, @NotNull String provider,
                     @NotNull String billingCode, @NotNull String icd10,
                     @NotNull Float totalCost, @NotNull Float coPay,
                     @NotNull String chiefComplaint, Integer pulse,
                     Integer systolic, Integer diastolic, @NotNull Date date) {
        this.patient = patient;
        this.notes = notes;
        this.visitCode = visitCode;
        this.provider = provider;
        this.billingCode = billingCode;
        this.icd10 = icd10;
        this.totalCost = totalCost;
        this.coPay = coPay;
        this.chiefComplaint = chiefComplaint;
        this.pulse = pulse;
        this.systolic = systolic;
        this.diastolic = diastolic;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getVisitCode() {
        return visitCode;
    }

    public void setVisitCode(String visitCode) {
        this.visitCode = visitCode;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getBillingCode() {
        return billingCode;
    }

    public void setBillingCode(String billingCode) {
        this.billingCode = billingCode;
    }

    public String getIcd10() {
        return icd10;
    }

    public void setIcd10(String icd10) {
        this.icd10 = icd10;
    }

    public Float getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Float totalCost) {
        this.totalCost = totalCost;
    }

    public Float getCoPay() {
        return coPay;
    }

    public void setCoPay(Float coPay) {
        this.coPay = coPay;
    }

    public String getChiefComplaint() {
        return chiefComplaint;
    }

    public void setChiefComplaint(String chiefComplaint) {
        this.chiefComplaint = chiefComplaint;
    }

    public Integer getPulse() {
        return pulse;
    }

    public void setPulse(Integer pulse) {
        this.pulse = pulse;
    }

    public Integer getSystolic() {
        return systolic;
    }

    public void setSystolic(Integer systolic) {
        this.systolic = systolic;
    }

    public Integer getDiastolic() {
        return diastolic;
    }

    public void setDiastolic(Integer diastolic) {
        this.diastolic = diastolic;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
