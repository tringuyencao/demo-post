import crypto from "crypto";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import { query } from "../../../lib/db";
import { findUser } from "./get";

export default async function create(req, res) {
  const { email, password } = req.body;
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

  const user = {
    id: uuidv4(),
    createdAt: currentTime,
    updatedAt: currentTime,
    email,
    hash,
    salt,
  };
  
  try {
    const foundUser = await findUser({ email });

    if (!!foundUser)
      return res.status(400).json({ message: "Account is exists!" });

    const result = await query({
      query:
        "INSERT INTO users (id, created_at, updated_at, email, hash, salt) VALUES(?, ?, ?, ?, ?, ?)",
      values: [
        user.id,
        user.createdAt.toString(),
        user.updatedAt.toString(),
        user.email,
        user.hash,
        user.salt,
      ],
    });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
