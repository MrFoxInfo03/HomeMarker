import { searchListings } from "./dimria_search.js";
import { getUniqueIds } from "./dimria_filter.js";
import { getListingInfo } from "./dimria_info.js";
import normalize from "./normalize.js";
import { insertListing } from "./insertListing.js";
import pLimit from "p-limit";

export async function runCollector(city_id) {
  console.log("🟡 Collector started");

  const ids = await searchListings({
    realty_type: 2, // або loop по config
    city_id
  });

  if (!ids.length) {
    console.log("No ids found");
    return;
  }

  const newIds = await getUniqueIds(ids);

  console.log(`New IDs: ${newIds.length}`);

  // 🔥 ліміт одночасних запитів (важливо!)
  const limit = pLimit(3);

  const tasks = newIds.map(id =>
    limit(async () => {
      try {
        const raw = await getListingInfo(id);
        const normalized = normalize(raw);

        await insertListing(normalized, id);

        console.log(`Inserted: ${id}`);
      } catch (err) {
        console.error(`Failed ID ${id}`, err.message);
      }
    })
  );

  await Promise.all(tasks);

  console.log("🟢 Collector finished");
}