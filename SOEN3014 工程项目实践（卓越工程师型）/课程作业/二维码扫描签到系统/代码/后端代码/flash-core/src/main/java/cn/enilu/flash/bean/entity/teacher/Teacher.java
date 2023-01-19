package cn.enilu.flash.bean.entity.teacher;

import cn.enilu.flash.bean.entity.BaseEntity;
import cn.enilu.flash.bean.entity.course.Course;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity(name = "teacher")
public class Teacher extends BaseEntity {
    private String teacherId;

    private String name;


    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "teacher_course",
            joinColumns = {@JoinColumn(name = "teacher_id", referencedColumnName = "teacherId")},
            inverseJoinColumns = {@JoinColumn(name = "course_id", referencedColumnName = "courseId")})
    @ToString.Exclude
    @JsonIgnore
    private Set<Course> courses;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Teacher teacher = (Teacher) o;
        return getId() != null && Objects.equals(getId(), teacher.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
