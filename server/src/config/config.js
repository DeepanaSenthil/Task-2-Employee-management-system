import dotenv from "dotenv";

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error(".env file not found..!");
}

process.env.PORT = process.env.PORT || 8000;
export default {
  port: parseInt(process.env.PORT) || 8000
}