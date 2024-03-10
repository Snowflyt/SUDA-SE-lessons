import * as R from 'ramda';

import type { Tuple as T, Union as U, Number as N } from 'ts-toolbelt';

/**
 * A series is a one-dimensional array with labels.
 * @template TData The type of the data.
 * @template TLabels The type of the labels, must be a tuple of strings.
 * Exact type is used if possible to ensure typesafety of accessing data,
 * otherwise fallback to `string[]`. When the type is `string[]`,
 * typesafety would still be ensured by Changing the return type of `at`
 * to `TData | undefined`.
 * @template TType The type of the series, either `'normal'` or `'sparse'`.
 * A sparse series internally uses a `Record<number, TData>` (an object)
 * to store data, while a normal series uses a `TData[]` (an array).
 *
 * @see {@link createSeries}
 */
export interface Series<
  TData,
  TLabels extends readonly string[] = string[],
  TType extends 'normal' | 'sparse' = 'normal',
> {
  /**
   * The type of the series, either `'normal'` or `'sparse'`.
   */
  readonly type: TType;
  /**
   * The length of the series.
   *
   * If `TLabels` is not the fallback type `string[]`,
   * then the type of it would be the exact length of the labels (literal number).
   * Otherwise, it would be just `number`.
   *
   * It is a O(1) operation, whether the series is sparse or not.
   */
  readonly length: TLabels['length'];
  /**
   * The labels of the series.
   */
  readonly labels: TLabels;
  /**
   * The internal data of the series.
   *
   * If the series is sparse, then it would be a `Record<number, TData>` (an object),
   * otherwise it would be a `TData[]` (an array).
   *
   * It is not recommended to access this property directly,
   * unless you know what you are doing.
   */
  readonly $data: TType extends 'normal' ? TData[] : Record<number, TData>;

  /**
   * Set all values of the series.
   * @param values Either an array of values, or a series. In case of sparse series,
   * the array can contain `undefined` to indicate missing values.
   *
   * @example
   * ```typescript
   * const ser1 = createSeries({
   *   data: [1, 2, 3, 4, 5],
   *   labels: ['a', 'b', 'c', 'd', 'e'],
   * });
   * ser1.$setAll([42, 43, 44, 45, 46]); // `ser1` is now [42, 43, 44, 45, 46]
   * const ser2 = createSeries({
   *  data: [99, 100],
   *  labels: ['b', 'e'],
   * });
   * ser1.$setAll(ser2); // `ser1` is now [42, 99, 44, 45, 100]
   *
   * const sparseSer = createSeries({
   *   type: 'sparse',
   *   length: 3,
   *   labels: ['a', 'b', 'c'],
   * });
   * sparseSer.$setAll([1, undefined, 3]); // `sparseSer` is now [1, <empty>, 3]
   * ```
   */
  $setAll(
    values:
      | (TType extends 'normal' ? TData[] : Array<TData | undefined>)
      | Series<TData, TLabels, 'normal' | 'sparse'>,
  ): void;

  /**
   * Get or set the value at the given label (not index).
   *
   * **Typesafety is ensured** when `TLabels` is the fallback type `string[]`,
   * i.e. the type of the return value is `TData | undefined`.
   * While in exact type, the type of the return value is `TData`.
   *
   * @example
   * ```typescript
   * const ser = createSeries({
   *   data: [1, 2, 3, 4, 5],
   *   labels: ['a', 'b', 'c', 'd', 'e'],
   * });
   * ser.at['b']; // 2
   * ser.at['b'] = 42; // `ser` is now [1, 42, 3, 4, 5]
   * ser.at['b']; // 42
   * ```
   */
  at: {
    [Label in TLabels[number]]: string[] extends TLabels
      ? TData | undefined
      : TData;
  };
  /**
   * Get or set the value at the given integer position, i.e. index (not label).
   *
   * Typesafety is **not** ensured when `TLabels` is the fallback type `string[]`,
   * so the type of the return value is always `TData`.
   * You have to ensure the index is valid by yourself.
   *
   * @example
   * ```typescript
   * const ser = createSeries({
   *   data: [1, 2, 3, 4, 5],
   *   labels: ['a', 'b', 'c', 'd', 'e'],
   * });
   * ser.iat[1]; // 2
   * ser.iat[1] = 42; // `ser` is now [1, 42, 3, 4, 5]
   * ser.iat[1]; // 42
   * ```
   */
  iat: { [key: number]: TData };

  /**
   * Convert the series to an array.
   *
   * If the series is sparse, then the array would contain `undefined`
   * to indicate missing values.
   * @returns The array representation of the series.
   *
   * @example
   * ```typescript
   * const ser = createSeries({
   *   data: [1, 2, 3, 4, 5],
   *   labels: ['a', 'b', 'c', 'd', 'e'],
   * });
   * ser.toArray(); // [1, 2, 3, 4, 5]
   *
   * const sparseSer = createSeries({
   *  type: 'sparse',
   *  length: 3,
   *  labels: ['a', 'b', 'c'],
   * });
   * sparseSer.toArray(); // [undefined, undefined, undefined]
   * sparseSer['b'] = 42;
   * sparseSer.toArray(); // [undefined, 42, undefined]
   * ```
   */
  toArray(): TType extends 'normal' ? TData[] : Array<TData | undefined>;

  /**
   * Clone the series.
   * @returns A new series with the same data and labels.
   */
  clone(): Series<TData, TLabels, TType>;

  /**
   * Create a new series with the given labels.
   * @param labels The new labels.
   * @returns A new series with the same data and the given labels.
   */
  withLabels<const NTLabels extends readonly string[]>(
    labels: NTLabels,
  ): NTLabels['length'] extends TLabels['length']
    ? Series<TData, NTLabels, TType>
    : never;

  /**
   * Transform the series by applying the given transformer to each value,
   * similar to `Array#map`.
   * @param transformer The callback function to transform each value.
   *
   * @example
   * ```typescript
   * const ser = createSeries({
   *   data: [1, 2, 3, 4, 5],
   *   labels: ['a', 'b', 'c', 'd', 'e'],
   * });
   * const newSer = ser.transform((value) => value * 2); // [2, 4, 6, 8, 10]
   *
   * const sparseSer = createSeries({
   *   type: 'sparse',
   *   length: 3,
   *   labels: ['a', 'b', 'c'],
   * });
   * sparseSer['a'] = 1;
   * sparseSer['c'] = 3;
   * const newSparseSer = sparseSer.transform((value) => value * 2); // [2, <empty>, 6]
   * ```
   */
  transform<NTData>(
    transformer: (
      value: TData,
      index?: number,
      label?: TLabels[number],
      series?: Series<TData, TLabels, TType>,
    ) => NTData,
  ): Series<NTData, TLabels, TType>;
  /**
   * Accumulate the series by applying the given accumulator to each value,
   * similar to `Array#reduce`, but `initialValue` can be omitted by using
   * the first value of the series as the initial value.
   * @param accumulator The callback function to accumulate each value.
   * @param initialValue The initial value of the accumulator. If omitted,
   * the first value of the series would be used as the initial value.
   * @returns The accumulated value.
   */
  accumulate<NTData>(
    accumulator: (
      acc: NTData,
      value: TData,
      index?: number,
      label?: TLabels[number],
      series?: Series<TData, TLabels, TType>,
    ) => NTData,
    initialValue: NTData,
  ): NTData;
  accumulate(
    accumulator: (
      acc: TData,
      value: TData,
      index?: number,
      label?: TLabels[number],
      series?: Series<TData, TLabels, TType>,
    ) => TData,
  ): TData;
  /**
   * Similar to `Series#accumulate`, but the values are accumulated from right to left.
   * @param accumulator The callback function to accumulate each value.
   * @param initialValue The initial value of the accumulator. If omitted,
   * the last value of the series would be used as the initial value.
   * @returns The accumulated value.
   *
   * @see {@link Series#accumulate}
   */
  accumulateRight<NTData>(
    accumulator: (
      acc: NTData,
      value: TData,
      index?: number,
      label?: TLabels[number],
      series?: Series<TData, TLabels, TType>,
    ) => NTData,
    initialValue: NTData,
  ): NTData;
  accumulateRight(
    accumulator: (
      acc: TData,
      value: TData,
      index?: number,
      label?: TLabels[number],
      series?: Series<TData, TLabels, TType>,
    ) => TData,
  ): TData;

  [Symbol.toStringTag]: 'Series';
}
/**
 * The sparse version of `Series`.
 * It is just the same to `Series<TData, TLabels, 'sparse'>`.
 */
