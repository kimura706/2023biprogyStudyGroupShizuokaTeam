import axios from 'axios';
//Vitestでテストする際には、以下のようにbaseUrlを変更する
// const baseUrl = 'http://localhost:3000/api';
const baseUrl = '/api';

export default axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});
