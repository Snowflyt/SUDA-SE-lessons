declare namespace Product {
  type ProductStatus = 'PENDING' | 'IN_PROGRESS' | 'PRODUCED' | 'ACCEPTED' | 'REJECTED' | 'CONSUMED'

  interface ProductDto {
    id: number
    name: string
    date: string
    status: ProductStatus
    batchId: number
    batchNum: number
    modelId: number
    machineId: number
    warehouseId: number
    previous: number[]
    infos: { [key: string]: string }
  }

  interface ProductCreationRequest {
    name?: string
    date?: string
    status: ProductStatus
    batchId: number
    batchNum: number
    modelId: number
    machineId: number
    warehouseId: number
    previous: number[]
    infos: { [key: string]: string }
  }

  interface ProductUpdateRequest {
    id: number
    name?: string
    date?: string
    status?: ProductStatus
    batchId?: number
    batchNum?: number
    modelId?: number
    machineId?: number
    warehouseId?: number
    previous?: number[]
    infos?: { [key: string]: string }
  }
}
