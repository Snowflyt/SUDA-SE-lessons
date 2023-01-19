package cn.enilu.flash.bean.entity.classroom;

import cn.enilu.flash.bean.entity.BaseEntity;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity(name = "classroom")
public class Classroom extends BaseEntity {

    private String code;

    private String name;

    @OneToMany(mappedBy = "classroom", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Desk> desks;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Classroom classroom = (Classroom) o;
        return getId() != null && Objects.equals(getId(), classroom.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