export type SparseSeries<
  TData,
  TLabels extends readonly string[] = string[],
> = Series<TData, TLabels, 'sparse'>;

interface CreateSeriesCommonOptions<TLabels extends readonly string[]> {
  $checkLabels?: boolean;
  $copyLabels?: boolean;
  $label2indexMap?: Record<TLabels[number], number>;
  labels?: TLabels;
}
interface CreateSeriesVectorNormalOptions<TData> {
  data: TData[];
}
interface CreateSeriesVectorSparseOptions {
  length: number;
}
type CreateSeriesVectorOptions<TData, TType extends 'normal' | 'sparse'> = {
  type?: TType;
} & (TType extends 'normal'
  ? CreateSeriesVectorNormalOptions<TData>
  : CreateSeriesVectorSparseOptions);
/**
 * The options for {@link createSeries}.
 *
 * @see {@link createSeries}
 */
export type CreateSeriesOptions<
  TData,
  TLabels extends readonly string[],
  TType extends 'normal' | 'sparse',
> = CreateSeriesCommonOptions<TLabels> &
  CreateSeriesVectorOptions<TData, TType>;
/**
 * The options for {@link createNormalSeries}.
 *
 * @see {@link createSparseSeries}
 */
export type CreateSparseSeriesOptions<TLabels extends readonly string[]> =
  CreateSeriesCommonOptions<TLabels> & CreateSeriesVectorSparseOptions;

