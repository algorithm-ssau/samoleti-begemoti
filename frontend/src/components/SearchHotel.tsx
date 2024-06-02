import styled from "styled-components";
import {
    lightPrimary,
    primaryText,
    secondaryText,
    baseText,
    accent,
} from "./BaseStyle";
import {
    useAppDispatch,
    getAllHotelsThunk,
    useAppSelector,
} from "../store/store";
import { useState } from "react";
import HotelCard from "./HotelCard";
import type { Address } from "samolet-common";
import type { THotel } from "samolet-common/src/network/hotel";
import { Photo } from "./HotelReviewComponent/style";

const Container = styled.div`
    background-color: ${lightPrimary};
    display: block;
    box-shadow: 0px 2px 4px ${lightPrimary};
    width: 48%;
    margin: auto;
    align-items: center;
    border-radius: 8px;
    margin-top: 5%;
`;
const ContainerUp = styled.div`
    width: 100%;
    display: flex;
    padding-top: 4%;
`;

const ContainerLeftHalf = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
`;
const HeadingsContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    margin-left: 0%;
    padding-left: 0%;
`;

const SelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-evenly;
    margin-left: 4%;
`;

const ContainerRightHalf = styled.div`
    width: 35%;
    margin: auto;
    display: flex;
    justify-content: center;
    margin-left: 0%;
`;
const ContainerDown = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 3%;
    padding-bottom: 4%;
`;
const H2Headings = styled.h2`
    ${primaryText}
    ${baseText}
    font-size: 18px;
    margin: 0%;
    margin-left: 0%;
`;
const H2Filters = styled.h2`
    ${primaryText}
    ${baseText}
    font-size: 17px;
    margin: 0%;
    margin-top: 2px;
    margin-right: 5%;
    text-align: center;
`;
const Checkbox = styled.input`
    width: 21px;
    height: 21px;
    accent-color: ${accent};
    cursor: pointer;
`;

const FindButton = styled.button`
    color: white;
    ${baseText}
    font-size: 18px;
    display: block;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    border-radius: 30px;
    border: 0px;
    box-shadow: 0px 2px 4px ${lightPrimary};
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 3%;
    padding-right: 3%;
`;
const DataPriceInput = styled.input`
    ${secondaryText}
    ${baseText}
    font-size: 18px;
    width: 130px;
    border: 0px;
    cursor: pointer;
    margin: 0%;
    margin-top: 10%;
    margin-bottom: 10%;
    box-shadow: 0px 5px 5px ${lightPrimary};
`;

const CustomSelect = styled.select`
    color: #3c3c43;
    ${baseText}
    font-size: 18px;
    border: none;
    box-shadow: 0px 5px 5px ${lightPrimary};
    margin: 0%;
    margin-top: 10%;
    margin-bottom: 10%;
    padding-top: 0%;
    padding-bottom: 0%;
    padding-left: 3%;
    cursor: pointer;
`;

interface HotelInfoProps {
    name: string;
    isLuxary: boolean;
    isNormal: boolean;
    isReallyBad: boolean;
    city: string;
    country: string;
    place: string;
    hotelFood: boolean;
    hotelWiFi: boolean;
    rate: number;
    price: number;
}

