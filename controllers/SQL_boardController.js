const connection = require('./dbConnect');

const boardDB = {
  // 모든 게시물 가져오기
  getAllArticles: (cb) => {
    connection.query('SELECT * FROM mydb1.board;', (err, data) => {
      if (err) throw err;
      // console.log(data);
      cb(data);
    });
  },

  // 게시물 작성하기
  createArticles: (values, cb) => {
    connection.query(
      `INSERT INTO mydb1.board (TITLE, CONTENT, USERID) VALUES ('${values.title}', '${values.content}','${values.userId}');`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },

  // 수정페이지로 이동 : 게시물 한개 가져오기
  getArticles: (id, cb) => {
    connection.query(
      `SELECT * FROM mydb1.board WHERE ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        // console.log(data);
        cb(data);
      },
    );
  },

  // 수정하기 : 특정 ID를 가지는 게시글을 수정하는 컨트롤러
  modifyArticle: (id, modifyArticle, cb) => {
    connection.query(
      `UPDATE mydb1.board SET TITLE = '${modifyArticle.title}',CONTENT = '${modifyArticle.content}' WHERE ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },

  deleteArticle: (id, cb) => {
    connection.query(
      `DELETE FROM mydb1.board WHERE ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
};

module.exports = boardDB;
