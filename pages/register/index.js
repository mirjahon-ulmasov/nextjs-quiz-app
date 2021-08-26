import { MongoClient } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';

import Register from '../../components/app/login/Register';
import SignUp from '../../components/app/login/SignUp';

export default function RegisterPage(props) {
  // const router = useRouter();

  const addUserHandler = async enteredUser => {
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(enteredUser),
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json());
    // When you registered you pushed to your console
    //   .then(response => router.push(`/${response.id}/test`));
  };

  return (
    <Fragment>
      <Head>
        <title>Quiz App | Register</title>
        <meta
          name="description"
          content="Register in order to create account"
        />
      </Head>
      <Register>
        <SignUp addUser={addUserHandler} users={props.users} />
      </Register>
    </Fragment>
  );
}

export async function getStaticProps() {
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
        };
      }),
    },
  };
}
