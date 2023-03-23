const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://songsubin:thdtnqls1004@cluster0.ntbfxlb.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  try {
    await client.connect();
    const member = client.db('kdt5').collection('member');

    await member.deleteMany({});
    await member.insertMany([
      { name: '장경은', age: 27 },
      { name: '송수빈', age: 26 },
      { name: '박지원', age: 26 },
      { name: '윤제', age: 26 },
      { name: '김계환', age: 36 },
    ]);

    await member.insertOne({ name: '송민영', age: 25 });
    await member.deleteOne({ name: '장경은' });
    await member.updateOne(
      { name: '송민영' },
      { $set: { name: '장경은', age: 27 } },
    );

    const findResult = member.find({ age: { $gte: 25 } });
    const dataArr = await findResult.toArray();
    return dataArr;
  } catch (err) {
    console.log(err);
  }
}

main();
