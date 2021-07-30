import { query } from "../../../lib/db";

export default async function Post(req, res) {
  const pid = req.query.pid;
    try {
      const result = await query({
        query: "SELECT * FROM posts WHERE deleted_at is null AND id = ?",
        values: [pid],
      });
      res.status(200).json(result[0])
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
