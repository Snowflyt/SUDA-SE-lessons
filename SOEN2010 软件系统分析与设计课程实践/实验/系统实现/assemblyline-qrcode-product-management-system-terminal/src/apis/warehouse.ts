import request from '../utils/request'
import productApi from './product'

export default {
  async addWarehouse (houseName: string): Promise<BaseResponse<null>> {
    return await request.post<null, BaseResponse<null>>('/addWareHouse', {
      house_name: houseName
    })
  },

  async deleteWarehouse (id: number): Promise<BaseResponse<null>> {
    return await request.post<null, BaseResponse<null>>('/deleteWareHouse', {
      id
    })
  },

  async getWarehouse (
    id: number
  ): Promise<BaseResponse<Warehouse.WarehouseDto>> {
    const res = await request.get<
      { id: number; name: string },
      BaseResponse<{ id: number; name: string }>
    >(`/${id}`)
    return {
      ...res,
      data: {
        id: res.data.id,
        houseName: res.data.name
      }
    }
  },

  async getAllWarehouses (): Promise<BaseResponse<Warehouse.WarehouseDto[]>> {
    const res = await request.post<
      Array<{ id: number; house_name: string }>,
      BaseResponse<Array<{ id: number; house_name: string }>>
    >('/search')
    return {
      ...res,
      data: res.data.map(item => ({
        id: item.id,
        houseName: item.house_name
      }))
    }
  },

  async getWarehouseProducts (id: number) {
    const res = await request.post<
      Product.ProductDto[],
      BaseResponse<Product.ProductDto[]>
    >('/selectAllProductByWareHouseId', { wareHouseId: id })
    const productIds = res.data.map(item => item.id)
    return {
      ...res,
      data: await Promise.all(
        productIds.map(
          async productId => (await productApi.getProduct(productId)).data
        )
      )
    }
  }
}
