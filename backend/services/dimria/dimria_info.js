import axios from "axios";

const API_KEY = process.env.DIMRIA_API_KEY;

export async function getListingInfo(id) {
  const { data } = await axios.get(
    "https://developers.ria.com/dom/info",
    {
      params: {
        api_key: API_KEY,
        id
      }
    }
  );

  return data;
}