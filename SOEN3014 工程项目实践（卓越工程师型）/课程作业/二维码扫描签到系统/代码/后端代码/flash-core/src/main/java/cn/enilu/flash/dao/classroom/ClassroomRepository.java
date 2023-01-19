package cn.enilu.flash.dao.classroom;

import cn.enilu.flash.bean.entity.classroom.Classroom;
import cn.enilu.flash.dao.BaseRepository;

import java.util.Optional;

public interface ClassroomRepository extends BaseRepository<Classroom, Long> {

    Optional<Classroom> findByCode(String code);

}
