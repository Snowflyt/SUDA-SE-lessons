package cn.enilu.flash.bean.entity.signin;

import cn.enilu.flash.bean.entity.BaseEntity;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.Entity;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity(name = "sign_in")
public class SignIn extends BaseEntity {
    private String userid;
    private String course;

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
