package cn.enilu.flash.dao.studentMtmCourse;

import cn.enilu.flash.bean.entity.studentMtmCourse.StudentMtmCourse;
import cn.enilu.flash.dao.BaseRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface StudentMtmCourseRepository extends BaseRepository<StudentMtmCourse, Long> {
    Optional<StudentMtmCourse> findById(Long id);

    void deleteByStudentId(Long studentId);

    void deleteByCourseId(Long courseId);


    @Query(value = "select count(*) from student_mtm_course where student_id = ?1 and course_id = ?2 limit 1", nativeQuery = true)
    int checkExist(Long studentId, Long courseId);
}
