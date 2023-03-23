const mongoClient = require('./mongoConnect');

const UNEXPECTED_MSG =
  '알 수 없는 문제 발생<br><a href="/register">회원가입으로 이동</a>';
const DUPLICATED_MSG =
  '동일한 ID를 가지는 회원이 존재합니다.<br><a href="/login">로그인으로 이동</a><br><a href="/register">회원가입으로 이동</a>';
const SUCCESS_MSG =
  '회원가입이 완료되었습니다 <br><a href="/login">로그인으로 이동</a>';

const LOGIN_WRONG_MSG =
  '해당 ID를 가진 계정이 없습니다.<br><a href="/register">회원가입으로 이동</a>';

const LOGIN_WRONG_PASSWORD_MSG =
  '해당 비밀번호를 가진 계정이 없습니다.<br>><a href="/login">로그인으로 이동</a>';

const registerUser = async (req, res) => {
  // req, res는 전역객체
  try {
    const client = await mongoClient.connect();
    const user = client.db('kdt5').collection('user');
    // 얘는 시간 오래걸리는 작업이 아님

    const duplicatedUser = await user.findOne({ id: req.body.id });
    if (duplicatedUser) return res.status(400).send(DUPLICATED_MSG);

    await user.insertOne(req.body);
    res.status(200).send(SUCCESS_MSG);
  } catch (err) {
    console.error(err);
    res.status(500).send(UNEXPECTED_MSG);
  }
};

const loginUser = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const user = client.db('kdt5').collection('user');

    const duplicatedUser = await user.findOne({ id: req.body.id });
    if (!duplicatedUser) return res.status(400).send(LOGIN_WRONG_MSG);

    if (duplicatedUser.password !== req.body.password)
      return res.status(400).send(LOGIN_WRONG_PASSWORD_MSG);

    req.session.isLogin = true;
    req.session.userId = req.body.id;

    //로그인 쿠키발행
    res.cookie('user', req.body.id, {
      maxAge: 1000 * 20,
      httpOnly: true,
      signed: true,
    });

    res.status(200).redirect('/dbBoard');
  } catch (err) {
    console.error(err);
    res.status(500).send(UNEXPECTED_MSG);
  }
};

module.exports = {
  registerUser,
  loginUser,
};

// const userDB = {
//   userCheck: async (userId) => {
//     try {
//       const client = await mongoClient.connect();
//       const user = await client.db('kdt5').collection('user');
//       const findUser = await user.findOne({ id: userId });
//       return findUser;
//     } catch (err) {
//       return err;
//     }
//   },

//   registerUser: async (newUser) => {
//     try {
//       const client = await mongoClient.connect();
//       const user = await client.db('kdt5').collection('user');
//       await user.insertOne(newUser);
//       return true;
//     } catch (err) {
//       return err;
//     }
//   },
// };

// module.exports = userDB;
