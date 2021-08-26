import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const data = req.body;
  const { userId } = req.query;

  const client = await MongoClient.connect(
    'mongodb://Mirjahon:reactdeveloper@cluster0-shard-00-00.jlmh3.mongodb.net:27017,cluster0-shard-00-01.jlmh3.mongodb.net:27017,cluster0-shard-00-02.jlmh3.mongodb.net:27017/quiz?ssl=true&replicaSet=atlas-12j0xd-shard-0&authSource=admin&retryWrites=true&w=majority'
  );
  const userCollection = client.db('quiz').collection('user_list');

  const filter = { _id: ObjectId(userId) };

  if (req.method === 'DELETE') {
    const result = await userCollection.deleteOne(filter);
    res.status(201).json({ message: 'User deleted!' });
    client.close();
  }

  if (req.method === 'PUT') {
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        name: data.name,
        email: data.email,
        password: data.password,
        date: data.date,
        score: data.score,
        time: data.time,
        details: data.details,
      },
    };

    const result = await userCollection.updateOne(filter, updateDoc, options);
    res.status(201).json({ message: 'User updated!', id: result.upsertedId });
    client.close();
  } else {
    res.status(500);
  }
}
