import { query } from "../../../lib/db";

export default async function userId(req, res) {
  const pid = req.query.pid;
    try {
      const result = await query({
        query: "SELECT id, email, created_at, updated_at FROM users WHERE id = ?",
        values: [pid],
      });
      res.status(200).json(result[0])
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
