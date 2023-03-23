const express = require('express');
const boardDB = require('../controllers/boardController');
const userDB = require('../controllers/userControllers');

const router = express.Router();

// 게시판 페이지 호출
router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  userDB.userCheck(req.body.id, (data) => {
    if (data.length === 1) {
      if (data[0].PASSWORD === req.body.password) {
        // 벡엔드 세션 생성
        req.session.isLogin = true;
        req.session.userId = req.body.id;

        //로그인 쿠키발행
        res.cookie('user', req.body.id, {
          maxAge: 1000 * 10,
          httpOnly: true,
          signed: true,
        });

        res.status(200).redirect('/dbBoard');
      } else {
        res
          .status(400)
          .send(
            '비밀번호가 다릅니다. <br/><a href="/login">로그인으로 이동</a>',
          );
      }
    } else {
      res
        .status(400)
        .send(
          '해당 ID가 존재하지 않습니다! <br/><a href="/register">회원가입으로 이동</a>',
        );
      // /login처럼 /가 있으면 root 뒤에 login이 붙어짐..
      //  /가 없이 login이면 그냥 이 파일이 불러와진 현재 주소에 그대로 login이 붙여짐
    }
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie('user');
    res.redirect('/login');
  });
});

module.exports = router;
