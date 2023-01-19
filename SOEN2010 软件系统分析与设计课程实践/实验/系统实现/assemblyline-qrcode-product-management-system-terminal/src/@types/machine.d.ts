declare namespace Machine {
  type MachineStatus = 'RUNNING' | 'STOPPED' | 'MAINTAINING'

  interface MachineDto {
    id: number
    assemblyLineId: number
    name: string
    description: string
    status: MachineStatus
  }

  interface MachineCreationRequest {
    assemblyLineId: number
    name: string
    description: string
    status: MachineStatus
  }

  interface MachineUpdateRequest {
    id: number
    assemblyLineId?: number
    name?: string
    description?: string
    status?: MachineStatus
  }
}