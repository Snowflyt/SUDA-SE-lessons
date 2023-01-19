import request from '../utils/request'

interface RealBatchDto {
  id: number
  model_id: number
  total: number
}

const parseBatchDto = (data: RealBatchDto): Batch.BatchDto => ({
  id: data.id,
  modelId: data.model_id,
  total: data.total
})

export default {
  async addBatch (
    data: Batch.BatchCreationRequest
  ): Promise<BaseResponse<Batch.BatchCreationResponse>> {
    interface RealResponse {
      batchId: number
      map: { [key: string]: number[] }
    }
    const res = await request.post<RealResponse, BaseResponse<RealResponse>>(
      '/addBatch',
      {
        model_id: data.modelId,
        total: data.total
      }
    )
    return {
      ...res,
      data: {
        id: res.data.batchId,
        map: res.data.map
      }
    }
  },

  async deleteBatch (id: number): Promise<BaseResponse<null>> {
    return await request.post<null, BaseResponse<null>>('/deleteBatch', {
      batchId: id
    })
  },

  async updateBatch (
    data: Batch.BatchUpdateRequest
  ): Promise<BaseResponse<null>> {
    return await request.post<null, BaseResponse<null>>('/updateBatch', {
      batch_id: data.batchId,
      model_id: data.modelId,
      total: data.total
    })
  },

  async getBatch (id: number): Promise<BaseResponse<Batch.BatchDto>> {
    const res = await request.post<RealBatchDto, BaseResponse<RealBatchDto>>(
      '/getOneBatchById',
      {
        batchId: id
      }
    )
    return {
      ...res,
      data: parseBatchDto(res.data)
    }
  },

  async getAllBatches (): Promise<BaseResponse<Batch.BatchDto[]>> {
    const res = await request.post<
      RealBatchDto[],
      BaseResponse<RealBatchDto[]>
    >('/getAllBatch', {})
    return {
      ...res,
      data: res.data.map(parseBatchDto)
    }
  }
}
