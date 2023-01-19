package cn.enilu.flash.service.student;

import cn.enilu.flash.bean.entity.course.Course;
import cn.enilu.flash.bean.entity.student.Student;
import cn.enilu.flash.bean.entity.studentMtmCourse.StudentMtmCourse;
import cn.enilu.flash.bean.exception.CourseNotFoundException;
import cn.enilu.flash.bean.exception.StudentNotFoundException;
import cn.enilu.flash.dao.course.CourseRepository;
import cn.enilu.flash.dao.student.StudentRepository;
import cn.enilu.flash.dao.studentMtmCourse.StudentMtmCourseRepository;
import cn.enilu.flash.service.BaseService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService extends BaseService<Student, Long, StudentRepository> {
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    private final StudentMtmCourseRepository studentMtmCourseRepository;
    public StudentService(StudentRepository studentRepository, CourseRepository courseRepository, StudentMtmCourseRepository studentMtmCourseRepository){
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.studentMtmCourseRepository = studentMtmCourseRepository;
    }

    public void addStudent(Long id, String studentId, String name, String major, String grade, String college, String classes){
        Student student = new Student();
        student.setId(id);
        student.setStudentId(studentId);
        student.setName(name);
        student.setMajor(major);
        student.setGrade(grade);
        student.setCollege(college);
        student.setClasses(classes);
        insert(student);
    }

    public void addStudentMtmCourToStudent(String studentId, String courseId, String selectTime){
        Student student = studentRepository.findByStudentId(studentId).orElseThrow(StudentNotFoundException::new);
        Course course = courseRepository.findByCourseId(courseId).orElseThrow(CourseNotFoundException::new);
        StudentMtmCourse studentMtmCourse = new StudentMtmCourse();

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss:SSS");
        LocalDateTime time = LocalDateTime.parse(selectTime, fmt);

        studentMtmCourse.setSelect_time(time);
        studentMtmCourse.setStudent(student);
        studentMtmCourse.setCourse(course);
        student.getStudentMtmCourses().add(studentMtmCourse);
        insert(student);
    }

    public List<StudentMtmCourse> findStudentMtmCourseByStudentId(String studentId){
        Student student = studentRepository.findByStudentId(studentId).orElseThrow(StudentNotFoundException::new);
        return student.getStudentMtmCourses();
    }

    public List<Course> findCourseByStudentId(String studentId){
        Student student = studentRepository.findByStudentId(studentId).orElseThrow(StudentNotFoundException::new);
        List<StudentMtmCourse> tempList = student.getStudentMtmCourses();
        List<Course> resList = new ArrayList<>();
        for(StudentMtmCourse x : tempList){
            resList.add(x.getCourse());
        }
        return resList;
    }

    @Transactional
    public void deleteStudent(Long id){
        Student student = studentRepository.findById(id).orElseThrow(StudentNotFoundException::new);
        studentMtmCourseRepository.deleteByStudentId(id);
        delete(id);
    }
}
