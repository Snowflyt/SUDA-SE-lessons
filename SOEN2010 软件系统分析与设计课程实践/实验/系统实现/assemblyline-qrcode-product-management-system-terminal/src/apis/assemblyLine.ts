import request from '../utils/request'

export default {
  async addAssemblyLine (
    data: AssemblyLine.AssemblyLineCreationRequest
  ): Promise<BaseResponse<number>> {
    return await request.post<number, BaseResponse<number>>(
      '/addAssemblyLine',
      data
    )
  },

  async deleteAssemblyLine (id: number): Promise<BaseResponse<null>> {
    return await request.post<null, BaseResponse<null>>(
      '/deleteAssemblyLine',
      id
    )
  },

  async updateAssemblyLine (data: AssemblyLine.AssemblyLineUpdateRequest) {
    return await request.post<null, BaseResponse<null>>(
      '/updateAssemblyLine',
      data
    )
  },

  async getAssemblyLine (
    id: number
  ): Promise<BaseResponse<AssemblyLine.AssemblyLineDto>> {
    return await request.post<
      AssemblyLine.AssemblyLineDto,
      BaseResponse<AssemblyLine.AssemblyLineDto>
    >('/getOneAssemblyLine', id)
  },

  async getAllAssemblyLines (): Promise<
    BaseResponse<AssemblyLine.AssemblyLineDto[]>
  > {
    return await request.post<
      AssemblyLine.AssemblyLineDto[],
      BaseResponse<AssemblyLine.AssemblyLineDto[]>
    >('/getAllAssemblyLine')
  }
}
