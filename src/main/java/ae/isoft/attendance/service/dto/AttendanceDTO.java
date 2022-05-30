package ae.isoft.attendance.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link ae.isoft.attendance.domain.Attendance} entity.
 */
public class AttendanceDTO implements Serializable {

    private Long id;

    private LocalDate logDate;

    private Instant logTimeFrom;

    private Instant logTimeTo;

    private Integer permissionHours;

    private String details;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getLogDate() {
        return logDate;
    }

    public void setLogDate(LocalDate logDate) {
        this.logDate = logDate;
    }

    public Instant getLogTimeFrom() {
        return logTimeFrom;
    }

    public void setLogTimeFrom(Instant logTimeFrom) {
        this.logTimeFrom = logTimeFrom;
    }

    public Instant getLogTimeTo() {
        return logTimeTo;
    }

    public void setLogTimeTo(Instant logTimeTo) {
        this.logTimeTo = logTimeTo;
    }

    public Integer getPermissionHours() {
        return permissionHours;
    }

    public void setPermissionHours(Integer permissionHours) {
        this.permissionHours = permissionHours;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AttendanceDTO)) {
            return false;
        }

        AttendanceDTO attendanceDTO = (AttendanceDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, attendanceDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AttendanceDTO{" +
            "id=" + getId() +
            ", logDate='" + getLogDate() + "'" +
            ", logTimeFrom='" + getLogTimeFrom() + "'" +
            ", logTimeTo='" + getLogTimeTo() + "'" +
            ", permissionHours=" + getPermissionHours() +
            ", details='" + getDetails() + "'" +
            "}";
    }
}
