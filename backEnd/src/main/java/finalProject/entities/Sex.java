package finalProject.entities;

import javax.persistence.Embeddable;

@Embeddable
public class Sex {
    private String sex;

    private Sex() {
    }

    public Sex(String sex) {
        this.sex = sex;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
}
