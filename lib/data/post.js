import { query } from "../db";

export const DBPosts = async () => {
  try {
    const result = await query({
      query: `SELECT * FROM posts Where deleted_at is null`,
    });
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
};

export const DBPost = async ({ id }) => {
  try {
    const result = await query({
      query: `SELECT * FROM posts Where deleted_at is null AND id = ?`,
      values: [id]
    });
    return JSON.parse(JSON.stringify(result[0]));
  } catch (error) {
    console.log(error);
  }
};
