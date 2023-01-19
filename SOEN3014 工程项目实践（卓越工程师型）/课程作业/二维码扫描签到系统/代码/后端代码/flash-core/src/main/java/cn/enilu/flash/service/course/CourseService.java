package cn.enilu.flash.service.course;

import cn.enilu.flash.bean.entity.course.Course;
import cn.enilu.flash.bean.entity.signInRecord.SignInRecord;
import cn.enilu.flash.bean.entity.student.Student;
import cn.enilu.flash.bean.entity.studentMtmCourse.StudentMtmCourse;
import cn.enilu.flash.bean.entity.teacher.Teacher;
import cn.enilu.flash.bean.exception.CourseNotFoundException;
import cn.enilu.flash.bean.exception.StudentNotFoundException;
import cn.enilu.flash.dao.course.CourseRepository;
import cn.enilu.flash.dao.student.StudentRepository;
import cn.enilu.flash.service.BaseService;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.ArrayList;

@Service
public class CourseService extends BaseService<Course, Long, CourseRepository> {
    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;

    public CourseService(CourseRepository courseRepository, StudentRepository studentRepository){
        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
    }

    public void addCourse(Long id, String courseId, String name, String location, String time){
        Course course = new Course();
        course.setId(id);
        course.setCourseId(courseId);
        course.setName(name);
        course.setLocation(location);
        course.setTime(time);
        insert(course);
    }

    public void addStudentMtmCourseToCourse(String courseId, String studentId, String selectTime){
        Course course = courseRepository.findByCourseId(courseId).orElseThrow(CourseNotFoundException::new);
        Student student = studentRepository.findByStudentId(studentId).orElseThrow(StudentNotFoundException::new);
        StudentMtmCourse studentMtmCourse = new StudentMtmCourse();

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss:SSS");
        LocalDateTime time = LocalDateTime.parse(selectTime, fmt);

        studentMtmCourse.setSelect_time(time);
        studentMtmCourse.setStudent(student);
        studentMtmCourse.setCourse(course);
        studentMtmCourse.setCourse(course);
        course.getStudentMtmCourses().add(studentMtmCourse);
        insert(course);
    }

    public List<StudentMtmCourse> findStudentMtmCourseByCourseId(String courseId){
        Course course = courseRepository.findByCourseId(courseId).orElseThrow(CourseNotFoundException::new);
        return course.getStudentMtmCourses();
    }

    public void deleteCourse(String courseId) {
        Course course = courseRepository.findByCourseId(courseId).orElseThrow(CourseNotFoundException::new);
        Long targetId = course.getId();
        delete(targetId);
    }

    public List<HashMap<String, Object>> getSignInRecordByCourseId(String courseId) {
        Course course = courseRepository.findByCourseId(courseId).orElseThrow(CourseNotFoundException::new);
        List<HashMap<String, Object>> lst = new ArrayList<>();
        for (SignInRecord rec : course.getSignInRecords()) {
            HashMap<String, Object> map = new HashMap<>();
            map.put("name", rec.getStudent().getName());
            map.put("studentId", rec.getStudent().getStudentId());
            map.put("time", rec.getCreateTime());
            lst.add(map);
        }
        return lst;
    }

    public List<Student> getStudentByCourseId(String courseId){
        Course course = courseRepository.findByCourseId(courseId).orElseThrow(CourseNotFoundException::new);
        List<StudentMtmCourse> tempList = course.getStudentMtmCourses();
        List<Student> resList = new ArrayList<>();
        for(StudentMtmCourse x : tempList){
            resList.add(x.getStudent());
        }
        return resList;
    }

    public Set<Teacher> getTeacherByCourseId(String courseId){
        Course course = courseRepository.findByCourseId(courseId).orElseThrow(CourseNotFoundException::new);
        return course.getTeachers();
    }
}
