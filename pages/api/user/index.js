import { query } from "../../../lib/db";
import { querify } from "../../../functions/utils/querify";

export default async function users(req, res) {
  const params = req.body;
    try {
      const result = await query({
        query: `SELECT * FROM users ${await querify(params)}`,
      });
      res.status(200).json(result)
      return result;
    } catch (error) {
      console.log(error);
    }
  }
