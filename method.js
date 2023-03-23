// @ts-check

const express = require('express');
// express 를 쓰기위해서는 상위폴더에 Node_modules폴더가 있는지 확인필요

const app = express();
const PORT = 1324;

app.get('/', (req, res) => {
  res.send('GET 메소드');
});

app.post('/', (req, res) => {
  res.send('POST 메소드');
});

app.put('/', (req, res) => {
  res.send('PUT 메소드');
});

app.delete('/', (req, res) => {
  res.send('DELETE 메소드');
});

// 서버 킬떄는 listen
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번에서 실행중입니다!`);
});
