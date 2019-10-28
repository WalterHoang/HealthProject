package finalProject.entities;

import javax.persistence.Embeddable;

@Embeddable
public class Insurance {
    private String insurance;

    private Insurance() {
    }

    public Insurance(String insurance) {
        this.insurance = insurance;
    }

    public String getInsurance() {
        return insurance;
    }

    public void setInsurance(String insurance) {
        this.insurance = insurance;
    }
}
