package cn.enilu.flash.bean.entity.classroom;

import cn.enilu.flash.bean.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.util.Objects;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity(name = "desk")
public class Desk extends BaseEntity {

    private String code;

    @ManyToOne
    @JsonIgnore
    private Classroom classroom;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Desk desk = (Desk) o;
        return getId() != null && Objects.equals(getId(), desk.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
