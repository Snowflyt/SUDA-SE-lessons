import request from '../utils/request'

interface RealWarehouseConcreteDto {
  id: number
  ware_house_id: number
  product_name: string
  product_num: number
}

const parseWarehouseConcreteDto = (
  data: RealWarehouseConcreteDto
): WarehouseConcrete.WarehouseConcreteDto => ({
  id: data.id,
  warehouseId: data.ware_house_id,
  productName: data.product_name,
  productNum: data.product_num
})

export default {
  async searchWarehouseConcrete (
    data: WarehouseConcrete.WarehouseConcreteSearchRequest
  ): Promise<BaseResponse<WarehouseConcrete.WarehouseConcreteDto[]>> {
    const res = await request.post<
      RealWarehouseConcreteDto[],
      BaseResponse<RealWarehouseConcreteDto[]>
    >('/searchWareHouseConcreteById', {
      wareHouseId: data.warehouseId,
      modifyWareHouseId: data.modifyWarehouseId,
      productName: data.productName,
      modifyNum: data.modifyNum
    })
    return {
      ...res,
      data: res.data.map(parseWarehouseConcreteDto)
    }
  },

  async modifyWarehouseConcrete (
    data: WarehouseConcrete.WarehouseConcreteModifyRequest
  ): Promise<''> {
    return await request.post<'', ''>('/modifyWareHouseConcreteById', {
      wareHouseId: data.warehouseId,
      modifyWareHouseId: data.modifyWarehouseId,
      productName: data.productName,
      modifyNum: data.modifyNum
    })
  },

  async getWarehouseConcrete (
    warehouseId: number,
    productName: string
  ): Promise<BaseResponse<WarehouseConcrete.WarehouseConcreteDto>> {
    const res = await request.post<
      RealWarehouseConcreteDto,
      BaseResponse<RealWarehouseConcreteDto>
    >('/getOneWareHouseConcrete', { wareHouseId: warehouseId, productName })
    return {
      ...res,
      data: parseWarehouseConcreteDto(res.data)
    }
  }
}
