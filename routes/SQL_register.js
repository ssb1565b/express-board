const express = require('express');
const userDB = require('../controllers/userControllers.js');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  userDB.userCheck(req.body.id, (data) => {
    if (data.length === 0) {
      userDB.registerUser(req.body, (data) => {
        if (data.affectedRows >= 1) {
          res
            .status(200)
            .send('회원가입성공 <br> <a href="/login">로그인으로 이동</a>');
          // res.send 데이터를 그대로 보내줄때 씀
        } else {
          res
            .status(500)
            .send(
              '회원가입 실패! 관리자에게 문의 바랍니다. <br> <a href="/register">회원가입으로 이동</a>',
            );
        }
      });
    } else {
      res
        .status(400)
        .send(
          '회원가입 실패! 동일한 ID를 가진 회원이 존재합니다 <br><a href="/register">회원가입으로 이동</a>',
        );
    }
  });
});

module.exports = router;
