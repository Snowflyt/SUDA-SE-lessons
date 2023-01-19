package cn.enilu.flash.dao.student;

import cn.enilu.flash.bean.entity.student.Student;
import cn.enilu.flash.dao.BaseRepository;

import java.util.Optional;

public interface StudentRepository extends BaseRepository<Student, Long> {
    Optional<Student> findByStudentId(String studentId);

    Optional<Student> findById(Long id);
}

