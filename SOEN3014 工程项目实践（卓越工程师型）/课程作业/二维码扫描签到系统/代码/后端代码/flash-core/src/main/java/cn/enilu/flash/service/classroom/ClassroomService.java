package cn.enilu.flash.service.classroom;

import cn.enilu.flash.bean.entity.classroom.Classroom;
import cn.enilu.flash.bean.entity.classroom.Desk;
import cn.enilu.flash.bean.exception.ClassroomNotFoundException;
import cn.enilu.flash.dao.classroom.ClassroomRepository;
import cn.enilu.flash.service.BaseService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassroomService extends BaseService<Classroom, Long, ClassroomRepository> {

    private final ClassroomRepository classroomRepository;

    public ClassroomService(ClassroomRepository classroomRepository) {
        this.classroomRepository = classroomRepository;
    }

    public void addClassroom(String code, String name) {
        Classroom classroom = new Classroom();
        classroom.setCode(code);
        classroom.setName(name);
        insert(classroom);
    }

    public void addDeskToClassroom(String code, String deskCode) {
        Classroom classroom = classroomRepository.findByCode(code)
                .orElseThrow(ClassroomNotFoundException::new);
        Desk desk = new Desk();
        desk.setCode(deskCode);
        desk.setClassroom(classroom);
        classroom.getDesks().add(desk);
        insert(classroom);
    }

    public List<Desk> findDesksByClassroomCode(String code) {
        Classroom classroom = classroomRepository.findByCode(code)
                .orElseThrow(ClassroomNotFoundException::new);
        return classroom.getDesks();
    }

}
