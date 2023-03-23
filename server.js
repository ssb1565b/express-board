// @ts-check

const express = require('express');

const server = express();

const PORT = 4001;

// http://localhost:4001/api로 하려면 밑에를 server.use('/api',~~ 이런식으로 작성해야함
server.use('/', (request, response, next) => {
  console.log('미들웨어 1');
  // response.send('응답 종료');
  request.reqTime = new Date();
  next();
});
// request,response,  next에서 next는 다음 미들웨어

server.use((request, response, next) => {
  console.log('미들웨어 2');
  response.send(`요청 시간은 ${request.reqTime}입니다`);
  // next();
  // console.log('next 아래 있는 콘솔');
});

server.use((request, response, next) => {
  console.log('미들웨어 3');
});

server.listen(PORT, () => {
  console.log(`익스프레스 서버는 ${PORT}번 포트에서 작동 중입니다!`);
});
