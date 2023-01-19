declare namespace AssemblyLine {
  type AssemblyLineStatus = 'RUNNING' | 'STOPPED' | 'FAULT'

  interface AssemblyLineDto {
    id: number
    name: string
    status: AssemblyLineStatus
  }

  interface AssemblyLineCreationRequest {
    name: string
    status: AssemblyLineStatus
  }

  interface AssemblyLineUpdateRequest {
    id: number
    name?: string
    status?: AssemblyLineStatus
  }
}
