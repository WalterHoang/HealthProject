package finalProject.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "patients")
//TODO: Refactor Address, Sex, and Insurance relation to patient
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PatientId")
    @ApiModelProperty(name = "Id", value = "Auto-generated Id for user record")
    private Long id;
    @NotNull
    @Column(name = "firstName")
    @ApiModelProperty(name = " First Name", required = true, example = "John", value = "A Patient's first name.")
    private String firstName;
    @NotNull
    @Column(name = "lastName")
    @ApiModelProperty(name = "Last Name", required = true, example = "Smith", value = "A Patient's last name.")
    private String lastName;
    @NotNull
    @Column(name = "ssn")
    @ApiModelProperty(name = "Social Security Number", required = true, example = "123-45-6789", value = "A patient's SSN")
    private String ssn;
    @NotNull
    @ApiModelProperty(name = "address", required = true, value = "A patient's address consisting of street, city, state abbreviation, and zip code.")
    private Address address;
    @NotNull
    @Column(name = "patientAge")
    @ApiModelProperty(name = "patient age", required = true, value = "A Patient's age.")
    private Integer age;
    @NotNull
    @Column(name = "patientHeight")
    @ApiModelProperty(name = "patient height", required = true, value = "A patient's height.")
    private Integer height;
    @NotNull
    @Column(name = "patientWeight")
    @ApiModelProperty(name = "patient height", required = true, value = "A patient's weight.")
    private Integer weight;
    @NotNull
    @ApiModelProperty(name = "Patient insurance", required = true, example = "Medicaid", value = "A patient's insurance provider.")
    private Insurance insurance;
    @NotNull
    @ApiModelProperty(name = "Patient Sex", required = true, example = "Male", value = "A patient's sex. Either Male or Female.")
    private Sex sex;
    @OneToMany(mappedBy = "patient")
    @ApiModelProperty(name = "Encounters", value = "A Patient's encounters")
    private Set<Encounter> encounters = new HashSet<>();

    public Patient() {
    }

    public Patient(@NotNull String firstName, @NotNull String lastName, @NotNull String ssn, @NotNull Address address, @NotNull Integer age, @NotNull Integer height, @NotNull Integer weight, @NotNull Insurance insurance, @NotNull Sex sex) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.ssn = ssn;
        this.address = address;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.insurance = insurance;
        this.sex = sex;
    }

    public Patient(@NotNull String firstName, @NotNull String lastName, @NotNull String ssn, @NotNull Address address, @NotNull Integer age, @NotNull Integer height, @NotNull Integer weight, @NotNull Insurance insurance, @NotNull Sex sex, Set<Encounter> encounters) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.ssn = ssn;
        this.address = address;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.insurance = insurance;
        this.sex = sex;
        this.encounters = encounters;
    }
    @JsonIgnore
    public Set<Encounter> getEncounters() {
        return encounters;
    }

    public void setEncounters(Set<Encounter> encounters) {
        this.encounters = encounters;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getSsn() {
        return ssn;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Insurance getInsurance() {
        return insurance;
    }

    public void setInsurance(Insurance insurance) {
        this.insurance = insurance;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }
}
