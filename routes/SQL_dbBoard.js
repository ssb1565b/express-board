const express = require('express');
const boardDB = require('../controllers/boardController');

const router = express.Router();

//로그인 확인용 미들웨어
function isLogin(req, res, next) {
  console.log(req.session.isLogin, '/', req.signedCookies.user);
  if (req.session.isLogin || req.signedCookies.user) {
    next();
  } else {
    res
      .status(400)
      .send('로그인 해주세요 <br/><a href="/login">로그인으로 이동</a>');
  }
}

// 게시글 전체 보기
router.get('/getAll', isLogin, (req, res) => {
  boardDB.getAllArticles((data) => {
    res.send(data);
  });
});

//게시판 호출
router.get('/', isLogin, (req, res) => {
  boardDB.getAllArticles((data) => {
    const ARTICLE = data;
    const articleCounts = ARTICLE.length;
    const { userId } = req.session;
    // console.log(data, '/', userId, '/', req.session);

    res.render('db_board', { ARTICLE, articleCounts, userId });
  });
});

// 글쓰기 페이지 호출
router.get('/write', isLogin, (req, res) => {
  res.render('db_board_write');
});

// 호출된 글쓰기 페이지에서 게시글 추가
router.post('/write', isLogin, (req, res) => {
  // USERID >> req.session.userId
  if (req.body.title && req.body.content) {
    const newArticle = {
      userId: req.session.userId,
      title: req.body.title,
      content: req.body.content,
      date: req.body.register_date,
    };
    boardDB.createArticles(newArticle, (data) => {
      if (data.affectedRows >= 1) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('글쓰기 실패');
        err.statusCode = 500;
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 없습니다');
    err.statusCode = 400;
    throw err;
  }
});

// 게시글 수정 페이지 호출
router.get('/modify/:id', isLogin, (req, res) => {
  boardDB.getArticles(req.params.id, (data) => {
    if (data.length > 0) {
      res.render('db_board_modify', { selectedArticle: data[0] });
    } else {
      const err = new Error('해당 ID값을 가지는 게시글이 없습니다');
      err.statusCode = 500;
      throw err;
    }
  });
});

// 호출된 게시글 수정페이지에서 수정
router.post('/modify/:id', isLogin, (req, res) => {
  if (req.body.title && req.body.content) {
    boardDB.modifyArticle(req.params.id, req.body, (data) => {
      if (data.affectedRows >= 1) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('글 수정 실패');
        err.statusCode = 500;
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 없습니다.');
    err.statusCode = 400;
    throw err;
  }
});

// 게시글 삭제
router.delete('/delete/:id', isLogin, (req, res) => {
  if (req.params.id) {
    boardDB.deleteArticle(req.params.id, (data) => {
      if (data.affectedRows >= 1) {
        //update, delete 는 data.affectedRows로 삭제/수정 여부를 판단할 수 있음
        res.status(200).send('삭제성공');
        // res.redirect('/dbBoard'); 얘는 get, post 일때만 먹음
      } else {
        const err = new Error('글 삭제 서버 실패');
        err.statusCode = 500;
        throw err;
      }
    });
  } else {
    const err = new Error('글 삭제 실패');
    err.statusCode = 400;
    throw err;
  }
});

module.exports = router;
