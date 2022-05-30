package ae.isoft.attendance.service.mapper;

import ae.isoft.attendance.domain.Attendance;
import ae.isoft.attendance.service.dto.AttendanceDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Attendance} and its DTO {@link AttendanceDTO}.
 */
@Mapper(componentModel = "spring")
public interface AttendanceMapper extends EntityMapper<AttendanceDTO, Attendance> {}
