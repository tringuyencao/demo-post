export async function querify(params) {
  if (!params || !Object.keys(params).length) return "";

  let result = ``;
  for (const item in params) {
    result += `AND ${item} like '%${params[item]}%'`;
  }
  return result
}
