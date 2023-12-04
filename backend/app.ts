import express from 'express';
import helmet from 'helmet';

import { ExpressError } from './src/utils/ExpressError';
import { ErrorFormat } from './src/models/formats/errorFormat';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(helmet());

import apiRoutes from './src/routes/apiRoutes';

// Vueのルーティング用
import history from 'connect-history-api-fallback';

//expressにフォームリクエストをPerthするよう依頼
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// APIルーティング
app.use('/api', apiRoutes);

// APIのリクエストに対してルーティングエラー
app.use('/api/*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  next(new ExpressError('APIが見つかりませんでした', 404, 'not_found'));
});

// フロントエンドのルーティング
app.use(history());
app.use('/', express.static(__dirname + '/public/dist'));

// 上記リクエストを抜けた場合エラー
app.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(new ExpressError('ページが見つかりませんでした', 404, 'not_found'));
  });



app.use((err: ExpressError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    let statusCode: number;
    let errorCode: string;
    let message: string;
    if (err instanceof ExpressError) {
      statusCode = err.statusCode;
      errorCode = err.errorCode;
      message = err.message;
    } else {
      statusCode = 503;
      errorCode = 'system_error';
      message = '処理中にシステムエラーが発生しました。';
    }
    const resData: ErrorFormat = {
      error: { message: message, errorCode: errorCode },
    };
    res.status(statusCode).json(resData);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`ポート${port}でリクエスト受付中...`);
});