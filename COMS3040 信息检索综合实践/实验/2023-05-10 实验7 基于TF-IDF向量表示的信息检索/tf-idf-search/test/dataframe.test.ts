import fs from 'node:fs/promises';

import {
  dataFrame,
  loadDataFrame,
  sparseDataFrame,
} from '../src/utils/dataframe';
import { series, sparseSeries } from '../src/utils/series';

describe('DataFrame', () => {
  let fileContent: string;

  beforeAll(() => {
    jest.spyOn(fs, 'writeFile').mockImplementation(async (_, content) => {
      fileContent = content as string;
    });
    jest.spyOn(fs, 'readFile').mockImplementation(async () => fileContent);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const df = dataFrame({
    c1: [1, 4],
    c2: [2, 5],
    c3: [3, 6],
  }).withRowNames(['r1', 'r2']);

  test('get', () => {
    expect(df.col['c1'].at['r1']).toBe(1);
    expect(df.col['c2'].at['r2']).toBe(5);
  });

  test('set', () => {
    df.col['c1'].at['r1'] = 10;
    expect(df.col['c1'].at['r1']).toBe(10);
    df.col['c1'].at['r1'] = 1;
    expect(df.col['c1'].at['r1']).toBe(1);
  });

  test('getColumn', () => {
    expect(df.col['c1'].toArray()).toEqual([1, 4]);
    expect(df.col['c2'].toArray()).toEqual([2, 5]);
  });

  test('setColumn', () => {
    df.col['c2'] = series([10, 20]);
    expect(df.col['c2'].toArray()).toEqual([10, 20]);
    df.col['c2'] = series([2, 5]);
    expect(df.col['c2'].toArray()).toEqual([2, 5]);
  });

  it('should be able to get a row by name', () => {
    expect(df.row['r1'].toArray()).toEqual([1, 2, 3]);
  });

  it('should be able to set a row by name', () => {
    df.row['r1'] = series([10, 20, 30]);
    expect(df.row['r1'].toArray()).toEqual([10, 20, 30]);
    df.row['r1'] = series([1, 2, 3]);
    expect(df.row['r1'].toArray()).toEqual([1, 2, 3]);
  });

  it('should be able to get a row by index', () => {
    expect(df.irow[0].toArray()).toEqual([1, 2, 3]);
  });

  it('should be able to set a row by index', () => {
    df.irow[0] = series([10, 20, 30]);
    expect(df.irow[0].toArray()).toEqual([10, 20, 30]);
    df.irow[0] = series([1, 2, 3]);
    expect(df.irow[0].toArray()).toEqual([1, 2, 3]);
  });

  test('toString', () => {
    const str = df.toString();
    expect(str.split('\n').length).toBe(3);
  });

  test('save', async () => {
    await df.saveToFile('test.csv');

    expect(fs.writeFile).toBeCalled();
  });

  test('load', async () => {
    const df2: typeof df = await loadDataFrame('test.csv');
    expect(fs.readFile).toBeCalled();
    expect(df2.rowNames).toEqual(df.rowNames);
    expect(df2.columnNames).toEqual(df.columnNames);
    expect(df2.col['c1'].at['r1']).toEqual(df.col['c1'].at['r1']);
    expect(df2.col['c2'].at['r2']).toEqual(df.col['c2'].at['r2']);
  });
});

describe('Sparse DataFrame', () => {
  let fileContent: string;

  beforeAll(() => {
    jest.spyOn(fs, 'writeFile').mockImplementation(async (_, content) => {
      fileContent = content as string;
    });
    jest.spyOn(fs, 'readFile').mockImplementation(async () => fileContent);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const df = sparseDataFrame({
    c1: [undefined, undefined],
    c2: {},
    c3: {},
  }).withRowNames(['r1', 'r2']);

  it('should be able to set a value by column name and row name', () => {
    df.col['c3'].at['r2'] = 42;
    expect(df.col['c3'].at['r2']).toBe(42);
  });

  it('should be able to get a column by column name', () => {
    expect(df.col['c3'].toArray()).toEqual([undefined, 42]);
  });

  it('should be able to set a column by index', () => {
    df.col['c3'] = sparseSeries([undefined, 43]);
    expect(df.col['c3'].toArray()).toEqual([undefined, 43]);
    df.col['c3'] = sparseSeries([undefined, 42]);
    expect(df.col['c3'].toArray()).toEqual([undefined, 42]);
  });

  it('should be able to get a row by name', () => {
    expect(df.row['r2'].toArray()).toEqual([undefined, undefined, 42]);
  });

  it('should be able to set a row by name', () => {
    df.row['r1'] = sparseSeries([undefined, undefined, 30]);
    expect(df.row['r1'].toArray()).toEqual([undefined, undefined, 30]);
  });

  it('should be able to get a row by index', () => {
    expect(df.irow[0].toArray()).toEqual([undefined, undefined, 30]);
  });

  it('should be able to set a row by index', () => {
    df.irow[0] = sparseSeries([undefined, undefined, 40]);
    expect(df.irow[0].toArray()).toEqual([undefined, undefined, 40]);
  });

  it('should be able to convert to string', () => {
    const str = df.toString();
    expect(str.split('\n').length).toBe(3);
  });

  it('should be able to save to file', async () => {
    await df.saveToFile('test.csv');
    expect(fs.writeFile).toBeCalled();
  });

  it('should be able to load from file', async () => {
    const df2: typeof df = await loadDataFrame('test.csv');
    expect(fs.readFile).toBeCalled();
    expect(df2.rowNames).toEqual(df.rowNames);
    expect(df2.columnNames).toEqual(df.columnNames);
    expect(df2.col['c3'].at['r1']).toEqual(df.col['c3'].at['r1']);
    expect(df2.col['c3'].at['r2']).toEqual(df.col['c3'].at['r2']);
  });
});
