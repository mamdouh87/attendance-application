package ae.isoft.attendance.service.mapper;

import ae.isoft.attendance.domain.Department;
import ae.isoft.attendance.service.dto.DepartmentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Department} and its DTO {@link DepartmentDTO}.
 */
@Mapper(componentModel = "spring")
public interface DepartmentMapper extends EntityMapper<DepartmentDTO, Department> {}
