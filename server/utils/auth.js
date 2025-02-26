import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

const generateToken = ({ username, _id }) => {
  const payload = { username, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: "1h" });
};

export default generateToken;
