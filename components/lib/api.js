import axios from 'axios';

// const DUMMY_TEST = [
//   {
//     question: 'Whay is your name?',
//     correct_answer: 'Mirjahon',
//     incorrect_answers: ['Nodira', 'Shahzoda', 'Sevara'],
//   },

//   {
//     question: 'How old are you?',
//     correct_answer: '21',
//     incorrect_answers: ['28', '29', '49'],
//   },

//   {
//     question: 'Where do you study?',
//     correct_answer: 'INHA',
//     incorrect_answers: ['WIUT', 'MDIST', 'College'],
//   },
// ];

// const DUMMY_QUOTES = [
//   {
//     text: 'Genius is one percent inspiration and ninety-nine percent perspiration.',
//     author: 'Thomas Edison',
//   },
//   {
//     text: 'You can observe a lot just by watching.',
//     author: 'Yogi Berra',
//   },
//   {
//     text: 'A house divided against itself cannot stand.',
//     author: 'Abraham Lincoln',
//   },
// ];

const testUrl =
  'https://opentdb.com/api.php?amount=10&category=22&difficulty=medium';
const quoteUrl = 'https://type.fit/api/quotes';

export async function getTestQuestions() {
  const response = await axios.get(testUrl);
  const data = await response.data;

  if (response.status !== 200) {
    throw new Error('Could not catch questions...');
  }

  const dataResult = data.results;
  return dataResult;
}

export async function getQuotes() {
  const response = await axios.get(quoteUrl);
  const data = await response.data;

  if (response.status !== 200) {
    throw new Error('Could not catch quotes...');
  }

  return data;
}
