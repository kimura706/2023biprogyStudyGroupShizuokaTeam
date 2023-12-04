import e, * as Express from 'express';
import { Progress } from '../models/classes/progress';
import { Users } from '../models/classes/users';
import{ReqProgressFormat}from '../models/formats/progressFormat'
const progress = new Progress();
const users = new Users();
/**
 * APIサンプル１
*/
const getSample1 = async (req: Express.Request, res: Express.Response) => {
  const resData = {text:'hello1'};
  res.json(resData);
};

/**
 * APIサンプル２
 */
const getSample2 = async (req: Express.Request, res: Express.Response) => {
  const resData = {text:'hello2'};
  res.json(resData);
};

/**
 * 進捗状況取得
 */
const getProgressList = async (req: Express.Request, res: Express.Response) => {
  const resData = await progress.selectProgressList();
  res.json(resData);
};

/**
 * 進捗状況更新
 * */
const setProgress = async (req: Express.Request, res: Express.Response) => {
  // 入力チェック validation
  // const validateResData: ResValidateItemErrorFormat = await validateItem(req.body, false);
  // if (validateResData.count >= 1) {
  //   res.status(400).json(validateResData);
  //   return;
  // }
  const reqProgress: ReqProgressFormat = {
    userId: req.body.UserID,
    progress1: req.body.Progress1,
    progress2: req.body.Progress2,
    progress3: req.body.Progress3,
    progress4: req.body.Progress4,
    progress5: req.body.Progress5,
    progress6: req.body.Progress6,
    progress7: req.body.Progress7,
    progress8: req.body.Progress8,
    progress9: req.body.Progress9,
    progress10: req.body.Progress10,
    progress11: req.body.Progress11,
    progress12: req.body.Progress12,
    progress13: req.body.Progress13,
    progress14: req.body.Progress14,
    progress15: req.body.Progress15,
    progress16: req.body.Progress16,
    progress17: req.body.Progress17,
    progress18: req.body.Progress18,
    progress19: req.body.Progress19,
    progress20: req.body.Progress20,
    progress21: req.body.Progress21,
    progress22: req.body.Progress22,
    progress23: req.body.Progress23,
    progress24: req.body.Progress24,
    progress25: req.body.Progress25,
    progress26: req.body.Progress26,
  };
  await progress.updateProgress(reqProgress);
  const resData = await progress.selectProgressList();
  res.json(resData);
};

/**
 * 進捗状況取得
 */
const getUsers = async (req: Express.Request, res: Express.Response) => {
  const resData = await users.selectUsers();
  res.json(resData);
};

export {
  getSample1,
  getSample2,
  getProgressList,
  setProgress,
  getUsers
};
