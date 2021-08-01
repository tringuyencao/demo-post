export async function querify(params) {
  if (!params || !Object.keys(params).length) return "";

  let result = `WHERE`;
  for (const item in params) {
    result += ` ${item} like '%${params[item]}%' AND`;
  }
  return result.slice(0, -4);
}
