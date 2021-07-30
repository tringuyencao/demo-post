import fetchJson from "./fetcher";

const api_url = process.env.NEXT_PUBLIC_API_URL;

export async function get(url) {
  try {
    const result = await fetchJson(api_url + url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return result;
  } catch (error) {
    alert(error.data.message);
    console.error("An unexpected error happened:", error);
  }
}

export async function post(url, params) {
  try {
    const result = await fetchJson(api_url + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    return result;
  } catch (error) {
    alert(error.data.message);
    console.error("An unexpected error happened:", error);
  }
}