function SearchHotel() {
    const guestAmount = [1, 2, 3, 4, 5, 6, 7, 8];
    const guests = guestAmount.map(item => <option key={item}>{item}</option>);
    const dispatch = useAppDispatch();
    const requestAllHotels = useAppSelector(
        state => state.requests.getallhotels,
    );
    let hotels = requestAllHotels.value;
    console.log(hotels?.length);
    const [arrivalDate, setArravalDate] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [peopleAmount, setPeopleAmount] = useState(0);
    const [city, setCity] = useState("");
    const [lowPrice, setLowPrice] = useState(0);
    const [highPrice, setHighPrice] = useState(0);
    const [parking, setParking] = useState(false);
    const [food, setFood] = useState(false);
    const [wifi, setWifi] = useState(false);
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
        setCity(e.target.value);
    };
    const handleLowPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLowPrice(Number(e.target.value));
    };
    const handleHighPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHighPrice(Number(e.target.value));
    };
    const handleParkingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParking(e.target.checked);
    };
    const handleFoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFood(e.target.checked);
    };
    const handleWifiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWifi(e.target.checked);
    };

    function FilterHotels(hotel: HotelInfoProps): boolean {
        let isCity = 0
        let isFood = 0
        let isWiFi = 0
        let isLowPrice = 0
        let isHighPrice = 0 
        if (city != "") {
            isCity = 1
            if (city == hotel.city)
                isCity = 2
        }
        if (food != false) {
            isFood = 1
            if (food == hotel.hotelFood)
                isFood = 2
        }
        if (wifi != false) {
            isWiFi = 1
            if (wifi == hotel.hotelWiFi)
                isWiFi = 2
        }
        if (lowPrice != 0) {
            isLowPrice = 1
            if (lowPrice < hotel.price)
                isLowPrice = 2
        }
        if (highPrice != 0) {
            isHighPrice = 1
            if (highPrice > hotel.price)
                isHighPrice = 2
        }
        const parameters = [isCity, isFood, isWiFi, isLowPrice, isHighPrice]
        let isGood = true
        for (let a of parameters)
            if (a == 1)
                {
                    isGood = false
                    break;
                }
        return isGood;
    }

    const hotelInfo = [
        {
            name: "Звезда",
            isLuxary: false,
            isNormal: true,
            isReallyBad: false,
            city: "Vladivostok",
            country: "Russia",
            place: "Svetlanskaya, bld. 118, appt. 51",
            hotelFood: true,
            hotelWiFi: true,
            rate: 5,
            price: 2600,
        },

        {
            name: "Аврора",
            isLuxary: true,
            isNormal: true,
            isReallyBad: false,
            city: "Stavropol",
            country: "Russia",
            place: "Dzerzhinskogo Ul., bld. 139, appt. 12",
            hotelFood: false,
            hotelWiFi: false,
            rate: 7,
            price: 4000,
        },

        {
            name: "IRIS",
            isLuxary: true,
            isNormal: false,
            isReallyBad: true,
            city: "Washington",
            country: "USA",
            place: "1144 Hardman Road",
            hotelFood: false,
            hotelWiFi: true,
            rate: 6,
            price: 2300,
        },

        {
            name: "Galaxy",
            isLuxary: false,
            isNormal: true,
            isReallyBad: false,
            city: "Houston",
            country: "USA",
            place: "4275 Swick Hill Street",
            hotelFood: true,
            hotelWiFi: false,
            rate: 8,
            price: 3500,
        },

        {
            name: "Мечта",
            isLuxary: true,
            isNormal: true,
            isReallyBad: false,
            city: "Saint-Petersburg",
            country: "Russia",
            place: "Antonova-Ovseenko Ul., bld. 5/21, appt. 179",
            hotelFood: true,
            hotelWiFi: true,
            rate: 9,
            price: 4500,
        },
        {
            name: "Лагуна",
            isLuxary: false,
            isNormal: true,
            isReallyBad: false,
            city: "Stavropol",
            country: "Russia",
            place: "Prospekt Oktyabrya, bld. 48, appt. 35",
            hotelFood: false,
            hotelWiFi: true,
            rate: 6,
            price: 1700,
        },
        {
            name: "Sky&Stars",
            isLuxary: true,
            isNormal: true,
            isReallyBad: false,
            city: "Houston",
            country: "USA",
            place: "3715 Oakwood Avenue",
            hotelFood: true,
            hotelWiFi: true,
            rate: 8,
            price: 5500,
        },
    ];
    const cityNames = [...new Set( hotelInfo.map(one => one.city))];
    const cities = cityNames.map(item => <option key={item}>{item}</option>);
    const [hotelList, setHotelList] = useState(
        hotelInfo.map(one => (
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
        )),
    );
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
                            setHotelList(
                                hotelInfo
                                    .filter(FilterHotels)
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
                                    )),
                            );
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
