package ae.isoft.attendance.domain;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import javax.persistence.*;

/**
 * A Attendance.
 */
@Entity
@Table(name = "attendance")
public class Attendance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "log_date")
    private LocalDate logDate;

    @Column(name = "log_time_from")
    private Instant logTimeFrom;

    @Column(name = "log_time_to")
    private Instant logTimeTo;

    @Column(name = "permission_hours")
    private Integer permissionHours;

    @Column(name = "details")
    private String details;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Attendance id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getLogDate() {
        return this.logDate;
    }

    public Attendance logDate(LocalDate logDate) {
        this.setLogDate(logDate);
        return this;
    }

    public void setLogDate(LocalDate logDate) {
        this.logDate = logDate;
    }

    public Instant getLogTimeFrom() {
        return this.logTimeFrom;
    }

    public Attendance logTimeFrom(Instant logTimeFrom) {
        this.setLogTimeFrom(logTimeFrom);
        return this;
    }

    public void setLogTimeFrom(Instant logTimeFrom) {
        this.logTimeFrom = logTimeFrom;
    }

    public Instant getLogTimeTo() {
        return this.logTimeTo;
    }

    public Attendance logTimeTo(Instant logTimeTo) {
        this.setLogTimeTo(logTimeTo);
        return this;
    }

    public void setLogTimeTo(Instant logTimeTo) {
        this.logTimeTo = logTimeTo;
    }

    public Integer getPermissionHours() {
        return this.permissionHours;
    }

    public Attendance permissionHours(Integer permissionHours) {
        this.setPermissionHours(permissionHours);
        return this;
    }

    public void setPermissionHours(Integer permissionHours) {
        this.permissionHours = permissionHours;
    }

    public String getDetails() {
        return this.details;
    }

    public Attendance details(String details) {
        this.setDetails(details);
        return this;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Attendance)) {
            return false;
        }
        return id != null && id.equals(((Attendance) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Attendance{" +
            "id=" + getId() +
            ", logDate='" + getLogDate() + "'" +
            ", logTimeFrom='" + getLogTimeFrom() + "'" +
            ", logTimeTo='" + getLogTimeTo() + "'" +
            ", permissionHours=" + getPermissionHours() +
            ", details='" + getDetails() + "'" +
            "}";
    }
}
