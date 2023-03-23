// @ts-check

const express = require('express');

const app = express();
const PORT = 4000;

// 1. 파라미터 여러개 받기
// // :id는 localhost:4000/ 뒤에 오는 Parmas를 id로 받겠다 라는 의미
// //  이건 express가 제공하는 라우팅기능임
// app.get('/:id/:name/:gender', (req, res) => {
app.get('/id/:id/', (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

app.get('/', (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

// 2. 좀더 명확하게 선언하고 싶다면 key,value값 처럼 /api/:api 이렇게 작성해주기
app.get('/api', (req, res) => {
  console.log(req.params);
  res.send('api이 요청이 접수되었습니다.');
});

app.listen(PORT, () => {
  console.log(PORT);
});
