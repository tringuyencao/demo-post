import crypto from "crypto";
import { query } from "../../../lib/db";

export async function findUser({ email }) {
  try {
    const result = await query({
      query: "SELECT * FROM users WHERE email = ?",
      values: [email],
    });
    return result[0];
  } catch (error) {
    console.log(error);
  }
}

export async function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}
