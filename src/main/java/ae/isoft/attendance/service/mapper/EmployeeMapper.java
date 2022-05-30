package ae.isoft.attendance.service.mapper;

import ae.isoft.attendance.domain.Department;
import ae.isoft.attendance.domain.Employee;
import ae.isoft.attendance.service.dto.DepartmentDTO;
import ae.isoft.attendance.service.dto.EmployeeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Employee} and its DTO {@link EmployeeDTO}.
 */
@Mapper(componentModel = "spring")
public interface EmployeeMapper extends EntityMapper<EmployeeDTO, Employee> {
    @Mapping(target = "manager", source = "manager", qualifiedByName = "employeeId")
    @Mapping(target = "department", source = "department", qualifiedByName = "departmentId")
    EmployeeDTO toDto(Employee s);

    @Named("employeeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EmployeeDTO toDtoEmployeeId(Employee employee);

    @Named("departmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DepartmentDTO toDtoDepartmentId(Department department);
}
