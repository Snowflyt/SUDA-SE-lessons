declare namespace Batch {
  interface BatchDto {
    id: number
    modelId: number
    total: number
  }

  interface BatchCreationRequest {
    modelId: number
    total: number
  }

  interface BatchCreationResponse {
    id: number
    map: { [key: string]: number[] }
  }

  interface BatchUpdateRequest {
    batchId: number
    modelId?: number
    total?: number
  }
}
