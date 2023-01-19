package cn.enilu.flash.api.controller.system;

import cn.enilu.flash.api.controller.BaseController;
import cn.enilu.flash.bean.entity.system.Notice;
import cn.enilu.flash.bean.vo.front.Rets;
import cn.enilu.flash.service.system.NoticeService;
import com.google.common.base.Strings;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * NoticeController
 *
 * @author enilu
 * @version 2018/12/17 0017
 */
@RestController
@RequestMapping("/notice")
public class NoticeController extends BaseController {

    private final NoticeService noticeService;

    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    /**
     * 获取通知列表
     */
    @GetMapping(value = "/list")
    public Object list(String condition) {
        List<Notice> list = null;
        if (Strings.isNullOrEmpty(condition)) {
            list = noticeService.queryAll();
        } else {
            list = noticeService.findByTitleLike(condition);
        }
        return Rets.success(list);
    }

}
