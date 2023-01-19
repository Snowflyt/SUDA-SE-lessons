package cn.enilu.flash.dao.signin.signInRecord;

import cn.enilu.flash.bean.entity.signInRecord.SignInRecord;
import cn.enilu.flash.dao.BaseRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface SignInRecordRepository extends BaseRepository<SignInRecord, Long> {
    @Query(value = "select count(*) from sign_in_record where student_id = ?1 and course_id = ?2 and day = ?3 and week = ?4 limit 1", nativeQuery = true)
    int checkExistRecord(Long studentId, Long courseId, String day, String week);

    @Query(value = "select * from sign_in_record where course_id=?1 and day=?2 and week=?3 and lesson=?4", nativeQuery = true)
    List<SignInRecord> findRecordForCourse(Long courseId, String day, String week, String lesson);

    @Query(value = "select * from sign_in_record where student_id=?1", nativeQuery = true)
    List<SignInRecord> findRecordForStudent(Long studentId);

    @Query(value = "select * from sign_in_record where student_id=?1 and TO_DAYS(create_time)=TO_DAYS(?2)", nativeQuery = true)
    List<SignInRecord> findRecordByStudentAndDate(Long studentId, LocalDate date);

    @Query(value = "select * from sign_in_record where student_id=?1 and week = ?2", nativeQuery = true)
    List<SignInRecord> findRecordByStudentAndWeek(Long studentId, String week);
}
