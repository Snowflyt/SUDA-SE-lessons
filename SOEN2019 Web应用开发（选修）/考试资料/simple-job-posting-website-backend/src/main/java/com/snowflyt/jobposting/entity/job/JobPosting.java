package com.snowflyt.jobposting.entity.job;

import com.snowflyt.jobposting.dto.info.JobPostingDto;
import com.snowflyt.jobposting.entity.account.User;
import com.snowflyt.jobposting.entity.converter.StringToListConverter;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "job_posting")
public class JobPosting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User poster;

    private String jobTitle;

    private Integer salaryFrom;

    private Integer salaryTo;

    private SalaryBy salaryBy;

    private String region;

    private String education;

    private String experience;

    private String description;

    @Convert(converter = StringToListConverter.class)
    private List<String> labels = List.of();

    public JobPostingDto toDto() {
        return new JobPostingDto(
                id,
                poster.toDto(),
                jobTitle,
                salaryFrom,
                salaryTo,
                salaryBy,
                region,
                education,
                experience,
                description,
                labels
        );
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        JobPosting that = (JobPosting) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
