export async function querify(params, type = "AND") {
  if (!params || !Object.keys(params).length) return "";

  let result = type;
  for (const item in params) {
    result += ` ${item} like '%${params[item]}%' AND`;
  }
  return result.slice(0, -4);
}
