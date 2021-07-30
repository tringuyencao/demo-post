import moment from "moment";
import { query } from "../../../lib/db";

export default async function Update(req, res) {
  const { title, content, id } = req.body;

  const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

  const params = {
    updatedAt: currentTime,
    title,
    content,
    id,
  };
  
  try {
    const result = await query({
      query:
        "UPDATE posts SET updated_at = ?, title = ?, content = ? WHERE id = ? ",
      values: [
        params.updatedAt.toString(),
        params.title,
        params.content,
        params.id,
      ],
    });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
