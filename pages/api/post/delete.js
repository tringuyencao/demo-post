import moment from "moment";
import { query } from "../../../lib/db";

export default async function Delete(req, res) {
  const { id } = req.body;

  const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

  const params = {
    deletedAt: currentTime,
    id,
  };
  try {
    const result = await query({
      query:
        "UPDATE posts SET deleted_at = ? WHERE id = ? ",
      values: [
        params.deletedAt,
        params.id,
      ],
    });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
