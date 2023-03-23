// 기능을 담당하는 자바스크립트 파일이 들어갈것임
// http://localhost:4000/users

const express = require('express');
const router = express.Router();

const USER = [
  {
    id: 'subin',
    name: '수빈',
    email: 'subinEmail',
  },
  {
    id: 'pororo',
    name: '뽀로로',
    email: 'pororoEmail',
  },
];

router.get('/', (req, res) => {
  // // 이건 이제 http://localhost:4000/users가 이미 붙어있는 상태임
  // //  http://localhost:4000/users === http://127/0/0/1:4000/users
  // res.send(USER);

  res.render('users', { USER, userCount: USER.length });
  // 여기서 값을 전달함
});

router.get('/id/:id', (req, res) => {
  const userData = USER.find((user) => user.id === req.params.id);
  if (userData) {
    res.send(userData);
  } else {
    const err = new Error('ID를 못 찾겠어요');
    err.statusCode = 404;
    throw err;
  }
});

// 서버에 데이터를 변경 삭제하고 싶다면 get이 아닌 다른거 써야함
router.post('/add', (req, res) => {
  if (Object.keys(req.query).length >= 1) {
    if (req.query.email && req.query.name && req.query.id) {
      const newUser = {
        email: req.query.email,
        name: req.query.name,
        id: req.query.id,
      };
      USER.push(newUser);
      res.redirect('/users');
    } else {
      const err = new Error('입력이 잘 못 되었습니다');
      err.statusCode = 400;
      throw err;
    }
  } else if (Object.keys(req.body).length >= 1) {
    if (req.body.email && req.body.name && req.body.id) {
      const newUser = {
        email: req.body.email,
        name: req.body.name,
        id: req.body.id,
      };
      USER.push(newUser);
      res.redirect('/users');
      // get 을 해주면서 /users로 이동 즉 추가된 목록 바로 확인 가능
    } else {
      const err = new Error('폼 태그 입력을 확인하세요');
      err.statusCode = 400;
      throw err;
    }
  } else {
    const err = new Error('데이터가 입력되지 않았습니다.');
    err.statusCode = 400;
    throw err;
  }
});

router.put('/modify/:id', (req, res) => {
  if (req.query.email && req.query.name && req.query.id) {
    const userIndex = USER.findIndex((user) => user.id === req.params.id);
    // findIndex는 찾으면 제로베이스 방식 즉 0부터 읽는 방식으로 index를 리턴하고 못찾으면 -1 를 리턴함

    if (userIndex !== -1) {
      USER[userIndex] = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      res.send('회원 정보 수정 완료!');
    } else {
      const err = new Error('해당 ID 를 가진 회원이 존재하지 않습니다');
      err.statusCode = 400;
      throw err;
    }
  } else {
    const err = new Error('잘못된 쿼리입력!');
    err.statusCode = 400;
    throw err;
  }
});

router.delete('/delete/:id', (req, res) => {
  const userIndex = USER.findIndex((user) => user.id === req.params.id);
  if (userIndex !== -1) {
    USER.splice(userIndex, 1);
    // splice 함수 첫번쨰 인자 시작지점, 두번쨰 인자 얼마나 지울지
    res.send('회원삭제완료');
  } else {
    const err = new Error('해당 ID 를 가진 회원이 존재하지 않습니다');
    err.statusCode = 400;
    throw err;
  }
});

router.get('/show', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.write('<h1>Hello, dynamic web page</h1>');

  for (let i = 0; i < USER.length; i++) {
    res.write(`<h2>USER ID is ${USER[i].id}</h2>`);
    res.write(`<h2>USER NAME is ${USER[i].name}</h2>`);
    res.write(`<h2>USER Email is ${USER[i].email}</h2>`);
  }
  res.end();
});

// 모듈 빼기
module.exports = router;
