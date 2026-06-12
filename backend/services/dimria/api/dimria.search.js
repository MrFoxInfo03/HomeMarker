import axios from "axios";

BASE_SEARCH_URL = "https://developers.ria.com/dom/search";

const operationType = [1, 2]; //Продажа і оренда

const realtyType = [
    1, //appartments
    2, //homes
    3, //commercial
    4 //land plot
];

const baseParams = {
    state_id: 5, //Львівська область
    city_id: 5 //Lviv
};

function buildQuery(params)
{
    const query = new URLSearchParams();

    for(const key in params) {
        const value = params[key];

        if (Array.isArray(value)) {
            value.forEach(v => query.append(key, v));
        } else {
            query.append(key, value);
        }
    }

    return query.toString();
}

export async function searchDimRia(apiKey)
{
    const results = {
        items: []
    };

    for (const operation_type of operationType) {
        for (const realty_type of realtyType) {

            const params = {
                apiKey: apiKey,
                state_id: baseParams.state_id,
                city_id: baseParams.city_id,
                operation_type,
                realty_type
            };

            const url = `${BASE_SEARCH_URL}?${buildQuery(params)}`;

            try {
                const res = await axios.get(url);

                if (res.statusText == "OK") {
                    results.items = res.data.items;
                }

            } catch(err) {
                console.error('DIM.RIA error:', {
                    operation_type,
                    realty_type,
                    message: err.message
                });
            }
        }
    }

    return results;
}