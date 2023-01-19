declare namespace WarehouseConcrete {
  interface WarehouseConcreteDto {
    id: number
    warehouseId: number
    productName: string
    productNum: number
  }

  interface WarehouseConcreteSearchRequest {
    warehouseId?: number
    modifyWarehouseId?: number
    productName?: string
    modifyNum?: number
  }

  interface WarehouseConcreteModifyRequest {
    warehouseId: number
    modifyWarehouseId: number
    productName: string
    modifyNum: number
  }
}
