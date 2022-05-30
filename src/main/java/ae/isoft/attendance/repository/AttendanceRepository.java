package ae.isoft.attendance.repository;

import ae.isoft.attendance.domain.Attendance;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Attendance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {}
