import "dotenv/config";
const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const {PRIVATE_KEY, PUBLIC_KEY} = process.env;
export default {
  port: 5000,

  // Database
  dbUser: DB_USER,
  dbPassword: DB_PASSWORD,
  dbName: DB_NAME,

   //JWT
   privateKey: PRIVATE_KEY,
   publicKey: PUBLIC_KEY
};
