package cn.enilu.flash.service.term;

import cn.enilu.flash.bean.entity.term.Term;
import cn.enilu.flash.dao.term.TermRepository;
import cn.enilu.flash.service.BaseService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class TermService extends BaseService<Term, Long, TermRepository> {
    private final TermRepository termRepository;

    public TermService(TermRepository termRepository) {
        this.termRepository = termRepository;
    }

    public void addTerm(String termName, String termId, LocalDate termStart, LocalDate termEnd, int termHasWeek) {
        Term term = new Term();
        term.setTermName(termName);
        term.setTermId(termId);
        term.setTermStart(termStart);
        term.setTermEnd(termEnd);
        term.setTermHasWeek(termHasWeek);
        termRepository.save(term);
    }
}
