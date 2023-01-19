package cn.enilu.flash.bean.entity.signInRecord;

import cn.enilu.flash.bean.entity.BaseEntity;
import cn.enilu.flash.bean.entity.course.Course;
import cn.enilu.flash.bean.entity.student.Student;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "sign_in_record")
public class SignInRecord extends BaseEntity {

    @Column(name = "week")//周
    private String week;

    @Column(name = "day")//星期
    private String day;

    @Column(name = "lesson")//课节
    private String lesson;

    @Column(name = "qr_creator")//二维码创建者
    private String qrCreator;

    @Column(name = "qr_create_time")//二维码创建时间
    private LocalDateTime qrCreateTime;

    @Column(name = "status")//签到状态
    private String status;
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
        SignInRecord that = (SignInRecord) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
