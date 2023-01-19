package cn.enilu.flash.api.controller.front.officialsite;

import cn.enilu.flash.api.controller.BaseController;
import cn.enilu.flash.bean.entity.cms.Contacts;
import cn.enilu.flash.bean.vo.front.Rets;
import cn.enilu.flash.service.cms.ContactsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/offcialsite/contact")
public class ContactController extends BaseController {

    private final ContactsService contactsService;

    public ContactController(ContactsService contactsService) {
        this.contactsService = contactsService;
    }

    @PostMapping
    public Object save(@RequestBody @Valid Contacts contacts) {
        contactsService.insert(contacts);
        return Rets.success();
    }

}
