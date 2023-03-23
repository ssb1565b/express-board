// 기능을 담당하는 자바스크립트 파일이 들어갈것임
// http://localhost:4000/users

// @ts-check

const express = require('express');
const router = express.Router();

const USER_OBJ = {
  1: {
    email: 'subin',
    name: '수빈',
  },
  2: {
    email: 'users',
    name: '유저1',
  },
};

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

  res.render('users', { USER_ARR: USER, userCount: USER.length });
});

router.get('/id/:id', (req, res) => {
  const userData = USER_OBJ[req.params.id];
  if (userData) {
    res.send(userData);
  } else {
    res.send('ID를 못 찾겠어요');
  }
});

// 서버에 데이터를 변경 삭제하고 싶다면 get이 아닌 다른거 써야함
router.post('/add', (req, res) => {
  // 1. 방법
  // if (req.query.email && req.query.name) {
  //   const newUser = {
  //     email: req.query.email,
  //     name: req.query.name,
  //   };
  //   USER[Object.keys(USER).length + 1] = newUser;
  //   res.send('회원 등록 완료');
  //   console.log(Object.keys(USER));
  //   // USER[1,2,3] >> USER{{1:~},{2:~}} 에서 key를 가져오는것
  //   // USER[3]
  // } else {
  //   res.send('입력이 잘 못 되었습니다');
  // }

  // 2. 1방법 보다 더 단축
  if (!req.query.email || !req.query.name)
    return res.send('입력이 잘 못 되었습니다.');

  const newUser = {
    email: req.query.email,
    name: req.query.name,
  };
  USER_OBJ[Object.keys(USER_OBJ).length + 1] = newUser;
  res.send('회원 등록 완료');
});
router.put('/modify/:id', (req, res) => {
  // 1. 내가 쓴 코드
  // if (!req.query.id || !req.query.name) return res.send('잘못 입력했습니다.');

  // const editUser = {
  //   id: req.query.id,
  //   name: req.query.name,
  // };
  // USER[req.params.id] = editUser;
  // res.send('회원 정보 수정 완료');

  // 1. 강사님 코드
  if (req.query.email && req.query.name) {
    if (req.params.id in USER_OBJ) {
      USER_OBJ[req.params.id] = {
        email: req.query.email,
        name: req.query.name,
      };
      res.send('회원 정보 수정 완료'); // 이게 없으면 계속 pending됨
    } else {
      res.send('해당 ID를 가진 회원이 존재하지 않아요');
    }
  }
});

router.delete('/delete/:id', (req, res) => {
  // 1. 내가 쓴 코드
  // if (!req.params.id) return res.send('잘못 입력했습니다.');
  // delete USER[req.params.id];
  // res.send('회원 정보 삭제');

  // 2. 강사님 코드
  let info = USER_OBJ[req.params.id].name;
  if (req.params.id in USER_OBJ) {
    delete USER_OBJ[req.params.id];
    res.send(`${info} 회원 정보 삭제`);
  } else {
    res.send('해당 ID를 가진 회원이 존재하지 않습니다.');
  }
  console.log(info, USER_OBJ);
});

router.get('/show', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.write('<h1>Hello, dynamic web page</h1>');

  for (let i = 0; i < USER.length; i++) {
    res.write(`<h2>USER ID is ${USER[i].id}</h2>`);
    res.write(`<h2>USER NAME is ${USER[i].name}</h2>`);
  }
  res.end();
});

// router.get('/ejs', (req, res) => {
//   const userCount = USER_ARR.length;
//   res.render('index', { USER_ARR, userCount });
//   // USER_ARR 의 배열과 userCount의 값을 가지고 있음
//   // views라는 폴더의 index.ejs 파일을 그려라! 라는 의미
// });

// 모듈 빼기
module.exports = router;
