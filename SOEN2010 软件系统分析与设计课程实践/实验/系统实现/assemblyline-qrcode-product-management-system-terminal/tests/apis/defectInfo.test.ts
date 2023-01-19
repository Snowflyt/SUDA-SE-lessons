import { login } from '../utils/apis'
import productApi from '../../src/apis/product'
import defectInfoApi from '../../src/apis/defectInfo'

describe('defectInfo api', () => {
  const type = 'defect'
  const modifiedType = 'defect2'
  const description = 'test'
  const modifiedDescription = 'test2'
  let defectInfoId: number
  let productId: number

  beforeAll(async () => {
    await login()
    productId = (
      await productApi.addProduct({
        status: 'PENDING',
        batchId: 1,
        batchNum: 1,
        modelId: 3,
        machineId: 1,
        warehouseId: 1,
        previous: [],
        infos: {}
      })
    ).data
  })

  test('addDefectInfo', async () => {
    const res = await defectInfoApi.addDefectInfo({
      productId,
      type,
      description
    })
    defectInfoId = res.data
  })

  test('getDefectInfo', async () => {
    const res = await defectInfoApi.getDefectInfo({ productId })
    expect(res.data).toMatchObject({
      id: defectInfoId,
      productId,
      type,
      description
    })
  })

  test('getAllDefectInfos', async () => {
    const res = await defectInfoApi.getAllDefectInfos()
    expect(res.data.find(item => item.id === defectInfoId)).toBeTruthy()
  })

  test('updateDefectInfo', async () => {
    await defectInfoApi.updateDefectInfo({
      productId,
      type: modifiedType,
      description: modifiedDescription
    })
    const res = await defectInfoApi.getDefectInfo({ productId })
    expect(res.data).toMatchObject({
      id: defectInfoId,
      productId,
      type: modifiedType,
      description: modifiedDescription
    })
  })

  test('deleteDefectInfo', async () => {
    await defectInfoApi.deleteDefectInfo({ productId })
    const res = await defectInfoApi.getAllDefectInfos()
    expect(res.data.find(item => item.id === defectInfoId)).toBeFalsy()
  })

  afterAll(async () => await productApi.deleteProduct(productId))
})
