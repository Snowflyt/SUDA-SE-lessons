declare namespace DefectInfo {
  type DefectInfoType = string

  interface DefectInfoDto {
    id: number
    date: string
    type: DefectInfoType
    description: string
    productId: number
    uploaderId: number
  }

  interface DefectInfoCreationRequest {
    date?: string
    productId: number
    type: DefectInfoType
    description: string
  }

  interface DefectInfoUpdateRequest {
    productId: number
    date?: string
    type?: DefectInfoType
    description?: string
  }
}
