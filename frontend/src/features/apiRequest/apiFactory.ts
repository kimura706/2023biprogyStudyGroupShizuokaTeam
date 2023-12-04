import sampleApi from './sample';
import progressApi from './progress'
import usersApi from './users'

export const apiFactory = {
  //リポジトリを作成したらここに登録
  //左がプロパティ名で右にimportしたものを()付きで書く
  sampleApi: sampleApi(),
  progressApi:progressApi(),
  usersApi:usersApi()
};
