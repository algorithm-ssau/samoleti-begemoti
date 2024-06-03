import { useState } from "react";
import type { Address } from "samolet-common";
import {
    hotelInfo,
    type Filters,
    type HotelInfoProps,
} from "../../example_data/hotelInfo";
import { hotelThunks } from "../../store/requests";
import { useAppDispatch, useAppSelector } from "../../store/store";

import {
    ContainerUp,
    ContainerLeftHalf,
    HeadingsContainer,
    H2Headings,
    SelectContainer,
    DataPriceInput,
    CustomSelect,
    ContainerRightHalf,
    ContainerDown,
    H2Filters,
    FindButton,
    Container,
    Checkbox,
} from "./style";
import HotelCard from "../HotelCard";

function filterHotels(
    hotel: HotelInfoProps,
    { city, food, wifi, lowPrice, highPrice }: Filters,
): boolean {
    const badConditions = [
        city && city != hotel.city,
        food && food != hotel.hotelFood,
        wifi && wifi != hotel.hotelWiFi,
        lowPrice && lowPrice > hotel.price,
        highPrice && highPrice < hotel.price,
    ];
    const goodHotel = badConditions.every(condition => condition == false);
    const badHotel = !goodHotel;
    return !badHotel;
}

function SearchHotel() {
    const guestAmount = [1, 2, 3, 4, 5, 6, 7, 8];
    const guests = guestAmount.map(item => <option key={item}>{item}</option>);
    const dispatch = useAppDispatch();
    const requestAllHotels = useAppSelector(
        state => state.requests.getAllHotels,
    );

    let hotels = requestAllHotels.value ?? [];
    console.log(hotels?.length);
    const [arrivalDate, setArravalDate] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [peopleAmount, setPeopleAmount] = useState(0);
    const [city, setCity] = useState("");
    const [parking, setParking] = useState(false);

    const handleArrivalDateChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setArravalDate(e.target.value);
    };
    const handleDepartureDateChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDepartureDate(e.target.value);
    };
    const handlePeopleAmountChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setPeopleAmount(Number(e.target.value));
    };
    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserFilters({ ...userFilters, city: e.target.value });
    };
    const handleLowPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFilters({ ...userFilters, lowPrice: Number(e.target.value) });
    };
    const handleHighPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFilters({ ...userFilters, highPrice: Number(e.target.value) });
    };
    const handleParkingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParking(e.target.checked);
    };
    const handleFoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFilters({ ...userFilters, food: e.target.checked });
    };
    const handleWifiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFilters({ ...userFilters, wifi: e.target.checked });
    };

    const cityNames = [...new Set(hotelInfo.map(one => one.city))];
    const cities = cityNames.map(item => <option key={item}>{item}</option>);
    const [userFilters, setUserFilters] = useState({
        city: "",
        food: false,
        wifi: false,
        lowPrice: 0,
        highPrice: 0,
    });
    const hotelList = hotelInfo
        .filter(hotel => filterHotels(hotel, userFilters))
        .map(one => (
            <HotelCard
                name={one.name}
                luxary={one.isLuxary}
                normal={one.isNormal}
                reallyBad={one.isReallyBad}
                address={
                    {
                        city: one.city,
                        country: one.country,
                        place: one.place,
                    } as Address
                }
                isFood={one.hotelFood}
                isWiFi={one.hotelWiFi}
                raiting={one.rate}
                price={one.price}
            />
        ));
    return (
        <>
            <Container>
                <ContainerUp>
                    <ContainerLeftHalf>
                        <HeadingsContainer>
                            <H2Headings>Дата заезда:</H2Headings>
                            <H2Headings>Дата выезда:</H2Headings>
                            <H2Headings>Количество гостей:</H2Headings>
                        </HeadingsContainer>
                        <SelectContainer>
                            <DataPriceInput
                                type="date"
                                onChange={handleArrivalDateChange}
                            />
                            <DataPriceInput
                                type="date"
                                onChange={handleDepartureDateChange}
                            />
                            <CustomSelect onChange={handlePeopleAmountChange}>
                                <option value="" selected disabled hidden>
                                    --
                                </option>
                                {guests}
                            </CustomSelect>
                        </SelectContainer>
                    </ContainerLeftHalf>

                    <ContainerRightHalf>
                        <HeadingsContainer>
                            <H2Headings>Город:</H2Headings>
                            <H2Headings>Цена от:</H2Headings>
                            <H2Headings>до:</H2Headings>
                        </HeadingsContainer>
                        <SelectContainer>
                            <CustomSelect onChange={handleCityChange}>
                                <option value="" selected disabled hidden>
                                    --
                                </option>
                                {cities}
                            </CustomSelect>
                            <DataPriceInput
                                type="text"
                                placeholder="мало"
                                onChange={handleLowPriceChange}
                            />
                            <DataPriceInput
                                type="text"
                                placeholder="много"
                                onChange={handleHighPriceChange}
                            />
                        </SelectContainer>
                    </ContainerRightHalf>
                </ContainerUp>
                <ContainerDown>
                    <Checkbox type="checkbox" onChange={handleParkingChange} />
                    <H2Filters>Парковка</H2Filters>
                    <Checkbox type="checkbox" onChange={handleFoodChange} />
                    <H2Filters>Питание</H2Filters>
                    <Checkbox type="checkbox" onChange={handleWifiChange} />
                    <H2Filters>Wi-Fi</H2Filters>

                    <FindButton
                        onClick={() => {
                            dispatch(hotelThunks.getAllHotels({}));
                            alert(hotels?.length);
                        }}
                    >
                        <H2Headings>Найти</H2Headings>
                    </FindButton>
                </ContainerDown>
            </Container>
            {hotelList}
        </>
    );
}

export default SearchHotel;
