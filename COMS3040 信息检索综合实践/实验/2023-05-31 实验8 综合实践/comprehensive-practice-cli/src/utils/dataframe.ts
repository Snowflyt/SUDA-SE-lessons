import fs from 'node:fs/promises';

import * as R from 'ramda';

import { createSeries } from './series.js';

import type { Series } from './series';
import type { Tuple as T, Union as U } from 'ts-toolbelt';

/**
 * The options for {@link DataFrame#toString}.
 *
 * @see {@link DataFrame#toString}
 */
interface DataFrameToStringOptions {
  /**
   * The maximum number of rows and columns to show.
   *
   * If it is a number, it will be used as the maximum number of rows (not columns).
   */
  limit?:
    | number
    | {
        /**
         * The maximum number of rows to show.
         * @default 10
         */
        row?: number;
        /**
         * The maximum number of columns to show.
         * @default 6
         */
        column?: number;
      };
  /**
   * The width of the header (i.e. the row names at the first column).
   * @default 20
   */
  headerWidth?: number;
  /**
   * The width of each column (except the first column).
   * @default 10
   */
  columnWidth?: number;
}

/**
 * A DataFrame is a 2-dimensional data structure that can store data of
 * different types (including characters, integers, floating point values,
 * categorical data and more) with labeled columns and (optionally labeled) rows.
 *
 * The data is stored by columns, and each column is a {@link Series},
 * so you should access the data by column if possible to avoid performance issues.
 * @template TData The type of the data stored in the DataFrame.
 * @template TColumnNames The type of the column names, must be a tuple of strings.
 * Exact type is used if possible to ensure typesafety of accessing data,
 * otherwise fallback to `string[]`. When the type is `string[]`,
 * typesafety would still be ensured by Changing the return type of `col`
 * to `Series<TData, TRowNames, TType> | undefined`.
 * @template TRowNames The type of the row names, must be a tuple of strings.
 * Exact type is used if possible to ensure typesafety of accessing data,
 * otherwise fallback to `string[]`. When the type is `string[]`,
 * typesafety would still be ensured by Changing the return type of `row`
 * to `Series<TData, TColumnNames, TType> | undefined`.
 * @template TType The type of the DataFrame, can be either `'normal'` or `'sparse'`.
 *
 * @see {@link createDataFrame}
 */
export interface DataFrame<
  TData,
  TColumnNames extends readonly string[] = string[],
  TRowNames extends readonly string[] = string[],
  TType extends 'normal' | 'sparse' = 'normal',
