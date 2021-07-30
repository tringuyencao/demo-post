import moment from "moment";
import { query } from "../../../lib/db";

export default async function Create(req, res) {
  const { title, content, userId } = req.body;

  const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

  const params = {
    createdAt: currentTime,
    updatedAt: currentTime,
    title,
    content,
    userId,
  };
  
  try {
    const result = await query({
      query:
        "INSERT INTO posts (created_at, updated_at, title, content, user_id) VALUES(?, ?, ?, ?, ?)",
      values: [
        params.createdAt.toString(),
        params.updatedAt.toString(),
        params.title,
        params.content,
        params.userId,
      ],
    });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
