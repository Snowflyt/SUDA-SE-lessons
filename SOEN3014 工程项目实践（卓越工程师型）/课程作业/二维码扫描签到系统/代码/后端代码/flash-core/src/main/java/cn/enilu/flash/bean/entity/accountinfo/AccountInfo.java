package cn.enilu.flash.bean.entity.accountinfo;

import cn.enilu.flash.bean.entity.BaseEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.Entity;
import java.sql.Date;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity(name = "accountinfo")
public class AccountInfo extends BaseEntity {
    private String accountNumber;

    private String sex;

    private String email;

    private String name;

    private Date birthDay;

    private String phoneNumber;

    private String role;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        AccountInfo accountInfo = (AccountInfo) o;
        return getId() != null && Objects.equals(getId(), accountInfo.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