> {
  /**
   * The type of the DataFrame, can be either `'normal'` or `'sparse'`.
   */
  readonly type: TType;
  /**
   * The shape of the DataFrame. The first element is the number of rows,
   * and the second element is the number of columns.
   *
   * If `TRowNames` is not the fallback type `string[]`,
   * then the type of the first element (i.e. row length) would be
   * the exact length of row names (literal number).
   * Otherwise, it would be just `number`.
   * The same applies to the second element (i.e. column length).
   *
   * It is a O(1) operation, whether the DataFrame is sparse or not.
   */
  readonly shape: [TRowNames['length'], TColumnNames['length']];
  /**
   * The names of the columns.
   */
  readonly columnNames: TColumnNames;
  /**
   * The names of the rows.
   */
  readonly rowNames: TRowNames;
  /**
   * The internal data of the DataFrame, stored as a list of Series.
   *
   * It is not recommended to access this property directly,
   * unless you know what you are doing.
   */
  readonly $data: Series<TData, TRowNames, TType>[];

  /**
   * Set all values of a column.
   *
   * It uses {@link Series#$setAll} internally, so the API is almost the same.
   * You can learn more about how to use it in {@link Series#$setAll}.
   * @param columnName The name of the column.
   * @param values Either an array of values, or a series. In case of sparse series,
   * the array can contain `undefined` to indicate missing values.
   * @throws If the length of `values` is not equal to the number of rows.
   *
   * @see {@link Series#$setAll}
   */
  $setColumn(
    columnName: TColumnNames[number],
    values:
      | (TType extends 'normal' ? TData[] : Array<TData | undefined>)
      | Series<TData, TRowNames, TType>,
  ): void;

  /**
   * Get or set a column at the given column name (not index).
   *
   * **Typesafety is ensured** when `TColumnNames` is the fallback type `string[]`,
   * i.e. the type of the return value is `Series<TData, TRowNames, TType> | undefined`.
   * While in exact type, the type of the return value is `Series<TData, TRowNames, TType>`.
   *
   * @example
   * ```typescript
   * const df = createDataFrame({
   *   data: [[1, 2, 3], [4, 5, 6]],
   *   columnNames: ['A', 'B', 'C'],
   * });
   * df.col['B']; // Series([2, 5])
   * df.col['B'] = series([42, 43]); // `df` is now [[1, 42, 3], [4, 43, 6]]
   * df.col['B']; // Series([42, 43])
   * ```
   */
  col: {
    [ColumnName in TColumnNames[number]]: string[] extends TColumnNames
      ? Series<TData, TRowNames, TType> | undefined
      : Series<TData, TRowNames, TType>;
  };
  /**
   * Get or set a column at the given integer position of the column,
   * i.e. column index (not name).
   *
   * Typesafety is **not** ensured when `TColumnNames` is the fallback type `string[]`,
   * so the type of the return value is always `Series<TData, TRowNames, TType>`.
   * You have to ensure the index is valid by yourself.
   *
   * @example
   * ```typescript
   * const df = createDataFrame({
   *   data: [[1, 2, 3], [4, 5, 6]],
   *   columnNames: ['A', 'B', 'C'],
   * });
   * df.icol[1]; // Series([2, 5])
   * df.icol[1] = series([42, 43]); // `df` is now [[1, 42, 3], [4, 43, 6]]
   * df.icol[1]; // Series([42, 43])
   * ```
   */
  icol: {
    [key: number]: Series<TData, TRowNames, TType>;
  };

  /**
   * Get or set a row at the given row name (not index).
   *
   * **Typesafety is ensured** when `TRowNames` is the fallback type `string[]`,
   * i.e. the type of the return value is `Series<TData, TColumnNames, TType> | undefined`.
   * While in exact type, the type of the return value is `Series<TData, TColumnNames, TType>`.
   *
   * Accessing data by row should **not** be used as your main way to access data,
   * as DataFrame is column-oriented, and accessing data by row is much slower than
   * accessing data by column. Consider using {@link DataFrame#col} instead if possible,
   * or use {@link DataFrame#transpose} to transpose the DataFrame first and then
   * access data by column for better performance.
   *
   * @example
   * ```typescript
   * const df = createDataFrame({
   *   data: [[1, 2, 3], [4, 5, 6]],
   *   columnNames: ['A', 'B', 'C'],
   *   rowNames: ['r1', 'r2'],
   * });
   * df.row['r2']; // Series([4, 5, 6])
   * df.row['r2'] = series([42, 43, 44]); // `df` is now [[1, 2, 3], [42, 43, 44]]
   * df.row['r2']; // Series([42, 43, 44])
   * ```
   */
  row: {
    [RowName in TRowNames[number]]: string[] extends TRowNames
      ? Series<TData, TColumnNames, TType> | undefined
      : Series<TData, TColumnNames, TType>;
  };
  /**
   * Get or set a row at the given integer position of the row,
   * i.e. row index (not name).
   *
   * Typesafety is **not** ensured when `TRowNames` is the fallback type `string[]`,
   * so the type of the return value is always `Series<TData, TColumnNames, TType>`.
   * You have to ensure the index is valid by yourself.
   *
   * Accessing data by row should **not** be used as your main way to access data,
   * as DataFrame is column-oriented, and accessing data by row is much slower than
   * accessing data by column. Consider using {@link DataFrame#col} instead if possible,
   * or use {@link DataFrame#transpose} to transpose the DataFrame first and then
   * access data by column for better performance.
   *
   * @example
   * ```typescript
   * const df = createDataFrame({
   *   data: [[1, 2, 3], [4, 5, 6]],
   *   columnNames: ['A', 'B', 'C'],
   * });
   * df.irow[1]; // Series([4, 5, 6])
   * df.irow[1] = series([42, 43, 44]); // `df` is now [[1, 2, 3], [42, 43, 44]]
   * df.irow[1]; // Series([42, 43, 44])
   * ```
   */
  irow: { [key: number]: Series<TData, TColumnNames, TType> };

  /**
   * Transpose the DataFrame, i.e. swap the row and column.
   * @returns A new DataFrame with row and column swapped.
   *
   * @example
   * ```typescript
   * const df = createDataFrame({
   *   data: [[1, 2, 3], [4, 5, 6]],
   *   columnNames: ['A', 'B', 'C'],
   *   rowNames: ['r1', 'r2'],
   * });
   * // `newDf` is now [[1, 4], [2, 5], [3, 6]]
   * // with column names ['r1', 'r2'] and row names ['A', 'B', 'C']
   * const newDf = df.transpose();
   * ```
   */
  transpose(): DataFrame<TData, TRowNames, TColumnNames, TType>;

  /**
   * Clone the DataFrame.
   * @returns A new DataFrame with the same data.
   */
  clone(): DataFrame<TData, TColumnNames, TRowNames, TType>;

  /**
   * Create a new DataFrame with the given column names.
   * @param columnNames The new column names.
   * @returns A new DataFrame with the given column names.
   */
  withColumnNames<const NTColumnNames extends readonly string[]>(
    columnNames: NTColumnNames,
  ): NTColumnNames['length'] extends TColumnNames['length']
    ? DataFrame<TData, NTColumnNames, TRowNames, TType>
    : never;
  /**
   * Create a new DataFrame with the given row names.
   * @param rowNames The new row names.
   * @returns A new DataFrame with the given row names.
   */
  withRowNames<const NTRowNames extends readonly string[]>(
    rowNames: NTRowNames,
  ): NTRowNames['length'] extends TRowNames['length']
    ? DataFrame<TData, TColumnNames, NTRowNames, TType>
    : never;

  [Symbol.toStringTag]: 'DataFrame';
  /**
   * Convert the DataFrame to a human-readable string.
   * @param options Options for converting the DataFrame to string.
   *
   * @see {@link DataFrameToStringOptions}
   */
  toString(options?: DataFrameToStringOptions): string;
  /**
   * Print the DataFrame to the console in a human-readable format.
   *
   * It uses {@link DataFrame#toString} internally.
   * @param options Options for converting the DataFrame to string.
   *
   * @see {@link DataFrameToStringOptions}
   */
  show(options?: DataFrameToStringOptions): void;
  /**
   * Print the first few rows of the DataFrame to the console in a human-readable format.
   *
   * It uses {@link DataFrame#show} internally.
   * @param limit The number of rows to print. Defaults to 5.
   */
  showHead(limit?: number): void;

  /**
   * Save the DataFrame to a file.
   * @param pathname Path to the file to save.
   */
  saveToFile(pathname: string): Promise<void>;
}
/**
 * The sparse version of `DataFrame`.
 * It is just the same to `DataFrame<TData, TColumnNames, TRowNames, 'sparse'>`.
 */
