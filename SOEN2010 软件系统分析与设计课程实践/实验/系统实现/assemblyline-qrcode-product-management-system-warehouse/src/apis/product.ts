import myAxios from '../plugins/myAxios'
import productModelApi from './productModel'

interface RealProductDto {
  id: number
  date: string
  status: Product.ProductStatus
  batch_id: number
  batch_num: number
  model_id: number
  machine_id: number
  ware_house_id: number
  product_name: string
}

export default {
  async addProduct (
    data: Product.ProductCreationRequest
  ): Promise<BaseResponse<number>> {
    return await myAxios.post<number, BaseResponse<number>>('/addProduct', {
      productName:
        data.name ??
        (await productModelApi.getProductModel(data.modelId)).data.name,
      date: data.date ?? new Date().toISOString(),
      status: data.status,
      batchId: data.batchId,
      batchNum: data.batchNum,
      modelId: data.modelId,
      machineId: data.machineId,
      wareHouseId: data.warehouseId,
      previous: data.previous,
      infos: data.infos
    })
  },

  async deleteProduct (id: number): Promise<BaseResponse<boolean>> {
    return await myAxios.post<boolean, BaseResponse<boolean>>(
      '/deleteProduct',
      { productId: id }
    )
  },

  async updateProduct (
    data: Product.ProductUpdateRequest
  ): Promise<BaseResponse<null>> {
    const res = await myAxios.post<null, BaseResponse<null>>('/updateProduct', {
      product_id: data.id,
      productName: data.name,
      date: data.date,
      status: data.status,
      batchId: data.batchId,
      batchNum: data.batchNum,
      modelId: data.modelId,
      machineId: data.machineId,
      wareHouseId: data.warehouseId
    })

    console.log('updateProduct success')

    if (data.previous !== undefined) {
      const previous = (
        await myAxios.post<number[], BaseResponse<number[]>>(
          '/getOneProductPreviousByProductId',
          { productId: data.id }
        )
      ).data
      await Promise.all(
        data.previous
          .filter(previousId => !previous.includes(previousId))
          .map(
            async previousId =>
              await myAxios.post<null, BaseResponse<null>>(
                '/addProductPrevious',
                { product_id: data.id, previous_id: previousId }
              )
          )
      )
      await Promise.all(
        previous
          .filter(previousId => data.previous?.includes(previousId) === false)
          .map(
            async previousId =>
              await myAxios.post<null, BaseResponse<null>>(
                '/deleteProductPrevious',
                { product_id: data.id, previous_id: previousId }
              )
          )
      )
    }

    if (data.infos != null) {
      const allInfos = (
        await myAxios.post<
          Array<{ akey: string; avalue: string; product_id: number }>,
          BaseResponse<
            Array<{ akey: string; avalue: string; product_id: number }>
          >
        >('/getAllProductInfo')
      ).data
      const infos = Object.fromEntries(
        allInfos
          .filter(info => info.product_id === data.id)
          .map(info => [info.akey, info.avalue])
      )
      for (const promise of Object.entries(data.infos)
        .filter(
          ([key, value]) => infos[key] === undefined || infos[key] !== value
        )
        .map(async ([key, value]) =>
          infos[key] === undefined
            ? [
                await myAxios.post<null, BaseResponse<null>>(
                  '/addProductInfo',
                  {
                    product_id: data.id,
                    key,
                    value
                  }
                )
              ]
            : [
                await myAxios.post<null, BaseResponse<null>>(
                  '/deleteProductInfo',
                  {
                    product_id: data.id,
                    key
                  }
                ),
                await myAxios.post<null, BaseResponse<null>>(
                  '/addProductInfo',
                  {
                    product_id: data.id,
                    key,
                    value
                  }
                )
              ]
        )
        .flat()) {
        await promise
      }

      await Promise.all(
        Object.entries(infos)
          .filter(([key]) => data.infos?.[key] === undefined)
          .map(
            async ([key]) =>
              await myAxios.post<null, BaseResponse<null>>(
                '/deleteProductInfo',
                {
                  product_id: data.id,
                  key
                }
              )
          )
      )
    }

    return res
  },

  async getProduct (id: number): Promise<BaseResponse<Product.ProductDto>> {
    const res = await myAxios.post<
      RealProductDto,
      BaseResponse<RealProductDto>
    >('/getOneProduct', { productId: id })

    const previous = (
      await myAxios.post<number[], BaseResponse<number[]>>(
        '/getOneProductPreviousByProductId',
        { productId: id }
      )
    ).data

    const allInfos = (
      await myAxios.post<
        Array<{ akey: string; avalue: string; product_id: number }>,
        BaseResponse<
          Array<{ akey: string; avalue: string; product_id: number }>
        >
      >('/getAllProductInfo')
    ).data
    const infos = Object.fromEntries(
      allInfos
        .filter(info => info.product_id === id)
        .map(info => [info.akey, info.avalue])
    )

    return {
      code: res.code,
      data: {
        id: res.data.id,
        name: res.data.product_name,
        date: res.data.date,
        status: res.data.status,
        batchId: res.data.batch_id,
        batchNum: res.data.batch_num,
        modelId: res.data.model_id,
        machineId: res.data.machine_id,
        warehouseId: res.data.ware_house_id,
        previous,
        infos
      },
      message: res.message,
      description: res.description
    }
  },

  async getAllProducts (): Promise<BaseResponse<Product.ProductDto[]>> {
    const res = await myAxios.post<
      RealProductDto[],
      BaseResponse<RealProductDto[]>
    >('/getAllProduct')

    const allPrevious = (
      await myAxios.post<
        Array<{ product_id: number; previous_id: number }>,
        BaseResponse<Array<{ product_id: number; previous_id: number }>>
      >('/getAllProductPrevious')
    ).data

    const allInfos = (
      await myAxios.post<
        Array<{ akey: string; avalue: string; product_id: number }>,
        BaseResponse<
          Array<{ akey: string; avalue: string; product_id: number }>
        >
      >('/getAllProductInfo')
    ).data

    return {
      code: res.code,
      data: res.data.map(product => ({
        id: product.id,
        name: product.product_name,
        date: product.date,
        status: product.status,
        batchId: product.batch_id,
        batchNum: product.batch_num,
        modelId: product.model_id,
        machineId: product.machine_id,
        warehouseId: product.ware_house_id,
        previous: allPrevious
          .filter(previous => previous.product_id === product.id)
          .map(previous => previous.previous_id),
        infos: Object.fromEntries(
          allInfos
            .filter(info => info.product_id === product.id)
            .map(info => [info.akey, info.avalue])
        )
      })),
      message: res.message,
      description: res.description
    }
  },

  async getProductsByStatus (
    status: Product.ProductStatus
  ): Promise<BaseResponse<Product.ProductDto[]>> {
    const res = await myAxios.post<
      RealProductDto[],
      BaseResponse<RealProductDto[]>
    >('/getProductsByStatus', {
      status
    })
    const productIds = res.data.map(product => product.id)
    return {
      ...res,
      data: await Promise.all(
        productIds.map(async id => (await this.getProduct(id)).data)
      )
    }
  }
}
