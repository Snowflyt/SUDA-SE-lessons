package cn.enilu.flash.api.controller.student;

import cn.enilu.flash.api.controller.BaseController;
import cn.enilu.flash.bean.constant.factory.PageFactory;
import cn.enilu.flash.bean.dto.StudentDto;
import cn.enilu.flash.bean.entity.course.Course;
import cn.enilu.flash.bean.entity.student.Student;
import cn.enilu.flash.bean.vo.front.Rets;
import cn.enilu.flash.bean.vo.query.SearchFilter;
import cn.enilu.flash.service.student.StudentService;
import cn.enilu.flash.utils.factory.Page;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
public class StudentController extends BaseController {

    private final StudentService studentService;

    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @GetMapping("/students")
    public Object getStudents(@RequestParam(required = false) String studentId, @RequestParam(required = false) String name, @RequestParam(required = false) String classes, @RequestParam(required = false) String major, @RequestParam(required = false) String college, @RequestParam(required = false) String grade, @RequestParam(required = false) Long id){
        Page<Student> page = new PageFactory<Student>().defaultPage();
        page.addFilter("id", SearchFilter.Operator.EQ, id);
        page.addFilter("studentId", SearchFilter.Operator.LIKE, studentId);
        page.addFilter("name", SearchFilter.Operator.LIKE, name);
        page.addFilter("classes", SearchFilter.Operator.EQ, classes);
        page.addFilter("major", SearchFilter.Operator.EQ, major);
        page.addFilter("college", SearchFilter.Operator.EQ, college);
        page.addFilter("grade", SearchFilter.Operator.EQ, grade);
        page = studentService.queryPage(page);
        return Rets.success(page);
    }

    @PostMapping("/student")
    public Object addStudent(@RequestBody StudentDto studentDto){
        studentService.addStudent(studentDto.getId(), studentDto.getStudentId(), studentDto.getName(), studentDto.getMajor(), studentDto.getGrade(), studentDto.getCollege(), studentDto.getClasses());
        return Rets.success();
    }

    @GetMapping("/student/{studentId}/stu_mtm_cour")
    public Object getStudentMtmCourseByStudentId(@PathVariable("studentId") String studentId){
        return Rets.success(studentService.findStudentMtmCourseByStudentId(studentId));
    }

    @PostMapping("/student/{studentId}/stu_mtm_cour")
    public Object addStudentMtmCourseToStudent(@PathVariable("studentId") String studentId, String courseId, String selectTime){
        studentService.addStudentMtmCourToStudent(studentId, courseId, selectTime);
        return Rets.success();
    }

    @DeleteMapping("/student/{id}")
    public Object deleteStudent(@PathVariable("id") Long id){
        studentService.deleteStudent(id);
        return Rets.success();
    }

    @GetMapping("/student/{studentId}/course")
    public Object getCourseByStudentId(@PathVariable("studentId") String studentId){
        return Rets.success(studentService.findCourseByStudentId(studentId));
    }
}
