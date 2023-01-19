import { login } from '../utils/apis'
import warehouseConcreteApi from '../../src/apis/warehouseConcrete'

describe('warehouse api', () => {
  const warehouseId = 1
  const modifyWarehouseId = 2
  const modifyNum = 1
  const productName = '修改后产品'
  let warehouseConcrete: WarehouseConcrete.WarehouseConcreteDto

  beforeAll(login)

  test('searchWarehouseConcrete', async () => {
    const res = await warehouseConcreteApi.searchWarehouseConcrete({
      warehouseId
    })
    expect(res.data.length).toBeGreaterThan(0)
    warehouseConcrete = res.data[0]
  })

  test('modifyWarehouseConcrete', async () => {
    // move a product from warehouse 1 to warehouse 2
    await warehouseConcreteApi.modifyWarehouseConcrete({
      warehouseId,
      modifyWarehouseId,
      productName: warehouseConcrete.productName,
      modifyNum
    })
    const res1 = await warehouseConcreteApi.searchWarehouseConcrete({
      warehouseId
    })
    expect(
      res1.data.find(item => item.productName === warehouseConcrete.productName)
        ?.productNum
    ).toBe(warehouseConcrete.productNum - modifyNum)

    // undo the change
    await warehouseConcreteApi.modifyWarehouseConcrete({
      warehouseId: modifyWarehouseId,
      modifyWarehouseId: warehouseId,
      productName: warehouseConcrete.productName,
      modifyNum
    })
    const res2 = await warehouseConcreteApi.searchWarehouseConcrete({
      warehouseId
    })
    expect(
      res2.data.find(item => item.productName === warehouseConcrete.productName)
        ?.productNum
    ).toBe(warehouseConcrete.productNum)
  })

  test('getWarehouseConcrete', async () => {
    const res = await warehouseConcreteApi.getWarehouseConcrete(
      warehouseId,
      productName
    )
    expect(res.data).toEqual(warehouseConcrete)
  })
})
