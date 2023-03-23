const mongoose = require('mongoose');

const { MONGO_DB_URI } = process.env;

const connect = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI, {
      dbName: 'kdt5',
      useNewUrlParser: true, // MONGO_DB_URI 이 uri를 전달해주기 위해 필수적으로 쓰임
    });

    console.log('몽구스 접속 성공');
    mongoose.connection.on('error', (err) => {
      console.error('몽고 디비 연결 에러', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.error('몽고 디비 연결이 끊어졌습니다. 연결을 재시도 합니다!');
      connect();
    });
  } catch (err) {
    console.error(err);
  }
};

connect(); // 여기서 connect를 해준던가,

module.exports = connect;
