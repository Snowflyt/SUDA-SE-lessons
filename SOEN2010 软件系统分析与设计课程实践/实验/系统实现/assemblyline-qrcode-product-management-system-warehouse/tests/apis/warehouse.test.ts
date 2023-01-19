import { login } from '../utils/apis'
import warehouseApi from '../../src/apis/warehouse'

describe('warehouse api', () => {
  const warehouseName = 'test'
  let warehouseId: number

  beforeAll(login)

  test('addWarehouse', async () => {
    await warehouseApi.addWarehouse(warehouseName)
    warehouseId = (((await warehouseApi.getAllWarehouses()).data.find(
      item => item.houseName === warehouseName
    ) as unknown) as Warehouse.WarehouseDto).id
  })

  test('getWarehouse', async () => {
    const res = await warehouseApi.getWarehouse(warehouseId)
    expect(res.data.houseName).toBe(warehouseName)
  })

  test('getAllWarehouses', async () => {
    const res = await warehouseApi.getAllWarehouses()
    expect(res.data.find(item => item.id === warehouseId)).toBeTruthy()
  })

  test('getWarehouseProducts', async () => {
    const res1 = await warehouseApi.getWarehouseProducts(1)
    expect(res1.data.length).toBeGreaterThan(0)
    const res2 = await warehouseApi.getWarehouseProducts(warehouseId)
    expect(res2.data.length).toBe(0)
  })

  test('deleteWarehouse', async () => {
    const res = await warehouseApi.deleteWarehouse(warehouseId)
    expect(res.data).toBeNull()
  })
})
