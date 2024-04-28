import * as dotenv from 'dotenv';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error(`Don't find .env file!`);
}

export default {
  port: process.env.PORT || 3000
};
