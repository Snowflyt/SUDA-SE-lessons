import myAxios from '../plugins/myAxios'

interface RealProductModelDto {
  id: number
  type: ProductModel.ProductModelType
  product_name: string
}

export default {
  async addProductModel (
    data: ProductModel.ProductModelCreationRequest
  ): Promise<BaseResponse<number>> {
    const res = await myAxios.post<number, BaseResponse<number>>(
      '/addProductModel',
      {
        type: data.type,
        productName: data.name
      }
    )

    const productModelId = res.data

    if (Object.keys(data.previous).length > 0) {
      await Promise.all(
        Object.entries(data.previous).map(
          async ([key, value]) =>
            await myAxios.post<null, BaseResponse<null>>(
              '/addProductModelPrevious',
              {
                model_id: productModelId,
                previous_id: Number.parseInt(key),
                amount: value
              }
            )
        )
      )
    }

    if (data.requiredInfos.length > 0) {
      await Promise.all(
        data.requiredInfos.map(
          async info =>
            await myAxios.post<null, BaseResponse<null>>(
              '/addProductModelInfos',
              {
                model_id: productModelId,
                key: info
              }
            )
        )
      )
    }

    return res
  },

  async deleteProductModel (id: number): Promise<BaseResponse<null>> {
    return await myAxios.post<null, BaseResponse<null>>('/deleteProductModel', {
      productModelId: id
    })
  },

  async updateProductModel (
    data: ProductModel.ProductModelUpdateRequest
  ): Promise<BaseResponse<null>> {
    const res = await myAxios.post<null, BaseResponse<null>>(
      '/updateProductModel',
      {
        product_model_id: data.id,
        type: data.type,
        product_name: data.name
      }
    )

    if (data.previous !== undefined) {
      const allPrevious = (
        await myAxios.post<
          Array<{ model_id: number; previous_id: number; amount: number }>,
          BaseResponse<
            Array<{ model_id: number; previous_id: number; amount: number }>
          >
        >('/getAllProductModelPrevious', data.id)
      ).data
      const previous = Object.fromEntries(
        allPrevious
          .filter(item => item.model_id === data.id)
          .map(item => [item.previous_id, item.amount])
      )
      await Promise.all(
        Object.entries(data.previous).map(async ([key, value]) =>
          previous[key] === undefined
            ? await myAxios.post<null, BaseResponse<null>>(
                '/addProductModelPrevious',
                {
                  model_id: data.id,
                  previous_id: Number.parseInt(key),
                  amount: value
                }
              )
            : await myAxios.post<null, BaseResponse<null>>(
                '/updateProductModelPrevious',
                {
                  model_id: data.id,
                  previous_id: Number.parseInt(key),
                  amount: value
                }
              )
        )
      )
      await Promise.all(
        Object.keys(previous)
          .filter(key => data.previous?.[Number.parseInt(key)] === undefined)
          .map(
            async key =>
              await myAxios.post<null, BaseResponse<null>>(
                '/deleteProductModelPrevious',
                {
                  model_id: data.id,
                  previous_id: Number.parseInt(key)
                }
              )
          )
      )
    }

    if (data.requiredInfos !== undefined) {
      const allInfos = (
        await myAxios.post<
          Array<{ model_id: number; allkeys: string }>,
          BaseResponse<Array<{ model_id: number; allkeys: string }>>
        >('/getAllProductModelInfos', data.id)
      ).data
      const requiredInfos = allInfos
        .filter(item => item.model_id === data.id)
        .map(item => item.allkeys)
      await Promise.all(
        data.requiredInfos
          .filter(info => !requiredInfos.includes(info))
          .map(
            async info =>
              await myAxios.post<null, BaseResponse<null>>(
                '/addProductModelInfos',
                {
                  model_id: data.id,
                  key: info
                }
              )
          )
      )
      await Promise.all(
        requiredInfos
          .filter(info => data.requiredInfos?.includes(info) === false)
          .map(
            async info =>
              await myAxios.post<null, BaseResponse<null>>(
                '/deleteProductModelInfos',
                {
                  model_id: data.id,
                  key: info
                }
              )
          )
      )
    }

    return res
  },

  async getProductModel (
    id: number
  ): Promise<BaseResponse<ProductModel.ProductModelDto>> {
    const res = await myAxios.post<
      RealProductModelDto,
      BaseResponse<RealProductModelDto>
    >('/getProductModelById', id)

    const allPrevious = (
      await myAxios.post<
        Array<{ model_id: number; previous_id: number; amount: number }>,
        BaseResponse<
          Array<{ model_id: number; previous_id: number; amount: number }>
        >
      >('/getAllProductModelPrevious')
    ).data
    const previous = Object.fromEntries(
      allPrevious
        .filter(item => item.model_id === id)
        .map(item => [item.previous_id, item.amount])
    )

    const allInfos = (
      await myAxios.post<
        Array<{ model_id: number; allkeys: string }>,
        BaseResponse<Array<{ model_id: number; allkeys: string }>>
      >('/getAllProductModelInfos')
    ).data
    const infos = allInfos
      .filter(item => item.model_id === id)
      .map(item => item.allkeys)

    return {
      code: res.code,
      data: {
        id: res.data.id,
        type: res.data.type,
        name: res.data.product_name,
        previous,
        requiredInfos: infos
      },
      message: res.message,
      description: res.description
    }
  },

  async getAllProductModels (): Promise<
    BaseResponse<ProductModel.ProductModelDto[]>
  > {
    const res = await myAxios.post<
      RealProductModelDto[],
      BaseResponse<RealProductModelDto[]>
    >('/getAllProductModel')

    const allPrevious = (
      await myAxios.post<
        Array<{ model_id: number; previous_id: number; amount: number }>,
        BaseResponse<
          Array<{ model_id: number; previous_id: number; amount: number }>
        >
      >('/getAllProductModelPrevious')
    ).data

    const allInfos = (
      await myAxios.post<
        Array<{ model_id: number; allkeys: string }>,
        BaseResponse<Array<{ model_id: number; allkeys: string }>>
      >('/getAllProductModelInfos')
    ).data

    return {
      code: res.code,
      data: res.data.map(item => {
        const previous = Object.fromEntries(
          allPrevious
            .filter(p => p.model_id === item.id)
            .map(p => [p.previous_id, p.amount])
        )
        const infos = allInfos
          .filter(p => p.model_id === item.id)
          .map(p => p.allkeys)
        return {
          id: item.id,
          type: item.type,
          name: item.product_name,
          previous,
          requiredInfos: infos
        }
      }),
      message: res.message,
      description: res.description
    }
  }
}
