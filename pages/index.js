import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';

import Register from '../components/app/login/Register';
import SignIn from '../components/app/login/SignIn';

export default function LoginPage(props) {
  return (
    <Fragment>
      <Head>
        <title>Quiz App | Login</title>
        <meta
          name="description"
          content="Login with your name and password and challenge yourself"
        />
      </Head>
      <Register>
        <SignIn users={props.users} />
      </Register>
    </Fragment>
  );
}

export async function getStaticProps() {
  // Fetch data from API
  const client = await MongoClient.connect(
    'mongodb://Mirjahon:reactdeveloper@cluster0-shard-00-00.jlmh3.mongodb.net:27017,cluster0-shard-00-01.jlmh3.mongodb.net:27017,cluster0-shard-00-02.jlmh3.mongodb.net:27017/quiz?ssl=true&replicaSet=atlas-12j0xd-shard-0&authSource=admin&retryWrites=true&w=majority'
  );
  const userCollection = client.db('quiz').collection('user_list');

  const users = await userCollection.find().toArray();

  client.close();

  return {
    props: {
      users: users.map(user => {
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          password: user.password,
          date: user.date,
          score: user.score,
          time: user.time,
          details: user.details,
        };
      }),
    },
    revalidate: 2,
  };
}
