//DB 통신용 컨트롤러 작성
// 컨트롤러를 라우터 만들듯이 만들어주면됨
// mydb1 스키마까지 접속된 상태임
const connection = require('./dbConnect');

const userDB = {
  getUsers: (callback) => {
    connection.query('SELECT * FROM mydb1.user;', (err, data) => {
      // 모든 데이터를 조회해주세요라는 쿼리문
      if (err) throw err;
      // 에러발생하면 냅다 던지기 >> 에러가 있으면 app.js 의 에러핸들링이 실행 될것임
      // console.log(data);
      callback(data);
    });
  },

  userCheck: (userId, cb) => {
    connection.query(
      `SELECT * FROM mydb1.user WHERE USERID = '${userId}';`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },

  registerUser: (newUser, cb) => {
    connection.query(
      `INSERT INTO mydb1.user (USERID, PASSWORD) values ('${newUser.id}','${newUser.password}');`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
};

module.exports = userDB;
