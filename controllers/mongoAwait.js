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
    const test = client.db('kdt5').collection('test');

    await test.deleteMany({});
    await test.insertMany([
      { name: 'pororo', age: 5 },
      { name: 'crong', age: 4 },
      { name: 'rupy', age: 6 },
    ]);
    // await test.deleteMany({ age: { $gte: 5 } });
    await test.updateMany({ age: { $gte: 5 } }, { $set: { name: '5살 이상' } });

    const findResult = test.find({ age: { $gte: 5 } });
    const dataArr = await findResult.toArray();
    return dataArr;
  } catch (err) {
    console.log(err);
  }
}

main();
