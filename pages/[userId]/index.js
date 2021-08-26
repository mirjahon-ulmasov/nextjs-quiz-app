import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import Personal from '../../components/app/pesonal-page/Personal';

import Layout from '../../components/layout/Layout';

export default function UserPage(props) {
  return (
    <Layout id={props.registeredUser.id}>
      <Head>
        <title>Quiz App | Pesonal</title>
        <meta
          name="description"
          content={'In Personal page you can watch your daily challenges'}
        />
      </Head>
      <Personal user={props.registeredUser} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb://Mirjahon:reactdeveloper@cluster0-shard-00-00.jlmh3.mongodb.net:27017,cluster0-shard-00-01.jlmh3.mongodb.net:27017,cluster0-shard-00-02.jlmh3.mongodb.net:27017/quiz?ssl=true&replicaSet=atlas-12j0xd-shard-0&authSource=admin&retryWrites=true&w=majority'
  );
  const userCollection = client.db('quiz').collection('user_list');

  const users = await userCollection.find().toArray();
  client.close();

  const params = users.map(user => {
    return {
      params: {
        userId: user._id.toString(),
      },
    };
  });

  return {
    paths: params,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const userId = context.params.userId;

  const client = await MongoClient.connect(
    'mongodb://Mirjahon:reactdeveloper@cluster0-shard-00-00.jlmh3.mongodb.net:27017,cluster0-shard-00-01.jlmh3.mongodb.net:27017,cluster0-shard-00-02.jlmh3.mongodb.net:27017/quiz?ssl=true&replicaSet=atlas-12j0xd-shard-0&authSource=admin&retryWrites=true&w=majority'
  );
  const userCollection = client.db('quiz').collection('user_list');

  const registeredUser = await userCollection.findOne({
    _id: ObjectId(userId),
  });

  client.close();

  return {
    props: {
      registeredUser: {
        id: registeredUser._id.toString(),
        name: registeredUser.name,
        email: registeredUser.email,
        password: registeredUser.password,
        date: registeredUser.date,
        score: registeredUser.score,
        time: registeredUser.time,
        details: registeredUser.details,
      },
    },
    revalidate: 2,
  };
}
