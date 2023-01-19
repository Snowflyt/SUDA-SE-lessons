package cn.enilu.flash.service.teacher;

import cn.enilu.flash.bean.entity.course.Course;
import cn.enilu.flash.bean.entity.teacher.Teacher;
import cn.enilu.flash.bean.exception.CourseNotFoundException;
import cn.enilu.flash.bean.exception.TeacherNotFoundException;
import cn.enilu.flash.dao.course.CourseRepository;
import cn.enilu.flash.dao.teacher.TeacherRepository;
import cn.enilu.flash.service.BaseService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class TeacherService extends BaseService<Teacher, Long, TeacherRepository> {
    private final TeacherRepository teacherRepository;
    private final CourseRepository courseRepository;


    public TeacherService(TeacherRepository teacherRepository, CourseRepository courseRepository) {
        this.teacherRepository = teacherRepository;
        this.courseRepository = courseRepository;
    }

    public void addTeacher(Long id,String name, String teacherId) {
        Teacher teacher = new Teacher();
        teacher.setId(id);
        teacher.setTeacherId(teacherId);
        teacher.setName(name);
        insert(teacher);
    }

    public Object getTeacherByTeacherID(String teacherId) {
        return teacherRepository.findByTeacherId(teacherId)
                .orElseThrow(TeacherNotFoundException::new);
    }

    public void addCourseToTeacher(String teacherId, String courseId) {
        Teacher teacher = teacherRepository.findByTeacherId(teacherId)
                .orElseThrow(TeacherNotFoundException::new);
        Course course = courseRepository.findByCourseId(courseId)
                .orElseThrow(CourseNotFoundException::new);
        Set<Course> courseSet = teacher.getCourses();
        courseSet.add(course);
        teacher.setCourses(courseSet);
        insert(teacher);
    }

    public void deleteCourseFromTeacher(String teacherId, String courseId) {
        Teacher teacher = teacherRepository.findByTeacherId(teacherId)
                .orElseThrow(TeacherNotFoundException::new);
        Course course = courseRepository.findByCourseId(courseId)
                .orElseThrow(CourseNotFoundException::new);
        Set<Course> courseSet = teacher.getCourses();
        courseSet.remove(course);
        insert(teacher);
    }

    public void clearCourseOfTeacher(String teacherId) {
        Teacher teacher = teacherRepository.findByTeacherId(teacherId)
                .orElseThrow(TeacherNotFoundException::new);
        teacher.getCourses().clear();
        insert(teacher);
    }

    public Set<Course> findAllCourseOfTeacher(String teacherId) {
        Teacher teacher = teacherRepository.findByTeacherId(teacherId)
                .orElseThrow(TeacherNotFoundException::new);
        return teacher.getCourses();
    }

    public Object getTeacherByTeacherName(String teacherName) {
        return teacherRepository.findByName(teacherName)
                .orElseThrow(TeacherNotFoundException::new);
    }

    public void deleteTeacherByTeacherId(String teacherId){
        Teacher teacher = teacherRepository.findByTeacherId(teacherId)
                .orElseThrow(TeacherNotFoundException::new);
        delete(teacher.getId());
    }
}