/**
 * Create a series (normal or sparse) from the given options.
 * @param options The options to create the series.
 * @returns A series.
 *
 * @example
 * ```typescript
 * // Create a normal series (data are stored in an array)
 * const ser = createSeries({
 *   data: [1, 2, 3, 4, 5],
 *   labels: ['a', 'b', 'c', 'd', 'e'],
 * });
 *
 * // Create a sparse series (data are stored in an object)
 * // `data` cannot be provided in this case, instead `length` must be provided
 * // to specify the length of the series
 * // Note that in this case the data type (i.e. `TData`) cannot be inferred
 * // by TypeScript, so you have to specify it explicitly
 * // Also, the type of labels (i.e. `TLabels`) should be provided by your own
 * // if you want to keep it exact
 * const labels = ['a', 'b', 'c'] as const;
 * const sparseSer = createSeries<number, typeof labels>({
 *   type: 'sparse',
 *   length: 3,
 *   labels,
 * });
 * ```
 */
export const createSeries = <
  TData,
  const TLabels extends readonly string[] = string[],
  TType extends 'normal' | 'sparse' = 'normal',
>(
  options: CreateSeriesOptions<TData, TLabels, TType>,
): Series<TData, TLabels, TType> => {
  const {
    $checkLabels = true,
    $copyLabels = true,
    $label2indexMap,
    labels,
  } = options;

  if ($checkLabels && labels && R.uniq(labels).length !== labels.length)
    throw new Error('Labels must be unique');

  const _length =
    options.type === 'sparse'
      ? (options as CreateSeriesVectorSparseOptions).length
      : (options as CreateSeriesVectorNormalOptions<TData>).data.length;

  const _data =
    options.type === 'sparse'
      ? ({} as Record<number, TData>)
      : [...(options as CreateSeriesVectorNormalOptions<TData>).data];

  const _labels =
    labels !== undefined
      ? $copyLabels
        ? [...labels]
        : labels
      : R.range(0, _length).map(String);
  if (!Object.isFrozen(_labels)) Object.freeze(_labels);

  const _label2index =
    $label2indexMap ??
    (R.fromPairs(_labels.map((row, i) => [row, i])) as Record<
      TLabels[number],
      number
    >);

  const result: Series<TData, TLabels, TType> = {
    get type() {
      return (options.type ?? 'normal') as TType;
    },
    get length() {
      return _length;
    },
    get labels() {
      return _labels as unknown as TLabels;
    },
    get $data() {
      return _data as Series<TData, TLabels, TType>['$data'];
    },

    at: new Proxy(
      {},
      {
        get(_, label: TLabels[number]) {
          return _data[_label2index[label]];
        },
        set(_, label: TLabels[number], val) {
          _data[_label2index[label]] = val;
          return true;
        },
      },
    ) as Series<TData, TLabels, TType>['at'],
    iat: new Proxy(
      {},
      {
        get(_, index) {
          return _data[index as unknown as number];
        },
        set(_, index, val) {
          _data[index as unknown as number] = val;
          return true;
        },
      },
    ),

    $setAll(values) {
      if (options.type === 'sparse') {
        if (Array.isArray(values)) {
          values.forEach((value, index) => {
            if (value === undefined) return;
            _data[index] = value;
          });
        } else if (
          (values as Series<TData, TLabels, TType>).type === 'normal'
        ) {
          const other = values as Series<TData, TLabels, 'normal'>;
          other.labels.forEach((label) => {
            const index = _label2index[label as TLabels[number]];
            if (index === undefined) return;
            _data[index] = other.at[label as (typeof other.labels)[number]]!;
          });
        } else {
          const other = values as Series<TData, TLabels, 'sparse'>;
          other.labels.forEach((label) => {
            const index = _label2index[label as TLabels[number]];
            if (index === undefined) return;
            const val = other.at[label as (typeof other.labels)[number]];
            if (val === undefined) return;
            _data[index] = val!;
          });
        }

        return;
      }

      if (Array.isArray(values)) {
        (_data as TData[]).splice(
          0,
          (_data as TData[]).length,
          ...(values as TData[]),
        );
      } else if ((values as Series<TData, TLabels, TType>).type === 'normal') {
        const other = values as Series<TData, TLabels, 'normal'>;
        other.labels.forEach((label) => {
          const index = _label2index[label as TLabels[number]];
          if (index === undefined) return;
          _data[index] = other.at[label as (typeof other.labels)[number]]!;
        });
      } else {
        const other = values as Series<TData, TLabels, 'sparse'>;
        other.labels.forEach((label) => {
          const index = _label2index[label as TLabels[number]];
          if (index === undefined) return;
          const val = other.at[label as (typeof other.labels)[number]];
          if (val === undefined) return;
          _data[index] = val!;
        });
      }
    },

    toArray() {
      if (options.type === 'sparse')
        return Array.from({ length: _length }, (_, i) => _data[i]);

      return [...(_data as TData[])];
    },

    clone() {
      if (options.type === 'sparse') {
        const result = createSeries(options);
        for (const [index, value] of Object.entries(_data)) {
          const indexNumber = Number(index);
          result.$data[indexNumber] = value;
        }
        return result;
      }

      return createSeries<TData, TLabels, TType>({
        ...options,
        data: [...(_data as TData[])],
      });
    },

    withLabels(labels) {
      if (options.type === 'sparse') {
        const result = createSeries({ ...options, labels });
        for (const [index, value] of Object.entries(_data)) {
          const indexNumber = Number(index);
          result.$data[indexNumber] = value;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result as any;
      }

      return createSeries({
        ...options,
        labels,
        data: [...(_data as TData[])],
      });
    },

    transform(transformer) {
      if (options.type === 'sparse') {
        const newSer = createSeries(options);
        for (const [index, value] of Object.entries(_data)) {
          const indexNumber = Number(index);
          (newSer.$data[indexNumber] as unknown) = transformer(
            value,
            indexNumber,
            _labels[indexNumber],
            result,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ) as any;
        }
        return newSer;
      }

      const newData = (_data as TData[]).map((value, index) =>
        transformer(value, index, _labels[index], result),
      );
      return createSeries({
        ...options,
        data: newData,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any;
    },
    // @ts-expect-error - overload
    accumulate(accumulator, initialValue) {
      let flag = initialValue === undefined;

      if (options.type === 'sparse') {
        let res = initialValue;
        for (const [index, value] of Object.entries(_data)) {
          if (flag) {
            (res as unknown) = value;
            flag = false;
            continue;
          }
          const indexNumber = Number(index);
          (res as unknown) = accumulator(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            res as any,
            value,
            indexNumber,
            _labels[indexNumber],
            result,
          );
        }
        return res;
      }

      let res = initialValue;
      for (let i = 0; i < _length; i++) {
        if (flag) {
          (res as unknown) = (_data as TData[])[i];
          flag = false;
          continue;
        }
        (res as unknown) = accumulator(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          res as any,
          (_data as TData[])[i],
          i,
          _labels[i],
          result,
        );
      }
      return res;
    },
    // @ts-expect-error - overload
    accumulateRight(accumulator, initialValue) {
      let flag = initialValue === undefined;

      if (options.type === 'sparse') {
        let res = initialValue;
        for (const index of Object.keys(_data).reverse()) {
          const indexNumber = index as unknown as number;
          const value = _data[indexNumber];
          if (flag) {
            (res as unknown) = value;
            flag = false;
            continue;
          }
          (res as unknown) = accumulator(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            res as any,
            value,
            indexNumber,
            _labels[indexNumber],
            result,
          );
        }
        return res;
      }

      let res = initialValue;
      for (let i = _length - 1; i >= 0; i--) {
        if (flag) {
          (res as unknown) = (_data as TData[])[i];
          flag = false;
          continue;
        }
        (res as unknown) = accumulator(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          res as any,
          (_data as TData[])[i],
          i,
          _labels[i],
          result,
        );
      }
      return res;
    },

    [Symbol.toStringTag]: 'Series',
  };

  return result;
};
/**
 * Creates a sparse series. It is just the same when passing
 * `type: 'sparse'` to `createSeries`.
 * @param options
 * @returns A sparse series.
 *
 * @see {@link createSeries}
 */
export const createSparseSeries = <
  TData,
  TLabels extends readonly string[] = string[],
>(
  options: CreateSparseSeriesOptions<TLabels>,
): SparseSeries<TData, TLabels> =>
  createSeries<TData, TLabels, 'sparse'>({ ...options, type: 'sparse' });

/**
 * Creates a normal series from an array of values, same as `createSeries({ data: values })`.
 * It is just another version of {@link createSeries} with less options. If you don't care
 * about labels, it is a cleaner way to create a series.
 *
 * If you want to create a sparse one, see {@link sparseSeries}.
 * @param data The array of values.
 * @returns A normal series.
 *
 * @see {@link createSeries}
 *
 * @example
 * ```typescript
 * // Same as `createSeries({ data: [1, 2, 3, 4, 5] })`
 * const ser = series([1, 2, 3, 4, 5])
 * ```
 */
export const series = <
  TDataSource extends unknown[],
  TLabels extends readonly string[] = T.Readonly<
    T.Repeat<string, TDataSource['length']>
  >,
>(
  data: [...TDataSource],
) =>
  createSeries<TDataSource[number], TLabels>({
    data,
  });

type Max<
  TNumbers extends readonly number[],
  TAcc extends number = 0,
> = TNumbers extends [infer THead, ...infer TTail]
  ? THead extends number
    ? TTail extends readonly number[]
      ? N.Greater<THead, TAcc> extends 1
        ? Max<TTail, THead>
        : Max<TTail, TAcc>
      : never
    : never
  : TAcc;
/**
 * Creates a sparse series from an object of values, or an array of values and undefined
 * indicating the missing values. It is just another version of {@link createSparseSeries}
 * with less options. If you don't care about labels, it is a cleaner way to create a series.
 *
 * If you want to create a normal one, see {@link series}.
 * @param data The object of values, or an array of values and undefined.
 * @returns A sparse series.
 *
 * @see {@link createSparseSeries}
 *
 * @example
 * ```typescript
 * const ser1 = sparseSeries([42, undefined, 43]); // Series([42, <empty>, 43])
 *
 * // Note that the object keys are numbers (index), not strings (labels).
 * const ser1 = sparseSeries({ 1: 42 , 4: 43 }); // Series([<empty>, 42, <empty>, <empty>, 43])
 * ```
 */
export function sparseSeries<
  TDataSource extends unknown[],
  TLabels extends readonly string[] = T.Readonly<
    T.Repeat<string, TDataSource['length']>
  >,
>(
  data: [...TDataSource],
): SparseSeries<Exclude<TDataSource[number], undefined>, TLabels>;
export function sparseSeries<
  TDataSource extends Record<number, unknown>,
  TLabels extends readonly string[] = T.Readonly<
    T.Repeat<string, N.Add<Max<U.ListOf<keyof TDataSource>>, 1>>
  >,
>(
  data: TDataSource,
): TDataSource extends Record<number, infer TData>
  ? SparseSeries<TData, TLabels>
  : never;
export function sparseSeries<TData>(
  data: Record<number, TData> | Array<TData | undefined>,
): SparseSeries<TData> {
  if (Array.isArray(data)) {
    const result = createSparseSeries<TData>({ length: data.length });
    for (let i = 0; i < data.length; i++)
      if (data[i] !== undefined) result.$data[i] = data[i]!;
    return result;
  }

  const result = createSparseSeries<TData>({
    length: Object.keys(data)
      .map(Number)
      .reduce((a, b) => Math.max(a, b), 0),
  });
  for (const [key, val] of Object.entries(data))
    result.$data[key as unknown as number] = val;
  return result;
}
