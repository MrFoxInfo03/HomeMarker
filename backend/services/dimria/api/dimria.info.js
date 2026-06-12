import axios from "axios";

const BASE_INFO_URL = "https://developers.ria.com/dom/info";

export async function infoDimRia(id) {
    try {
        const res = await axios.get(`${BASE_INFO_URL}`, {
            params: {
                realty_id: id
            }
        });

        if (res.status === 200) {
            return res.data;
        }

    } catch (err) {
        console.error('DIM.RIA error:', {
            realty_id: id,
            message: err.message,
            response: err.response?.data
        });
    }

    return null;
}