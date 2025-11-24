import 'dotenv/config';

const username = process.env.mongoDBUsername;
const password = process.env.mongoDBPassword;
export const uri = `mongodb+srv://${username}:${password}@cluster0.g9t1hx1.mongodb.net/?appName=Cluster0`