const express = require('express');
// const boardDB = require('../controllers/boardController');
const {
  getAllArticles,
  writeArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
} = require('../controllers/boardController');

const multer = require('multer');
const fs = require('fs');

const router = express.Router();

// 파일 업로드 설정
const dir = './uploads'; // node.js가 하는것이므로 상대경로로 작성해줘야함
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now());
  },
});
const limits = {
  fileSize: 1024 * 1024 * 2,
};

const upload = multer({ storage, limits });

if (!fs.existsSync(dir)) fs.mkdirSync(dir);

// 특정폴더가 존재하는지 확인하는것
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

// // 게시글 전체 보기
// router.get('/getAll', isLogin, (req, res) => {
//   boardDB.getAllArticles((data) => {
//     res.send(data);
//   });
// });

// 게시판 호출 리팩토링
router.get('/', isLogin, getAllArticles);

// 글쓰기 모드로 이동
router.get('/write', (req, res) => {
  res.render('db_board_write');
});

// 글 쓰기
router.post('/write', isLogin, upload.single('img'), writeArticle);

// 글 수정 모드로 이동
router.get('/modify/:id', isLogin, getArticle);

// 글 수정하기
router.post('/modify/:id', isLogin, upload.single('img'), modifyArticle);

// 글 삭제하기
router.delete('/delete/:id', isLogin, deleteArticle);

// // //게시판 호출
// // router.get('/', isLogin, (req, res) => {
// //   boardDB.getAllArticles((data) => {
// //     const ARTICLE = data;
// //     const articleCounts = ARTICLE.length;
// //     const { userId } = req.session;
// //     // console.log(data, '/', userId, '/', req.session);

// //     res.render('db_board', { ARTICLE, articleCounts, userId });
// //   });
// // });

// // 글쓰기 페이지 호출
// router.get('/write', isLogin, (req, res) => {
//   res.render('db_board_write');
// });

// // 호출된 글쓰기 페이지에서 게시글 추가
// router.post('/write', isLogin, (req, res) => {
//   // USERID >> req.session.userId
//   if (req.body.title && req.body.content) {
//     const newArticle = {
//       userId: req.session.userId,
//       title: req.body.title,
//       content: req.body.content,
//       date: req.body.register_date,
//     };
//     boardDB.createArticles(newArticle, (data) => {
//       if (data.affectedRows >= 1) {
//         res.redirect('/dbBoard');
//       } else {
//         const err = new Error('글쓰기 실패');
//         err.statusCode = 500;
//         throw err;
//       }
//     });
//   } else {
//     const err = new Error('글 제목 또는 내용이 없습니다');
//     err.statusCode = 400;
//     throw err;
//   }
// });

// // 게시글 수정 페이지 호출
// router.get('/modify/:id', isLogin, (req, res) => {
//   boardDB.getArticles(req.params.id, (data) => {
//     if (data.length > 0) {
//       res.render('db_board_modify', { selectedArticle: data[0] });
//     } else {
//       const err = new Error('해당 ID값을 가지는 게시글이 없습니다');
//       err.statusCode = 500;
//       throw err;
//     }
//   });
// });

// // 호출된 게시글 수정페이지에서 수정
// router.post('/modify/:id', isLogin, (req, res) => {
//   if (req.body.title && req.body.content) {
//     boardDB.modifyArticle(req.params.id, req.body, (data) => {
//       if (data.affectedRows >= 1) {
//         res.redirect('/dbBoard');
//       } else {
//         const err = new Error('글 수정 실패');
//         err.statusCode = 500;
//         throw err;
//       }
//     });
//   } else {
//     const err = new Error('글 제목 또는 내용이 없습니다.');
//     err.statusCode = 400;
//     throw err;
//   }
// });

// // 게시글 삭제
// router.delete('/delete/:id', isLogin, (req, res) => {
//   if (req.params.id) {
//     boardDB.deleteArticle(req.params.id, (data) => {
//       if (data.affectedRows >= 1) {
//         //update, delete 는 data.affectedRows로 삭제/수정 여부를 판단할 수 있음
//         res.status(200).send('삭제성공');
//         // res.redirect('/dbBoard'); 얘는 get, post 일때만 먹음
//       } else {
//         const err = new Error('글 삭제 서버 실패');
//         err.statusCode = 500;
//         throw err;
//       }
//     });
//   } else {
//     const err = new Error('글 삭제 실패');
//     err.statusCode = 400;
//     throw err;
//   }
// });

module.exports = router;
