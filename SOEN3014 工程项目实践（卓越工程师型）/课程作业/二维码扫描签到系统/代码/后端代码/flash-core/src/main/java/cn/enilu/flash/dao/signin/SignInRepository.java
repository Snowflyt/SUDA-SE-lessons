package cn.enilu.flash.dao.signin;

import cn.enilu.flash.bean.entity.signin.SignIn;
import cn.enilu.flash.dao.BaseRepository;

import java.util.List;

public interface SignInRepository extends BaseRepository<SignIn, Long> {
    List<SignIn> findAll();
}
