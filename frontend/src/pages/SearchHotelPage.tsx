import { useEffect, useState } from "react";
import type { Address } from "samolet-common";
import { type Filters, type HotelInfoProps } from "../example_data/hotelInfo";

import { hotelThunks, useAppDispatch, useRequest } from "../store/store";
import { HotelCard } from "../components/HotelCard";
import type { THotel } from "samolet-common/src/network/hotel";
import { RequestStatus } from "../components/RequestStatus";
import {
    HotelSearchForm,
    type HotelSearchFormState,
} from "../components/HotelSearchForm";
import { useForm } from "react-hook-form";

function filterHotels(
    hotel: THotel,
    { city, food, wifi, lowPrice, highPrice }: Filters,
): boolean {
    const badConditions = [
        city && city != hotel.address.city,
        // food && food != hotel.hotelFood,
        // wifi && wifi != hotel.hotelWiFi,
        // lowPrice && lowPrice > hotel.price,
        // highPrice && highPrice < hotel.price,
    ];
    const goodHotel = badConditions.every(condition => condition == false);
    const badHotel = !goodHotel;
    return !badHotel;
}

export function SearchHotelPage() {
    const dispatch = useAppDispatch();
    const { value: hotels, status: requestStatus } = useRequest(
        _ => _.getAllHotels,
    );

    useEffect(() => {
        dispatch(hotelThunks.getAllHotels(0));
    }, []);

    const { register, watch } = useForm<HotelSearchFormState>();
    const form = watch();

    if (requestStatus !== "fulfilled")
        return (
            <>
                <HotelSearchForm register={register} cities={[]} />
                <RequestStatus status={requestStatus} />
            </>
        );

    const cityNames = [...new Set(hotels.map(hotel => hotel.address.city))];
    const cities = cityNames;
    const hotelList = hotels
        .filter(hotel =>
            filterHotels(hotel, {
                ...form,
                wifi: false,
                food: false,
                lowPrice: 1000,
                highPrice: 2000,
            }),
        )
        .map(hotel => (
            <HotelCard
                {...hotel}
                isFood={false}
                isWiFi={false}
                price={4000}
                raiting={5.5}
                id={hotel._id}
            />
        ));

    return (
        <>
            {JSON.stringify(form)}
            <HotelSearchForm cities={cities} register={register} />
            <RequestStatus status={requestStatus} />
            {hotelList}
        </>
    );
}
