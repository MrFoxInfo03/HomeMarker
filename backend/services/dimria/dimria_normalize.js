export default function normalize(item)
{
    return {
        advert_type_name: item.advert_type_name,

        latitude: Number(item.latitude),
        longitude: Number(item.longitude),

        state_name: item.state_name,
        city: item.city_name,
        district_type_name: item.district_type_name,
        district_name: item.district_name,
        street: item.street_name,
        building_name_str: item.building_name_str,

        type_object: item.type,
        rooms_count: item.rooms_count,
        floor_count: item.floor_count,
        levels: item.levels,
        is_commercial: item.is_commercial,
        with_panoramas: item.with_panoramas,
        kitchen_square_meters: item.kitchen_square_meters,
        total_square_meters: item.total_square_meters,
        realty_id: item.realty_id,
        is_show_building_no: item.is_show_building_no,

        description: item.description,
        description_uk: item.description_uk,

        beautiful_url: item.beautiful_url,
        youtube_link: item.youtube_link,

        main_photo: item.main_photo,
        photos: item.photos,

        currency_type: item.currency_type,
        price_type: item_price_type,
        price: item.price,
        price_arr: item.priceArr,

        created_at: item.created_at,
        date_end: item.date_end,

        user_advert: item.user
    }
}