export type SparseDataFrame<
  TData,
  TColumnNames extends readonly string[] = string[],
  TRowNames extends readonly string[] = string[],
> = DataFrame<TData, TColumnNames, TRowNames, 'sparse'>;

interface CreateDataFrameCommonOptions<
  TColumnNames extends readonly string[],
  TRowNames extends readonly string[],
> {
  columnNames: TColumnNames;
  rowNames?: TRowNames;
}
interface CreateDataFrameMatrixNormalOptions<TData> {
  data: TData[][];
}
interface CreateDataFrameMatrixSparseOptions {
  shape: [number, number];
}
type CreateDataFrameMatrixOptions<TData, TType extends 'normal' | 'sparse'> = {
  type?: TType;
} & (TType extends 'normal'
  ? CreateDataFrameMatrixNormalOptions<TData>
  : CreateDataFrameMatrixSparseOptions);
/**
 * The options for {@link createDataFrame}.
 *
 * @see {@link createDataFrame}
 */
export type CreateDataFrameOptions<
  TData,
  TColumnNames extends readonly string[],
  TRowNames extends readonly string[],
  TType extends 'normal' | 'sparse',
> = CreateDataFrameCommonOptions<TColumnNames, TRowNames> &
  CreateDataFrameMatrixOptions<TData, TType>;
/**
 * The options for {@link createSparseDataFrame}.
 *
 * @see {@link createSparseDataFrame}
 */
export type CreateSparseDataFrameOptions<
  TColumnNames extends readonly string[],
  TRowNames extends readonly string[],
> = CreateDataFrameCommonOptions<TColumnNames, TRowNames> &
  CreateDataFrameMatrixSparseOptions;

