import sql from 'mssql';

// 接続情報
const sqlConfig: sql.config = {
  user: process.env.DB_SERVER_LOGIN_USER,
  password: process.env.DB_SERVER_PASSWORD,
  database: process.env.DB_SERVER_DB_NAME,
  server: process.env.DB_SERVER_NAME || 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false, // change to true for local dev / self-signed certs
  },
};

export { sqlConfig };
