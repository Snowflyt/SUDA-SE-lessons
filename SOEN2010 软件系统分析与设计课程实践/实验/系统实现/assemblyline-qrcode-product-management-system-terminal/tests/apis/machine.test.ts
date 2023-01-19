import { login } from '../utils/apis'
import machineApi from '../../src/apis/machine'
import assemblyLineApi from '../../src/apis/assemblyLine'

describe('machine api', () => {
  const name = 'test'
  const modifiedName = 'test2'
  const description = 'test'
  const modifiedDescription = 'test2'
  const status: Machine.MachineStatus = 'RUNNING'
  const modifiedStatus: Machine.MachineStatus = 'STOPPED'
  let assemblyLineId: number
  let machineId: number

  beforeAll(async () => {
    await login()
    assemblyLineId = (
      await assemblyLineApi.addAssemblyLine({
        name: 'test',
        status: 'RUNNING'
      })
    ).data
  })

  test('addMachine', async () => {
    const res = await machineApi.addMachine({
      name,
      description,
      status,
      assemblyLineId
    })
    machineId = res.data
  })

  test('getMachine', async () => {
    const res = await machineApi.getMachine(machineId)
    expect(res.data).toMatchObject({
      id: machineId,
      name,
      description,
      status,
      assemblyLineId
    })
  })

  test('getAllMachines', async () => {
    const res = await machineApi.getAllMachines()
    expect(res.data.find(item => item.id === machineId)).toBeTruthy()
  })

  test('updateMachine', async () => {
    await machineApi.updateMachine({
      id: machineId,
      name: modifiedName,
      description: modifiedDescription,
      status: modifiedStatus,
      assemblyLineId
    })
    const res = await machineApi.getMachine(machineId)
    expect(res.data).toMatchObject({
      id: machineId,
      name: modifiedName,
      description: modifiedDescription,
      status: modifiedStatus,
      assemblyLineId
    })
  })

  test('deleteMachine', async () => {
    await machineApi.deleteMachine(machineId)
    const res = await machineApi.getAllMachines()
    expect(res.data.find(item => item.id === machineId)).toBeFalsy()
  })

  afterAll(async () => await assemblyLineApi.deleteAssemblyLine(assemblyLineId))
})
