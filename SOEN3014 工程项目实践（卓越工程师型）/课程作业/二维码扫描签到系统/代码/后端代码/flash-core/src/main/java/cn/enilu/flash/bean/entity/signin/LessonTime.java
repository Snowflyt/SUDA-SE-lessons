package cn.enilu.flash.bean.entity.signin;

import cn.enilu.flash.bean.entity.BaseEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.Entity;
import java.time.LocalTime;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity(name = "lesson_time")
public class LessonTime extends BaseEntity {
    private int lesson;
    private LocalTime startTime;
    private LocalTime endTime;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SignIn signIn = (SignIn) o;
        return getId() != null && Objects.equals(getId(), signIn.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
