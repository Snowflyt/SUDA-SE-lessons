declare namespace ProductModel {
  type ProductModelType = 'RAW' | 'INTERMEDIATE' | 'FINISHED'

  interface ProductModelDto {
    id: number
    type: ProductModelType
    name: string
    previous: { [key: number]: number }
    requiredInfos: string[]
  }

  interface ProductModelCreationRequest {
    type: ProductModelType
    name: string
    previous: { [key: number]: number }
    requiredInfos: string[]
  }

  interface ProductModelUpdateRequest {
    id: number
    type?: ProductModelType
    name?: string
    previous?: { [key: number]: number }
    requiredInfos?: string[]
  }
}
