package cn.enilu.flash.dao.term;

import cn.enilu.flash.bean.entity.term.Term;
import cn.enilu.flash.dao.BaseRepository;

import java.util.Optional;

public interface TermRepository extends BaseRepository<Term, Long> {
    Optional<Term> findByTermId(String termId);
}
