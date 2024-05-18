import styled from "styled-components";
import {
    lightPrimary,
    primaryText,
    secondaryText,
    baseText,
    accent,
} from "./BaseStyle";

const Container = styled.div`
    background-color: ${lightPrimary};
    display: block;
    box-shadow: 0px 2px 4px ${lightPrimary};
    width: 48%;
    margin: auto;
    align-items: center;
    border-radius: 8px;
    margin-top: 15%;
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

function FindHotel() {
    alert("FindButton was pressed");
}

function SearchHotel() {
    const cityNames = ["one", "two", "three", "four", "five"];
    const cities = cityNames.map((item) => <option key={item}>{item}</option>);
    const guestAmount = [1, 2, 3, 4, 5, 6, 7, 8];
    const guests = guestAmount.map((item) => (
        <option key={item}>{item}</option>
    ));
    return (
        <Container>
            <ContainerUp>
                <ContainerLeftHalf>
                    <HeadingsContainer>
                        <H2Headings>Дата заезда:</H2Headings>
                        <H2Headings>Дата выезда:</H2Headings>
                        <H2Headings>Количество гостей:</H2Headings>
                    </HeadingsContainer>
                    <SelectContainer>
                        <DataPriceInput type="date" />
                        <DataPriceInput type="date" />
                        <CustomSelect>
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
                        <CustomSelect>
                            <option value="" selected disabled hidden>
                                --
                            </option>
                            {cities}
                        </CustomSelect>
                        <DataPriceInput type="text" placeholder="мало" />
                        <DataPriceInput type="text" placeholder="много" />
                    </SelectContainer>
                </ContainerRightHalf>
            </ContainerUp>
            <ContainerDown>
                <Checkbox type="checkbox" id="parking" />
                <H2Filters>Парковка</H2Filters>
                <Checkbox type="checkbox" id="food" />
                <H2Filters>Питание</H2Filters>
                <Checkbox type="checkbox" id="wi-fi" />
                <H2Filters>Wi-Fi</H2Filters>
                <FindButton onClick={FindHotel}>
                    <H2Headings>Найти</H2Headings>
                </FindButton>
            </ContainerDown>
        </Container>
    );
}

export default SearchHotel;