/**
 * Create a DataFrame (normal or sparse) from the given options.
 * @param options The options to create the DataFrame.
 * @returns A DataFrame.
 *
 * @example
 * ```typescript
 * // Create a normal DataFrame (columns are stored in arrays)
 * const df = createDataFrame({
 *   data: [[1, 2, 3], [4, 5, 6]],
 *   columnNames: ['A', 'B', 'C'],
 * });
 *
 * // Create a sparse DateFrame (columns are stored in an objects)
 * // `data` cannot be provided in this case, instead `shape` must be provided
 * // to specify the row length and column length of the DataFrame
 * // Note that in this case the data type (i.e. `TData`) cannot be inferred
 * // by TypeScript, so you have to specify it explicitly
 * // Also, the type of column names (i.e. `TColumnNames`)
 * // and row names (i.e. `TRowNames`) should be provided by your own
 * // if you want to keep them exact
 * const columnNames = ['A', 'B', 'C'] as const;
 * const rowNames = ['r1', 'r2'] as const;
 * const sparseDf = createDataFrame<number, typeof columnNames, typeof rowNames>({
 *   type: 'sparse',
 *   shape: [2, 3],
 *   columnNames,
 *   rowNames,
 * });
 * ```
 */
export const createDataFrame = <
  TData,
  const TColumnNames extends readonly string[],
  const TRowNames extends readonly string[] = string[],
  TType extends 'normal' | 'sparse' = 'normal',
