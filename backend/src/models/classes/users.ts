import {
  ReqProgressFormat
} from '../formats/progressFormat'
import sql from 'mssql';
import { sqlConfig } from '../../utils/databaseTransactionUtils';
import { TYPES } from 'mssql';



class Users {
  /**
   * ユーザークラス
   * @param {string} userId
   */
  async selectUsers() {
    // コネクションプールでDB接続
    const pool = new sql.ConnectionPool(sqlConfig);
    await pool.connect();

    try {
      // ユーザー一覧取得のクエリ生成
      const { query: query1 } = this.#makeGetUsersQuery();

      // ユーザー一覧取得
      const request1 = new sql.Request(pool);

      const users = await request1.query(query1).catch((err) => {
        throw err;
      });

      return users.recordset;
    } finally {
      // DB切断
      pool.close();
    }
  }

  


  /**
   * ユーザー一覧を取得するためのクエリとパラメータを生成
   * @return {query:string,params:{}[]} query:実行するクエリ、params:クエリ内パラメーター
   */
  #makeGetUsersQuery() {
    let sql = '';
    sql += ' SELECT ';
    sql += ' 	* ';
    sql += ' 	FROM dbo.users ';
    return { query: sql };
  }

  
  
}
export { Users };
