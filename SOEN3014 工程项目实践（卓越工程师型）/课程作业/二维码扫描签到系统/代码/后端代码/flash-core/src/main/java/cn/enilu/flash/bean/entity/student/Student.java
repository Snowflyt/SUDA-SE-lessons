package cn.enilu.flash.bean.entity.student;

import cn.enilu.flash.bean.entity.BaseEntity;
import cn.enilu.flash.bean.entity.signInRecord.SignInRecord;
import cn.enilu.flash.bean.entity.studentMtmCourse.StudentMtmCourse;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "student")
public class Student extends BaseEntity {

    @Column(name = "studentId")
    private String studentId;

    @Column(name = "name")
    private String name;

    @Column(name = "major")
    private String major;

    @Column(name = "grade")
    private String grade;

    @Column(name = "college")
    private String college;

    @Column(name = "class")
    private String classes;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<StudentMtmCourse> studentMtmCourses;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<SignInRecord> signInRecords;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Student student = (Student) o;
        return getId() != null && Objects.equals(getId(), student.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
