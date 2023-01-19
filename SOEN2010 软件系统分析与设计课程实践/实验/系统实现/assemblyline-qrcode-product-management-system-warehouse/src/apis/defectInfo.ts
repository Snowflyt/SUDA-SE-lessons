import myAxios from '../plugins/myAxios'

interface RealDefectInfoDto {
  id: number
  datetime: string
  type: DefectInfo.DefectInfoType
  description: string
  product_id: number
  uploader_id: number
}

const parseDefectInfoDto = (
  data: RealDefectInfoDto
): DefectInfo.DefectInfoDto => ({
  id: data.id,
  date: data.datetime,
  type: data.type,
  description: data.description,
  productId: data.product_id,
  uploaderId: data.uploader_id
})

export default {
  async addDefectInfo (
    data: DefectInfo.DefectInfoCreationRequest
  ): Promise<BaseResponse<number>> {
    return await myAxios.post<number, BaseResponse<number>>('/addDefectInfo', {
      localDateTime: data.date ?? new Date().toISOString(),
      product_id: data.productId,
      type: data.type,
      description: data.description
    })
  },

  async deleteDefectInfo ({
    productId
  }: {
    productId: number
  }): Promise<BaseResponse<boolean>> {
    return await myAxios.post<boolean, BaseResponse<boolean>>(
      '/deleteDefectInfo',
      { product_id: productId }
    )
  },

  async updateDefectInfo (
    data: DefectInfo.DefectInfoUpdateRequest
  ): Promise<BaseResponse<null>> {
    return await myAxios.post<null, BaseResponse<null>>('/updateDefectInfo', {
      localDateTime: data.date,
      product_id: data.productId,
      type: data.type,
      description: data.description
    })
  },

  async getDefectInfo ({
    productId
  }: {
    productId: number
  }): Promise<BaseResponse<DefectInfo.DefectInfoDto>> {
    const res = await myAxios.post<
      RealDefectInfoDto,
      BaseResponse<RealDefectInfoDto>
    >('/getOneDefectInfoByProductId', { productId })
    return {
      ...res,
      data: parseDefectInfoDto(res.data)
    }
  },

  async getAllDefectInfos (): Promise<
    BaseResponse<DefectInfo.DefectInfoDto[]>
  > {
    const res = await myAxios.post<
      RealDefectInfoDto[],
      BaseResponse<RealDefectInfoDto[]>
    >('/getAllDefectInfo')
    return {
      ...res,
      data: res.data.map(parseDefectInfoDto)
    }
  }
}
