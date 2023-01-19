package cn.enilu.flash.service.test;


import cn.enilu.flash.bean.entity.test.Boy;
import cn.enilu.flash.dao.test.BoyRepository;
import cn.enilu.flash.service.BaseService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class BoyService extends BaseService<Boy, Long, BoyRepository> {

    private final BoyRepository boyRepository;

    public BoyService(BoyRepository boyRepository) {
        this.boyRepository = boyRepository;
    }

}
