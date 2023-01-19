package cn.enilu.flash.service.system;

import cn.enilu.flash.bean.entity.system.User;
import cn.enilu.flash.dao.system.UserRepository;
import cn.enilu.flash.service.BaseService;
import cn.enilu.flash.utils.JsonUtil;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Created  on 2021/6/2.
 *
 * @author enilu
 */
@Slf4j
@Service
public class TestService extends BaseService<User, Long, UserRepository> {

    private final UserRepository userRepository;

    public TestService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void lock() {
        User user = userRepository.findForUpdate();
        log.info(user.getEmail());
        user.setEmail("test@qq.com");
        userRepository.save(user);
        log.info(user.getEmail());
    }

    @Transactional
    public void userTrans() {
        User user = new User();
        user.setAccount("test111");
        userRepository.save(user);

        User user2 = userRepository.findByAccount("test111");
        log.info(JsonUtil.toJson(user2));
        String a = null;
        System.out.println(a.length());
    }

    public void noTrans() {
        User user = new User();
        user.setAccount("test111");
        userRepository.save(user);
        User user2 = userRepository.findByAccount("test111");
        log.info(JsonUtil.toJson(user2));
        String a = null;
        System.out.println(a.length());
    }

}
