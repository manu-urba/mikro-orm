import { AbstractSqlConnection } from './AbstractSqlConnection';

export class PostgreSqlConnection extends AbstractSqlConnection {

  async connect(): Promise<void> {
    this.client = this.createKnexClient('pg');
  }

  getDefaultClientUrl(): string {
    return 'postgresql://postgres@127.0.0.1:5432';
  }

  protected transformRawResult<T>(res: any, method: 'all' | 'get' | 'run'): T {
    if (method === 'get') {
      return res.rows[0];
    }

    if (method === 'all') {
      return res.rows;
    }

    return {
      affectedRows: res.rowCount,
      insertId: res.rows[0] ? res.rows[0].id : 0,
      row: res.rows[0],
    } as unknown as T;
  }

}
