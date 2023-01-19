package cn.enilu.flash.api.controller.teacher;

import cn.enilu.flash.api.controller.BaseController;
import cn.enilu.flash.bean.constant.factory.PageFactory;
import cn.enilu.flash.bean.dto.TeacherDto;
import cn.enilu.flash.bean.entity.student.Student;
import cn.enilu.flash.bean.entity.teacher.Teacher;
import cn.enilu.flash.bean.vo.front.Rets;
import cn.enilu.flash.bean.vo.query.SearchFilter;
import cn.enilu.flash.service.teacher.TeacherService;
import cn.enilu.flash.utils.factory.Page;
import org.springframework.web.bind.annotation.*;

@RestController
public class TeacherController extends BaseController {
    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping("/teacher")
    public Object addTeacher(@RequestBody TeacherDto teacherDto) {
        teacherService.addTeacher(teacherDto.getId(),teacherDto.getName(), teacherDto.getTeacherId());
        return Rets.success();
    }

    @GetMapping("/teacher/get-teacher")
    public Object getTeacherByTeacherId(@RequestParam(required = false) String teacherId) {
        Page<Teacher> page = new PageFactory<Teacher>().defaultPage();
        page.addFilter("teacherId", SearchFilter.Operator.LIKE, teacherId);
        page = teacherService.queryPage(page);
        return Rets.success(page);
    }

    @PostMapping("/teacher/course/{teacher-id}/{course-id}")
    public Object addCourseToTeacher(
            @PathVariable("teacher-id") String teacherId,
            @PathVariable("course-id") String courseId
    ) {
        teacherService.addCourseToTeacher(teacherId, courseId);
        return Rets.success();
    }

    @PostMapping("/teacher/{teacher-id}/{delete-course-id}")
    public Object deleteCourseToTeacher(
            @PathVariable("teacher-id") String teacherId,
            @PathVariable("delete-course-id") String courseId
    ) {
        teacherService.deleteCourseFromTeacher(teacherId, courseId);
        return Rets.success();
    }

    @PostMapping("/clear-teacher/{teacher-id}")
    public Object clearCourseOfTeacher(
            @PathVariable("teacher-id") String teacherId
    ) {
        teacherService.clearCourseOfTeacher(teacherId);
        return Rets.success();
    }

    @GetMapping("teacher/{teacher-id}/courses")
    public Object findAllCourseOfTeacher(
            @PathVariable("teacher-id") String teacherId
    ) {
        return Rets.success(teacherService.findAllCourseOfTeacher(teacherId));
    }

    @GetMapping("teacher/teacher-name")
    public Object getTeacherByTeacherName(@RequestParam(required = false) String name) {
        Page<Teacher> page = new PageFactory<Teacher>().defaultPage();
        page.addFilter("name", SearchFilter.Operator.LIKE, name);
        page = teacherService.queryPage(page);
        return Rets.success(page);
    }

    @DeleteMapping("teacher/{teacher-id}/del-teacher")
    public Object deleteTeacherByTeacherId(
            @PathVariable("teacher-id") String teacherId
    ){
        teacherService.deleteTeacherByTeacherId(teacherId);
        return Rets.success();
    }

}
