package cn.enilu.flash.api.controller.course;

import cn.enilu.flash.api.controller.BaseController;
import cn.enilu.flash.bean.constant.factory.PageFactory;
import cn.enilu.flash.bean.dto.CourseDto;
import cn.enilu.flash.bean.entity.course.Course;
import cn.enilu.flash.bean.vo.front.Rets;
import cn.enilu.flash.bean.vo.query.SearchFilter;
import cn.enilu.flash.service.course.CourseService;
import cn.enilu.flash.utils.StringUtil;
import cn.enilu.flash.utils.factory.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.time.LocalDateTime;

@RestController
public class CourseController extends BaseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService){
        this.courseService = courseService;
    }

    @GetMapping("/courses")
    public Object getCourses(@RequestParam(required = false) String name, @RequestParam(required = false) Long id){
        Page<Course> page = new PageFactory<Course>().defaultPage();
        page.addFilter("id", SearchFilter.Operator.EQ, id);
        page.addFilter("name", SearchFilter.Operator.LIKE, name);
        page = courseService.queryPage(page);
        return Rets.success(page);
    }

    @PostMapping("/course")
    public Object addCourse(@DateTimeFormat(pattern = "yyyy-MM-dd") @RequestBody CourseDto courseDto){
        courseService.addCourse(courseDto.getId(), courseDto.getCourseId(), courseDto.getName(), courseDto.getLocation(), courseDto.getTime());
        return Rets.success();
    }

    @GetMapping("/course/{courseId}/stu_mtm_cour")
    public Object getStudentMtmCourseByCourseId(@PathVariable("courseId") String courseId){
        return Rets.success(courseService.findStudentMtmCourseByCourseId(courseId));
    }

    @PostMapping("/course/{course-id}/stu_mtm_cour")
    public Object addStudentMtmCourseToCourse(@PathVariable("course-id") String courseId, String studentId, String selectTime){
        courseService.addStudentMtmCourseToCourse(courseId, studentId, selectTime);
        return Rets.success();
    }

    @DeleteMapping("/course/{id}")
    public Object deleteCourse(@PathVariable("id") Long id){
        courseService.delete(id);
        return Rets.success();
    }

    @GetMapping("/course/{courseId}signInRecord")
    public Object getSignInRecordByCourseId(@PathVariable("courseId") String courseId){
        return Rets.success(courseService.getSignInRecordByCourseId(courseId));
    }

    @GetMapping("/course/{courseId}/student")
    public Object getStudentByCourseId(@PathVariable("courseId") String courseId){
        return Rets.success(courseService.getStudentByCourseId(courseId));
    }

    @GetMapping("course/teachers")
    public Object getTeacherByCourseId(String courseId){
        if(courseId != null)
            return Rets.success(courseService.getTeacherByCourseId(courseId));
        else
            return Rets.success(courseService.queryAll());

    }
}
