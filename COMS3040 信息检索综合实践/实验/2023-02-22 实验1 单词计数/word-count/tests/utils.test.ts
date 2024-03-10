import fs from 'node:fs/promises'
import crypto from 'node:crypto'
import {
  cacheMapToDictFile,
  checkDictFileExists,
  compareFileHash,
  parseDictFileToMap,
  parseSourceFileToMap
} from '../src/utils'

describe('parseSourceFileToMap', () => {
  // Mock the readFile function
  beforeAll(() => {
    jest
      .spyOn(fs, 'readFile')
      .mockImplementation(() => Promise.resolve('foo foo bar'))
  })

  // Restore the original readFile function
  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should return a map', async () => {
    const result = await parseSourceFileToMap('')
    expect(result).toBeInstanceOf(Map)
  })

  it('should return a map with correct data', async () => {
    const result = await parseSourceFileToMap('')
    expect(result.get('foo')).toBe(2)
    expect(result.get('bar')).toBe(1)
    expect(result.get('baz')).toBeUndefined()
  })
})

describe('checkDictFileExists', () => {
  // Mock the access function
  beforeAll(() => {
    jest.spyOn(fs, 'access').mockImplementation(() => Promise.resolve())
  })

  // Restore the original access function
  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should return true if the file exists', async () => {
    const result = await checkDictFileExists('')
  })

  it('should return false if the file does not exist', async () => {
    jest.restoreAllMocks()
    await jest.spyOn(fs, 'access').mockImplementation(() => Promise.reject())
    const result = await checkDictFileExists('')
  })
})

describe('cacheMapToDictFile', () => {
  // Mock the writeFile function
  beforeAll(() => {
    jest.spyOn(fs, 'writeFile').mockImplementation(() => Promise.resolve())
    jest.spyOn(fs, 'readFile').mockImplementation(() => Promise.resolve(''))
  })

  // Restore the original writeFile function
  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should call writeFile function', async () => {
    const result = await cacheMapToDictFile('', '', new Map())
    expect(fs.writeFile).toBeCalled()
  })

  it('should call writeFile function with correct data', async () => {
    const result = await cacheMapToDictFile(
      '',
      '',
      new Map([
        ['foo', 2],
        ['bar', 1]
      ])
    )
    expect(fs.writeFile).toBeCalledWith('', `${
      crypto.createHash('md5').update('').digest('hex')
    }\nfoo\t2\nbar\t1`)
  })
})


describe('parseDictFileToMap', () => {
  // Mock the readFile function
  beforeAll(() => {
    jest
      .spyOn(fs, 'readFile')
      .mockImplementation(() => Promise.resolve('1234\nfoo\t2\nbar\t1'))
  })

  // Restore the original readFile function
  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should return a map', async () => {
    const result = await parseDictFileToMap('')
    expect(result).toBeInstanceOf(Map)
  })

  it('should return a map with correct data', async () => {
    const result = await parseDictFileToMap('')
    expect(result.get('foo')).toBe(2)
    expect(result.get('bar')).toBe(1)
    expect(result.get('baz')).toBeUndefined()
  })
})

describe('compareFileHash', () => {
  // Mock the readFile function
  beforeAll(() => {
    const sourceFileContentOriginal = 'foo foo bar'
    const originalHash = crypto
      .createHash('md5')
      .update(sourceFileContentOriginal)
      .digest('hex')
    const sourceFileContentModified = 'foo foo bar baz'

    // mock the readFile function with two different results
    jest
      .spyOn(fs, 'readFile')
      .mockImplementationOnce(() => Promise.resolve(sourceFileContentOriginal))
      .mockImplementationOnce(() => Promise.resolve(`${originalHash}\nfoo\t2\nbar\t1`))
      .mockImplementationOnce(() => Promise.resolve(sourceFileContentModified))
      .mockImplementationOnce(() => Promise.resolve(`${originalHash}\nfoo\t2\nbar\t1\nbaz\t1`))
  })

  // Restore the original readFile function
  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should return true if the hash is the same', async () => {
    const result = await compareFileHash('', '')
    expect(result).toBe(true)
  })

  it('should return false if the hash is different', async () => {
    const result = await compareFileHash('', '')
    expect(result).toBe(false)
  })
})
