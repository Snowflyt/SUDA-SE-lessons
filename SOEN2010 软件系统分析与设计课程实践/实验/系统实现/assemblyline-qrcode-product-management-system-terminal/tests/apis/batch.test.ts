import { login } from '../utils/apis'
import batchApi from '../../src/apis/batch'

describe('batch api', () => {
  const modelId = 3
  const total = 10
  let batchId: number

  beforeAll(login)

  test('addBatch', async () => {
    const res = await batchApi.addBatch({ modelId, total })
    expect(res.data.map[modelId].length).toBe(total)
    batchId = res.data.id
  })

  test('getBatch', async () => {
    const res = await batchApi.getBatch(batchId)
    expect(res.data.id).toBe(batchId)
    expect(res.data.modelId).toBe(modelId)
    expect(res.data.total).toBe(total)
  })

  test('getAllBatches', async () => {
    const res = await batchApi.getAllBatches()
    expect(res.data.length).toBeGreaterThan(0)
  })

  test('updateBatch', async () => {
    const res = await batchApi.updateBatch({ batchId, total: total + 1 })
    expect(res.data).toBeNull()
    const modifiedBatch = await batchApi.getBatch(batchId)
    expect(modifiedBatch.data.total).toBe(total + 1)
  })

  test('deleteBatch', async () => {
    const res = await batchApi.deleteBatch(batchId)
    expect(res.data).toBeNull()
    const batches = await batchApi.getAllBatches()
    expect(batches.data.find(batch => batch.id === batchId)).toBeUndefined()
  })
})