>(
  options: CreateDataFrameOptions<TData, TColumnNames, TRowNames, TType>,
): DataFrame<TData, TColumnNames, TRowNames, TType> => {
  const { columnNames, rowNames } = options;

  if (columnNames && R.uniq(columnNames).length !== columnNames.length)
    throw new Error('Column names must be unique');
  if (rowNames && R.uniq(rowNames).length !== rowNames.length)
    throw new Error('Row names must be unique');

  const rowLength =
    options.type === 'sparse'
      ? (options as CreateDataFrameMatrixSparseOptions).shape[0]
      : (options as CreateDataFrameMatrixNormalOptions<TData>).data.length;
  const columnLength =
    options.type === 'sparse'
      ? (options as CreateDataFrameMatrixSparseOptions).shape[1]
      : (options as CreateDataFrameMatrixNormalOptions<TData>).data[0]
          ?.length ?? 0;

  if (columnNames && columnNames.length !== columnLength)
    throw new Error('Column length must match matrix column length');
  if (rowNames && rowNames.length !== rowLength)
    throw new Error('row length must match matrix row length');

  const _columnNames = [...columnNames] as TColumnNames;
  Object.freeze(_columnNames);
  const _rowNames = (
    rowNames !== undefined ? [...rowNames] : R.range(0, rowLength).map(String)
  ) as TRowNames;
  Object.freeze(_rowNames);

  const _columnName2columnIndex = R.fromPairs(
    _columnNames.map((columnName, i) => [columnName, i]),
  ) as Record<TColumnNames[number], number>;
  const _rowName2rowIndex = R.fromPairs(
    _rowNames.map((rowName, i) => [rowName, i]),
  ) as Record<TRowNames[number], number>;

  const _data = (
    options.type === 'sparse'
      ? Array.from({ length: columnLength }, () =>
          createSeries<TData, TRowNames, 'sparse'>({
            type: options.type as 'sparse',
            length: rowLength,
            labels: _rowNames,
            $checkLabels: false,
            $copyLabels: false,
            $label2indexMap: _rowName2rowIndex,
          }),
        )
      : (options as CreateDataFrameMatrixNormalOptions<TData>).data.reduce(
          (acc, row, rowIndex) => {
            row.forEach((val, columnIndex) => {
              acc[columnIndex].$data[rowIndex] = val;
            });
            return acc;
          },
          Array.from({ length: columnLength }, () =>
            createSeries({
              type: options.type as 'normal' | undefined,
              data: Array.from(
                { length: rowLength },
                () => undefined as unknown as TData,
              ),
              labels: _rowNames,
              $checkLabels: false,
              $copyLabels: false,
              $label2indexMap: _rowName2rowIndex,
            }),
          ),
        )
  ) as Series<TData, TRowNames, TType>[];

  const _saveNormal = async (pathname: string) => {
    let content = 'normal,' + _rowNames.join(',') + '\n';
    for (const [columnIndex, series] of _data.entries()) {
      content +=
        _columnNames[columnIndex] +
        ',' +
        (series as Series<TData, TRowNames, 'normal'>).$data.join(',') +
        '\n';
    }
    content = content.slice(0, -1);
    await fs.writeFile(pathname, content);
  };

  const _saveSparse = async (pathname: string) => {
    let content = 'sparse,' + _rowNames.join(',') + '\n';
    for (const [columnIndex, series] of _data.entries()) {
      content +=
        _columnNames[columnIndex] + ',' + JSON.stringify(series.$data) + '\n';
    }
    content = content.slice(0, -1);
    await fs.writeFile(pathname, content);
  };

  const result: DataFrame<TData, TColumnNames, TRowNames, TType> = {
    get type() {
      return (options.type ?? 'normal') as TType;
    },
    get shape() {
      return [rowLength, columnLength] as [number, number];
    },
    get columnNames() {
      return _columnNames;
    },
    get rowNames() {
      return _rowNames;
    },
    get $data() {
      return _data;
    },

    $setColumn(columnName, values) {
      if (values.length !== rowLength)
        throw new Error('Value length must match row length');
      const ser = _data[_columnName2columnIndex[columnName]];
      ser.$setAll(values);
    },

    col: new Proxy(
      {},
      {
        get(_, columnName: TColumnNames[number]) {
          return _data[_columnName2columnIndex[columnName]];
        },
        set(_, columnName: TColumnNames[number], val) {
          _data[_columnName2columnIndex[columnName]].$setAll(val.toArray());
          return true;
        },
      },
    ) as DataFrame<TData, TColumnNames, TRowNames, TType>['col'],
    icol: new Proxy(
      {},
      {
        get(_, columnIndex) {
          return _data[columnIndex as unknown as number];
        },
        set(_, columnIndex, val) {
          _data[columnIndex as unknown as number].$setAll(val.toArray());
          return true;
        },
      },
    ),

    row: new Proxy(
      {},
      {
        get(_, rowName: TRowNames[number]) {
          if (options.type === 'sparse') {
            const result = createSeries<TData, TColumnNames, 'sparse'>({
              type: 'sparse',
              length: columnLength,
              labels: _columnNames,
              $checkLabels: false,
              $copyLabels: false,
              $label2indexMap: _columnName2columnIndex,
            });
            for (const [columnIndex, series] of _data.entries()) {
              const val = series.$data[_rowName2rowIndex[rowName]];
              if (val !== undefined) result.$data[columnIndex] = val;
            }
            return result;
          }

          const newData = _data.map(
            (ser) => ser.$data[_rowName2rowIndex[rowName]],
          );
          return createSeries<TData, TColumnNames, 'normal'>({
            type: 'normal',
            data: newData,
            labels: _columnNames,
            $checkLabels: false,
            $copyLabels: false,
            $label2indexMap: _columnName2columnIndex,
          });
        },

        set(_, rowName: TRowNames[number], val) {
          if (options.type === 'sparse') {
            for (const [columnIndex, ser] of _data.entries()) {
              const value = val.$data[columnIndex];
              if (value !== undefined)
                ser.$data[_rowName2rowIndex[rowName]] = value;
            }
            return true;
          }

          for (const [columnIndex, ser] of _data.entries()) {
            ser.$data[_rowName2rowIndex[rowName]] = val.$data[columnIndex];
          }
          return true;
        },
      },
    ) as DataFrame<TData, TColumnNames, TRowNames, TType>['row'],
    irow: new Proxy(
      {},
      {
        get(_, rowIndex) {
          if (options.type === 'sparse') {
            const result = createSeries<TData, TColumnNames, 'sparse'>({
              type: 'sparse',
              length: columnLength,
              labels: _columnNames,
              $checkLabels: false,
              $copyLabels: false,
              $label2indexMap: _columnName2columnIndex,
            });
            for (const [columnIndex, series] of _data.entries()) {
              const val = series.$data[rowIndex as unknown as number];
              if (val !== undefined) result.$data[columnIndex] = val;
            }
            return result;
          }

          const newData = _data.map(
            (ser) => ser.$data[rowIndex as unknown as number],
          );
          return createSeries<TData, TColumnNames, 'normal'>({
            type: 'normal',
            data: newData,
            labels: _columnNames,
            $checkLabels: false,
            $copyLabels: false,
            $label2indexMap: _columnName2columnIndex,
          });
        },

        set(_, rowIndex, val) {
          if (options.type === 'sparse') {
            for (const [columnIndex, ser] of _data.entries()) {
              const value = val.$data[columnIndex];
              if (value !== undefined)
                ser.$data[rowIndex as unknown as number] = value;
            }
            return true;
          }

          for (const [columnIndex, ser] of _data.entries()) {
            ser.$data[rowIndex as unknown as number] = val.$data[columnIndex];
          }
          return true;
        },
      },
    ) as { [key: number]: Series<TData, TColumnNames, TType> },

    transpose() {
      if (options.type === 'sparse') {
        const result = createDataFrame<
          TData,
          TRowNames,
          TColumnNames,
          'sparse'
        >({
          ...options,
          type: options.type as 'sparse',
          shape: [columnLength, rowLength],
          columnNames: _rowNames as unknown as TRowNames,
          rowNames: _columnNames as unknown as TColumnNames,
        });
        for (const [columnIndex, series] of _data.entries()) {
          for (const [rowIndex, value] of Object.entries(series.$data)) {
            result.$data[Number(rowIndex)].$data[columnIndex] = value;
          }
        }
        return result as DataFrame<TData, TRowNames, TColumnNames, TType>;
      }

      return createDataFrame<TData, TRowNames, TColumnNames, 'normal'>({
        ...options,
        type: options.type as 'normal',
        data: _data.map((ser) => ser.$data) as TData[][],
        columnNames: _rowNames as unknown as TRowNames,
        rowNames: _columnNames as unknown as TColumnNames,
      }) as DataFrame<TData, TRowNames, TColumnNames, TType>;
    },

    clone() {
      if (options.type === 'sparse') {
        const result = createDataFrame(options);
        for (const [columnIndex, series] of _data.entries()) {
          for (const [rowIndex, value] of Object.entries(series.$data)) {
            result.$data[rowIndex as unknown as number].$data[columnIndex] =
              value;
          }
        }
        return result;
      }

      return createDataFrame<TData, TColumnNames, TRowNames, TType>({
        ...options,
        data: _data.map((ser) => ser.$data),
      });
    },

    withColumnNames(columnNames) {
      if (options.type === 'sparse') {
        const result = createDataFrame({
          ...options,
          columnNames,
        });
        for (const [columnIndex, series] of _data.entries()) {
          for (const [rowIndex, val] of Object.entries(series.$data)) {
            result.$data[rowIndex as unknown as number].$data[columnIndex] =
              val;
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result as any;
      }

      return createDataFrame({
        ...options,
        columnNames,
        data: R.range(0, rowLength).map((rowIndex) =>
          _data.map((ser) => ser.$data[rowIndex]),
        ),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any;
    },
    withRowNames(rowNames) {
      if (options.type === 'sparse') {
        const result = createDataFrame({
          ...options,
          rowNames,
        });
        for (const [columnIndex, series] of _data.entries()) {
          for (const [rowIndex, val] of Object.entries(series.$data)) {
            result.$data[rowIndex as unknown as number].$data[columnIndex] =
              val;
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result as any;
      }

      return createDataFrame({
        ...options,
        rowNames,
        data: R.range(0, rowLength).map((rowIndex) =>
          _data.map((ser) => ser.$data[rowIndex]),
        ),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any;
    },

    [Symbol.toStringTag]: 'DataFrame',
    toString({
      columnWidth = 10,
      headerWidth = 20,
      limit: inputLimit,
    }: DataFrameToStringOptions = {}) {
      const limit = {
        column: 6,
        row: 10,
      };
      if (inputLimit !== undefined) {
        if (typeof inputLimit === 'number') {
          limit.row = inputLimit;
        } else {
          if ('row' in inputLimit && inputLimit.row !== undefined)
            limit.row = inputLimit.row;
          if ('column' in inputLimit && inputLimit.column !== undefined)
            limit.column = inputLimit.column;
        }
      }

      let result = '';

      result += ' '.repeat(headerWidth);
      result += _columnNames
        .slice(0, limit.column)
        .map((col) => col.padStart(columnWidth))
        .join('');
      result += '\n';

      for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
        if (rowIndex >= limit.row) break;

        const row = _data.map((ser) => ser.$data[rowIndex]);

        result += _rowNames[rowIndex].padEnd(headerWidth);
        result += (
          options.type === 'sparse'
            ? R.range(0, columnLength).map(
                (columnIndex) => row[columnIndex] ?? '<empty>',
              )
            : row
        )
          .slice(0, limit.column)
          .map((val) =>
            (typeof val === 'number' ? val.toFixed(4) : String(val)).padStart(
              columnWidth,
            ),
          )
          .join('');

        if (columnLength > limit.column) {
          result += `    ... ${columnLength - limit.column} more columns`;
        }

        result += '\n';
      }

      if (rowLength > limit.row) {
        result += `... ${rowLength - limit.row} more rows`;
      } else {
        result = result.slice(0, -1);
      }

      return result;
    },
    show(options) {
      console.log(result.toString(options));
    },
    showHead(limit = 5) {
      result.show({ limit: { row: limit } });
    },

    async saveToFile(pathname) {
      if (options.type === 'sparse') await _saveSparse(pathname);
      else await _saveNormal(pathname);
    },
  };

  return result;
};
/**
 * Creates a sparse DataFrame. It is just the same when passing
 * `type: 'sparse'` to `createDataFrame`.
 * @param options
 * @returns A sparse DataFrame.
 *
 * @see {@link createDataFrame}
 */
export const createSparseDataFrame = <
  TData,
  TColumnNames extends readonly string[] = string[],
  TRowNames extends readonly string[] = string[],
>(
  options: CreateSparseDataFrameOptions<TColumnNames, TRowNames>,
): SparseDataFrame<TData, TColumnNames, TRowNames> =>
  createDataFrame<TData, TColumnNames, TRowNames, 'sparse'>({
    ...options,
    type: 'sparse',
  });

/**
 * Load a DataFrame from a file.
 *
 * It is normally used to load a DataFrame saved by {@link DataFrame#saveToFile}
 * @param pathname The path to the file.
 * @returns The loaded DataFrame.
 *
 * @see {@link DataFrame#saveToFile}
 */
export const loadDataFrame = async <
  TData extends number | string,
  TColumnNames extends readonly string[] = string[],
  TRowNames extends readonly string[] = string[],
  TType extends 'normal' | 'sparse' = 'normal',
>(
  pathname: string,
): Promise<DataFrame<TData, TColumnNames, TRowNames, TType>> => {
  const parseNormal = (
    lines: string[],
  ): DataFrame<TData, TColumnNames, TRowNames, 'normal'> => {
    const rowNames = lines[0].split(',').slice(1) as unknown as TRowNames;
    const columnNames = lines
      .slice(1)
      .map((line) => line.split(',', 2)[0]) as unknown as TColumnNames;

    const matrix = lines.slice(1).map((line) =>
      line
        .split(',')
        .slice(1)
        .map((val) => (/^\d+(\.\d+)?$/.test(val) ? Number(val) : val)),
    ) as unknown as TData[][];

    return createDataFrame({
      data: matrix.reduce(
        (acc, series) => {
          series.forEach((val, i) => acc[i].push(val));
          return acc;
        },
        Array.from({ length: rowNames.length }, () => [] as TData[]),
      ),
      columnNames,
      rowNames,
    });
  };

  const parseSparse = (
    lines: string[],
  ): DataFrame<TData, TColumnNames, TRowNames, 'sparse'> => {
    const rowNames = lines[0].split(',').slice(1) as unknown as TRowNames;
    const columnNames = lines
      .slice(1)
      .map((line) => line.split(',', 2)[0]) as unknown as TColumnNames;

    const result = createDataFrame<TData, TColumnNames, TRowNames, 'sparse'>({
      type: 'sparse',
      shape: [rowNames.length, columnNames.length],
      columnNames,
      rowNames,
    });

    for (let columnIndex = 0; columnIndex < columnNames.length; columnIndex++) {
      const line = lines[columnIndex + 1];
      const json = line.slice(line.split(',', 2)[0].length + 1);

      for (const [rowIndex, val] of Object.entries(JSON.parse(json))) {
        result.$data[columnIndex].$data[rowIndex as unknown as number] =
          val as TData;
      }
    }

    return result;
  };

  const content = await fs.readFile(pathname, 'utf8');
  const lines = content.split('\n').filter((line) => line.length > 0);

  const type = lines[0].split(',', 2)[0].trim();
  if (type === 'normal')
    return parseNormal(lines) as DataFrame<
      TData,
      TColumnNames,
      TRowNames,
      TType
    >;
  return parseSparse(lines) as DataFrame<TData, TColumnNames, TRowNames, TType>;
};
/**
 * Load a sparse version of DataFrame from a file.
 * It is just the same to `loadDataFrame`, but with default typing
 * of `type` to `sparse`.
 * @param pathname The path to the file.
 * @returns The loaded DataFrame.
 *
 * @see {@link loadDataFrame}
 */
export const loadSparseDataFrame = <
  TData extends number | string,
  TColumnNames extends readonly string[] = string[],
  TRowNames extends readonly string[] = string[],
>(
  pathname: string,
): Promise<SparseDataFrame<TData, TColumnNames, TRowNames>> =>
  loadDataFrame<TData, TColumnNames, TRowNames, 'sparse'>(pathname);

/**
 * Creates a normal DataFrame from an object with keys as column names and values as
 * arrays. It is just another version of {@link createDataFrame} with less options.
 * If you don't care about row names, it is a cleaner way to create a DataFrame.
 *
 * If you want to create a sparse one, see {@link sparseDataFrame}.
 * @param data The object with keys as column names and values as arrays.
 * @returns A normal DataFrame.
 *
 * @see {@link createDataFrame}
 *
 * @example
 * ```typescript
 * // Same as `createDataFrame({ data: [[1, 2, 3], [4, 5, 6]], columnNames: ['A', 'B', 'C'] })`
 * const df = dataFrame({
 *   A: [1, 4],
 *   B: [2, 5],
 *   C: [3, 6],
 * });
 * ```
 */
export const dataFrame = <
  TDataSource extends Record<string, unknown[]>,
  TColumnNames extends readonly string[] = T.Readonly<
    U.ListOf<keyof TDataSource>
  >,
  TRowNames extends readonly string[] = string[],
>(
  data: TDataSource,
) => {
  const columnNames = Object.keys(data) as unknown as TColumnNames;
  const rowLength =
    columnNames[0] !== undefined ? data[columnNames[0]].length : 0;

  return createDataFrame<
    TDataSource[keyof TDataSource][number],
    TColumnNames,
    TRowNames
  >({
    data: R.range(0, rowLength).map((i) =>
      columnNames.map((columnName) => data[columnName][i]),
    ) as unknown as TDataSource[keyof TDataSource][][],
    columnNames,
  });
};
/**
 * Creates a sparse DateFrame from an object with keys as column names and values as
 * values of the series or an array of values and undefined indicating the missing values.
 * It is just another version of {@link createSparseDataFrame} with less options.
 * If you don't care about row names, it is a cleaner way to create a DataFrame.
 *
 * If you want to create a normal one, see {@link dataFrame}.
 * @param data The object with keys as column names and values as values of the series
 * or an array of values and undefined indicating the missing values.
 * @returns A sparse series.
 *
 * @see {@link createSparseDataFrame}
 *
 * @example
 * ```typescript
 * // Create a sparse DataFrame [[1, undefined], [undefined, 42], [3, 43]]
 * const df = sparseDataFrame({
 *   A: [1, undefined, 3],
 *   // Note that the object keys are numbers (index), not strings (labels).
 *   B: { 1: 42, 2: 43 },
 * });
 * ```
 */
export const sparseDataFrame = <
  TDataSource extends Record<string, unknown[] | Record<number, unknown>>,
  TColumnNames extends readonly string[] = T.Readonly<
    U.ListOf<keyof TDataSource>
  >,
  TRowNames extends readonly string[] = string[],
>(
  data: TDataSource,
) => {
  const columnNames = Object.keys(data) as unknown as TColumnNames;
  const rowLength = columnNames.reduce(
    (acc, columnName) =>
      Math.max(
        acc,
        Array.isArray(data[columnName])
          ? (data[columnName] as unknown[]).length
          : Object.keys(data[columnName] as Record<number, unknown>).reduce(
              (acc, key) => Math.max(acc, Number(key)),
              0,
            ),
      ),
    0,
  );

  const result = createSparseDataFrame<
    TDataSource[keyof TDataSource][number],
    TColumnNames,
    TRowNames
  >({
    shape: [rowLength, columnNames.length],
    columnNames,
  });

  for (let columnIndex = 0; columnIndex < columnNames.length; columnIndex++) {
    const columnName = columnNames[columnIndex];
    const columnData = data[columnName];
    if (Array.isArray(columnData)) {
      for (let rowIndex = 0; rowIndex < columnData.length; rowIndex++) {
        if (columnData[rowIndex] !== undefined)
          result.$data[columnIndex].$data[rowIndex] = columnData[
            rowIndex
          ] as TDataSource[keyof TDataSource][number];
      }
    } else {
      for (const [rowIndex, val] of Object.entries(columnData)) {
        result.$data[columnIndex].$data[rowIndex as unknown as number] =
          val as TDataSource[keyof TDataSource][number];
      }
    }
  }

  return result;
};
