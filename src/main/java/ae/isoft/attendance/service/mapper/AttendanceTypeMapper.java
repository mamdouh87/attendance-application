package ae.isoft.attendance.service.mapper;

import ae.isoft.attendance.domain.AttendanceType;
import ae.isoft.attendance.service.dto.AttendanceTypeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AttendanceType} and its DTO {@link AttendanceTypeDTO}.
 */
@Mapper(componentModel = "spring")
public interface AttendanceTypeMapper extends EntityMapper<AttendanceTypeDTO, AttendanceType> {}
