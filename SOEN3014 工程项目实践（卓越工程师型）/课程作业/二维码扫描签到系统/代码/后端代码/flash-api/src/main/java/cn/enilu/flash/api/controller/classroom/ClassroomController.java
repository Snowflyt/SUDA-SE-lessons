package cn.enilu.flash.api.controller.classroom;

import cn.enilu.flash.api.controller.BaseController;
import cn.enilu.flash.bean.dto.ClassroomDto;
import cn.enilu.flash.bean.dto.DeskDto;
import cn.enilu.flash.bean.vo.front.Rets;
import cn.enilu.flash.service.classroom.ClassroomService;
import org.springframework.web.bind.annotation.*;

@RestController
public class ClassroomController extends BaseController {

    private final ClassroomService classroomService;

    public ClassroomController(ClassroomService classroomService) {
        this.classroomService = classroomService;
    }

    @GetMapping("/classrooms")
    public Object getClassrooms() {
        return Rets.success(classroomService.queryAll());
    }

    @PostMapping("/classroom")
    public Object addClassroom(@RequestBody ClassroomDto classroomDto) {
        classroomService.addClassroom(classroomDto.getCode(), classroomDto.getName());
        return Rets.success();
    }

    @GetMapping("/classroom/{classroom-code}/desks")
    public Object getDesksByClassroomCode(@PathVariable("classroom-code") String code) {
        return Rets.success(classroomService.findDesksByClassroomCode(code));
    }

    @PostMapping("/classroom/{classroom-code}/desk")
    public Object addDeskToClassroom(
            @PathVariable("classroom-code") String code,
            @RequestBody DeskDto deskDto) {
        classroomService.addDeskToClassroom(code, deskDto.getCode());
        return Rets.success();
    }

}
