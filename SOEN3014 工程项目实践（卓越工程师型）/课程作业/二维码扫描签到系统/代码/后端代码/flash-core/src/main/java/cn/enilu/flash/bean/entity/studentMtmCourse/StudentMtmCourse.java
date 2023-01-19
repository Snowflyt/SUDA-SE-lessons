package cn.enilu.flash.bean.entity.studentMtmCourse;

import cn.enilu.flash.bean.entity.BaseEntity;
import cn.enilu.flash.bean.entity.course.Course;
import cn.enilu.flash.bean.entity.student.Student;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "student_mtm_course")
public class StudentMtmCourse extends BaseEntity {

    @Column(name = "select_time")
    LocalDateTime select_time;

    @ManyToOne
    @JsonIgnore
    private Student student;

    @ManyToOne
    @JsonIgnore
    private Course course;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        StudentMtmCourse that = (StudentMtmCourse) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
