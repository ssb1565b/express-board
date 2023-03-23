// router.js == 메인 서버 코드

// @ts-check

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

// express 설정 단계
const app = express();

// 포트 세팅 단계
const { PORT } = process.env;
// === const PORT = process.env.PORT;
//  http://localhost:4000 === http://127/0/0/1:4000

const mainRouter = require('./routes');
// 원래는 ./routes/index 인데 생략 가능
const userRouter = require('./routes/users');
// './routes/users.js'인데 .js 생략 가능
const postsRouter = require('./routes/posts');
const dbRouter = require('./routes/db');
const dbBoardRouter = require('./routes/dbBoard');
const cookieRouter = require('./routes/cookie');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

// 서버 세팅단계
app.set('view engine', 'ejs');
app.use(express.static('public')); // 프론트에서 특정 주소요청이 들어오면 public 폴더에서 찾아라
app.use('/uploads', express.static('uploads'));

app.use(express.json());
// json형태로 데이터를 전달한다는 의미
app.use(express.urlencoded({ extended: false }));
// urlencoded은 url 처럼 데이터를 변환하면localhost:4000/posts?title=title&content=content 해당 데이터를 json 형태 { “title”: “title, “content”: “content” } 라고 전달 합니다.
// extended: false 를 기본으로 기억하기
// bodyParser 세팅 부분은 하단의 app.use('/users', userRouter); 이거보다 위에 있어야함
app.use(cookieParser('subin'));
app.use(
  session({
    secret: 'subin',
    resave: false,
    saveUninitialized: true,
  }),
);

console.log(__dirname); // 현재 파일 위치를 볼 수 있음
// app.use('/css', express.static(__dirname + '/views/css'));
// // = app.use(express.static('views')); 근데 얘보다 __dirname이 좀 더 구체적 (절대경로)
// app.use('/js', express.static('js'));

app.use('/', mainRouter);
// localhost:4000
app.use('/users', userRouter);
app.use('/posts', postsRouter);
// // localhost:4000/users
// 미들웨어를 끼워놓고자 use를 씀
// 앞으로 앞에 users라는게 붙으면 app이 처리하는게 아니라 userRouter에서 처리하게됨
app.use('/db', dbRouter);
app.use('/dbBoard', dbBoardRouter);
app.use('/cookie', cookieRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use((err, req, res, next) => {
  // err 를 받는 미들웨어를 작성할때는 반드시 매개변수 4개 작성 next 안쓴다고 지우면 err 못받음
  console.log(err.stack);
  // 개발자가 확인하기 위해서
  res.status(err.statusCode);
  res.send(err.message + `</br><a href="/">홈으로</a>`);
});

app.listen(PORT, () => {
  console.log(`${PORT}번에서 서버실행`);
});
