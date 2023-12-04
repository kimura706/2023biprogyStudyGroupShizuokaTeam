import express from 'express';
const router = express.Router();
import {
  getSample1,
  getSample2,
  getProgressList,
  setProgress,
  getUsers
} from '../controllers/apiControllers';
import { catchError } from '../utils/catchError';

router.route('/sample1').get(catchError(getSample1));

router.route('/sample2').get(catchError(getSample2));

router.route('/progress-list').get(catchError(getProgressList));

router.route('/set-progress').post(catchError(setProgress));

router.route('/users').get(catchError(getUsers));

export default router;
