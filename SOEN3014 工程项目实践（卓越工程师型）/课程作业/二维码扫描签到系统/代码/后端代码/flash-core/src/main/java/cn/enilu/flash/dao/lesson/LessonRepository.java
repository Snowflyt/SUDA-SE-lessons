package cn.enilu.flash.dao.lesson;

import cn.enilu.flash.bean.entity.signin.LessonTime;
import cn.enilu.flash.dao.BaseRepository;

public interface LessonRepository extends BaseRepository<LessonTime, Long> {
    LessonTime findByLesson(int lesson);
}
