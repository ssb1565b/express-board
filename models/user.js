const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true, // 필수값 옵션
      unique: true, // unique 값
    },
    password: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'mongoose-user', // 테이블 명 짓기
  },
);

module.exports = mongoose.model('User', userSchema); // 밖에서 사용할때는 User라고 할것이다. // 이문법은 mongoose에서 지원
