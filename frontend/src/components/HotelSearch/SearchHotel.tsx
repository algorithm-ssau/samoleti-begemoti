import {
    useAppDispatch,
    getAllHotelsThunk,
    useAppSelector,
} from "../../store/store";
import { useState } from "react";
import HotelCard from "../HotelCard";
import type { Address } from "samolet-common";
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
    Checkbox,
    Container,
} from "./style";

function SearchHotel() {
    const cityNames = ["one", "two", "three", "four", "five"];
    const cities = cityNames.map(item => <option key={item}>{item}</option>);
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

    let hotelList = cityNames.map(one => (
        <HotelCard
            name={one}
            luxary={true}
            normal={false}
            reallyBad={true}
            address={
                { city: "ddff ", country: "djjf ", place: "fjff" } as Address
            }
            isFood={true}
            isWiFi={false}
            raiting={7}
            price={3200}
        />
    )); //works
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
                            dispatch(getAllHotelsThunk());
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
