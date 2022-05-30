package ae.isoft.attendance.repository;

import ae.isoft.attendance.domain.AttendanceType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the AttendanceType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttendanceTypeRepository extends JpaRepository<AttendanceType, Long> {}
