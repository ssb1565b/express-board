const express = require('express');
const app = express();
const PORT = 4003;

// http://localhost:4003/email/subin@naver.com/password/1111/name/subin/gender/female 이걸로 Postman 확인
app.get(
  '/email/:email/password/:password/name/:name/gender/:gender/',
  (req, res) => {
    res.send(req.params);
  }
);

// http://localhost:4003?email=subin@naver.com&password=1111&name=subin&gender=female 이걸로 Postman 확인
app.get('/', (req, res) => {
  res.send(req.query);
});

app.listen(PORT, () => {
  console.log(`서버 포트는 ${PORT}입니다`);
});
