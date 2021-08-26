import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const data = req.body;

  const client = await MongoClient.connect(
    'mongodb://Mirjahon:reactdeveloper@cluster0-shard-00-00.jlmh3.mongodb.net:27017,cluster0-shard-00-01.jlmh3.mongodb.net:27017,cluster0-shard-00-02.jlmh3.mongodb.net:27017/quiz?ssl=true&replicaSet=atlas-12j0xd-shard-0&authSource=admin&retryWrites=true&w=majority'
  );
  const userCollection = client.db('quiz').collection('user_list');

  if (req.method === 'POST') {
    const result = await userCollection.insertOne(data);

    client.close();
    res.status(201).json({ message: 'User inserted!', id: result.insertedId });
  } else {
    res.status(500);
  }
}
