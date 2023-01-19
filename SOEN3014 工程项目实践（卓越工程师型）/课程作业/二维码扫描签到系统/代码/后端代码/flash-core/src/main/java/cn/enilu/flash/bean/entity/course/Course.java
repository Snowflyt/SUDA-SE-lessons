package cn.enilu.flash.bean.entity.course;

import cn.enilu.flash.bean.entity.BaseEntity;
import cn.enilu.flash.bean.entity.signInRecord.SignInRecord;
import cn.enilu.flash.bean.entity.studentMtmCourse.StudentMtmCourse;
import cn.enilu.flash.bean.entity.teacher.Teacher;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "course")
public class Course extends BaseEntity {

    @Column(name = "courseId")
    private String courseId;

    @Column(name = "name")
    private String name;

    @Column(name = "location")
    private String location;

    @Column(name = "time")
    private String time;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<StudentMtmCourse> studentMtmCourses;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<SignInRecord> signInRecords;

    @ManyToMany
    @JoinTable(name = "teacher_course", joinColumns = {@JoinColumn(name = "course_id",referencedColumnName = "courseId")},
            inverseJoinColumns = {@JoinColumn(name="teacher_id",referencedColumnName = "teacherId")})
    @ToString.Exclude
    @JsonIgnore
    private Set<Teacher> teachers;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Course course = (Course) o;
        return getId() != null && Objects.equals(getId(), course.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
