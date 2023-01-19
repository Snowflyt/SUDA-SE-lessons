import _ from 'lodash'
import { login } from '../utils/apis'
import productModelApi from '../../src/apis/productModel'

describe('productModel api', () => {
  const type: ProductModel.ProductModelType = 'RAW'
  const modifiedType: ProductModel.ProductModelType = 'INTERMEDIATE'
  const name = 'test'
  const previous: { [key: number]: number } = {
    3: 1,
    4: 2
  }
  const modifiedPrevious = {
    4: 4,
    5: 5
  }
  const requiredInfos = ['test1', 'test2']
  const modifiedRequiredInfos = ['test2', 'test3']
  let productModelId: number

  beforeAll(login)

  test('addProductModel', async () => {
    const res = await productModelApi.addProductModel({
      type,
      name,
      previous,
      requiredInfos
    })
    expect(res.data).toBeGreaterThan(0)
    productModelId = res.data
  })

  test('getProductModel', async () => {
    const res = await productModelApi.getProductModel(productModelId)
    expect(res.data.id).toBe(productModelId)
    expect(res.data.type).toBe(type)
    expect(res.data.name).toBe(name)
    expect(_.isEqual(res.data.previous, previous)).toBe(true)
    expect(res.data.requiredInfos.every(info => requiredInfos.includes(info))).toBe(true)
  })

  test('getAllProductModels', async () => {
    const res = await productModelApi.getAllProductModels()
    expect(res.data.length).toBeGreaterThan(0)
  })

  test('updateProductModel', async () => {
    const res = await productModelApi.updateProductModel({
      id: productModelId,
      type: modifiedType,
      name: name + '1',
      previous: modifiedPrevious,
      requiredInfos: modifiedRequiredInfos
    })
    expect(res.data).toBeNull()

    const modifiedProductModel = await productModelApi.getProductModel(
      productModelId
    )
    expect(modifiedProductModel.data.type).toBe(modifiedType)
    expect(modifiedProductModel.data.name).toBe(name + '1')
    expect(
      _.isEqual(modifiedProductModel.data.previous, modifiedPrevious)
    ).toBe(true)
    expect(
      _.isEqual(modifiedProductModel.data.requiredInfos, modifiedRequiredInfos)
    ).toBe(true)
  })

  test('deleteProductModel', async () => {
    const res = await productModelApi.deleteProductModel(productModelId)
    expect(res.data).toBeNull()

    const productModels = await productModelApi.getAllProductModels()
    expect(
      productModels.data.find(
        productModel => productModel.id === productModelId
      )
    ).toBeUndefined()
  })
})
