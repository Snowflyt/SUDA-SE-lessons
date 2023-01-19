import request from '../utils/request'

interface RealMachineDto {
  id: number
  assembly_line_id: number
  name: string
  description: string
  status: Machine.MachineStatus
}

const parseMachineDto = (data: RealMachineDto): Machine.MachineDto => ({
  id: data.id,
  assemblyLineId: data.assembly_line_id,
  name: data.name,
  description: data.description,
  status: data.status
})

export default {
  async addMachine (
    data: Machine.MachineCreationRequest
  ): Promise<BaseResponse<number>> {
    return await request.post<number, BaseResponse<number>>('/addMachine', {
      assembly_line_id: data.assemblyLineId,
      name: data.name,
      description: data.description,
      status: data.status
    })
  },

  async deleteMachine (id: number): Promise<BaseResponse<null>> {
    return await request.post<null, BaseResponse<null>>('/deleteMachine', {
      id
    })
  },

  async updateMachine (
    data: Machine.MachineUpdateRequest
  ): Promise<BaseResponse<null>> {
    return await request.post<null, BaseResponse<null>>('/updateMachine', {
      id: data.id,
      assembly_line_id: data.assemblyLineId,
      name: data.name,
      description: data.description,
      status: data.status
    })
  },

  async getMachine (id: number): Promise<BaseResponse<Machine.MachineDto>> {
    const res = await request.post<
      RealMachineDto,
      BaseResponse<RealMachineDto>
    >('/getOneMachine', { id })
    return {
      ...res,
      data: parseMachineDto(res.data)
    }
  },

  async getAllMachines (): Promise<BaseResponse<Machine.MachineDto[]>> {
    const res = await request.post<
      RealMachineDto[],
      BaseResponse<RealMachineDto[]>
    >('/getAllMachine')
    return {
      ...res,
      data: res.data.map(parseMachineDto)
    }
  }
}
