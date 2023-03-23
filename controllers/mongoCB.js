const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://songsubin:thdtnqls1004@cluster0.ntbfxlb.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const test = client.db('kdt5').collection('test');
  // kdt5라는 디비 없으면 만들고 test라는 테이블 만들어라
  // 단 데이터가 없으면 만들어지지 않음

  // test.deleteMany({}, (deleteErr, deleteResult) => {
  //   if (deleteErr) throw deleteErr;
  //   console.log(deleteResult);
  //   test.insertOne(
  //     {
  //       name: 'ddubin',
  //       nickName: 'hi',
  //     },
  //     (insertErr, insertResult) => {
  //       console.log(insertResult);
  //       const findCursor = test.find({});
  //       findCursor.toArray((err, data) => {
  //         console.log('data', data);
  //       });
  //       // client.close();
  //     },
  //   );
  // });
  console.log(test);

  // insertOne : 넣고 싶은 데이터를 {}안에 넣기
  test.deleteMany({}, (deleteErr, deleteResult) => {
    // deleteErr가 없으면 undefined 로 반환함
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);
    test.insertOne(
      {
        name: 'pororo',
        age: 5,
      },

      (insertErr, insertResult) => {
        // insert하다가 에러가 발생하면 insertErr를 보내줘라
        if (insertErr) throw insertErr;
        console.log(insertResult);
      },
    );
  });

  // // insertMany : 넣고 싶은 데이터를 []안에 넣기
  // test.deleteMany({}, (deleteErr, deleteResult) => {
  //   // deleteErr가 없으면 undefined 로 반환함
  //   if (deleteErr) throw deleteErr;
  //   console.log(deleteResult);
  //   test.insertMany(
  //     [
  //       { name: 'pororo', age: 5 },
  //       { name: 'rupy', age: 7 },
  //       { name: 'crong', age: 4 },
  //     ],
  //     (insertErr, insertResult) => {
  //       // insert하다가 에러가 발생하면 insertErr를 보내줘라
  //       if (insertErr) throw insertErr;
  //       console.log(insertResult);
  //     },
  //   );
  // });

  // // deleteOne
  // test.deleteMany({}, (deleteErr, deleteResult) => {
  //   // deleteErr가 없으면 undefined 로 반환함
  //   if (deleteErr) throw deleteErr;
  //   console.log(deleteResult);
  //   test.insertMany(
  //     [
  //       { name: 'pororo', age: 5 },
  //       { name: 'rupy', age: 7 },
  //       { name: 'crong', age: 4 },
  //     ],
  //     (insertErr, insertResult) => {
  //       // insert하다가 에러가 발생하면 insertErr를 보내줘라
  //       if (insertErr) throw insertErr;
  //       console.log(insertResult);
  //       test.deleteOne({ name: 'crong' }, (deleteOneErr, deleteOneResult) => {
  //         if (deleteOneErr) throw deleteOneErr;
  //         console.log('deleteOneResult', deleteOneResult);
  //       });
  //     },
  //   );
  // });

  // // deleteMany 쿼리
  // test.deleteMany({}, (deleteErr, deleteResult) => {
  //   // deleteErr가 없으면 undefined 로 반환함
  //   if (deleteErr) throw deleteErr;
  //   console.log(deleteResult);
  //   test.insertMany(
  //     [
  //       { name: 'pororo', age: 5 },
  //       { name: 'rupy', age: 7 },
  //       { name: 'crong', age: 4 },
  //     ],
  //     (insertErr, insertResult) => {
  //       // insert하다가 에러가 발생하면 insertErr를 보내줘라
  //       if (insertErr) throw insertErr;
  //       console.log(insertResult);
  //       test.deleteMany(
  //         { age: { $gte: 5 } },
  //         (deleteOneErr, deleteOneResult) => {
  //           // $>> 특정명령을 내리기위한 빌드업..  $gte 5살 이상인 애를 지워주세요
  //           // 먄약 gte에서 e 가 빠지면 5살 초과
  //           if (deleteOneErr) throw deleteOneErr;
  //           console.log('deleteOneResult', deleteOneResult);
  //         },
  //       );
  //     },
  //   );
  // });

  // // update 쿼리
  // test.deleteMany({}, (deleteErr, deleteResult) => {
  //   // deleteErr가 없으면 undefined 로 반환함
  //   if (deleteErr) throw deleteErr;
  //   console.log(deleteResult);
  //   test.insertMany(
  //     [
  //       { name: 'pororo', age: 5 },
  //       { name: 'rupy', age: 7 },
  //       { name: 'crong', age: 4 },
  //     ],
  //     (insertErr, insertResult) => {
  //       // insert하다가 에러가 발생하면 insertErr를 보내줘라
  //       if (insertErr) throw insertErr;
  //       console.log(insertResult);
  //       test.updateOne(
  //         { name: 'rupy' },
  //         { $set: { name: '루피' } },
  //         (updateErr, updateResult) => {
  //           // $>> 특정명령을 내리기위한 빌드업..  $gte 5살 이상인 애를 지워주세요
  //           // 먄약 gte에서 e 가 빠지면 5살 초과
  //           if (updateErr) throw updateErr;
  //           console.log('updateResult', updateResult);
  //         },
  //       );
  //     },
  //   );
  // });

  // // update 쿼리 조건문
  // test.deleteMany({}, (deleteErr, deleteResult) => {
  //   // deleteErr가 없으면 undefined 로 반환함
  //   if (deleteErr) throw deleteErr;
  //   console.log(deleteResult);
  //   test.insertMany(
  //     [
  //       { name: 'pororo', age: 5 },
  //       { name: 'rupy', age: 7 },
  //       { name: 'crong', age: 4 },
  //     ],
  //     (insertErr, insertResult) => {
  //       // insert하다가 에러가 발생하면 insertErr를 보내줘라
  //       if (insertErr) throw insertErr;
  //       console.log(insertResult);
  //       test.updateMany(
  //         { age: { $gte: 5 } },
  //         { $set: { age: '5살이상인 친구들' } },
  //         (updateErr, updateResult) => {
  //           // $>> 특정명령을 내리기위한 빌드업..  $gte 5살 이상인 애를 지워주세요
  //           // 먄약 gte에서 e 가 빠지면 5살 초과
  //           if (updateErr) throw updateErr;
  //           console.log('updateResult', updateResult);
  //         },
  //       );
  //     },
  //   );
  // });

  // // findOne
  // test.deleteMany({}, (deleteErr, deleteResult) => {
  //   // deleteErr가 없으면 undefined 로 반환함
  //   if (deleteErr) throw deleteErr;
  //   console.log(deleteResult);
  //   test.insertMany(
  //     [
  //       { name: 'pororo', age: 5 },
  //       { name: 'rupy', age: 7 },
  //       { name: 'crong', age: 4 },
  //     ],
  //     (insertErr, insertResult) => {
  //       // insert하다가 에러가 발생하면 insertErr를 보내줘라
  //       if (insertErr) throw insertErr;
  //       console.log(insertResult);
  //       test.findOne({ name: 'rupy' }, (findErr, findData) => {
  //         if (findErr) throw findErr;
  //         console.log(findData);
  //       });
  //     },
  //   );
  // });

  // // find
  // test.deleteMany({}, (deleteErr, deleteResult) => {
  //   // deleteErr가 없으면 undefined 로 반환함
  //   if (deleteErr) throw deleteErr;
  //   console.log(deleteResult);
  //   test.insertMany(
  //     [
  //       { name: 'pororo', age: 5 },
  //       { name: 'rupy', age: 7 },
  //       { name: 'crong', age: 4 },
  //     ],
  //     (insertErr, insertResult) => {
  //       // insert하다가 에러가 발생하면 insertErr를 보내줘라
  //       if (insertErr) throw insertErr;
  //       console.log(insertResult);
  //       const findCursor = test.find({});
  //       // 시간이 오래 걸리지 않기때문에 콜백함수가 필요없음
  //       // find의 리턴값이 cursor가 있기 떄문에 변수에 담아줌
  //       // console.log('findCursor?????????', findCursor);
  //       findCursor.toArray((toArrErr, toArrData) => {
  //         if (toArrErr) throw toArrErr;
  //         console.log(toArrData);
  //       });
  //     },
  //   );
  // });
});

// client.close();
// // 서버 종료하는 코드 그러나 여기에 있으면 에러남
// // 왜냐하면 자바스크립트는 비동기특성이있어, 접속하기도 전에 실행이 되어버림
