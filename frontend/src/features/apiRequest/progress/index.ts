import type { UpdateProgressParam } from './progress.d';

import RequestBase from '@/lib/axios/apiRequestBase';

export default () => ({
  /**
   * 進捗一覧取得
   * @params params APIにリクエストするパラメータ
   * @returns APIリクエスト後のPromise
   */
  progressList() {
    return RequestBase.get('/progress-list', {});
  },


  /**
   * 進捗を更新
   * @param param APIにリクエストするパラメータ
   * @returns APIリクエスト後のPromise
   */
  changeProgress(param: UpdateProgressParam) {
    return RequestBase.post('/set-progress', {
      ...param,
    });
  },

});
