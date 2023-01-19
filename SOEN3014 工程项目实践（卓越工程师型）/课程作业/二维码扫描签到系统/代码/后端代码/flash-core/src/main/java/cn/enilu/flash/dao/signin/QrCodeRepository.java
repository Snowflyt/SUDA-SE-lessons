package cn.enilu.flash.dao.signin;

import cn.enilu.flash.bean.entity.wechatuserinfo.WeChatUserInfo;
import cn.enilu.flash.dao.BaseRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


public interface QrCodeRepository extends BaseRepository<WeChatUserInfo, Long> {
    @Query("select avatar from wechat_user_info where userid = ?1")
    String findAvatarByUserid(String userid);

    @Transactional
    void deleteByUserid(String userid);
}