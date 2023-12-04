

import RequestBase from '@/lib/axios/apiRequestBase';

export default () => ({
  /**
   * ユーザー一覧取得
   * @params params APIにリクエストするパラメータ
   * @returns APIリクエスト後のPromise
   */
  users() {
    return RequestBase.get('/users', {});
  },



});
