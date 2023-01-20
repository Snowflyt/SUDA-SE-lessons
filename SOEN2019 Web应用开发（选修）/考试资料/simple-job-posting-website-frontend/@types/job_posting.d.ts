declare namespace JobPosting {
  type SalaryBy = 'MONTHLY' | 'YEARLY' | 'WEEKLY' | 'DAILY' | 'HOURLY'

  interface JobPostingDto {
    id: number
    poster: Account.AccountDto
    jobTitle: string
    salaryFrom: number
    salaryTo: number
    salaryBy: SalaryBy
    region: string
    education: string
    experience: string
    description: string
    labels: string[]
  }
}
