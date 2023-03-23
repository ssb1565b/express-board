const express = require('express');
// const userDB = require('../controllers/userControllers.js');

const { registerUser } = require('../controllers/userControllers');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', registerUser);

// router.post('/', async (req, res) => {
//   const duplicatedUser = await userDB.userCheck(req.body.id);
//   if (!duplicatedUser) {
//     const registerResult = await userDB.registerUser(req.body);
//     if (registerResult) {
//       res
//         .status(200)
//         .send('회원가입성공 <br> <a href="/login">로그인으로 이동</a>');
//     } else {
//       res
//         .status(500)
//         .send(
//           '회원가입 실패! 관리자에게 문의 바랍니다. <br> <a href="/register">회원가입으로 이동</a>',
//         );
//     }
//   } else {
//     res
//       .status(400)
//       .send(
//         '회원가입 실패! 동일한 ID를 가진 회원이 존재합니다 <br><a href="/register">회원가입으로 이동</a>',
//       );
//   }
// });

module.exports = router;
