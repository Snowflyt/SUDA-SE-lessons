package cn.enilu.flash.bean.entity.wechatuserinfo;

import cn.enilu.flash.bean.entity.BaseEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.Entity;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity(name = "wechat_user_info")
public class WeChatUserInfo extends BaseEntity {
    private String userid;
    private String gender;
    private String avatar;
    private String email;
    private String qrcode;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        WeChatUserInfo that = (WeChatUserInfo) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
