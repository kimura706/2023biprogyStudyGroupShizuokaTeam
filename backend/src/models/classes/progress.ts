import {
  ReqProgressFormat
} from '../formats/progressFormat'
import sql from 'mssql';
import { sqlConfig } from '../../utils/databaseTransactionUtils';
import { TYPES } from 'mssql';



class Progress {
  /**
   * 品目クラス
   * @param {string} userId
   */
  async selectProgressList() {
    // コネクションプールでDB接続
    const pool = new sql.ConnectionPool(sqlConfig);
    await pool.connect();

    try {
      // 進捗一覧取得のクエリ生成
      const { query: query1 } = this.#makeGetProgressListQuery();

      // 進捗一覧取得
      const request1 = new sql.Request(pool);

      const progressList = await request1.query(query1).catch((err) => {
        throw err;
      });

      return progressList.recordset;
    } finally {
      // DB切断
      pool.close();
    }
  }

  

  

  async updateProgress(reqProgress: ReqProgressFormat) {
    // コネクションプールでDB接続
    const pool = new sql.ConnectionPool(sqlConfig);
    await pool.connect();

    // トランザクション
    const transaction = new sql.Transaction(pool);
    await transaction.begin(sql.ISOLATION_LEVEL.READ_COMMITTED);

    try {
      // 品目更新のクエリ生成
      const { query: query1, params: params1 } = this.#makeChangeProgressQueryAndParams(reqProgress);

      // 品目更新
      const request1 = new sql.Request(transaction);
      for (const param of params1) {
        request1.input(param.name, param.type, param.value);
      }
      await request1.query(query1).catch((err) => {
        throw err;
      });

      // コミット
      await transaction.commit();
    } catch (err) {
      // ロールバック
      transaction.rollback();
      throw err;
    } finally {
      // DB切断
      pool.close();
    }
  }

