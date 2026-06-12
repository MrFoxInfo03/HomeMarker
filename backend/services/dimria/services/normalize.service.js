import { describe } from "zod/v4/core";

export function normalizeItem(item)
{
    return {
        realty_id: item.realty_id,

        location: {
            admin_district: item.admin_district_name_uk,
            city: item.city_name,
            region: item.region_name,
            district: item.district_name,
            street: item.street_name,
            building_number: item.building_name_str
        },
        district_type: item.district_type_name,

        coord: {
            latitude: item.latitude,
            longitude: item.longitude
        },

        advert_type: item.advert_name_type,
        advert_publish_type: item.advert_publish_type,

        characteristic_values: item.characteristics_values,

        inspect: {
            inspected: item.inspected,
            inspected_at: item.inspected_at
        },

        floor: item.floor,
        floor_count: item.floor_count,
        rooms_count: item.rooms_count,
        wall_type: item.wall_type,
        panoramas: item.with_panoramas,

        bargain: item.is_bargain,
        commercial: item.is_commercial,
        exchange: item.is_exchange,

        kitchen_area: item.kitchen_square_meters,
        living_area: item.living_square_meters,
        total_area: item.total_square_meters,

        metro_station_bruch: item.metro_station_bruch,
        metro_name: item.metro_station_name,

        photos: item.photos || [],

        beautiful_url: item.beautiful_url,
        youtube_link: item.youtube_link,

        currency_type: item.currency_type,
        price: item.price,
        price_item: item.price_item,
        price_total: item.price_total,
        price_type: item.price_type,
        price_arr: item.priceArr,

        publishing_date: item.publishing_date,
        realty_type: item.realty_type_name,
        realty_type_parent: item.realty_type_parent_name,

        description: item.description_uk,

        user_d: item.user,

        created_at: item.created_at,
        date_end: item.date_end
    }
}