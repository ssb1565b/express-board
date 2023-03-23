// const connection = require('./dbConnect');

// const boardDB = {
//   // 모든 게시물 가져오기
//   getAllArticles: (cb) => {
//     connection.query('SELECT * FROM mydb1.board;', (err, data) => {
//       if (err) throw err;
//       // console.log(data);
//       cb(data);
//     });
//   },

//   // 게시물 작성하기
//   createArticles: (values, cb) => {
//     connection.query(
//       `INSERT INTO mydb1.board (TITLE, CONTENT, USERID) VALUES ('${values.title}', '${values.content}','${values.userId}');`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },

//   // 수정페이지로 이동 : 게시물 한개 가져오기
//   getArticles: (id, cb) => {
//     connection.query(
//       `SELECT * FROM mydb1.board WHERE ID_PK = ${id};`,
//       (err, data) => {
//         if (err) throw err;
//         // console.log(data);
//         cb(data);
//       },
//     );
//   },

//   // 수정하기 : 특정 ID를 가지는 게시글을 수정하는 컨트롤러
//   modifyArticle: (id, modifyArticle, cb) => {
//     connection.query(
//       `UPDATE mydb1.board SET TITLE = '${modifyArticle.title}',CONTENT = '${modifyArticle.content}' WHERE ID_PK = ${id};`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },

//   deleteArticle: (id, cb) => {
//     connection.query(
//       `DELETE FROM mydb1.board WHERE ID_PK = ${id};`,
//       (err, data) => {
//         if (err) throw err;
//         cb(data);
//       },
//     );
//   },
// };

// module.exports = boardDB;

const { ObjectId } = require('mongodb');
const mongoClient = require('./mongoConnect.js');

const UNEXPECTED_MSG = '<br><a href="/">메인페이지로 이동</a>';

const getAllArticles = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    const allArticleCursor = board.find({});
    const ARTICLE = await allArticleCursor.toArray();

    res.render('db_board', {
      ARTICLE,
      articleCounts: ARTICLE.length,
      userId: req.session.userId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

const writeArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');
    // console.log('req.file', req.file);
    const newArticle = {
      USERID: req.session.userId,
      TITLE: req.body.title,
      CONTENT: req.body.content,
      IMAGE: req.file ? req.file.filename : null,
    };
    await board.insertOne(newArticle);
    res.redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

const getArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');

    const selectedArticle = await board.findOne({
      _id: ObjectId(req.params.id),
    });
    res.render('db_board_modify', { selectedArticle });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

const modifyArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');
    console.log('req.file', req.file);

    const modify = {
      TITLE: req.body.title,
      CONTENT: req.body.content,
    };

    if (req.file) modify.IMAGE = req.file.filename;
    await board.updateOne(
      {
        _id: ObjectId(req.params.id),
      },
      {
        $set: modify,
      },
    );
    res.status(200).redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

const deleteArticle = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const board = client.db('kdt5').collection('board');
    await board.deleteOne({ _id: ObjectId(req.params.id) });
    res.status(200).json('삭제성공');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message + UNEXPECTED_MSG);
  }
};

module.exports = {
  getAllArticles,
  writeArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
};
