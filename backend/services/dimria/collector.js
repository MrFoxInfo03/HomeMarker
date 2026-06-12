import { insertToDatabase } from "./services/insert.service";
import { searchDimRia } from "./api/dimria.search";
import { infoDimRia } from "./api/dimria.info";

const DIMRIA_API_KEY = process.env.DIMRIA_API_KEY;

async function dimriaCollector() 
{
    const result = await searchDimRia(DIMRIA_API_KEY);

    for(const item of result.items) 
    {
        const item_data = await infoDimRia(item);

        const query_res = insertToDatabase(item_data);
    }
}

export default dimriaCollector();