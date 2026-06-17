import { describe } from "zod/v4/core";

export default function normalized(item)
{
    return {
        realty_id: item.realty_id,
        advert_type: item.advert_type_name,
        advert_url: item.beautiful_url,
        youtube_link: item.youtube_link,

        latitude: Number(item.latitude),
        longitude: Number(item.longitude),

        building_number: item.building_number_str,
        district: item.district_name,
        district_type: item.district_type_name,
        state: item.state_name,
        city: item.city_name,
        admin_district_name: item.admin_district_name_uk,

        currency_type: item.currency_type,
        price: item.price,
        price_item: item.price_item,
        price_total: item.price_total,
        price_type: item.price_type,
        priceArr: item.priceArr,

        description: item.description,
        description_ua: item.description_uk,

        floor: Number(item.floor),
        floors_count: Number(item.floors_count),
        rooms_count: Number(item.rooms_count),
        wall_type: item.wall_type,
        with_panoramas: Number(item.with_panoramas),
        
        kitchen_meters: Number(item.kitchen_square_meters),
        living_meters: Number(item.living_square_meters),
        total_meters: Number(item.total_square_meters),
        
        inspected: item.inspected,
        inspected_at: item.inspected_at,
        is_bargain: item.is_bargain,
        is_commercial: item.is_commercial,
        is_exchange: item.is_exchange,

        photos: item.photos,

        user_d: item.user,

        created_at: item.created_at,
        date_end: item.date_end
    }
}