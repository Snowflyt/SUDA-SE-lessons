import { login } from '../utils/apis'
import productApi from '../../src/apis/product'
import productModelApi from '../../src/apis/productModel'

describe('product api', () => {
  const status: Product.ProductStatus = 'PENDING'
  const modifiedStatus: Product.ProductStatus = 'PRODUCED'
  const batchId = 1
  const modifiedBatchId = 2
  const batchNum = 1
  const modifiedBatchNum = 2
  const modelId = 3
  const modifiedModelId = 2
  const machineId = 1
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const modifiedMachineId = 2
  const warehouseId = 1
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const modifiedWarehouseId = 2
  const previous = [1, 2]
  const modifiedPrevious = [2, 3]
  const infos = { key1: 'value1', key2: 'value2' }
  const modifiedInfos = { key2: 'value4', key3: 'value3' }
  let productId: number

  beforeAll(login)

  test('addProduct', async () => {
    const res = await productApi.addProduct({
      status,
      batchId,
      batchNum,
      modelId,
      machineId,
      warehouseId,
      previous,
      infos
    })
    expect(res.data).toBeGreaterThan(0)
    productId = res.data
  })

  test('getProduct', async () => {
    const productName = (await productModelApi.getProductModel(modelId)).data
      .name
    const res = await productApi.getProduct(productId)
    expect(res.data).toMatchObject({
      id: productId,
      name: productName,
      status,
      batchId,
      batchNum,
      modelId,
      machineId,
      warehouseId,
      previous,
      infos
    })
  })

  test('getAllProducts', async () => {
    const res = await productApi.getAllProducts()
    expect(
      res.data.find(product => product.id === productId)
    ).not.toBeUndefined()
  })

  test('updateProduct', async () => {
    await productApi.updateProduct({
      id: productId,
      status: modifiedStatus,
      batchId: modifiedBatchId,
      batchNum: modifiedBatchNum,
      modelId: modifiedModelId,
      // machineId: modifiedMachineId,
      // warehouseId: modifiedWarehouseId,
      previous: modifiedPrevious,
      infos: modifiedInfos
    })
    const modifiedProduct = (await productApi.getProduct(productId)).data
    expect(modifiedProduct).toMatchObject({
      id: productId,
      status: modifiedStatus,
      batchId: modifiedBatchId,
      batchNum: modifiedBatchNum,
      modelId: modifiedModelId,
      // machineId: modifiedMachineId,
      // warehouseId: modifiedWarehouseId,
      previous: modifiedPrevious,
      infos: modifiedInfos
    })
  })

  test('deleteProduct', async () => {
    await productApi.deleteProduct(productId)
    const allProducts = (await productApi.getAllProducts()).data
    expect(allProducts.map(product => product.id).includes(productId)).toBe(
      false
    )
  })
})
