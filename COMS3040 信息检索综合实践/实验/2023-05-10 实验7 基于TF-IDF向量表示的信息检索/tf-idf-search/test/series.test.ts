import { createSeries, createSparseSeries } from '../src/utils/series';

describe('Series', () => {
  const ser = createSeries({
    data: [1, 2, 3, 4, 5],
    labels: ['a', 'b', 'c', 'd', 'e'],
  });

  it('should be able to get a value by index', () => {
    expect(ser.at['d']).toBe(4);
    expect(ser.iat[3]).toBe(4);
  });

  it('should be able to set a value by index', () => {
    ser.at['d'] = 42;
    expect(ser.at['d']).toBe(42);
    ser.iat[3] = 4;
    expect(ser.iat[3]).toBe(4);
    expect(ser.at['d']).toBe(4);
  });

  it('should be able to transform a series', () => {
    const ser2 = ser.transform((val) => (val + 1).toString());
    expect(ser2.at['d']).toEqual('5');
  });

  it('should be able to accumulate a series', () => {
    const sum1 = ser.accumulate((acc, val) => acc - val, 0);
    expect(sum1).toBe(-15);
    const sum2 = ser.accumulate((acc, val) => acc - val);
    expect(sum2).toBe(-13);
    const sum3 = ser.accumulateRight((acc, val) => acc - val, 0);
    expect(sum3).toBe(-15);
    const sum4 = ser.accumulateRight((acc, val) => acc - val);
    expect(sum4).toBe(-5);
  });
});

describe('Sparse Series', () => {
  const labels = ['a', 'b', 'c', 'd', 'e'] as const;
  const ser = createSparseSeries<number>({ length: 5 }).withLabels(labels);

  it('should be able to set a value by index', () => {
    ser.at['e'] = 42;
    expect(ser.at['e']).toBe(42);
    ser.at['d'] = 43;
    expect(ser.at['d']).toBe(43);
    ser.iat[3] = 4;
    expect(ser.iat[3]).toBe(4);
    expect(ser.at['d']).toBe(4);
  });

  it('should be able to transform a series', () => {
    const ser2 = ser.transform((val) => (val + 1).toString());
    expect(ser2.at['d']).toEqual('5');
  });

  it('should be able to accumulate a series', () => {
    const sum1 = ser.accumulate((acc, val) => acc - val, 0);
    expect(sum1).toBe(-46);
    const sum2 = ser.accumulate((acc, val) => acc - val);
    expect(sum2).toBe(-38);
    const sum3 = ser.accumulateRight((acc, val) => acc - val, 0);
    expect(sum3).toBe(-46);
    const sum4 = ser.accumulateRight((acc, val) => acc - val);
    expect(sum4).toBe(38);
  });
});
