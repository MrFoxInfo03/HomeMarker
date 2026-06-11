import axios from "axios";

const API_KEY = process.env.DIMRIA_API_KEY;

export async function searchListingsPage({
  realty_type,
  city_id,
  page = 1,
  limit = 100
}) {
  const { data } = await axios.get(
    "https://developers.ria.com/dom/search",
    {
      params: {
        api_key: API_KEY,
        operation_type: 1,
        realty_type,
        city_id,
        page,
        limit,
        sort: "created_at.asc"
      }
    }
  );

  return {
    ids: data?.items || data?.result?.search_result?.ids || [],
    total: data?.result?.search_result?.count || null
  };
}