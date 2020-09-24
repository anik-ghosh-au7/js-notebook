import dotenv from "dotenv";
dotenv.config();

export const secret = process.env.SECRET_KEY;
export const secretPassword = process.env.SECRET_PASSWORD;
