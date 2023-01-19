package cn.enilu.flash.dao.course;

import cn.enilu.flash.bean.entity.course.Course;
import cn.enilu.flash.dao.BaseRepository;

import java.util.Optional;

public interface CourseRepository extends BaseRepository<Course, Long> {
    Optional<Course> findByCourseId(String courseId);
}
