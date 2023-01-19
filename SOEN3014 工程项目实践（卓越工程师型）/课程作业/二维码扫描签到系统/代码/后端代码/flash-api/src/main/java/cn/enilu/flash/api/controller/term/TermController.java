package cn.enilu.flash.api.controller.term;

import cn.enilu.flash.bean.dto.TermDto;
import cn.enilu.flash.bean.vo.front.Rets;
import cn.enilu.flash.service.term.TermService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TermController {
    private final TermService termService;

    public TermController(TermService termService) {
        this.termService = termService;
    }

    @PostMapping("/addTerm")
    public Object addTerm(@RequestBody TermDto termDto) {
        termService.addTerm(termDto.getTermName(), termDto.getTermId(), termDto.getTermStart(), termDto.getTermEnd(), termDto.getTermHasWeek());
        return Rets.success();
    }
}
