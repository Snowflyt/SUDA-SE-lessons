package cn.enilu.flash.bean.entity.term;

import cn.enilu.flash.bean.entity.BaseEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.time.LocalDate;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity(name = "term")
public class Term extends BaseEntity {
    @Column(name = "term_id")
    private String termId;
    @Column(name = "term_name")
    private String termName;
    @Column(name = "term_start")
    private LocalDate termStart;
    @Column(name = "term_end")
    private LocalDate termEnd;
    @Column(name = "term_has_week")
    private int termHasWeek;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Term term = (Term) o;
        return getId() != null && Objects.equals(getId(), term.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
