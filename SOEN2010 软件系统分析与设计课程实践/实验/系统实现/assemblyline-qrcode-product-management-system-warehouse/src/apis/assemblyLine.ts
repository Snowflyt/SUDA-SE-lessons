import myAxios from '../plugins/myAxios'

export default {
  async addAssemblyLine (
    data: AssemblyLine.AssemblyLineCreationRequest
  ): Promise<BaseResponse<number>> {
    return await myAxios.post<number, BaseResponse<number>>(
      '/addAssemblyLine',
      data
    )
  },

  async deleteAssemblyLine (id: number): Promise<BaseResponse<null>> {
    return await myAxios.post<null, BaseResponse<null>>(
      '/deleteAssemblyLine',
      id
    )
  },

  async updateAssemblyLine (data: AssemblyLine.AssemblyLineUpdateRequest) {
    return await myAxios.post<null, BaseResponse<null>>(
      '/updateAssemblyLine',
      data
    )
  },

  async getAssemblyLine (
    id: number
  ): Promise<BaseResponse<AssemblyLine.AssemblyLineDto>> {
    return await myAxios.post<
      AssemblyLine.AssemblyLineDto,
      BaseResponse<AssemblyLine.AssemblyLineDto>
    >('/getOneAssemblyLine', id)
  },

  async getAllAssemblyLines (): Promise<
    BaseResponse<AssemblyLine.AssemblyLineDto[]>
  > {
    return await myAxios.post<
      AssemblyLine.AssemblyLineDto[],
      BaseResponse<AssemblyLine.AssemblyLineDto[]>
    >('/getAllAssemblyLine')
  }
}
