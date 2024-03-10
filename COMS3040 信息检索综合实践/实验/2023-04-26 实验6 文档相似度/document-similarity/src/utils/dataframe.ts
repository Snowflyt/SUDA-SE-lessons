import fs from 'node:fs/promises';

import * as R from 'ramda';

export interface DataFrame<T> {
  readonly columns: string[];
  readonly rows: string[];

  get(row: string | number, column: string | number): T;
  getRow(row: string | number): T[];
  getColumn(column: string | number): T[];

  set(row: string | number, column: string | number, value: T): void;
  setRow(row: string | number, values: T[]): void;
  setColumn(column: string | number, values: T[]): void;

  copy(): DataFrame<T>;

  [Symbol.toStringTag]: 'DataFrame';
  toString(options?: {
    limit?: number;
    headerWidth?: number;
    columnWidth?: number;
  }): string;

  saveToFile(pathname: string): Promise<void>;
}

export interface CreateDataFrameOptions {
  columns?: string[];
  rows?: string[];
}

export const createDataFrame = <T>(
  matrix: T[][],
  { columns, rows }: CreateDataFrameOptions = {},
): DataFrame<T> => {
  if (columns && R.uniq(columns).length !== columns.length)
    throw new Error('Columns must be unique');
  if (rows && R.uniq(rows).length !== rows.length)
    throw new Error('Rows must be unique');

  if (columns && matrix.length > 0 && columns.length !== matrix[0].length)
    throw new Error('Column length must match matrix column length');
  if (rows && rows.length !== matrix.length)
    throw new Error('Row length must match matrix row length');

  const _matrix = matrix.map((row) => [...row]);
  const _columns =
    columns !== undefined
      ? [...columns]
      : R.range(0, matrix.length > 0 ? matrix[0].length : 0).map(String);
  const _rows =
    rows !== undefined ? [...rows] : R.range(0, matrix.length).map(String);

  const colName2colIndex: Record<string, number> = R.fromPairs(
    _columns.map((col, i) => [col, i]),
  );
  const rowName2rowIndex: Record<string, number> = R.fromPairs(
    _rows.map((row, i) => [row, i]),
  );

  return {
    get columns() {
      return [..._columns];
    },
    get rows() {
      return [..._rows];
    },

    get(row, column) {
      return _matrix[typeof row === 'string' ? rowName2rowIndex[row] : row][
        typeof column === 'string' ? colName2colIndex[column] : column
      ];
    },
    getRow(row) {
      return _matrix[typeof row === 'string' ? rowName2rowIndex[row] : row];
    },
    getColumn(column) {
      return _matrix.map((row) =>
        typeof column === 'string'
          ? row[colName2colIndex[column]]
          : row[column],
      );
    },

    set(row, column, value) {
      _matrix[typeof row === 'string' ? rowName2rowIndex[row] : row][
        typeof column === 'string' ? colName2colIndex[column] : column
      ] = value;
    },
    setRow(row, values) {
      if (values.length !== _columns.length)
        throw new Error('Row length must match column length');
      _matrix[typeof row === 'string' ? rowName2rowIndex[row] : row] = values;
    },
    setColumn(column, values) {
      if (values.length !== _rows.length)
        throw new Error('Column length must match row length');
      _matrix.forEach((row, i) => {
        row[typeof column === 'string' ? colName2colIndex[column] : column] =
          values[i];
      });
    },

    copy() {
      return createDataFrame<T>(_matrix, { columns: _columns, rows: _rows });
    },

    [Symbol.toStringTag]: 'DataFrame',
    toString({ columnWidth = 10, headerWidth = 20, limit } = {}) {
      let result = '';

      result += ' '.repeat(headerWidth);
      if (_columns) {
        result += _columns.map((col) => col.padStart(columnWidth)).join('');
      } else {
        result += R.range(0, _matrix[0].length)
          .map((col) => col.toString().padStart(columnWidth))
          .join('');
      }
      result += '\n';

      for (const [row, vector] of _matrix.entries()) {
        if (limit && row >= limit) break;

        if (_rows) {
          result += _rows[row].padEnd(headerWidth);
          result += vector
            .map((val) =>
              (typeof val === 'number' ? val.toFixed(4) : String(val)).padStart(
                columnWidth,
              ),
            )
            .join('');
        } else {
          result += row.toString().padStart(headerWidth - 1);
          result += vector
            .map((val) =>
              (typeof val === 'number' ? val.toFixed(4) : String(val)).padStart(
                columnWidth,
              ),
            )
            .join('');
        }
        result += '\n';
      }

      if (limit && _matrix.length > limit) {
        result += `... ${_matrix.length - limit} more rows`;
      }

      return result;
    },

    async saveToFile(pathname) {
      let content = ',' + _columns.join(',') + '\n';
      for (const [row, vector] of _matrix.entries()) {
        content += _rows[row] + ',' + vector.join(',') + '\n';
      }
      await fs.writeFile(pathname, content);
    },
  };
};

export const readDataFrame = async <T extends number | string>(
  pathname: string,
): Promise<DataFrame<T>> => {
  const content = await fs.readFile(pathname, 'utf8');
  const lines = content.split('\n').filter((line) => line.length > 0);

  const columns = lines[0].split(',').slice(1);
  const rows = lines.slice(1).map((line) => line.split(',')[0]);

  const matrix = lines.slice(1).map((line) =>
    line
      .split(',')
      .slice(1)
      .map((val) => (/^\d+(\.\d+)?$/.test(val) ? Number(val) : val)),
  ) as unknown as T[][];

  return createDataFrame<T>(matrix, { columns, rows });
};
