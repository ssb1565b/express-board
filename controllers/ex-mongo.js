const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://songsubin:thdtnqls1004@cluster0.ntbfxlb.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const member = client.db('kdt5').collection('member');
  member.deleteMany({}, (err, result) => {
    if (err) throw err;
    member.insertMany(
      [
        { name: '장경은', age: 27 },
        { name: '송수빈', age: 26 },
        { name: '박지원', age: 26 },
        { name: '윤제', age: 26 },
        { name: '김계환', age: 36 },
      ],
      (err, result) => {
        if (err) throw err;
        member.insertOne({ name: '송민영', age: 25 }, (err, result) => {
          if (err) throw err;
          member.deleteOne({ name: '장경은' }, (err, result) => {
            if (err) throw err;
            member.updateOne(
              { name: '송민영' },
              { $set: { name: '장경은', age: 27 } },
              (err, result) => {
                if (err) throw err;
                const findCursor = member.find({ age: { $gte: 25 } });
                findCursor.toArray((err, data) => {
                  if (err) throw err;
                  console.log(data);
                });
              },
            );
          });
        });
      },
    );
  });
});