  /**
   * 進捗一覧を取得するためのクエリとパラメータを生成
   * @return {query:string,params:{}[]} query:実行するクエリ、params:クエリ内パラメーター
   */
  #makeGetProgressListQuery() {
    let sql = '';
    sql += ' SELECT ';
    sql += ' 	* ';
    sql += ' 	FROM dbo.UserProgress ';
    return { query: sql };
  }

  
  /**
   * 進捗情報を更新するためのクエリとパラメータを生成
   * @param {ReqProgressFormat} changeProgressInfo - 進捗情報のオブジェクト
   * @return {query:string,params:{}[]} query:実行するクエリ、params:クエリ内パラメーター
   */
  #makeChangeProgressQueryAndParams(changeProgressInfo: ReqProgressFormat) {
    let sql = '';
    sql += ' UPDATE dbo.UserProgress SET ';
    sql += ' 	UserID = @UserID, ';
    sql += ' 	Progress1 = @Progress1, ';
    sql += ' 	Progress2 = @Progress2, ';
    sql += ' 	Progress3 = @Progress3, ';
    sql += ' 	Progress4 = @Progress4, ';
    sql += ' 	Progress5 = @Progress5, ';
    sql += ' 	Progress6 = @Progress6, ';
    sql += ' 	Progress7 = @Progress7, ';
    sql += ' 	Progress8 = @Progress8, ';
    sql += ' 	Progress9 = @Progress9, ';
    sql += ' 	Progress10 = @Progress10, ';
    sql += ' 	Progress11 = @Progress11, ';
    sql += ' 	Progress12 = @Progress12, ';
    sql += ' 	Progress13 = @Progress13, ';
    sql += ' 	Progress14 = @Progress14, ';
    sql += ' 	Progress15 = @Progress15, ';
    sql += ' 	Progress16 = @Progress16, ';
    sql += ' 	Progress17 = @Progress17, ';
    sql += ' 	Progress18 = @Progress18, ';
    sql += ' 	Progress19 = @Progress19, ';
    sql += ' 	Progress20 = @Progress20, ';
    sql += ' 	Progress21 = @Progress21, ';
    sql += ' 	Progress22 = @Progress22, ';
    sql += ' 	Progress23 = @Progress23, ';
    sql += ' 	Progress24 = @Progress24, ';
    sql += ' 	Progress25 = @Progress25, ';
    sql += ' 	Progress26 = @Progress26 ';
    sql += ' WHERE';
    sql += '  UserID = @UserID';

    const progressParams: {
      name: string;
      type: sql.ISqlTypeFactoryWithNoParams;
      value: unknown;
    }[] = [];
    progressParams.push(
      {
        name: 'UserID',
        type: TYPES.Char,
        value: changeProgressInfo.userId,
      },
      {
        name: 'Progress1',
        type: TYPES.Bit,
        value: changeProgressInfo.progress1,
      },
      {
        name: 'Progress2',
        type: TYPES.Bit,
        value: changeProgressInfo.progress2,
      },
      {
        name: 'Progress3',
        type: TYPES.Bit,
        value: changeProgressInfo.progress3,
      },
      {
        name: 'Progress4',
        type: TYPES.Bit,
        value: changeProgressInfo.progress4,
      },
      {
        name: 'Progress5',
        type: TYPES.Bit,
        value: changeProgressInfo.progress5,
      },
      {
        name: 'Progress6',
        type: TYPES.Bit,
        value: changeProgressInfo.progress6,
      },
      {
        name: 'Progress7',
        type: TYPES.Bit,
        value: changeProgressInfo.progress7,
      },
      {
        name: 'Progress8',
        type: TYPES.Bit,
        value: changeProgressInfo.progress8,
      },
      {
        name: 'Progress9',
        type: TYPES.Bit,
        value: changeProgressInfo.progress9,
      },
      {
        name: 'Progress10',
        type: TYPES.Bit,
        value: changeProgressInfo.progress10,
      },
      {
        name: 'Progress11',
        type: TYPES.Bit,
        value: changeProgressInfo.progress11,
      },
      {
        name: 'Progress12',
        type: TYPES.Bit,
        value: changeProgressInfo.progress12,
      },
      {
        name: 'Progress13',
        type: TYPES.Bit,
        value: changeProgressInfo.progress13,
      },
      {
        name: 'Progress14',
        type: TYPES.Bit,
        value: changeProgressInfo.progress14,
      },
      {
        name: 'Progress15',
        type: TYPES.Bit,
        value: changeProgressInfo.progress15,
      },
      {
        name: 'Progress16',
        type: TYPES.Bit,
        value: changeProgressInfo.progress16,
      },
      {
        name: 'Progress17',
        type: TYPES.Bit,
        value: changeProgressInfo.progress17,
      },
      {
        name: 'Progress18',
        type: TYPES.Bit,
        value: changeProgressInfo.progress18,
      },
      {
        name: 'Progress19',
        type: TYPES.Bit,
        value: changeProgressInfo.progress19,
      },
      {
        name: 'Progress20',
        type: TYPES.Bit,
        value: changeProgressInfo.progress20,
      },
      {
        name: 'Progress21',
        type: TYPES.Bit,
        value: changeProgressInfo.progress21,
      },
      {
        name: 'Progress22',
        type: TYPES.Bit,
        value: changeProgressInfo.progress22,
      },
      {
        name: 'Progress23',
        type: TYPES.Bit,
        value: changeProgressInfo.progress23,
      },
      {
        name: 'Progress24',
        type: TYPES.Bit,
        value: changeProgressInfo.progress24,
      },
      {
        name: 'Progress25',
        type: TYPES.Bit,
        value: changeProgressInfo.progress25,
      },
      {
        name: 'Progress26',
        type: TYPES.Bit,
        value: changeProgressInfo.progress26,
      },
      
    );

    return { query: sql, params: progressParams };
  }
}
export { Progress };
