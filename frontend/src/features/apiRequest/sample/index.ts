
import RequestBase from '@/lib/axios/apiRequestBase';

export default () => ({
  /**
   * sample1
   * @params params APIにリクエストするパラメータ
   * @returns APIリクエスト後のPromise
   */
  sample1() {
    return RequestBase.get('/sample1', {});
  },

  /**
   * sample2
   * @params params APIにリクエストするパラメータ
   * @returns APIリクエスト後のPromise
   */
  sample2() {
    return RequestBase.get('/sample2', {});
  },
});
