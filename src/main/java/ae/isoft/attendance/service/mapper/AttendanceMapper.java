package ae.isoft.attendance.service.mapper;

import ae.isoft.attendance.domain.Attendance;
import ae.isoft.attendance.domain.AttendanceType;
import ae.isoft.attendance.domain.Employee;
import ae.isoft.attendance.service.dto.AttendanceDTO;
import ae.isoft.attendance.service.dto.AttendanceTypeDTO;
import ae.isoft.attendance.service.dto.EmployeeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Attendance} and its DTO {@link AttendanceDTO}.
 */
@Mapper(componentModel = "spring")
public interface AttendanceMapper extends EntityMapper<AttendanceDTO, Attendance> {
    @Mapping(target = "attendanceType", source = "attendanceType", qualifiedByName = "attendanceTypeId")
    @Mapping(target = "employee", source = "employee", qualifiedByName = "employeeId")
    @Mapping(target = "managerApprovedBy", source = "managerApprovedBy", qualifiedByName = "employeeId")
    @Mapping(target = "hrApprovedBy", source = "hrApprovedBy", qualifiedByName = "employeeId")
    AttendanceDTO toDto(Attendance s);

    @Named("attendanceTypeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AttendanceTypeDTO toDtoAttendanceTypeId(AttendanceType attendanceType);

    @Named("employeeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EmployeeDTO toDtoEmployeeId(Employee employee);
}
