import 'dotenv/config';
// import * as dotenv from 'dotenv';

// const envFound = dotenv.config();

// if (envFound.error) {
//   throw new Error(`Don't find .env file!`);
// }

export default {
  port: Number(process.env.PORT) || 3000
};
console.log(typeof Number(process.env.PORT));
