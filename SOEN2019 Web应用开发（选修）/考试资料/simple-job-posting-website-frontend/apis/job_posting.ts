import request from '~~/utils/request'

export interface JobPostingCreationRequest {
  jobTitle: string
  salaryFrom: number
  salaryTo: number
  salaryBy: JobPosting.SalaryBy
  region: string
  education: string
  experience: string
  description: string
  labels: string[]
}

export interface JobPostingUpdateRequest {
  jobTitle?: string
  salaryFrom?: number
  salaryTo?: number
  salaryBy?: JobPosting.SalaryBy
  region?: string
  education?: string
  experience?: string
  description?: string
  labels?: string[]
}

export default {
  async getAllJobPostings () {
    return await request.get<
      JobPosting.JobPostingDto[],
      JobPosting.JobPostingDto[]
    >('/job-postings')
  },

  async getJobPosting (id: number) {
    return await request.get<
      JobPosting.JobPostingDto,
      JobPosting.JobPostingDto
    >(`/job-posting/${id}`)
  },

  async getJobPostingsByUser () {
    return await request.get<
      JobPosting.JobPostingDto[],
      JobPosting.JobPostingDto[]
    >('/job-posting/me')
  },

  async createJobPosting (data: JobPostingCreationRequest) {
    return await request.post<
      JobPosting.JobPostingDto,
      JobPosting.JobPostingDto
    >('/job-posting', data)
  },

  async updateJobPosting (id: number, data: JobPostingUpdateRequest) {
    return await request.patch<'', ''>(`/job-posting/${id}`, data)
  },

  async deleteJobPosting (id: number) {
    return await request.delete<'', ''>(`/job-posting/${id}`)
  }
}
