// @ts-check
// @ts-check

const express = require('express');
const fs = require('fs').promises;

const server = express();

const PORT = 4001;

server.use('/', async (req, res, next) => {
  console.log('미들웨어 1');
  req.reqTime = new Date();
  req.fileContent = await fs.readFile('../package.json', 'utf-8');
  next();
});
// request,response,  next에서 next는 다음 미들웨어

server.use((req, res, next) => {
  console.log('미들웨어 2');
  console.log(`데이터 요청시간은 ${req.reqTime}입니다.`);
  console.log(`package.json 파일의 내용은 \n ${req.fileContent}`);
  res.send(req.fileContent);
});

server.listen(PORT, () => {
  console.log(`익스프레스 서버는 ${PORT}번 포트에서 작동 중입니다!`);
});
