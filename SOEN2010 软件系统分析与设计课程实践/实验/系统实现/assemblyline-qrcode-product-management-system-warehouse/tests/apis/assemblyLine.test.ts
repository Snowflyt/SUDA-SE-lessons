import { login } from '../utils/apis'
import assemblyLineApi from '../../src/apis/assemblyLine'

describe('assemblyLine api', () => {
  const name = 'test'
  const modifiedName = 'test2'
  const status: AssemblyLine.AssemblyLineStatus = 'RUNNING'
  const modifiedStatus: AssemblyLine.AssemblyLineStatus = 'STOPPED'
  let assemblyLineId: number

  beforeAll(login)

  test('addAssemblyLine', async () => {
    const res = await assemblyLineApi.addAssemblyLine({
      name,
      status
    })
    assemblyLineId = res.data
    expect(res.data).toBeGreaterThan(0)
  })

  test('getAssemblyLine', async () => {
    const res = await assemblyLineApi.getAssemblyLine(assemblyLineId)
    expect(res.data.id).toBe(assemblyLineId)
    expect(res.data.name).toBe(name)
    expect(res.data.status).toBe(status)
  })

  test('getAllAssemblyLines', async () => {
    const res = await assemblyLineApi.getAllAssemblyLines()
    expect(res.data.length).toBeGreaterThan(0)
  })

  test('updateAssemblyLine', async () => {
    const res = await assemblyLineApi.updateAssemblyLine({
      id: assemblyLineId,
      name: modifiedName,
      status: modifiedStatus
    })
    expect(res.data).toBeNull()
    const modifiedAssemblyLine = await assemblyLineApi.getAssemblyLine(
      assemblyLineId
    )
    expect(modifiedAssemblyLine.data.name).toBe(modifiedName)
    expect(modifiedAssemblyLine.data.status).toBe(modifiedStatus)
  })

  test('deleteAssemblyLine', async () => {
    const res = await assemblyLineApi.deleteAssemblyLine(assemblyLineId)
    expect(res.data).toBeNull()
    const assemblyLines = await assemblyLineApi.getAllAssemblyLines()
    expect(
      assemblyLines.data.find(
        assemblyLine => assemblyLine.id === assemblyLineId
      )
    ).toBeUndefined()
  })
})
