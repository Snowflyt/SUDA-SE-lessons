package cn.enilu.flash.dao.teacher;

import cn.enilu.flash.bean.entity.teacher.Teacher;
import cn.enilu.flash.dao.BaseRepository;

import java.util.Optional;

public interface TeacherRepository extends BaseRepository<Teacher, Long> {
    Optional<Teacher> findByTeacherId(String teacherId);

    Optional<Teacher> findByName(String name);
}
