import axios from 'axios';
import insertToDB_DimriaRealty from './utils/dimria_realty_insert.js';
require('dotenv').config()

const DIMRIA_SEARCH_URL = "https://developers.ria.com/dom/search";
const DIMRIA_INFO_URL = "https://developers.ria.com/dom/info";

const DIMRIA_API_KEY = process.env.DIMRIA_API_KEY;

async function searchDimria() {
    const operations = [1, 3]; //Selling and rent
    const stateId = [5]; //Lviv region
    const cityId = [5]; //Lviv
    const category = [1, 4, 13, 24]; //Realty type

    try {
        const result = await axios.get(DIMRIA_SEARCH_URL, {
            params: {
                api_key: DIMRIA_API_KEY,
                category: category[0],
                category: category[1],
                category: category[2],
                category: category[3],

                operation: operations[0],
                operation: operations[1],

                city_id: cityId[0],
                state_id: stateId[0]
            }
        });

        return result.items;
    } catch (error) {
        if (error.response) {
            console.log('Error Status:', error.response.status);
            console.log('Error Data:', error.response.data);
        } else if (error.request) {
            console.log('No response received:', error.request);
        } else {
            console.log('Error Message:', error.message);
        }
    }
}


async function infoDimria(items) {
    try {
        for (let i = 0; i <= items.length; i++) {
            const result = await axios.get(DIMRIA_INFO_URL + `/${items[i]}`, {
                params: {
                    api_key: DIMRIA_API_KEY
                }
            });

            await insertToDB_DimriaRealty(result);
        }
    } catch (error) {
        if (error.response) {
            console.log('Error Status:', error.response.status);
            console.log('Error Data:', error.response.data);
        } else if (error.request) {
            console.log('No response received:', error.request);
        } else {
            console.log('Error Message:', error.message);
        }
    }
}

async function runDimriaCollector() {
    const items = await searchDimria();

    await infoDimria(items);
}

module.exports = { runDimriaCollector }